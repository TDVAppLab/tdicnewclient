import { useFrame, useThree } from '@react-three/fiber';
import { observer } from "mobx-react-lite";

import { useStore } from "../../../../app/stores/store";

export default observer( function SceneInfoCatcher() {
    
    const {sceneInfoStore} = useStore();

    const camera = useThree((state) => state.camera);
    const { scene } = useThree();
    const orbitControls = ((scene as any).orbitControls as any); 

    useFrame(state => {
        if(orbitControls){
            sceneInfoStore.setOrbitTarget(orbitControls.target);
        }
        if(camera){
            sceneInfoStore.setCamarePos(camera.position);
            sceneInfoStore.setCamareQuaternion(camera.quaternion);
            
        }
      })
  
    return null;
})