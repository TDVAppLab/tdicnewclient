import { useFrame, useThree } from '@react-three/fiber';
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { useStore } from "../../../app/stores/store";

export default observer( function SetScreenObjectInfo() {
    
    const { modelFileEditorStore } = useStore();

    const { scene } = useThree();

    useEffect(()=>{
        scene.children.forEach(element => {
            modelFileEditorStore.setSceneObjects(element.uuid, {uuid : element.uuid, type : element.type, name : element.name, visible : element.visible})            
        })
    }, [scene.children]);
/*
    useFrame(state => {
        scene.children.forEach(element => {
            modelFileEditorStore.setSceneObjects(element.uuid, element.type)            
        })
        console.log(modelFileEditorStore.sceneObjects);
    })*/
  
    return null;
})