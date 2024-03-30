import { useFrame, useThree } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import { Vector3 } from 'three';

import type { View } from '@/app/models/view';

import { useStore } from '../../../../../app/stores/store';


// ref https://codesandbox.io/s/draggable-mesh-rgn91?file=/src/App.tsx:900-940
//https://qiita.com/nemutas/items/c49728da8641ee28fd2e
//https://codesandbox.io/embed/react-three-fiber-suspense-zu2wo


interface Props{
  view: View;
  isModeTransport : boolean;
  step : number;
}


export default observer( function UpdateCameraWork({view, isModeTransport, step}: Props)  {
  const camera = useThree((state) => state.camera);
  const { scene } = useThree();
  const orbitControls = ((scene as any).orbitControls as any);

  
  const { sceneInfoStore } = useStore();
  

  let count=0;

  const pitch_camerapos = new Vector3((view.cam_pos_x - camera.position.x) / step, (view.cam_pos_y - camera.position.y) / step, (view.cam_pos_z - camera.position.z) / step);
  const pitch_target = new Vector3();

  if(orbitControls){
    pitch_target.set((view.obt_target_x - orbitControls.target.x) / step, (view.obt_target_y - orbitControls.target.y) / step, (view.obt_target_z - orbitControls.target.z) / step);
  }
  
  useFrame(state => {
    if(isModeTransport){
      if(count<step){
        camera.position.add(pitch_camerapos);
        if(orbitControls){
          orbitControls.target.add(pitch_target);
        }
        count+=1;
      }else{
        sceneInfoStore.setModeTransport(false);
      }
    }

    })

  return (null);
});



//export default UpdateCameraWork;