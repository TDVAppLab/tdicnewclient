import "./stylesSubtitles.css"

import { observer } from 'mobx-react-lite';

import { useStore } from '../../../../../app/stores/store';


interface Props {
  fontSize: string;
}





export default observer( function DisplayHtmlSubtitles({fontSize}: Props) {
    
    
    const {instructionStore} = useStore();
    const {selectedSubtitles, selectedSubtitleIndex} = instructionStore;




  
  
  return (
        <>
        <div style={{ fontSize: fontSize, position: "absolute", bottom: "0px",  left:"0px", width:"100%"}}
              className={ `html-subtitle` }>                            
            <p>{selectedSubtitles[selectedSubtitleIndex]}</p>
        </div>
        </>
    )
})
