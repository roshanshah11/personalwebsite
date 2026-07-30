"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { STAR_CONSTELLATIONS, type StarConstellation } from "./constellationData";

// --- Utils ---

/**
 * Frame-rate independent smoothing.
 *
 * Every easing in this file used to be written `value += (target - value) * f`,
 * which is a constant fraction *per frame* and therefore a different speed on
 * every display. On a 120Hz ProMotion screen it ran twice per 60Hz frame, so
 * the camera converged about twice as fast, the parallax was noticeably
 * tighter, and the scroll warp read at roughly half strength because the
 * per-frame scroll delta feeding it was halved. Same code, two different sites.
 *
 * `lambda` is the equivalent rate per second: the old per-frame factor f maps to
 * -60 * ln(1 - f), so 0.1 per frame at 60fps is a lambda of 6.32 and the feel on
 * a 60Hz display is preserved exactly while every other refresh rate now
 * matches it.
 */
function damp(current: number, target: number, lambda: number, dt: number) {
    return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

// Long frames (a background tab waking up, a slow first paint) would otherwise
// arrive as one enormous dt and snap everything to its target at once.
const MAX_DT = 0.1;

function ScrollDrivenCamera() {
    const { camera } = useThree();

    useFrame((_state, delta) => {
        // Move camera along -Z axis based on scroll
        // Mapping: 1px scroll = 0.05 units Z
        const targetZ = -window.scrollY * 0.05;
        const dt = Math.min(delta, MAX_DT);
        camera.position.z = damp(camera.position.z, targetZ, 6.32, dt);
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

    useFrame((_state, delta) => {
        if (!enabled.current) return;
        const dt = Math.min(delta, MAX_DT);
        camera.position.x = damp(camera.position.x, target.current.x, 2.45, dt);
        camera.position.y = damp(camera.position.y, target.current.y, 2.45, dt);
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

// Author-space units per unit of normalised depth. The generator centres each
// figure's distances on its median and clamps to roughly -1.8..1.8, so this sets
// how much of the real front-to-back spread the eye actually gets. Against a
// half-extent of 13 it reads as genuine depth without stretching the figure into
// a tunnel. This is the dial to turn if the effect is too strong or too subtle.
const DEPTH_UNITS = 7;

/** Signed depth -> local z. Positive depth means further from Earth, and the
 *  camera looks down -z, so further has to be more negative. */
function depthToZ(depth: number, scale: number) {
    return -depth * DEPTH_UNITS * scale;
}

// The base tint every star used to share. Real colour is mixed toward it rather
// than replacing it, because a fully saturated star field would turn the sky
// into confetti and the blue field is the thing the whole page is built on.
const STAR_BASE = [0.86, 0.91, 1.0] as const;
const COLOR_STRENGTH = 0.55;

/**
 * B-V colour index -> RGB, by way of a real surface temperature.
 *
 * Ballesteros' formula gives temperature from the colour index, and it is
 * accurate enough to be checkable: the Sun's B-V of 0.656 returns 5756 K
 * against a true 5772, Rigel's -0.03 returns 10516 K, Betelgeuse's 1.50
 * returns 3794 K. The blackbody-to-RGB step is the standard piecewise fit.
 */
function bvToColor(bv: number): [number, number, number] {
    const b = Math.min(2.0, Math.max(-0.4, bv));
    const t = 4600 * (1 / (0.92 * b + 1.7) + 1 / (0.92 * b + 0.62));
    const k = Math.min(40000, Math.max(1000, t)) / 100;

    const r = k <= 66 ? 255 : 329.698727446 * Math.pow(k - 60, -0.1332047592);
    const g =
        k <= 66
            ? 99.4708025861 * Math.log(k) - 161.1195681661
            : 288.1221695283 * Math.pow(k - 60, -0.0755148492);
    const bl = k >= 66 ? 255 : k <= 19 ? 0 : 138.5177312231 * Math.log(k - 10) - 305.0447927307;

    const norm = (v: number) => Math.min(1, Math.max(0, v / 255));
    return [
        STAR_BASE[0] + (norm(r) - STAR_BASE[0]) * COLOR_STRENGTH,
        STAR_BASE[1] + (norm(g) - STAR_BASE[1]) * COLOR_STRENGTH,
        STAR_BASE[2] + (norm(bl) - STAR_BASE[2]) * COLOR_STRENGTH,
    ];
}

function buildConstellationGeometry(def: StarConstellation, scale: number) {
    const count = def.stars.length;
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const phase = new Float32Array(count);
    const bright = new Float32Array(count);
    const color = new Float32Array(count * 3);

    def.stars.forEach(([x, y, mag, depth, ci], i) => {
        const b = magToRamp(mag);
        pos[i * 3] = x * scale;
        pos[i * 3 + 1] = y * scale;
        // Real relative distance, replacing the random jitter that used to sit
        // here purely to stop the figure looking like a decal. The jitter was a
        // lie that happened to look right; this is the fact that makes the
        // figure hold together from Earth and come apart on the way past.
        pos[i * 3 + 2] = depthToZ(depth, scale);
        // Sizes carry the figure's scale so that, since scale grows with depth
        // and the shader divides by depth, a star's on-screen size is the same
        // whichever constellation it belongs to.
        size[i] = (0.18 + 3.6 * Math.pow(b, 2.0)) * scale;
        phase[i] = Math.random() * Math.PI * 2;
        bright[i] = 0.16 + 1.15 * Math.pow(b, 1.3);

        const [cr, cg, cb] = bvToColor(ci);
        color[i * 3] = cr;
        color[i * 3 + 1] = cg;
        color[i * 3 + 2] = cb;
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
    geometry.setAttribute("aBright", new THREE.BufferAttribute(bright, 1));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
    return geometry;
}

// One THREE.Points per constellation with the twinkle computed on the GPU, so
// ~1.5k stars across the whole sky cost eight draw calls and no React state.
const CONSTELLATION_VERT = `
    attribute float aSize;
    attribute float aPhase;
    attribute float aBright;
    attribute vec3 aColor;
    uniform float uTime;
    varying float vBright;
    varying vec3 vColor;
    void main() {
        float twinkle = 0.72 + 0.28 * sin(uTime * 1.6 + aPhase);
        vBright = aBright * twinkle;
        vColor = aColor;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        // Same near-camera guard as the field: the scroll-driven camera reaches
        // the nearer figures, and without a ceiling a named star balloons into a
        // disc on the way past. The intended "fly toward a figure" magnification
        // survives, because that comes from the figure's stars spreading apart
        // on screen, not from each sprite growing without bound.
        float depth = max(-mv.z, 0.001);
        vBright *= smoothstep(6.0, 45.0, depth);
        gl_PointSize = clamp(aSize * twinkle * (600.0 / depth), 1.0, 12.0);
    }
`;

const CONSTELLATION_FRAG = `
    varying float vBright;
    varying vec3 vColor;
    void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float glow = pow(1.0 - d * 2.0, 1.6);
        gl_FragColor = vec4(vColor, glow * vBright);
    }
`;

// Chicago, because that is where the sky over this page is being looked at from.
const OBSERVER_LAT = (41.8781 * Math.PI) / 180;
const OBSERVER_LON = -87.6298;

/**
 * Local sidereal time at Chicago, in radians.
 *
 * GMST from the standard linear fit on Julian centuries, then offset by the
 * observer's longitude. The coefficient that matters is 360.98564736629 degrees
 * per day, which is why the sky comes back around in 23h56m04s rather than 24h:
 * a sidereal day is one full rotation relative to the stars, not to the Sun.
 */
function localSiderealTime(msSinceEpoch: number) {
    const jd = msSinceEpoch / 86400000 + 2440587.5;
    const d = jd - 2451545.0;
    const deg = 280.46061837 + 360.98564736629 * d + OBSERVER_LON;
    return ((((deg % 360) + 360) % 360) * Math.PI) / 180;
}

/**
 * Parallactic angle: how far a point on the sky is rolled relative to the
 * observer's vertical, given its hour angle. This is the whole reason
 * Cassiopeia is a W in the autumn evening and an M in the spring one — the
 * figure never changes, the angle you meet it at does.
 */
function parallacticAngle(lst: number, ra0: number, dec0: number) {
    const h = lst - ra0;
    return Math.atan2(
        Math.sin(h),
        Math.tan(OBSERVER_LAT) * Math.cos(dec0) - Math.sin(dec0) * Math.cos(h)
    );
}

function ConstellationsGroup() {
    // The whole-sky spin that used to live here was `elapsedTime * 0.002`, about
    // 6.9 degrees a minute, roughly 28 times the real rate and pinned to page
    // load rather than to anything. It is gone: each figure now carries its own
    // parallactic angle, which already contains the time dependence, so a parent
    // rotation on top of it would just be double-counting.
    return (
        <group>
            {CONSTELLATIONS.map((def) => (
                <Constellation key={def.abbr} def={def} />
            ))}
        </group>
    );
}

// Faint enough to guide the eye without drawing a diagram over the sky. Named
// because the fade below has to scale from the same value the strokes start at.
const STROKE_OPACITY = 0.08;

function Constellation({ def }: { def: StarConstellation }) {
    const { position, scale } = PLACEMENTS[def.abbr];

    const geometry = useMemo(() => buildConstellationGeometry(def, scale), [def, scale]);
    const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

    // Asterism strokes, faint enough to guide the eye without drawing a diagram
    // over the sky. The endpoints take each star's real z, so the lines are no
    // longer a flat wireframe laid in front of a field with depth: they lean
    // with it. Orion's belt is the clearest case — Alnilam is roughly 600
    // parsecs out against 212 and 226 for the other two, so the stroke that
    // looks like a straight bar from Earth is a deep V from anywhere else.
    const strokes = useMemo(
        () => def.lines.map(([a, b]) => [
            new THREE.Vector3(
                def.stars[a][0] * scale,
                def.stars[a][1] * scale,
                depthToZ(def.stars[a][3], scale)
            ),
            new THREE.Vector3(
                def.stars[b][0] * scale,
                def.stars[b][1] * scale,
                depthToZ(def.stars[b][3], scale)
            ),
        ]),
        [def, scale]
    );

    // The strokes have to fade on the same curve as the stars they connect.
    // The near-camera guard added to CONSTELLATION_VERT lives in the vertex
    // shader, so it only ever touched the points: the camera would fly past a
    // figure, its stars would vanish, and its asterism would stay at a flat 0.08
    // and keep growing — a bare stick figure hanging in an empty patch of sky,
    // which is precisely the "reads as stray lines" failure the placement notes
    // above say the design guards against.
    //
    // This used to read one depth for the whole figure, which was exact back
    // when every star sat at local z = 0. Real distances broke that: across
    // Orion the endpoints now span about 35 world units, against a fade window
    // only 39 units wide, so a single figure depth would blink the entire
    // asterism in and out together while its stars went one at a time. Each
    // stroke therefore carries its own midpoint depth. That is still an
    // approximation — the shader fades each endpoint separately — but it is one
    // per line rather than one per constellation, and a line is short enough
    // that its two ends are never far apart on the curve.
    const midDepths = useMemo(
        () => def.lines.map(([a, b]) =>
            (depthToZ(def.stars[a][3], scale) + depthToZ(def.stars[b][3], scale)) / 2
        ),
        [def, scale]
    );

    const groupRef = useRef<THREE.Group>(null);
    const lineRefs = useRef<THREE.Object3D[]>([]);
    const worldPos = useMemo(() => new THREE.Vector3(), []);

    useFrame((state) => {
        uniforms.uTime.value = state.clock.elapsedTime;

        if (!groupRef.current) return;

        // Real sidereal motion, read off the wall clock rather than off the
        // page-load clock, so the sky is where the sky actually is. It turns
        // 15.041 degrees an hour, which is far too slow to catch anyone
        // watching — the point is that leaving the tab open for an hour and
        // coming back finds the figures moved, correctly.
        //
        // Wall clock, not `state.clock.elapsedTime`: the render clock stalls
        // while the tab is hidden, so a sky driven off it would come back an
        // hour later still showing the hour it was backgrounded at.
        groupRef.current.rotation.z = parallacticAngle(
            localSiderealTime(Date.now()),
            def.ra0,
            def.dec0
        );

        groupRef.current.getWorldPosition(worldPos);
        const base = state.camera.position.z - worldPos.z;

        lineRefs.current.forEach((line, i) => {
            const material = (line as THREE.Mesh | undefined)?.material as
                | THREE.Material
                | undefined;
            if (!material) return;
            // The roll is about z, so local z survives it and the midpoint
            // offset can be added to the group depth directly.
            const depth = Math.max(base - midDepths[i], 0.001);
            // smoothstep(6, 45, depth) — the same edges as the vertex shader.
            const t = THREE.MathUtils.clamp((depth - 6) / 39, 0, 1);
            material.opacity = STROKE_OPACITY * t * t * (3 - 2 * t);
        });
    });

    return (
        <group ref={groupRef} position={position}>
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
                <Line
                    key={i}
                    ref={(el) => {
                        if (el) lineRefs.current[i] = el;
                    }}
                    points={pts}
                    color="#ffffff"
                    opacity={STROKE_OPACITY}
                    transparent
                    lineWidth={1}
                />
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

    // uCameraZ used to be declared here and written every frame. Nothing read
    // it: the shader only ever used `modelViewMatrix`, which already carries the
    // camera. It was an upload per frame to feed a dead uniform.
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uVelocity: { value: 0 },
    }), []);

    const vertexShader = `
        uniform float uTime;
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

            // There is no recycling here, and it does not need any. The field is
            // seeded from z = +50 to z = -600, and the camera is driven at 0.05
            // units per scrolled pixel, so reaching the back of it would take
            // 13,000px of page. This page is 3,297px tall, which puts the camera
            // at z = -120 when the footer is on screen: about a fifth of the way
            // in. Wrapping logic would be dead code that could only pop.
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;

            // Twinkle
            float twinkle = sin(uTime * 1.5 + aPhase);

            // The camera flies along -Z with scroll, straight through a field
            // seeded across its whole path, so it does pass through individual
            // stars. Unguarded, 450/depth diverges there: at depth 1 the sprite
            // is 450px and at 0.5 it is 900px, which is how one warm star became
            // a sun filling a phone screen. Longer pages travel further, so this
            // hit mobile hardest.
            //
            // A ceiling alone only shrinks the sun into a bright disc, so the
            // star has to be gone before it can ever get close: fade it out over
            // the last 90 units of approach and cap it at a few pixels. A star
            // is a point of light, never a sphere, so nothing is lost.
            float depth = max(-mvPosition.z, 0.001);
            float nearFade = smoothstep(10.0, 90.0, depth);

            vAlpha = (0.6 + 0.4 * twinkle) * nearFade;
            gl_PointSize = clamp(450.0 / depth, 1.0, 6.0);
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

    useFrame((state, delta) => {
        if (meshRef.current) {
            const mat = meshRef.current.material as THREE.ShaderMaterial;
            mat.uniforms.uTime.value = state.clock.elapsedTime;

            const dt = Math.min(delta, MAX_DT);

            // Scroll *speed*, in pixels per second rather than pixels per frame.
            // Per frame was the worst instance of the frame-rate bug: the same
            // flick of the wheel produces half the per-frame delta at 120Hz, so
            // the warp this drives was quietly half as strong on exactly the
            // displays most likely to be looking at it. 0.015 per frame at 60fps
            // is 0.00025 per second, so the 60Hz feel is unchanged.
            const moved = window.scrollY - lastScroll.current;
            lastScroll.current = window.scrollY;
            const impulse = Math.max(-1, Math.min(1, (moved / dt) * 0.00025));

            velocity.current = damp(velocity.current, impulse, 9.75, dt);
            velocity.current *= Math.exp(-5.0 * dt);
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

    useFrame((state, delta) => {
        if (meshRef.current) {
            const mat = meshRef.current.material as THREE.ShaderMaterial;
            mat.uniforms.uTime.value = state.clock.elapsedTime;

            // Normalized scroll depth (0 at top, ~1 near the bottom)
            const doc = document.documentElement;
            const scrollable = doc.scrollHeight - window.innerHeight;
            const p = scrollable > 0 ? window.scrollY / scrollable : 0;
            const target = Math.min(1, Math.max(0, p));
            mat.uniforms.uScroll.value = damp(
                mat.uniforms.uScroll.value,
                target,
                3.08,
                Math.min(delta, MAX_DT)
            );

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
//
// Sampling is on a clock rather than once per frame, so the comet is the same
// length in milliseconds on a 60Hz panel and a 120Hz one. The step is far finer
// than any real refresh rate on purpose: at one sample per frame a fast flick
// put consecutive samples a hundred-odd pixels apart and the comet read as a row
// of beads. What closes a gap is samples per unit of distance, so the rate is
// set against how fast a cursor actually moves rather than against the display.
// A brisk flick is around 3000 px/s, which at this rate lands a sample every
// 7.5px, comfortably inside the sprite width for the whole length of the trail.
const TRAIL_STEP = 1 / 400;
// 160 samples at 1/400s is 400ms of history, near enough the 433ms the original
// 26-sample version held. Same length, six times the density along it. Points
// are close to free here: this is one draw call and a few thousand float moves
// per frame, which is nothing next to the 30,000-point dust field.
const TRAIL_LENGTH = 160;

function CursorComet() {
    const N = TRAIL_LENGTH;
    const pointsRef = useRef<THREE.Points>(null);
    const mouse = useRef({ x: 0, y: 0, active: false });
    const seeded = useRef(false);
    const enabled = useRef(true);
    const acc = useRef(0);
    // Where the head was at the last sample, so this frame's samples can be laid
    // along the path travelled since rather than stacked on the destination.
    const prev = useRef(new THREE.Vector3());
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
        varying float vT;
        void main() {
            // aAlpha is the squared ramp, so its root recovers the sample's
            // linear position along the trail: 1 at the head, 0 at the end.
            // Brightness wants the square (light concentrated at the head),
            // while width and colour want the linear one, or the whole gradient
            // would bunch into the first few samples along with the light.
            float t = sqrt(aAlpha);
            vAlpha = aAlpha;
            vT = t;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mv;
            // The taper used to end in a multiply by aAlpha, so the sprite
            // shrank to nothing well before it faded to nothing and the far half
            // of the trail was sub-pixel specks with visible sky between them.
            // Width now bottoms out near a third of the head instead of at zero,
            // and the disappearing is left to alpha, which is what a tail
            // actually does: it thins and dims, it does not stop existing.
            gl_PointSize = (115.0 + 175.0 * t) / -mv.z * (0.45 + 0.55 * t);
        }
    `;
    const fragmentShader = `
        varying float vAlpha;
        varying float vT;
        void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            // Softer than the old squared falloff. These sprites now overlap
            // along the trail, and a hard-edged core makes overlapping discs
            // read as discs; a gentler profile lets them sum into one streak.
            float glow = pow(1.0 - d * 2.0, 1.5);
            // Gold head cooling to cyan tail, spread along the trail rather than
            // tied to brightness.
            vec3 gold = vec3(0.83, 0.68, 0.21);
            vec3 cyan = vec3(0.0, 0.85, 1.0);
            vec3 col = mix(cyan, gold, vT);
            gl_FragColor = vec4(col, glow * vAlpha * 0.9);
        }
    `;

    const uniforms = useMemo(() => ({}), []);

    useFrame((_state, delta) => {
        if (!enabled.current || !pointsRef.current) return;

        // Unproject the cursor onto a plane ~18 units ahead of the camera.
        //
        // The trail is stored as an offset FROM the camera, not as an absolute
        // world position, and the whole object is parked on the camera below.
        // Storing world positions is what made the comet lurch on scroll: the
        // camera flies along -Z at 0.05 units per scrolled pixel, so the head
        // kept up with the cursor while the twenty-five older slots stayed
        // pinned to wherever the camera had been when they were written. The
        // comet was not following the cursor and then jittering, it was being
        // stretched into a wake behind the camera, surging and settling with the
        // 0.1 lerp on camera z. A trail is meant to record where the cursor has
        // been, and the cursor has not moved just because the page scrolled.
        tmp.set(mouse.current.x, mouse.current.y, 0.5).unproject(camera);
        const dir = tmp.sub(camera.position).normalize();
        const tx = dir.x * 18;
        const ty = dir.y * 18;
        const tz = dir.z * 18;

        // Nothing to draw until the pointer has been somewhere. This used to run
        // anyway: every slot held (0, 0, 0), which as a camera-relative offset is
        // the camera position exactly, so `-mv.z` was 0 and the shader's
        // `(115.0 + 175.0 * aAlpha) / -mv.z` divided by zero. The alpha ramp was
        // written every frame regardless of seeding, so those degenerate points
        // were not even transparent.
        if (!mouse.current.active) {
            pointsRef.current.visible = false;
            return;
        }

        if (!seeded.current) {
            // Seed every slot so no streak whips in from the origin.
            for (let i = 0; i < N; i++) {
                positions[i * 3] = tx; positions[i * 3 + 1] = ty; positions[i * 3 + 2] = tz;
                // Squared falloff rather than linear. A linear ramp spends half
                // the trail above 50% brightness, which reads as a bar with a
                // dim end; squaring concentrates the light near the head and
                // lets the rest run out long and faint, which is the shape the
                // eye recognises as a tail.
                const t = 1 - i / N;
                alphas[i] = t * t;
            }
            prev.current.set(tx, ty, tz);
            seeded.current = true;
            pointsRef.current.visible = true;
            // The alpha ramp is fixed once seeded, so it uploads once here
            // rather than being re-flagged on every frame like it used to be.
            pointsRef.current.geometry.attributes.aAlpha.needsUpdate = true;
        }

        pointsRef.current.position.copy(camera.position);

        // The trail advances on a clock, not once per frame. One slot per frame
        // made the comet 26 frames long, which is 433ms at 60Hz and 217ms at
        // 120Hz: the same gesture drew a comet half the length on a ProMotion
        // display. A fixed step keeps the length in milliseconds fixed.
        acc.current = Math.min(acc.current + delta, TRAIL_STEP * N);
        let steps = 0;
        while (acc.current >= TRAIL_STEP && steps < N) {
            acc.current -= TRAIL_STEP;
            steps++;
        }
        if (steps === 0) return;

        // Each step lands on the path between where the cursor was at the last
        // sample and where it is now, rather than all of them landing on the
        // current position. Without this the extra sample rate buys nothing on a
        // fast flick: three samples per frame at the same point is still one
        // point, and the gap to the previous frame's sample stays exactly as
        // wide. Interpolating is what turns the samples into a streak.
        const px = prev.current.x, py = prev.current.y, pz = prev.current.z;
        for (let s = 0; s < steps; s++) {
            const f = (s + 1) / steps;
            // Shift the trail back one slot; newest head at index 0.
            for (let i = N - 1; i > 0; i--) {
                positions[i * 3] = positions[(i - 1) * 3];
                positions[i * 3 + 1] = positions[(i - 1) * 3 + 1];
                positions[i * 3 + 2] = positions[(i - 1) * 3 + 2];
            }
            positions[0] = px + (tx - px) * f;
            positions[1] = py + (ty - py) * f;
            positions[2] = pz + (tz - pz) * f;
        }
        prev.current.set(tx, ty, tz);

        const geo = pointsRef.current.geometry;
        geo.attributes.position.needsUpdate = true;
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
    const [frameloop, setFrameloop] = useState<"always" | "demand" | "never">("always");
    const [reducedMotion, setReducedMotion] = useState(false);
    const [starCount, setStarCount] = useState(30000);

    useEffect(() => {
        const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setReducedMotion(rm);
        // Lighter field on phones to save battery/GPU
        setStarCount(window.innerWidth < 768 ? 12000 : 30000);

        if (rm) {
            // Calm, static star field: render once, then stop the loop.
            //
            // "demand", not "never". They are not the same thing: "never"
            // means r3f draws nothing at all unless something calls
            // invalidate(), and this effect runs before the first animation
            // frame — so a reduced-motion visitor got an empty black backdrop
            // rather than the still starfield this branch is here to give
            // them. "demand" draws on mount and whenever the scene changes,
            // then idles, which is what "render once, then stop" meant.
            setFrameloop("demand");
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
