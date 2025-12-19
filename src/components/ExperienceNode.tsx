"use client";

import { useRef, useState, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ExperienceNodeProps {
    position: [number, number, number];
    experience: any;
    onClick: (exp: any) => void;
    isActive: boolean;
    modelPath: string;
    modelScale?: number;
}

function PlanetModel({ modelPath, hovered, baseScale = 1 }: { modelPath: string; hovered: boolean; baseScale?: number }) {
    const { scene } = useGLTF(modelPath);
    const modelRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (modelRef.current) {
            // Slow rotation
            modelRef.current.rotation.y += delta * 0.2;
        }
    });

    const scale = baseScale * (hovered ? 1.2 : 1);

    return (
        <primitive
            ref={modelRef}
            object={scene.clone()}
            scale={scale}
        />
    );
}

export default function ExperienceNode({ position, experience, onClick, isActive, modelPath, modelScale = 1 }: ExperienceNodeProps) {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    // Animate scale on hover
    useFrame((state, delta) => {
        if (groupRef.current) {
            const targetScale = hovered ? 1.2 : 1;
            groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
        }
    });

    return (
        <group ref={groupRef} position={position}>
            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
                {/* Planet Model */}
                <group
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick(experience);
                    }}
                    onPointerOver={() => {
                        document.body.style.cursor = "pointer";
                        setHovered(true);
                    }}
                    onPointerOut={() => {
                        document.body.style.cursor = "auto";
                        setHovered(false);
                    }}
                >
                    <Suspense fallback={
                        <mesh>
                            <sphereGeometry args={[0.5, 16, 16]} />
                            <meshStandardMaterial color="#333" />
                        </mesh>
                    }>
                        <PlanetModel modelPath={modelPath} hovered={hovered} baseScale={modelScale} />
                    </Suspense>
                </group>

                {/* Ring Effect on Hover */}
                {hovered && (
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[1.2, 1.3, 32]} />
                        <meshBasicMaterial color="#fbbf24" transparent opacity={0.6} side={THREE.DoubleSide} />
                    </mesh>
                )}

                {/* Text Label */}
                <group position={[2, 0.5, 0]}>
                    <Text
                        color="white"
                        anchorX="left"
                        anchorY="middle"
                        fontSize={0.35}
                    >
                        {experience.company}
                    </Text>
                    <Text
                        position={[0, -0.35, 0]}
                        color="#94a3b8"
                        anchorX="left"
                        anchorY="middle"
                        fontSize={0.2}
                    >
                        {experience.role}
                    </Text>
                    <Text
                        position={[0, -0.6, 0]}
                        color="#fbbf24"
                        anchorX="left"
                        anchorY="middle"
                        fontSize={0.15}
                    >
                        {experience.date}
                    </Text>
                </group>
            </Float>
        </group>
    );
}

// Preload all planet models
useGLTF.preload('/earth.glb');
useGLTF.preload('/venus.glb');
useGLTF.preload('/planet_mars_-_nasa_mars_landing_2021.glb');
useGLTF.preload('/giove_jupiter.glb');
useGLTF.preload('/neptune.glb');
useGLTF.preload('/uranus.glb');
