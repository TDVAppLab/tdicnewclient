import { useThree } from '@react-three/fiber';
import { EffectComposer, GodRays } from '@react-three/postprocessing';
import { color } from 'csx';
import type { FC} from 'react';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';



type LightsProps = {
	position: [number, number, number]
    size:number;
}


export const BloomLights: FC<LightsProps> = ({ position, size }) => {
	return (
		<>
			{
			    <PointLight size={size} position={position} />
            }
            {
                <Effects />
            }
		</>
	)
}

type PointLightProps = {
	position: [number, number, number]
    size:number;
}

const PointLight: FC<PointLightProps> = ({ position, size }) => {


	const meshRef = useRef<THREE.Mesh>()
	const { scene } = useThree()

	useEffect(() => {
		if (!scene.userData.refs) scene.userData.refs = {}
		scene.userData.refs.lightMesh = meshRef
	}, [scene.userData])

	useEffect(() => {
		meshRef.current!.lookAt(0, 0, 0)
	}, [])


	return (
		meshRef && <mesh ref={meshRef as React.MutableRefObject<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>} position={position}>
            <sphereGeometry args={[size, 64]} />
			<meshBasicMaterial color={'#b77f37'} side={THREE.DoubleSide} />
			<pointLight
				color={color('#b77f37').lighten(0.5).toHexString()}
				intensity={0}
                decay={0}
                distance={0}
			/>
		</mesh>
	)
}



const datas = {
	enabled: true,
	samples: 200,
	density: 0.96,
	decay:   0.98,
	weight:   0.3,
	exposure: 1,
	clampMax: 1,
	blur: 1,
	kernelSize: 1,
	blendFunction: 16
	}



const Effects: FC = () => {

	const [lightMesh, setLightMesh] = useState<
		React.MutableRefObject<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>
	>()

	const { scene } = useThree()

	useEffect(() => {
		if (scene.userData.refs && scene.userData.refs.lightMesh) {
			const lightMeshRef = scene.userData.refs.lightMesh
			setLightMesh(lightMeshRef)
		}
	}, [scene.userData.refs])


	return (
		<EffectComposer>
			<>{lightMesh && datas.enabled && <GodRays sun={lightMesh.current!} {...datas} 
			//@ts-ignore
			blur={true} />}</>
		</EffectComposer>
	)
}