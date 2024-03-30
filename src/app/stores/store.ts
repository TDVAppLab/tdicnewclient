import { createContext, useContext } from "react";

import AnnotationDisplayStore from "./AnnotationDisplayStore";
import AnnotationStore from "./AnnotationStore";
import ArticleStore from "./articleStore";
import AttachmentfileStore from "./attachmentfileStore";
import CommonStore from "./commonStore";
import InstanceobjectStore from "./InstanceobjectStore";
import InstructionStore from "./instructionStore";
import LightStore from "./LightStore";
import MArticleStatusStore from "./MArticleStatusStore";
import ModalStore from "./modalStore";
import ModelFileEditorStore from "./ModelFileEditorStore";
import ModelfileStore from "./ModelfileStore";
import SceneInfoStore from "./SceneInfoStore";
import SiteAnalyticsStore from "./SiteAnalyticsStore";
import UserStore from "./userStore";
import ViewStore from "./viewStore";

interface Store{
    modelfileStore:ModelfileStore;
    articleStore: ArticleStore;
    instructionStore:InstructionStore;
    attachmentfileStore: AttachmentfileStore;
    viewStore:ViewStore;
    annotationStore:AnnotationStore;
    annotationDisplayStore:AnnotationDisplayStore;
    lightStore:LightStore;
    instanceobjectStore:InstanceobjectStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    mArticleStatusStore:MArticleStatusStore;
    sceneInfoStore:SceneInfoStore;
    siteAnalyticsStore:SiteAnalyticsStore;
    modelFileEditorStore:ModelFileEditorStore;
}

export const store: Store={
    articleStore: new ArticleStore(),
    modelfileStore: new ModelfileStore(),
    instructionStore: new InstructionStore(),
    attachmentfileStore: new AttachmentfileStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    viewStore: new ViewStore(),
    annotationStore: new AnnotationStore(),
    annotationDisplayStore: new AnnotationDisplayStore(),
    lightStore: new LightStore(),
    instanceobjectStore: new InstanceobjectStore(),
    mArticleStatusStore: new MArticleStatusStore(),
    sceneInfoStore: new SceneInfoStore(),
    siteAnalyticsStore: new SiteAnalyticsStore(),
    modelFileEditorStore: new ModelFileEditorStore(),
    
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}