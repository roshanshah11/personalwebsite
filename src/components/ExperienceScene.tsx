"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import ExperienceNode from "./ExperienceNode";
import { Stars, Environment, Text } from "@react-three/drei";

interface Experience {
    id: number;
    company: string;
    role: string;
    date: string;
    shortDescription: string;
    fullDescription: string;
    metrics: { label: string; value: string; subtext?: string }[];
    techStack?: string;
    logo?: string;
}

interface ExperienceSceneProps {
    experiences: Experience[];
    onSelect: (exp: Experience) => void;
    scrollProgress: number; // Passed in from parent
}

export default function ExperienceScene({ experiences, onSelect, scrollProgress }: ExperienceSceneProps) {
    // Create a curved path for the camera to follow
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 10), // Start closer
            new THREE.Vector3(0, 0, -5), // Node 1 Area
            new THREE.Vector3(-4, 2, -20), // Node 2 - Wide Left
            new THREE.Vector3(3, -1, -28), // Slow down approach to Node 3
            new THREE.Vector3(6, -2, -45), // Node 3 - Wide Right (Moved back further)
            new THREE.Vector3(-3, 1, -50), // Node 4 - Left
            new THREE.Vector3(0, 0, -65),  // Exit
        ], false, "catmullrom", 0.5); // Tension 0.5 is good for smooth curves
    }, []);

    // Create points for the visual line
    const linePoints = useMemo(() => curve.getPoints(100), [curve]);

    useFrame((state) => {
        // Use the scroll progress passed from parent 
        const t = Math.max(0, Math.min(1, scrollProgress)) * 0.95;

        const point = curve.getPoint(t);
        // Look ahead substantially further to "anticipate" turns (car headlights effect)
        let lookAtPoint = curve.getPoint(Math.min(0.99, t + 0.25));

        // At the very end, force look at the "Projects" sign at [0, 0, -70]
        const endBlend = Math.max(0, (t - 0.85) / 0.1); // 0 at t=0.85, 1 at t=0.95
        if (endBlend > 0) {
            const finalSignPos = new THREE.Vector3(0, 0, -70);
            // Smoothly transition focus to the sign
            lookAtPoint.lerp(finalSignPos, endBlend);
        }

        // Smoothly interpolate camera position
        state.camera.position.lerp(point, 0.05);

        // Create target quaternion
        const targetMatrix = new THREE.Matrix4().lookAt(
            state.camera.position,
            lookAtPoint,
            new THREE.Vector3(0, 1, 0)
        );
        const targetQuat = new THREE.Quaternion().setFromRotationMatrix(targetMatrix);

        // At the very end, force camera to be perfectly level
        if (endBlend > 0.5) {
            // Force a completely flat view matrix (no roll)
            const flatLookAt = new THREE.Vector3(0, 0, -70);
            const flatMatrix = new THREE.Matrix4().lookAt(
                state.camera.position,
                flatLookAt,
                new THREE.Vector3(0, 1, 0)
            );
            const flatQuat = new THREE.Quaternion().setFromRotationMatrix(flatMatrix);
            targetQuat.slerp(flatQuat, (endBlend - 0.5) * 2);
        }

        state.camera.quaternion.slerp(targetQuat, 0.1);
    });

    return (
        <>
            <color attach="background" args={["#000000"]} />

            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            {/* Background Stars */}
            <Stars radius={200} depth={100} count={8000} factor={6} saturation={0} fade speed={0.5} />

            {/* The Path Line (Visual) */}
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[new Float32Array(linePoints.flatMap(p => [p.x, p.y, p.z])), 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#444" transparent opacity={0.15} />
            </line>

            {/* Render Nodes along the path */}
            {/* Planet models for each experience */}
            {experiences.map((exp, i) => {
                // Planet model paths (one for each experience)
                const planetModels = [
                    '/uranus.glb',  // Replaced Earth (wasn't loading)
                    '/venus.glb',
                    '/planet_mars_-_nasa_mars_landing_2021.glb',
                    '/giove_jupiter.glb',
                    '/neptune.glb',
                ];

                // Scale for each planet (adjust as needed)
                // NOTE: Node 1 (uranus.glb) and Node 4 (giove_jupiter.glb) NOT LOADING
                const planetScales = [
                    0.5,   // Node 1: Uranus - NOT LOADING
                    0.8,   // Node 2: Venus - BIGGER
                    0.7,   // Node 3: Mars - BIGGER
                    0.3,   // Node 4: Jupiter - NOT LOADING
                    0.15,  // Node 5: Neptune
                ];

                // Manually positioned "stops" relative to our curve points
                const tValues = [0.15, 0.35, 0.55, 0.75, 0.9];
                const t = tValues[i] || 0.1 + (i * 0.2);

                const position = curve.getPoint(t);
                const tangent = curve.getTangent(t);

                // Calculate side vector using cross product with Up vector (0,1,0)
                const up = new THREE.Vector3(0, 1, 0);
                const sideVector = new THREE.Vector3().crossVectors(tangent, up).normalize();

                // Flip side for alternating nodes
                if (i % 2 !== 0) sideVector.negate();

                // Push out by 4 units along the side vector
                const nodePos = position.clone().add(sideVector.multiplyScalar(4));

                // Add some vertical variation
                nodePos.y += (i % 2 === 0 ? 1 : -1);

                return (
                    <ExperienceNode
                        key={exp.id}
                        position={[nodePos.x, nodePos.y, nodePos.z]}
                        experience={exp}
                        onClick={onSelect}
                        isActive={false}
                        modelPath={planetModels[i] || '/earth.glb'}
                        modelScale={planetScales[i] || 0.5}
                    />
                )
            })}

            {/* End Sign - Star Wars Style */}
            <group position={[0, 0, -70]}>
                <Text
                    color="#EBD71C"
                    fontSize={1.2}
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0.05}
                    font="/fonts/Starjedi.ttf"
                >
                    SCRoLL FoR PRoJECTS
                </Text>
                <Text
                    position={[0, -1.5, 0]}
                    color="#4ee"
                    fontSize={0.4}
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/Starjedi.ttf"
                >
                    keep going
                </Text>
            </group>
        </>
    );
}
