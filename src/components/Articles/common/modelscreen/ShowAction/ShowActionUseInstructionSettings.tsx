import { useFrame, useThree } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { Clock, LoopOnce } from 'three';
import { AnimationMixer } from 'three/src/animation/AnimationMixer';

import { useStore } from '../../../../../app/stores/store';


interface Props {
    isActiondisplayMode : boolean;
  }


export default observer( function ShowActionUseInstructionSettings({isActiondisplayMode}: Props)  {
    const { scene } = useThree();

    const {instanceobjectStore} = useStore();
    const {annimationsRegistry, instanceobjectRegistry, getIsAllModelLoading} = instanceobjectStore;

    
    const {instructionStore} = useStore();
    const {instanceActionExecSettingRegistry} = instructionStore;
    

    //const clock = new Clock();
    const clock = useRef<Clock>(new Clock());


    const mixers = useRef<Map<number, AnimationMixer>>(new Map<number, AnimationMixer>());


    useEffect(()=>{
        //const mixers_temp = new Map<number, AnimationMixer>();
        mixers.current.clear();

        instanceobjectRegistry.size>0 && Array.from(instanceobjectRegistry.values()).map(x=>{
            const temp_instance = scene.children.find(child => child.name === `[${x.id_instance}]InstanceModel`);
            if(temp_instance){
                //mixers_temp.set(x.id_instance,new AnimationMixer(temp_instance));
                mixers.current.set(x.id_instance,new AnimationMixer(temp_instance));
            }
        });
        //mixers.current=mixers_temp;

        if(!getIsAllModelLoading() && mixers.current.size!>0 && annimationsRegistry.size>0 && instanceActionExecSettingRegistry.length>0){
            instanceActionExecSettingRegistry.forEach(instanceActionExecSetting=>{
                if(instanceActionExecSetting.id_instance){
                    const annimations = annimationsRegistry?.get(instanceActionExecSetting?.id_instance!);
                    
                    if(annimations){
                        const annimation = annimations[instanceActionExecSetting.no];
                        const mixer = mixers.current.get(instanceActionExecSetting.id_instance);

                        if(annimation && mixer){
                            //mixer.stopAllAction();
                            //mixer.update(0.1);
                            if(instanceActionExecSetting.is_exec) {
                                mixer.clipAction(annimation).setLoop(LoopOnce ,0);
                                mixer.clipAction(annimation).clampWhenFinished=instanceActionExecSetting.is_clamp_when_finished;
                                mixer.clipAction(annimation).play();
                                //mixer.update(clock.getDelta());
                            } else {
                                //mixer.clipAction(annimation).reset();
                                //mixer.clipAction(annimation).play();
                                //mixer.update(0.1);
                                //mixer.clipAction(annimation).stop();
                            }
                            //mixer.update(0.1);
                        }
                    }
                }
            })
        }
        //console.log(mixers_temp);
        //console.log(mixers.current);

    }, [instanceActionExecSettingRegistry, annimationsRegistry]);
    





    useFrame(state => {

        //console.log(mixers.current);
        

        if(!getIsAllModelLoading() && mixers.current.size!>0 && annimationsRegistry.size>0 && instanceActionExecSettingRegistry.length>0){
            instanceActionExecSettingRegistry.forEach(instanceActionExecSetting=>{
                if(instanceActionExecSetting.id_instance){
                    const annimations = annimationsRegistry?.get(instanceActionExecSetting?.id_instance!);
                    
                    if(annimations){
                        const annimation = annimations[instanceActionExecSetting.no];
                        const mixer = mixers.current.get(instanceActionExecSetting.id_instance);

                        if(annimation && mixer){
                            

                            

                            if(instanceActionExecSetting.is_exec) {
                                //mixer.clipAction(annimation).setLoop(LoopOnce ,0);
                                //mixer.clipAction(annimation).clampWhenFinished=instanceActionExecSetting.is_clamp_when_finished;
                                //mixer.clipAction(annimation).play();
                                //mixer.update(clock.getDelta());
                            } else {
                                mixer.clipAction(annimation).reset();
                                mixer.clipAction(annimation).play();
                                //mixer.update(clock.getDelta());
                            }
                            mixer.update(clock.current.getDelta());
                            
                        }
                    }
                }
            })
        }
    })

    return (
        null
    )
})

