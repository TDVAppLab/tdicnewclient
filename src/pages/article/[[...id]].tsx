import { observer } from "mobx-react-lite";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";

import GoogleAd from "@/app/common/utils/GoogleAd";
import { useStore } from "@/app/stores/store";
import DebugDisplay from "@/components/Articles/common/DebugDisplay";
import MaterialDisplay from "@/components/Articles/common/MaterialDisplay";
import InstructionSelector from "@/components/Articles/details/InstructionSelector";
import PanelInstruction from "@/components/Articles/details/PanelInstruction";
import LoadingComponent from "@/components/layout/LoadingComponents";




const ModelScreen = dynamic(() => import('@/components/Articles/common/modelscreen/ModelScreen'), {
    ssr: false,
  })

export default observer( function ArticleDetails() {

    

    
  const router = useRouter()
  const { id } = router.query

    const {siteAnalyticsStore} = useStore();
    
    const {userStore: {user}} = useStore();

    const {articleStore} = useStore();
    const {selectedArticle : article, loadArticle, loading : isArticleLoading} = articleStore;
    
    const {instructionStore} = useStore();
    const {loadInstructions, selectedInstruction, loading : isInstructionLoading} = instructionStore;


    const {instanceobjectStore} = useStore();
    const {loadInstanceobjects, loading : isInstanceobjectLoading} = instanceobjectStore;
    
    const {viewStore} = useStore();
    const {loadViews, setselectedView, loading : isViewLoading} = viewStore;
    
    const {annotationStore} = useStore();
    const {loadAnnotations, loading : isAnnotationLoading} = annotationStore;
    
    const {annotationDisplayStore} = useStore();
    const {loadAnnotationDisplays, setSelectedAnnotationDisplayMap, loading : isAnnotationDisplayLoading} = annotationDisplayStore;
    
    const {lightStore} = useStore();
    const {loadLights, loading : isLightLoading} = lightStore;
    
    const {sceneInfoStore} = useStore();
        
    const [isDataLoading, setIsDataLoading]= useState<boolean>(true);
    
    

    useEffect(() => {

        setIsDataLoading(
               article?.id_article !== (id ? id[0] : '')
            || isArticleLoading 
            || isInstructionLoading
            || isViewLoading 
            || isInstanceobjectLoading 
            || isLightLoading 
            || isAnnotationLoading 
            || isAnnotationDisplayLoading
            );
        
    },[isArticleLoading, isInstructionLoading, isViewLoading, isInstanceobjectLoading, isLightLoading, isAnnotationLoading, isAnnotationDisplayLoading])


    useEffect(()=> {
        selectedInstruction && setselectedView(selectedInstruction.id_view);
        selectedInstruction && setSelectedAnnotationDisplayMap(selectedInstruction.id_instruct);

    }, [selectedInstruction])

    useEffect(()=> {

        if(!isInstructionLoading && !isViewLoading)  {
        selectedInstruction && setselectedView(selectedInstruction.id_view);
        }
        
    }, [isInstructionLoading,isViewLoading])
    

    useEffect(()=> {

        if(id) {
            loadArticle(id[0]);
            loadInstanceobjects(id[0]);
            loadInstructions(id[0]);
            loadViews(id[0]);
            loadAnnotations(id[0]);
            loadLights(id[0]);
            loadAnnotationDisplays(id[0]);
        }

    }, [id])



    if(isDataLoading) return (<LoadingComponent />);

    return (
        <>
            <h2>{article?.title}</h2>

                <Row>
                    <Col sm={8}>
                    {
                        id && (<div style={{height: '64vh', width: '64vw'}} >
                            {
                                <ModelScreen  isEditmode={false}  isAutoAnimationExec={false}/>
                            }
                            </div>)
                        //<ModelScreen height="64vh" width='64vw' isEditmode={false} />
                    }
                        <InstructionSelector />
                        <div>
                            <input type="checkbox" checked={sceneInfoStore.is_automatic_camera_rotate} onChange={(event: React.ChangeEvent<HTMLInputElement>) => sceneInfoStore.setIsAutomaticCameraRotate(event.target.checked)}/>
                            <label>Camera Auto Moving</label>
                        </div>
                        <GoogleAd pid={siteAnalyticsStore.GoogleAdsensePublisherId!} uid={siteAnalyticsStore.GoogleAdsenseUnitId!} />
                    </Col>
                    <Col   sm={4}>
                        <Tabs defaultActiveKey="instruction" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="instruction" title="Instruction">
                                <PanelInstruction />
                            </Tab>
                            <Tab eventKey="profile" title="Material">
                                <MaterialDisplay />
                            </Tab>
                            {
                                user &&
                                <Tab eventKey="edit" title="Edit">
                                    <Link href={`/articleedit/${article?.id_article}`}>Edit</Link> 
                                    <hr />
                                    <DebugDisplay />
                                </Tab>
                            }
                        </Tabs>
                    </Col>
                </Row>
        </>


    )
})



const getidfirst = (id: string | string[] | undefined) => {
    return id ? id[0] : '';
}