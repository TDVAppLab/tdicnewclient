import { useThree } from '@react-three/fiber';
import { button, folder, useControls } from 'leva';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ACESFilmicToneMapping, Color, LinearEncoding, LinearToneMapping, NoToneMapping, PMREMGenerator, sRGBEncoding } from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

import { useStore } from '../../../../app/stores/store';

//https://sbcode.net/react-three-fiber/leva/







export default observer( function ModelScreenControlPanel(){
  
  const { articleStore } = useStore();
  const { selectedArticle } = articleStore;


    const { scene, gl } = useThree();
    
    const [Param, set] = useControls(() => ({
      Encoding: folder({
          outputEncoding: { value : LinearEncoding, options: {"sRGB" : sRGBEncoding, "Linear" : LinearEncoding} },
          environment: { value : "None", options: {None: "None", Neutral : "Neutral"} },        
          toneMapping: { value : NoToneMapping, options: {"None" : NoToneMapping, "Linear" : LinearToneMapping, "ACES Filmic" : ACESFilmicToneMapping} },
          exposure: {value: 0.0, min: -10.0, max: 10, step: 0.1},
          bgcolor: "#ffffff",
          button: button((get) => handleUpdateArticleScreenInfo(get)),
        })
      }));


    
    useEffect(()=>{
      set({
        outputEncoding: selectedArticle?.outputEncoding ? selectedArticle.outputEncoding : LinearEncoding,
        environment: selectedArticle?.environment ? selectedArticle.environment : "None",        
        toneMapping: selectedArticle?.toneMapping ? selectedArticle.toneMapping : NoToneMapping,
        exposure:  selectedArticle?.exposure ? selectedArticle.exposure : 0.0,
        bgcolor: selectedArticle?.bg_color ? selectedArticle.bg_color : "#ffffff",
      })

    }, [selectedArticle]) 


    useEffect(()=>{
    
      gl.outputEncoding = Param.outputEncoding;

    }, [Param.outputEncoding])
    

    async function handleUpdateArticleScreenInfo(get : any) {
      //console.log(selectedArticle?.id_article);

      if(selectedArticle?.id_article) {
        await articleStore.updateArticleScreenInfo({
          id_article: selectedArticle.id_article,
          bg_color: get('Encoding.bgcolor'),
          outputEncoding: get('Encoding.outputEncoding'),
          toneMapping: get('Encoding.toneMapping'),
          exposure: get('Encoding.exposure'),
          environment: get('Encoding.environment')
        })
      }
      
    }





    useEffect(()=>{
      
      gl.outputEncoding = Param.outputEncoding;

    }, [Param.outputEncoding])
    
    useEffect(()=>{
      if(Param.environment==='Neutral'){
        scene.environment =  new PMREMGenerator(gl).fromScene( new RoomEnvironment() ).texture
      } else {
        scene.environment = null
      }
    }, [Param.environment])


    useEffect(()=>{
      gl.toneMapping = Param.toneMapping;
    }, [Param.toneMapping])


    useEffect(()=>{
      gl.toneMappingExposure = Math.pow(2, Param.exposure);
    }, [Param.exposure])

    useEffect(()=>{
      scene.background = new Color(Param.bgcolor);
    }, [Param.bgcolor])


  return (
      null
  )
})