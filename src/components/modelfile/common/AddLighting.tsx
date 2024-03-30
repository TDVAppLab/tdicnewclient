import { useHelper } from '@react-three/drei';
import { useControls } from 'leva';
import { useEffect, useRef } from 'react';
import { DirectionalLightHelper } from 'three';




export default function AddLighting () {


    
    const dirLight = useRef<THREE.DirectionalLight>(null!);
    const helperDirectionalLight = useHelper(dirLight, DirectionalLightHelper, 1, "red");



    const directonalLightdatas = useControls('Directonal Light', {
        intensity: {
            value: 1.0,
            min: 0.0,
            max: 3,
            step: 0.1
        },
        position: { x: 0, y: 2, z: 2 },
        isShowHelper: false,
    })

    const ambientLightdatas = useControls('Ambient Light', {
        intensity: {
            value: 1.0,
            min: 0.0,
            max: 3,
            step: 0.1
        },
    })

    useEffect(()=>{
        if(helperDirectionalLight.current){
            helperDirectionalLight.current.visible=directonalLightdatas.isShowHelper;
        }
    }, [directonalLightdatas.isShowHelper]);

    return (
        <>
            <directionalLight intensity={directonalLightdatas.intensity} position={[directonalLightdatas.position.x,directonalLightdatas.position.y,directonalLightdatas.position.z]} 
            ref={dirLight}/>
            <ambientLight intensity={ambientLightdatas.intensity} />
        </>
    )
}