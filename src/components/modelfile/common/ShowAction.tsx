import { useFrame, useThree } from '@react-three/fiber';
import type { AnimationClip} from 'three';
import { Clock, LoopPingPong } from 'three';
import { AnimationMixer } from 'three/src/animation/AnimationMixer';


interface Props {
    animations: AnimationClip[];
    modelUuid: string;
    is_exec_animation:boolean;
  }

export default function ShowAction({animations, modelUuid, is_exec_animation}: Props){
    const { scene } = useThree();

    const model = scene.children.find(child => child.uuid === modelUuid);
  
    const mixer = new AnimationMixer(model!);

    let clock = new Clock();

    animations.forEach(clip => {
        const action = mixer.clipAction(clip);
        action.reset();
        action.setLoop(LoopPingPong,Infinity);
        action.play();
    })
  
    useFrame(state => {
        if(is_exec_animation){
            mixer.update(clock.getDelta());
        }
    })

  return (
      null
  )
}
