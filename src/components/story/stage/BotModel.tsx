"use client";
import type { Ref } from "react";
import type { Group, Material, Mesh } from "three";

interface BotModelProps {
  bodyColor: string;
  lampColor: string;
  eyeMaterial: Material;
  headRef: Ref<Group>;
  eyesRef: Ref<Group>;
  lampRef: Ref<Mesh>;
}

/** The little agent shared by the Celfocus and Critical scenes; its parent animates the refs. */
export default function BotModel({ bodyColor, lampColor, eyeMaterial, headRef, eyesRef, lampRef }: BotModelProps) {
  return (
    <>
      <mesh position={[0, 0.17, 0]}>
        <capsuleGeometry args={[0.13, 0.1, 6, 18]} />
        <meshStandardMaterial color={bodyColor} roughness={0.35} metalness={0.1} />
      </mesh>
      <group position={[0, 0.5, 0]} ref={headRef}>
        <mesh scale={[1.18, 0.92, 1]}>
          <sphereGeometry args={[0.18, 28, 20]} />
          <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.005, 0.1]} scale={[1.05, 0.62, 0.62]}>
          <sphereGeometry args={[0.16, 24, 16]} />
          <meshStandardMaterial color="#0c0e12" roughness={0.15} metalness={0.6} />
        </mesh>
        <group position={[0, 0.005, 0.195]} ref={eyesRef}>
          {[-0.058, 0.058].map((x) => (
            <mesh key={x} position={[x, 0, 0]} material={eyeMaterial}>
              <sphereGeometry args={[0.024, 12, 10]} />
            </mesh>
          ))}
        </group>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.12]} />
          <meshStandardMaterial color={bodyColor} />
        </mesh>
        <mesh position={[0, 0.27, 0]} ref={lampRef}>
          <sphereGeometry args={[0.024, 12, 10]} />
          <meshBasicMaterial color={lampColor} />
        </mesh>
      </group>
    </>
  );
}
