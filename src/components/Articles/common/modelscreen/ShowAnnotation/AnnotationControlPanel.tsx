import { button, folder, useControls } from 'leva';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { Vector3 } from 'three';

import { useStore } from '../../../../../app/stores/store';

export default observer( function AnnotationControlPanel(){
  

  const { annotationStore : { selectedAnnotation, updateAnnotation, createAnnotation, selectedAnnotationPosMoved, setSelectedAnnotationPosMoved, setIsShowSelectedAnnotationDetailOnScreen, isShowSelectedAnnotationDetailOnScreen } } = useStore();
  const { annotationDisplayStore : {loadAnnotationDisplays, setSelectedAnnotationDisplayMap,  selectedInstructionId, id_article : annotationDisplayId_article} } = useStore();

  //mobxの変数をそのまま入れるとhandleFormAnnotationUpdで反映が起こらないので(理由が仕様を読み解き切れておらず分かっていない)
  //useRefに一度代入して使っている
  const refSelectedAnnotation = useRef(selectedAnnotation);
  const refAnnotationDisplayId_article = useRef(annotationDisplayId_article);
  const refSelectedInstructionId = useRef(selectedInstructionId);

  
    const [Param, set] = useControls(() => ({        
        Annotation: folder({
            id: { value: 0, disabled : true },
            Title: { value: "" },
            Description1: { value: "" },
            position: { x: 0, y: 0, z: 0 },
            ShowText: true ,
            Submit: button((get) => {handleFormAnnotationUpd(get)}),
        })
      }));


        
    useEffect(() => {
        if(selectedAnnotation){
            set({
                id: selectedAnnotation.id_annotation,
                Title: selectedAnnotation.title,
                Description1: selectedAnnotation.description1,
                position: { 
                    x: selectedAnnotation.pos_x + (selectedAnnotationPosMoved ? selectedAnnotationPosMoved.x : 0), 
                    y: selectedAnnotation.pos_y + (selectedAnnotationPosMoved ? selectedAnnotationPosMoved.y : 0), 
                    z: selectedAnnotation.pos_z + (selectedAnnotationPosMoved ? selectedAnnotationPosMoved.z : 0)
                },
            })
            
            refSelectedAnnotation.current = selectedAnnotation;
            refAnnotationDisplayId_article.current = annotationDisplayId_article;
            refSelectedInstructionId.current = selectedInstructionId;
        }
    }, [selectedAnnotationPosMoved,selectedAnnotation])

    useEffect(() => {
        setIsShowSelectedAnnotationDetailOnScreen(Param.ShowText);
    }, [Param.ShowText])
    
    useEffect(() => {
        if(selectedAnnotation){
            set({
                ShowText: isShowSelectedAnnotationDetailOnScreen ,
            })
        }
    }, [isShowSelectedAnnotationDetailOnScreen])

    async function handleFormAnnotationUpd(get : any) {
        
        //console.log(refSelectedAnnotation.current);

        const annotation = refSelectedAnnotation.current;

        if(annotation){
            
            annotation.title = get('Annotation.Title');
            annotation.description1 = get('Annotation.Description1');
            annotation.pos_x = get('Annotation.position').x;
            annotation.pos_y = get('Annotation.position').y; 
            annotation.pos_z = get('Annotation.position').z;
            

            if(annotation.id_annotation === 0 ){
                await createAnnotation(annotation);
                await loadAnnotationDisplays(refAnnotationDisplayId_article.current);
                await setSelectedAnnotationDisplayMap(refSelectedInstructionId.current);
                setSelectedAnnotationPosMoved(new Vector3(0,0,0));
                await toast.info('annotation added');
            } else {
                await updateAnnotation(annotation);
                setSelectedAnnotationPosMoved(new Vector3(0,0,0));
                await toast.info('annotation updated');
            }
        }
    }

  return (
      null
  )
})

