import { useThree } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useStore } from '../../../../../app/stores/store';



export default observer( function UpdateInstanceVisivility()  {
    const { scene } = useThree();
  
    const { instanceobjectStore } = useStore();

    const {instructionStore} = useStore();
    const {selectedInstruction, instanceDisplayRegistry} = instructionStore;

    useEffect(()=>{
    }, [selectedInstruction]);



    Array.from(instanceobjectStore.instanceobjectRegistry.values()).map(inst=> { 

        const temp_inst = scene.children.find(child => child.name === `[${inst.id_instance}]InstanceModel`);

        if(temp_inst) {
            
            if(instanceDisplayRegistry.get(inst.id_instance)?.isDisplay){
                temp_inst.visible=true;
            } else {
                temp_inst.visible=false;
            }
        } 
    });
    
    return (null);
});