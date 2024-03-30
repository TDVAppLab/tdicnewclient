import { OrbitControls } from "@react-three/drei"
import { Canvas, Props } from "@react-three/fiber"
import type { Dispatch, SetStateAction } from "react"
import type { AnimationClip} from "three";
import { Color, NoToneMapping, sRGBEncoding } from "three"

import TestLighting from '@/components/modelfile/common/AddLighting'
import ControlPanel from '@/components/modelfile/common/ModelFilesEditControlPanel'

import ModelfileViewer from "../common/ModelfileViewer"
import SetScreenObjectInfo from "../common/SetScreenObjectInfo"
import ShowAction from "../common/ShowAction"




interface ModelfileEditCanvasProps {
    id: string
    modelUuid: string
    animations: AnimationClip[]
    setAnimations: Dispatch<SetStateAction<AnimationClip[]>>
    setModelUuid:  Dispatch<SetStateAction<string>>
    isMExecAnimation: boolean
    setIsMExecAnimation:  Dispatch<SetStateAction<boolean>>
  }



export default function ModelfileEditCanvas({ id, modelUuid, animations, setAnimations, setModelUuid, isMExecAnimation, setIsMExecAnimation}:ModelfileEditCanvasProps)  {


        
  return (
            <Canvas
              gl={{
                antialias: true,
                outputEncoding: sRGBEncoding,
                toneMapping: NoToneMapping,
              }}
              onCreated={({ gl, scene }) => {
                gl.toneMappingExposure = Math.pow(2, 0)
                scene.environment = null
                scene.background = new Color('#ffffff')
              }}
              //linear={isliner}
              //flat={true}
              camera={{ fov: 45, position: [3, 3, 3] }}
            >
              <ModelfileViewer
                id_part={id}
                setTeststring={setAnimations}
                setModelUuid={setModelUuid}
              />
              <OrbitControls target={[0, 0, 0]} makeDefault />
              <axesHelper args={[2]} />
              <gridHelper args={[2]} />
              {
                <ShowAction modelUuid={modelUuid} animations = {animations} is_exec_animation={isMExecAnimation}/>
              }
              {<ControlPanel setIsMExecAnimation={setIsMExecAnimation} />}
              <TestLighting />
              <SetScreenObjectInfo />
            </Canvas>

  )
}