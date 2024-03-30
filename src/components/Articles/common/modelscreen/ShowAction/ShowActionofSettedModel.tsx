import { useFrame, useThree } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import { Clock } from 'three';
import { AnimationMixer } from 'three/src/animation/AnimationMixer';

import { useStore } from '../../../../../app/stores/store';


interface Props {
    isActiondisplayMode : boolean;
  }


export default observer( function ShowActionofSettedModel({isActiondisplayMode}: Props)  {
    const { scene } = useThree();

    const {instanceobjectStore} = useStore();
    const {annimationsRegistry, instanceobjectRegistry} = instanceobjectStore;

    const {instructionStore} = useStore();
    const {selectedInstruction} = instructionStore;


    
    //const mixers = new Map<number, AnimationMixer>();

    //let clock = new Clock();


    
    const clock = useRef<Clock>(new Clock());


    const mixers = useRef<Map<number, AnimationMixer>>(new Map<number, AnimationMixer>());
    
    useEffect(()=>{

        mixers.current.clear();

        
        instanceobjectRegistry.forEach(instanceobject=>{
            const temp_instance = scene.children.find(child => child.name === `[${instanceobject.id_instance}]InstanceModel`);
            if(temp_instance){
                mixers.current.set(instanceobject.id_instance,new AnimationMixer(temp_instance))
                //console.log("mixers"); 
            }
        });


        //console.log(mixers); 


        

        if(annimationsRegistry){

            mixers.current.forEach((mixer,i)=>{

                annimationsRegistry?.get(i)?.forEach(clip => 
                {
                    const action = mixer.clipAction(clip);
                    action.reset();
                    action.play();
                })
            })

        }        

    }, [instanceobjectRegistry, annimationsRegistry, selectedInstruction]);



  
    useFrame(state => {
        //if(isActiondisplayMode){

            mixers.current.forEach(mixer => {if(mixer){
                mixer.update(clock.current.getDelta());
                console.log("loop-d"); 

            }
        //}
        })
    })

  return (
      null
  )
})

