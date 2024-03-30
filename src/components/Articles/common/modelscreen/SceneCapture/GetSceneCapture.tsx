import { useThree } from '@react-three/fiber';
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { useStore } from "../../../../../app/stores/store";

export default observer( function GetSceneCapture() {
    
    const {sceneInfoStore} = useStore(); 

    useEffect(()=> {
    }, [sceneInfoStore.screen_shot_trigger])



    const { gl } = useThree();
    const camera = useThree((state) => state.camera);
    const { scene } = useThree();

    
    const strMime = "image/jpeg";

    if(gl){
        gl.render(scene, camera);
        const imgData = gl.domElement.toDataURL(strMime);
        sceneInfoStore.setScreenShot(imgData);
        return null;
    
    }
    return null;
})