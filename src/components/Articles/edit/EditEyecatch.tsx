import { observer } from "mobx-react-lite";

import { useStore } from "../../../app/stores/store";


export default observer( function EditEyecatch() {


    
    const {articleStore} = useStore();
    const {sceneInfoStore} = useStore();


    const handleTakeCapture=() => {
        sceneInfoStore.setScreenShotTrigger();
    }

    const handleSubmitCapture=() => {
        sceneInfoStore.createEyeCatch(articleStore?.selectedArticle?.id_article!);
    }

      
    return (
        <>
            <div>
                <img src={sceneInfoStore.screen_shot} width="100%" />
                <button 
                    type = 'submit'
                    className={"btn btn-outline-primary"}
                    onClick={()=>{handleTakeCapture()}} 
                >
                    {"Capture"}
                </button>
                <button 
                    type = 'submit'
                    className={"btn btn-primary"}
                    onClick={()=>{handleSubmitCapture()}} 
                >
                    {"Save"}
                </button>
            </div>
        </>
    )
  
})