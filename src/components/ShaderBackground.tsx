"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { STAR_CONSTELLATIONS, type StarConstellation } from "./constellationData";

// --- Utils ---

function ScrollDrivenCamera() {
    const { camera } = useThree();

    useFrame(() => {
        // Move camera along -Z axis based on scroll
        // Mapping: 1px scroll = 0.05 units Z
        const targetZ = -window.scrollY * 0.05;
        // Smooth lerp
        camera.position.z += (targetZ - camera.position.z) * 0.1;
    });

    return null;
}

// Pointer + device-tilt parallax. Shifts the camera laterally so near stars
// drift more than far ones (true depth). Disabled under prefers-reduced-motion.
function PointerParallax() {
    const { camera } = useThree();
    const target = useRef({ x: 0, y: 0 });
    const enabled = useRef(true);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mq.matches) {
            enabled.current = false;
            return;
        }

        const onMouseMove = (e: MouseEvent) => {
            const nx = (e.clientX / window.innerWidth) * 2 - 1;
            const ny = (e.clientY / window.innerHeight) * 2 - 1;
            target.current.x = nx * 4;
            target.current.y = -ny * 3;
        };

        const onOrient = (e: DeviceOrientationEvent) => {
            if (e.gamma == null || e.beta == null) return;
            // gamma: left/right tilt, beta: front/back tilt (offset to a neutral hold angle)
            const gx = Math.max(-30, Math.min(30, e.gamma)) / 30;
            const gy = Math.max(-30, Math.min(30, e.beta - 45)) / 30;
            target.current.x = gx * 4;
            target.current.y = -gy * 3;
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });

        // iOS 13+ requires a user gesture to grant orientation access.
        const requestGyro = () => {
            const DOE = window.DeviceOrientationEvent as unknown as {
                requestPermission?: () => Promise<string>;
            };
            if (DOE && typeof DOE.requestPermission === "function") {
                DOE.requestPermission()
                    .then((state) => {
                        if (state === "granted") {
                            window.addEventListener("deviceorientation", onOrient, { passive: true });
                        }
                    })
                    .catch(() => {});
            } else {
                window.addEventListener("deviceorientation", onOrient, { passive: true });
            }
        };
        window.addEventListener("touchstart", requestGyro, { passive: true, once: true });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("deviceorientation", onOrient);
            window.removeEventListener("touchstart", requestGyro);
        };
    }, []);

    useFrame(() => {
        if (!enabled.current) return;
        camera.position.x += (target.current.x - camera.position.x) * 0.04;
        camera.position.y += (target.current.y - camera.position.y) * 0.04;
    });

    return null;
}

// --- CONSTELLATIONS ---
// Eight real constellations placed along the Z axis so the scroll-driven camera
// flies past them one at a time. Z=0 is the start; negative Z is forward.
//
// The star positions come from the HYG catalogue (see constellationData.ts):
// every star down to magnitude 7 inside each figure's frame, roughly 150-250 per
// constellation, so the shape reads from a real star field instead of a bare
// stick figure.
//
// Placement is expressed in screen terms rather than world units, because that
// is what actually governs legibility: a figure spanning most of the viewport
// reads as stray lines, while one taking up roughly a quarter of the height
// reads instantly as a constellation. `size` is the figure's half-extent as a
// fraction of the visible half-height at its depth, and x/y are offsets in
// -1..1 screen fractions; `place` converts both into world space. Every figure
// therefore subtends about the same angle when the camera reaches it.
//
// Cassiopeia is deliberately nearest — the figure framing the hero — because
// its W is a single open zigzag with no closed polygons to read as boxes.
type Placement = { z: number; x: number; y: number; size: number };

// Sizes shrink with depth and the offsets are spread around the frame, so at
// rest the hero shows one clear near figure and a scatter of small distant ones
// rather than eight overlapping charts. Flying toward a figure magnifies it
// several times over, so each takes its turn as the dominant shape. Nothing is
// placed over the middle of the frame, where the hero type sits.
const PLACEMENT_SPECS: Record<string, Placement> = {
    Cas: { z: 70, x: -0.52, y: 0.40, size: 0.22 },
    UMa: { z: 150, x: 0.55, y: 0.46, size: 0.17 },
    Cyg: { z: 240, x: -0.60, y: -0.42, size: 0.16 },
    Ori: { z: 340, x: 0.62, y: -0.20, size: 0.14 },
    Lyr: { z: 430, x: -0.20, y: 0.55, size: 0.12 },
    Sco: { z: 520, x: 0.28, y: -0.58, size: 0.14 },
    Leo: { z: 640, x: -0.75, y: 0.08, size: 0.13 },
    Cru: { z: 800, x: 0.80, y: 0.30, size: 0.10 },
};

const FOV_HALF_TAN = Math.tan((60 * Math.PI) / 360); // matches the Canvas fov
const NOMINAL_ASPECT = 1.6;
const FIGURE_EXTENT = 13; // author-space half-extent of every generated figure

function place(spec: Placement) {
    const halfH = FOV_HALF_TAN * spec.z;
    return {
        position: [spec.x * halfH * NOMINAL_ASPECT, spec.y * halfH, -spec.z] as [number, number, number],
        scale: (spec.size * halfH) / FIGURE_EXTENT,
    };
}

const PLACEMENTS: Record<string, ReturnType<typeof place>> = Object.fromEntries(
    Object.entries(PLACEMENT_SPECS).map(([abbr, spec]) => [abbr, place(spec)])
);

// Draw order = flight order, nearest first.
const CONSTELLATIONS = Object.keys(PLACEMENT_SPECS)
    .map((abbr) => STAR_CONSTELLATIONS.find((c) => c.abbr === abbr))
    .filter((c): c is StarConstellation => Boolean(c));

// Apparent magnitude runs backwards (lower is brighter) and spans about 8
// stops here, so it is remapped to a 0..1 ramp and then curved hard: the chart
// stars have to punch several times the size of the mag-7 field to be picked out
// of the ambient dust, which is exactly what makes the figure read.
const MAG_LIMIT = 7.0;

function magToRamp(mag: number) {
    return Math.min(1, Math.max(0, (MAG_LIMIT - mag) / 8.5));
}

function buildConstellationGeometry(def: StarConstellation, scale: number) {
    const count = def.stars.length;
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const phase = new Float32Array(count);
    const bright = new Float32Array(count);

    def.stars.forEach(([x, y, mag], i) => {
        const b = magToRamp(mag);
        pos[i * 3] = x * scale;
        pos[i * 3 + 1] = y * scale;
        // A shallow depth spread keeps the field from looking like a decal.
        pos[i * 3 + 2] = (Math.random() - 0.5) * 2.0 * scale;
        // Sizes carry the figure's scale so that, since scale grows with depth
        // and the shader divides by depth, a star's on-screen size is the same
        // whichever constellation it belongs to.
        size[i] = (0.18 + 3.6 * Math.pow(b, 2.0)) * scale;
        phase[i] = Math.random() * Math.PI * 2;
        bright[i] = 0.16 + 1.15 * Math.pow(b, 1.3);
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
    geometry.setAttribute("aBright", new THREE.BufferAttribute(bright, 1));
    return geometry;
}

// One THREE.Points per constellation with the twinkle computed on the GPU, so
// ~1.5k stars across the whole sky cost eight draw calls and no React state.
const CONSTELLATION_VERT = `
    attribute float aSize;
    attribute float aPhase;
    attribute float aBright;
    uniform float uTime;
    varying float vBright;
    void main() {
        float twinkle = 0.72 + 0.28 * sin(uTime * 1.6 + aPhase);
        vBright = aBright * twinkle;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = max(1.0, aSize * twinkle * (600.0 / -mv.z));
    }
`;

const CONSTELLATION_FRAG = `
    varying float vBright;
    void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float glow = pow(1.0 - d * 2.0, 1.6);
        gl_FragColor = vec4(vec3(0.86, 0.91, 1.0), glow * vBright);
    }
`;

function ConstellationsGroup() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Very slow rotation for the whole sky
            groupRef.current.rotation.z = state.clock.elapsedTime * 0.002;
        }
    });

    return (
        <group ref={groupRef}>
            {CONSTELLATIONS.map((def) => (
                <Constellation key={def.abbr} def={def} />
            ))}
        </group>
    );
}

function Constellation({ def }: { def: StarConstellation }) {
    const { position, scale } = PLACEMENTS[def.abbr];

    const geometry = useMemo(() => buildConstellationGeometry(def, scale), [def, scale]);
    const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

    // Asterism strokes, faint enough to guide the eye without drawing a diagram
    // over the sky.
    const strokes = useMemo(
        () => def.lines.map(([a, b]) => [
            new THREE.Vector3(def.stars[a][0] * scale, def.stars[a][1] * scale, 0),
            new THREE.Vector3(def.stars[b][0] * scale, def.stars[b][1] * scale, 0),
        ]),
        [def, scale]
    );

    useFrame((state) => {
        uniforms.uTime.value = state.clock.elapsedTime;
    });

    return (
        <group position={position}>
            <points geometry={geometry}>
                <shaderMaterial
                    vertexShader={CONSTELLATION_VERT}
                    fragmentShader={CONSTELLATION_FRAG}
                    uniforms={uniforms}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
            {strokes.map((pts, i) => (
                <Line key={i} points={pts} color="#ffffff" opacity={0.08} transparent lineWidth={1} />
            ))}
        </group>
    );
}

function InfiniteSpaceDust({ count = 30000 }: { count?: number }) {
    const meshRef = useRef<THREE.Points>(null);
    const lastScroll = useRef(0);
    const velocity = useRef(0);

    const [positions, cssColors, phases] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const cssColors = new Float32Array(count * 3);
        const phases = new Float32Array(count);

        const colorPalette = [
            new THREE.Color("#ffffff"),
            new THREE.Color("#aaddff"),
            new THREE.Color("#ffddaa"),
        ];

        for (let i = 0; i < count; i++) {
            // X and Y spread wide
            positions[i * 3] = (Math.random() - 0.5) * 350;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 350;
            // Z spread deep: from +50 (behind camera) to -600 (far ahead)
            positions[i * 3 + 2] = 50 - Math.random() * 650;

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            cssColors[i * 3] = color.r;
            cssColors[i * 3 + 1] = color.g;
            cssColors[i * 3 + 2] = color.b;

            phases[i] = Math.random() * Math.PI * 2;
        }
        return [positions, cssColors, phases];
    }, [count]);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uCameraZ: { value: 0 },
        uVelocity: { value: 0 },
    }), []);

    const vertexShader = `
        uniform float uTime;
        uniform float uCameraZ;
        uniform float uVelocity;
        attribute vec3 aColor;
        attribute float aPhase;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
            vColor = aColor;
            vec3 pos = position;

            // Scroll-velocity warp: a sine displacement whose amplitude follows
            // how fast the visitor is scrolling, then decays back to a calm field.
            float wave = sin(pos.z * 0.045 + uTime * 2.2 + aPhase);
            float wave2 = cos(pos.z * 0.045 + uTime * 1.7 + aPhase);
            pos.x += wave * uVelocity * 7.0;
            pos.y += wave2 * uVelocity * 7.0;

            // Infinite scrolling logic
            // The camera moves in -Z direction.
            // If a star is significantly behind the camera (pos.z > camera.z + threshold),
            // move it forward to recycle it.
            
            // However, implementing true infinite tiling in vertex shader based on camera pos needs care.
            // Instead, we can just rely on a VERY deep field and user likely won't scroll infinitely.
            // But for "looping" feel, we can mod the Z relative to camera?
            // Let's stick to deep field for now, it's safer than complex wrapping logic that might pop artifacts.
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;

            // Twinkle
            float twinkle = sin(uTime * 1.5 + aPhase);
            vAlpha = 0.6 + 0.4 * twinkle; // More base brightness
            
            // Size attenuation - boosted for better visibility
            gl_PointSize = (450.0 / -mvPosition.z); 
        }
    `;

    const fragmentShader = `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float glow = 1.0 - (dist * 2.0);
            glow = pow(glow, 2.0);
            gl_FragColor = vec4(vColor, vAlpha * glow);
        }
    `;

    useFrame((state) => {
        if (meshRef.current) {
            const mat = meshRef.current.material as THREE.ShaderMaterial;
            mat.uniforms.uTime.value = state.clock.elapsedTime;
            mat.uniforms.uCameraZ.value = state.camera.position.z;

            // Instantaneous scroll delta, normalized and clamped, then decayed so
            // the warp eases out smoothly after the visitor stops scrolling.
            const delta = window.scrollY - lastScroll.current;
            lastScroll.current = window.scrollY;
            const impulse = Math.max(-1, Math.min(1, delta * 0.015));
            velocity.current += (impulse - velocity.current) * 0.15;
            velocity.current *= 0.92;
            mat.uniforms.uVelocity.value = velocity.current;
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-aColor"
                    count={count}
                    array={cssColors}
                    itemSize={3}
                    args={[cssColors, 3]}
                />
                <bufferAttribute
                    attach="attributes-aPhase"
                    count={count}
                    array={phases}
                    itemSize={1}
                    args={[phases, 1]}
                />
            </bufferGeometry>
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function ReactiveNebula() {
    const meshRef = useRef<THREE.Mesh>(null);
    const { camera } = useThree();

    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        uniform float uTime;
        uniform float uScroll;
        varying vec2 vUv;

        // Simplex 2D noise
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        float snoise(vec2 v){
            const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy) );
            vec2 x0 = v -   i + dot(i, C.xx);
            vec2 i1;
            i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod(i, 289.0);
            vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
            m = m*m ;
            m = m*m ;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
        }

        void main() {
            // Static time-based evolution, no scroll influence
            float t = uTime * 0.02; 
            
            // Layered noise
            float n1 = snoise(vUv * 2.0 + t);
            float n2 = snoise(vUv * 4.0 - t * 0.5);
            float n3 = snoise(vUv * 8.0 + t * 0.3);
            
            float fog = n1 * 0.5 + n2 * 0.25 + n3 * 0.125;

            // Blue space palette (matches site theme)
            vec3 colorA = vec3(0.0, 0.02, 0.08);  // near-black deep blue
            vec3 colorB = vec3(0.02, 0.12, 0.35); // signature deep blue
            vec3 accent = vec3(0.0, 0.15, 0.30);  // cyan-lean highlight on peaks

            vec3 finalColor = mix(colorA, colorB, smoothstep(-0.5, 1.0, fog));
            // Brightest fog peaks pick up a cyan lift, deepening as you scroll
            finalColor = mix(finalColor, accent, smoothstep(0.35, 0.8, fog) * (0.4 + uScroll * 0.4));

            float dist = distance(vUv, vec2(0.5));
            float vignette = smoothstep(0.8, 0.2, dist);

            // Overall glow lifts subtly with scroll depth
            float glow = 0.5 + uScroll * 0.25;
            gl_FragColor = vec4(finalColor * vignette * glow, 1.0);
        }
    `;

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uScroll: { value: 0 },
    }), []);

    useFrame((state) => {
        if (meshRef.current) {
            const mat = meshRef.current.material as THREE.ShaderMaterial;
            mat.uniforms.uTime.value = state.clock.elapsedTime;

            // Normalized scroll depth (0 at top, ~1 near the bottom)
            const doc = document.documentElement;
            const scrollable = doc.scrollHeight - window.innerHeight;
            const p = scrollable > 0 ? window.scrollY / scrollable : 0;
            const target = Math.min(1, Math.max(0, p));
            mat.uniforms.uScroll.value += (target - mat.uniforms.uScroll.value) * 0.05;

            // Keep nebula parked just behind the camera
            meshRef.current.position.z = state.camera.position.z - 50;
        }
    });

    return (
        <mesh ref={meshRef} scale={[150, 150, 1]}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

// A short additive-blend particle streak that chases the cursor through the
// field: gold at the head, cooling to cyan down the tail. Pointer-only.
function CursorComet() {
    const N = 26;
    const pointsRef = useRef<THREE.Points>(null);
    const mouse = useRef({ x: 0, y: 0, active: false });
    const seeded = useRef(false);
    const enabled = useRef(true);
    const { camera } = useThree();

    const positions = useMemo(() => new Float32Array(N * 3), []);
    const alphas = useMemo(() => new Float32Array(N), []);
    const tmp = useMemo(() => new THREE.Vector3(), []);

    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const coarse = window.matchMedia("(pointer: coarse)").matches;
        if (reduced || coarse) {
            enabled.current = false;
            return;
        }
        const onMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
            mouse.current.active = true;
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    const vertexShader = `
        attribute float aAlpha;
        varying float vAlpha;
        void main() {
            vAlpha = aAlpha;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = (115.0 + 175.0 * aAlpha) / -mv.z * aAlpha;
        }
    `;
    const fragmentShader = `
        varying float vAlpha;
        void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float glow = pow(1.0 - d * 2.0, 2.0);
            // Gold head cooling to cyan tail as alpha decays.
            vec3 gold = vec3(0.83, 0.68, 0.21);
            vec3 cyan = vec3(0.0, 0.85, 1.0);
            vec3 col = mix(cyan, gold, vAlpha);
            gl_FragColor = vec4(col, glow * vAlpha * 0.9);
        }
    `;

    const uniforms = useMemo(() => ({}), []);

    useFrame(() => {
        if (!enabled.current || !pointsRef.current) return;

        // Unproject the cursor onto a plane ~18 units ahead of the camera.
        tmp.set(mouse.current.x, mouse.current.y, 0.5).unproject(camera);
        const dir = tmp.sub(camera.position).normalize();
        const tx = camera.position.x + dir.x * 18;
        const ty = camera.position.y + dir.y * 18;
        const tz = camera.position.z + dir.z * 18;

        // On first pointer contact, seed every slot so no streak whips in from origin.
        if (!seeded.current && mouse.current.active) {
            for (let i = 0; i < N; i++) {
                positions[i * 3] = tx; positions[i * 3 + 1] = ty; positions[i * 3 + 2] = tz;
            }
            seeded.current = true;
        }

        // Shift the trail back one slot; newest head at index 0.
        for (let i = N - 1; i > 0; i--) {
            positions[i * 3] = positions[(i - 1) * 3];
            positions[i * 3 + 1] = positions[(i - 1) * 3 + 1];
            positions[i * 3 + 2] = positions[(i - 1) * 3 + 2];
            alphas[i] = 1 - i / N;
        }
        positions[0] = tx; positions[1] = ty; positions[2] = tz;
        alphas[0] = 1;

        const geo = pointsRef.current.geometry;
        geo.attributes.position.needsUpdate = true;
        geo.attributes.aAlpha.needsUpdate = true;
    });

    return (
        <points ref={pointsRef} frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={N} array={positions} itemSize={3} args={[positions, 3]} />
                <bufferAttribute attach="attributes-aAlpha" count={N} array={alphas} itemSize={1} args={[alphas, 1]} />
            </bufferGeometry>
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                depthTest={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function ShaderBackground() {
    const [frameloop, setFrameloop] = useState<"always" | "never">("always");
    const [reducedMotion, setReducedMotion] = useState(false);
    const [starCount, setStarCount] = useState(30000);

    useEffect(() => {
        const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setReducedMotion(rm);
        // Lighter field on phones to save battery/GPU
        setStarCount(window.innerWidth < 768 ? 12000 : 30000);

        if (rm) {
            // Calm, static star field: render once, then stop the loop
            setFrameloop("never");
            return;
        }

        // Pause the render loop when the tab is hidden
        const onVisibility = () => setFrameloop(document.hidden ? "never" : "always");
        document.addEventListener("visibilitychange", onVisibility);
        return () => document.removeEventListener("visibilitychange", onVisibility);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 bg-[#020204]">
            <Canvas
                frameloop={frameloop}
                camera={{ position: [0, 0, 10], fov: 60 }}
                dpr={[1, 2]}
                gl={{ antialias: false, alpha: false }}
            >
                <ScrollDrivenCamera />
                {!reducedMotion && <PointerParallax />}
                <color attach="background" args={['#020204']} />

                <ReactiveNebula />

                {/* Main stars layer */}
                <InfiniteSpaceDust count={starCount} />

                {/* Constellations layer */}
                <ConstellationsGroup />

                {/* Cursor comet (pointer devices only) */}
                {!reducedMotion && <CursorComet />}

                {/* No bloom pass. With 30k additively-blended star cores, even a
                    high threshold blurs into a haze that lifts the entire field
                    off black and flattens the deep blue. The starfield's own
                    additive falloff already reads as glow. */}
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/30 via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
