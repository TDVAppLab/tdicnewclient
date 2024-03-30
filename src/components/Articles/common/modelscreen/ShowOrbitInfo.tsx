import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";





const ShowOrbitInfo = () => {
    const ref = useRef<THREE.AxesHelper>(null!);
    const { scene } = useThree();
    const orbitControls = ((scene as any).orbitControls as any);

    
    useFrame((state) => {            
        if(orbitControls){
            ref.current.position.set(orbitControls.target.x, orbitControls.target.y, orbitControls.target.z);
        } else {
            ref.current.position.set(0,0,0);
        }
    });

    return (
        <axesHelper ref={ref} args={[1]}  />
    );
    
  };

  export default ShowOrbitInfo;