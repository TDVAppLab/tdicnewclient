import { observer } from 'mobx-react-lite';

import { useStore } from "../../../app/stores/store";
import Bool2String from './Bool2String';
import DebugDisplayModelLoadingInfo from './DebugDisplayModelLoadingInfo';
import DebugDisplaySceneInfo from './DebugDisplaySceneInfo';


export default observer( function DebugDisplay() {

    const {articleStore} = useStore();
    const {selectedArticle, loading : isArticleLoading} = articleStore;
    
    const {instructionStore} = useStore();
    const {selectedInstruction,  loading : isInstructionLoading} = instructionStore;


    const {viewStore} = useStore();
    const {selectedView,  loading : ViewLoading} = viewStore;
    


    
    


    return (
        <div>
            <div>article loading : {Bool2String(isArticleLoading)}</div>
            <div>instruction loading : {Bool2String(isInstructionLoading)}</div>
            <div>view loading : {Bool2String(ViewLoading)}</div>



            <div>article id : {selectedArticle?.id_article}</div>
            <div>instruction id : {selectedInstruction?.id_instruct}</div>
            <div>view id : {selectedView?.id_view}</div>

            <hr />

            <DebugDisplaySceneInfo />
            <hr />
            <DebugDisplayModelLoadingInfo />
        </div>
    )
})
