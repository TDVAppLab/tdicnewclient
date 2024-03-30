
import { Html, useProgress } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { observer } from 'mobx-react-lite';
import React from 'react';
import type { AnimationClip} from 'three';
import { Quaternion, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { APIURL } from '@/constants';

import { useStore } from '../../../../../app/stores/store';





export default observer( function LoadModels(){
    
    const { instanceobjectStore : {instanceobjectRegistry, setAnimationClips, setModelLoading, setInstanceUuid} } = useStore();

    return (
        <>
        {
        Array.from(instanceobjectRegistry.values()).map(x=>(
            <React.Suspense key={x.id_instance} fallback={<Loader />}>
                <LoadModelSub
                    id_inst={x.id_instance}
                    id_part={x.id_part}
                    pos={new Vector3(x.pos_x, x.pos_y, x.pos_z)}
                    scale={x.scale}
                    quaternion={new Quaternion(x.quaternion_x, x.quaternion_y, x.quaternion_z, x.quaternion_w)}
                    setAnimationClips={setAnimationClips}
                    setModelLoading={setModelLoading}
                    setInstanceUuid={setInstanceUuid}
                />
            </React.Suspense>
        ))
        }
        </>
    )
  }
);

function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}



interface PartProps {
    id_inst: number;
    id_part: string;
    pos:Vector3;
    scale:number;
    quaternion:Quaternion;
    setAnimationClips: (animations : AnimationClip[], id_instance: number) => void;
    setModelLoading: (id_instance : number, state : boolean) => void;
    setInstanceUuid: (id_instance: number, uuid: string) => void;
}

function LoadModelSub({id_inst, id_part, pos, scale, quaternion, setAnimationClips, setModelLoading, setInstanceUuid}: PartProps){

  
    const str_url_partapi = APIURL + `/modelfiles/file/${id_part}`;
    const gltf = useLoader(GLTFLoader, str_url_partapi);
    
    gltf.scene.position.set(pos.x,pos.y,pos.z);
    gltf.scene.scale.set(scale,scale,scale);
    gltf.scene.quaternion.set(0,0,0,1);
    gltf.scene.applyQuaternion(quaternion);

    gltf.scene.name = `[${id_inst}]InstanceModel`;
    setInstanceUuid(id_inst, gltf.scene.uuid);
    
    setAnimationClips(gltf.animations,id_inst);
    
    setModelLoading(id_inst, false);
  
    return (
        <primitive object={gltf.scene} dispose={null} />
    )
  }