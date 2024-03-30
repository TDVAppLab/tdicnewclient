
import { observer } from 'mobx-react-lite';

import type { Light } from '@/app/models/Light';

import { useStore } from '../../../../../app/stores/store';
import { BloomLights } from './BloomLights';



export default observer( function SetLights(){
    
  const { lightStore } = useStore();
  const { lightRegistry } = lightStore;

    return (
        <>
        {
            Array.from(lightRegistry.values()).map(light=>(<SetLight key={light.id_light} light={light} />))
        }
        </>
    )
  }
);


interface Props {
    light:Light;
}

const SetLight  = ({light}: Props) => {

  
    if(light.light_type==='DirectionalLight'){
        return (
            <directionalLight intensity={light.intensity} position={[light.px, light.py, light.pz]} />
        )
    }else if(light.light_type==='AmbientLight'){
        return (
            <ambientLight intensity={light.intensity*0.3} />
        )
    }else if(light.light_type==='PointLight'){

        return <BloomLights size={light.lfsize*3} position={ [light.px, light.py, light.pz] }/>;
    }

    return (
        null
    )
}




