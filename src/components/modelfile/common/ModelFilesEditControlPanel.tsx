import { useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect } from 'react';
import { ACESFilmicToneMapping, Color, LinearEncoding, LinearToneMapping, NoToneMapping, PMREMGenerator, sRGBEncoding } from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

import { useStore } from '../../../app/stores/store';

//https://sbcode.net/react-three-fiber/leva/





interface Props {
  setIsMExecAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}



export default function ModelFilesEditControlPanel({setIsMExecAnimation}: Props){
  
  const { modelfileStore} = useStore();
  const { selectedModelfile } = modelfileStore;


    const { scene, gl } = useThree();
    
    const [Param, set] = useControls(() => ({
        outputEncoding: { value : sRGBEncoding, options: {"sRGB" : sRGBEncoding, "Linear" : LinearEncoding} },
        environment: { options: {None: "None", Neutral : "Neutral"} },        
        toneMapping: { value : NoToneMapping, options: {"None" : NoToneMapping, "Linear" : LinearToneMapping, "ACES Filmic" : ACESFilmicToneMapping} },
        exposure: {value: 0.0, min: -10.0, max: 10, step: 0.1},
        bgcolor: "#ffffff",
        isShowHelpers: false,
        isMExecAnimation: false
      }));


    
      useEffect(()=>{
        set({
          outputEncoding: sRGBEncoding,
          environment: "None",        
          toneMapping: NoToneMapping,
          exposure: 0.0,
          bgcolor: "#ffffff",
          isShowHelpers: false,
          isMExecAnimation: false
        })
  
      }, [selectedModelfile?.id_part])


    
    useEffect(()=>{
      
      gl.outputEncoding = Param.outputEncoding;

    }, [Param.outputEncoding])
    
    useEffect(()=>{
      if(Param.environment==='None'){
        scene.environment = null
      } else {
        scene.environment =  new PMREMGenerator(gl).fromScene( new RoomEnvironment() ).texture
      }
    }, [Param.environment])


    useEffect(()=>{
      gl.toneMapping = Param.toneMapping;
    }, [Param.toneMapping])


    useEffect(()=>{
      gl.toneMappingExposure = Math.pow(2, Param.exposure);
    }, [Param.exposure])


    useEffect(()=>{
      scene.children.filter(x => x.type === "AxesHelper" || x.type === "GridHelper").forEach(element => 
        element.visible = Param.isShowHelpers
      )
    }, [Param.isShowHelpers])

    useEffect(()=>{
      scene.background = new Color(Param.bgcolor);
    }, [Param.bgcolor])

    useEffect(()=>{
      setIsMExecAnimation(Param.isMExecAnimation);
    }, [Param.isMExecAnimation])


  return (
      null
  )
}