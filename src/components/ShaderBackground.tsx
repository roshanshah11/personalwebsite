"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

// Generate a soft glow texture
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

function Constellations() {
    // Big Dipper Coordinates (roughly normalized)
    const bigDipper = [
        [-50, 20, -20], // Dubhe
        [-45, 15, -20], // Merak
        [-40, 18, -20], // Phecda
        [-32, 16, -20], // Megrez
        [-25, 18, -20], // Alioth
        [-20, 20, -20], // Mizar
        [-15, 23, -20], // Alkaid
    ] as const;



    // Cassiopeia "W"
    const cassiopeia = [
        [30, 30, -20],
        [35, 25, -20],
        [40, 28, -20],
        [45, 22, -20],
        [50, 28, -20],
    ] as const;

    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Slow rotation to simulate sky movement
            groupRef.current.rotation.z = state.clock.elapsedTime * 0.02;
        }
    });

    const [starTexture] = useState(() => createStarTexture());

    const Star = ({ position }: { position: readonly [number, number, number] }) => {
        const spriteRef = useRef<THREE.Sprite>(null);

        // Random initial phase for twinkling
        const [randomPhase] = useState(() => Math.random() * Math.PI * 2);

        useFrame((state) => {
            if (spriteRef.current) {
                // Twinkle effect: oscillate scale slightly
                const t = state.clock.elapsedTime;
                const scale = 0.8 + 0.4 * Math.sin(t * 3 + randomPhase);
                spriteRef.current.scale.set(scale, scale, 1);

                // Also modulate opacity
                if (spriteRef.current.material) {
                    spriteRef.current.material.opacity = 0.6 + 0.4 * Math.sin(t * 2 + randomPhase);
                }
            }
        });

        return (
            <sprite ref={spriteRef} position={new THREE.Vector3(...position)} scale={[1, 1, 1]}>
                <spriteMaterial map={starTexture} transparent opacity={0.8} depthWrite={false} blending={THREE.AdditiveBlending} />
            </sprite>
        );
    };

    return (
        <group ref={groupRef}>
            {/* Big Dipper */}
            <group>
                {bigDipper.map((pos, i) => (
                    <Star key={`bd-${i}`} position={pos} />
                ))}
                <Line
                    points={bigDipper.map(p => new THREE.Vector3(...p))}
                    color="#ffffff"
                    opacity={0.08} // Much more subtle lines
                    transparent
                    lineWidth={1}
                />
            </group>

            {/* Cassiopeia */}
            <group>
                {cassiopeia.map((pos, i) => (
                    <Star key={`c-${i}`} position={pos} />
                ))}
                <Line
                    points={cassiopeia.map(p => new THREE.Vector3(...p))}
                    color="#ffffff"
                    opacity={0.08} // Much more subtle
                    transparent
                    lineWidth={1}
                />
            </group>
        </group>
    );
}

const yRange = 80.0;
const yOffset = yRange / 2.0;

function RainParticles() {
    const meshRef = useRef<THREE.Points>(null);
    const count = 12000; // Increased significantly for "more"



    // Initialize particle positions and speeds
    const [[positions, speeds, opacities]] = useState(() => {
        const positions = new Float32Array(count * 3);
        const speeds = new Float32Array(count);
        const opacities = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            // Wider spread in X and Z to ensure coverage at all angles/scrolls
            positions[i * 3] = (Math.random() - 0.5) * 100;     // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * yRange; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 40; // z - Depth

            // Start brightness
            opacities[i] = Math.random();

            // Varied opacity for depth perception
            opacities[i] = 0.5 + Math.random() * 0.5;
        }
        return [positions, speeds, opacities];
    });

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uScrollY: { value: 0 },
            uColor: { value: new THREE.Color("#00D9FF") },
            uYRange: { value: yRange },
            uYOffset: { value: yOffset },
        }),
        []
    );

    const vertexShader = `
    uniform float uTime;
    uniform float uScrollY;
    uniform float uYRange;
    uniform float uYOffset;
    
    attribute float aSpeed; // We will use this as a random seed for twinkling
    attribute float aOpacity;
    
    varying float vOpacity;

    void main() {
      vec3 pos = position;
      
      // STATIONARY LOGIC:
      // No falling, no scrolling (or maybe subtle parallax?)
      // Let's keep them fixed in world space.
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      
      gl_Position = projectionMatrix * mvPosition;
      
      // TWINKLE LOGIC:
      // Use time and aSpeed (random) to create a unique twinkle for each star
      // sin(time * speed + offset)
      // We map the sin wave (-1 to 1) to a brightness factor (e.g., 0.3 to 1.0)
      
      float twinkleSpeed = 2.0; 
      float twinklePhase = aSpeed * 10.0; // Use speed as random phase
      float twinkle = sin(uTime * twinkleSpeed + twinklePhase);
      
      // Remap -1..1 to 0.4..1.0
      float brightness = 0.7 + 0.3 * twinkle;
      
      vOpacity = aOpacity * brightness;
      
      // Size attenuation
      gl_PointSize = (150.0 / -mvPosition.z) * 0.6; 
    }
  `;

    const fragmentShader = `
    uniform vec3 uColor;
    varying float vOpacity;

    void main() {
      // Soft drift/round shape
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      
      // Soft glow
      float glow = 1.0 - (dist * 2.0);
      glow = pow(glow, 1.5);
      
      gl_FragColor = vec4(uColor, vOpacity * glow);
    }
  `;

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.elapsedTime;
            material.uniforms.uScrollY.value = window.scrollY;
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
                    attach="attributes-aSpeed"
                    count={count}
                    array={speeds}
                    itemSize={1}
                    args={[speeds, 1]}
                />
                <bufferAttribute
                    attach="attributes-aOpacity"
                    count={count}
                    array={opacities}
                    itemSize={1}
                    args={[opacities, 1]}
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

export default function ShaderBackground() {
    return (
        <div className="fixed inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 20], fov: 60 }} // Moved camera back slightly
                style={{ background: "#050508" }}
                dpr={[1, 2]} // Support high DPI
                gl={{ antialias: false, alpha: false }} // Performance settings
            >
                <RainParticles />
                <Constellations />
            </Canvas>
            {/* Dark overlay to ensure content readability */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        </div>
    );
}
