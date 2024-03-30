import { Html, useProgress } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import React, { useEffect } from 'react';
import type { AnimationClip } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { APIURL } from '@/constants';




function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}




interface Props {
  id_part: string;
  setTeststring: React.Dispatch<React.SetStateAction<AnimationClip[]>>;
  setModelUuid: React.Dispatch<React.SetStateAction<string>>;
}

const UseModel  = ({id_part, setTeststring, setModelUuid}: Props) => {
  return (
      <React.Suspense fallback={<Loader />}>
          <LoadModel id_part={id_part} setTeststring={setTeststring}  setModelUuid = {setModelUuid}/>
      </React.Suspense>
  )
}


const LoadModel  = ({id_part, setTeststring, setModelUuid}: Props) => {

  const str_url_partapi = APIURL + `/modelfiles/file/${id_part}`
  const gltf = useLoader(GLTFLoader, str_url_partapi);


  useEffect(() => {
//    console.log(gltf.animations);
    setTeststring(gltf.animations);
    setModelUuid(gltf.scene.uuid);
    }, [id_part]);

  return (
      <primitive object={gltf.scene} dispose={null} />
  )
}


export default function ModelfileViewer({id_part, setTeststring, setModelUuid}: Props){

  return (
    <UseModel id_part={id_part} setTeststring={setTeststring} setModelUuid = {setModelUuid}/> 
  );
};