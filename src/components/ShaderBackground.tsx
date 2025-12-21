"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

// --- Utils ---

function createStarTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext("2d");
    if (context) {
        const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.1, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.1)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        context.fillStyle = gradient;
        context.fillRect(0, 0, 32, 32);
    }
    return new THREE.CanvasTexture(canvas);
}

// Reuse geometry for stars to save draw calls if possible, but sprite is okay.
// For lines, we will generate them.

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

// --- CONSTANT DATA ---
// Real constellations + procedural ones
// We will scatter them along the Z axis.
// Z=0 is start. Negative Z is forward.
const PRESET_CONSTELLATIONS = [
    {
        name: "Big Dipper",
        points: [
            [-50, 20, -20], [-45, 15, -20], [-40, 18, -20],
            [-32, 16, -20], [-25, 18, -20], [-20, 20, -20], [-15, 23, -20]
        ]
    },
    {
        name: "Cassiopeia",
        points: [
            [30, 30, -50], [35, 25, -50], [40, 28, -50],
            [45, 22, -50], [50, 28, -50]
        ]
    },
    {
        name: "Orion's Belt",
        points: [
            [-20, -10, -80], [-15, -8, -80], [-10, -6, -80]
        ]
    },
    {
        name: "Triangulum",
        points: [
            [20, -20, -120], [30, -15, -120], [25, -25, -120], [20, -20, -120]
        ]
    }
];

// Generate random constellations for "infinite" feel
function generateRandomConstellations(count: number, startZ: number, endZ: number) {
    const constellations = [];
    for (let i = 0; i < count; i++) {
        const z = startZ + Math.random() * (endZ - startZ);
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 100;

        const numStars = 3 + Math.floor(Math.random() * 4);
        const points = [];
        let curX = x;
        let curY = y;

        for (let j = 0; j < numStars; j++) {
            points.push([curX, curY, z]);
            curX += (Math.random() - 0.5) * 15;
            curY += (Math.random() - 0.5) * 15;
        }
        constellations.push({ points });
    }
    return constellations;
}

const EXTENDED_CONSTELLATIONS = [
    ...PRESET_CONSTELLATIONS,
    ...generateRandomConstellations(20, -100, -600), // Near
    ...generateRandomConstellations(30, -600, -1500) // Far
];

function ConstellationsGroup() {
    const groupRef = useRef<THREE.Group>(null);
    const [starTexture] = useState(() => createStarTexture());

    useFrame((state) => {
        if (groupRef.current) {
            // Very slow rotation for the whole sky
            groupRef.current.rotation.z = state.clock.elapsedTime * 0.002;
        }
    });

    return (
        <group ref={groupRef}>
            {EXTENDED_CONSTELLATIONS.map((constellation, idx) => (
                <Constellation key={idx} points={constellation.points as number[][]} texture={starTexture} />
            ))}
        </group>
    );
}

function Constellation({ points, texture }: { points: number[][], texture: THREE.Texture }) {
    const vecPoints = useMemo(() => points.map(p => new THREE.Vector3(p[0], p[1], p[2])), [points]);

    return (
        <group>
            {points.map((pos, i) => (
                <StarSprite key={i} position={pos} texture={texture} />
            ))}
            <Line points={vecPoints} color="#ffffff" opacity={0.08} transparent lineWidth={1} />
        </group>
    );
}

function StarSprite({ position, texture }: { position: number[], texture: THREE.Texture }) {
    const spriteRef = useRef<THREE.Sprite>(null);
    const [randomPhase] = useState(() => Math.random() * Math.PI * 2);

    useFrame((state) => {
        if (spriteRef.current) {
            const t = state.clock.elapsedTime;
            // Twinkle effect
            const scale = 0.8 + 0.3 * Math.sin(t * 2 + randomPhase);
            spriteRef.current.scale.set(scale, scale, 1);
            if (spriteRef.current.material) {
                spriteRef.current.material.opacity = 0.5 + 0.4 * Math.sin(t * 3 + randomPhase);
            }
        }
    });

    return (
        <sprite ref={spriteRef} position={new THREE.Vector3(...position)} scale={[1, 1, 1]}>
            <spriteMaterial map={texture} transparent opacity={0.6} depthWrite={false} blending={THREE.AdditiveBlending} />
        </sprite>
    );
}


function InfiniteSpaceDust() {
    const meshRef = useRef<THREE.Points>(null);
    // Balanced star count
    const count = 30000;

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
    }, []);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uCameraZ: { value: 0 },
    }), []);

    const vertexShader = `
        uniform float uTime;
        uniform float uCameraZ;
        attribute vec3 aColor;
        attribute float aPhase;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
            vColor = aColor;
            vec3 pos = position;
            
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
            
            // Static colors
            vec3 colorA = vec3(0.05, 0.0, 0.15); // Deep Purple
            vec3 colorB = vec3(0.0, 0.1, 0.3); // Dark Blue
            
            vec3 finalColor = mix(colorA, colorB, smoothstep(-0.5, 1.0, fog));
            
            float dist = distance(vUv, vec2(0.5));
            float vignette = smoothstep(0.8, 0.2, dist);
            
            gl_FragColor = vec4(finalColor * vignette * 0.5, 1.0);
        }
    `;

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
    }), []);

    useFrame((state) => {
        if (meshRef.current) {
            const mat = meshRef.current.material as THREE.ShaderMaterial;
            mat.uniforms.uTime.value = state.clock.elapsedTime;

            // Keep nebula in background but don't change parameters based on scroll
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

export default function ShaderBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-[#020204]">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                dpr={[1, 2]}
                gl={{ antialias: false, alpha: false }}
            >
                <ScrollDrivenCamera />
                <color attach="background" args={['#020204']} />

                <ReactiveNebula />

                {/* Main stars layer */}
                <InfiniteSpaceDust />

                {/* Constellations layer */}
                <ConstellationsGroup />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/30 via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
