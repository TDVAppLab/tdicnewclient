
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import CheckBoxGeneral from '../../../app/common/form/CheckBoxGeneral';
import type { Annotation} from '../../../app/models/Annotation';
import { getDefaultValueOfAnnotation } from '../../../app/models/Annotation';
import type { AnnotationDisplay } from '../../../app/models/AnnotationDisplay';
import { useStore } from '../../../app/stores/store';


interface Props {
    EntryNewAnnotation: () => void;
    setAnnotation: React.Dispatch<React.SetStateAction<Annotation>>;
  
  }

export default observer( function EdiaAnnotationDisplay({EntryNewAnnotation, setAnnotation} : Props) {
    

    const validationSchema = Yup.object({
        title: Yup.string().required(),
    });

    const {sceneInfoStore : {orbit_target}} = useStore();

    const {articleStore} = useStore();

    const { annotationStore } = useStore();
    const { annotationRegistry, setSelectedAnnotation, selectedAnnotation, deleteAnnotation, editAnnotationInternal } = annotationStore;  

    const { annotationDisplayStore} = useStore();
    const { selectedAnnotationDisplayMap, selectedInstructionId, updateAnnotationDisplay, deleteAnnotationDisplayArray } = annotationDisplayStore;

    const [annotationDisplays, setAnnotationDisplays] = useState<AnnotationDisplay[]>([]);
 

    useEffect(()=>{
        selectedAnnotationDisplayMap.size > 0 && setAnnotationDisplays(Array.from(selectedAnnotationDisplayMap.values()));
    }, []);
  

    useEffect(()=>{
        selectedAnnotationDisplayMap.size > 0 && setAnnotationDisplays(Array.from(selectedAnnotationDisplayMap.values()));
    }, [selectedAnnotationDisplayMap, selectedAnnotationDisplayMap.size]);


    
    useEffect(()=> {
        selectedAnnotationDisplayMap.size > 0 && setAnnotationDisplays(Array.from(selectedAnnotationDisplayMap.values()));
    }, [selectedInstructionId])

    
    async function handleFormAnnotationDisplayUpd(values:AnnotationDisplay[]) {
        await updateAnnotationDisplay(values);
        toast.info('annotation display updated');
    }
    
    
    const EntryNewAnnotation2 = () => {
        
        if(selectedAnnotation && (selectedAnnotation.id_annotation !== 0)) {

            

            const temp_annotation_new = getDefaultValueOfAnnotation(articleStore?.selectedArticle?.id_article!);
            temp_annotation_new.pos_x = orbit_target?.x!;
            temp_annotation_new.pos_y = orbit_target?.y!;
            temp_annotation_new.pos_z = orbit_target?.z!;
            editAnnotationInternal(temp_annotation_new);
            setSelectedAnnotation(0);
        } else {
            if(selectedAnnotation) {
                const temp_annotation = {...selectedAnnotation};
                temp_annotation.id_annotation=0;
                
                editAnnotationInternal(temp_annotation);
                setSelectedAnnotation(0);
            }
        }
    }

    async function handleFormAnnotationDel(id:number) {
        const target = annotationRegistry.get(id);
        
        if(target){
            await deleteAnnotation(target);
            await deleteAnnotationDisplayArray(target.id_annotation);
            setAnnotation(getDefaultValueOfAnnotation(articleStore?.selectedArticle?.id_article!));
            toast.info('annotation deleted');
        }
    }

    return(
        <div>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={annotationDisplays} 
                onSubmit={(values) => handleFormAnnotationDisplayUpd(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        No.
                                    </th>
                                    <th>
                                        Title
                                    </th>
                                    <th>
                                        Description1
                                    </th>
                                    <th>
                                        Display
                                    </th>
                                    <th>
                                        Display Description
                                    </th>
                                    <th>
                                        COPY
                                    </th>
                                    <th>
                                        DEL
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {                                
                                annotationDisplays.map((x,index)=>(
                                    

                                    <tr key={x.id_annotation}>
                                        <td>
                                            <button key={x.id_annotation}
                                                    type = 'button'
                                                    className={ x.id_annotation === selectedAnnotation?.id_annotation ? "btn btn-secondary" :  "btn btn-outline-secondary"}
                                                    onClick={()=>{setSelectedAnnotation(x.id_annotation)}} 
                                                >
                                                {index+1}
                                            </button>
                                        </td>
                                        <td>{ annotationRegistry.get(x.id_annotation)?.title }</td>
                                        <td>{ annotationRegistry.get(x.id_annotation)?.description1 }</td>                                        
                                        <td><CheckBoxGeneral label='' name={`[${index}]is_display`}  /></td>
                                        <td><CheckBoxGeneral label='' name={`[${index}]is_display_description`}  /></td>
                                        <td>
                                            {   x.id_annotation === selectedAnnotation?.id_annotation &&
                                                <button
                                                    type = 'button'
                                                    className={"btn btn-warning"}
                                                    onClick={()=>{
                                                        EntryNewAnnotation()
                                                    }}
                                                >
                                                    COPY
                                                </button>
                                            }
                                        </td>
                                        <td>
                                            {   x.id_annotation === selectedAnnotation?.id_annotation &&
                                                <button
                                                    type = 'button'
                                                    className={"btn btn-danger"}
                                                    onClick={()=>{
                                                        handleFormAnnotationDel(x.id_annotation)
                                                    }}
                                                >
                                                    DEL
                                                </button>
                                            }
                                        </td>
                                    </tr>

                                    ))
                            }
                                <tr>
                                    <td>
                                        <button
                                            type = 'button'
                                            className={"btn btn-secondary"}
                                            onClick={()=>{
                                                EntryNewAnnotation()
                                            }}
                                        >
                                            ADD
                                        </button>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>                                        
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>
                            {isSubmitting ? "Processing" : "submit"}
                        </button>
                    </Form>
                )}

            </Formik>
        </div>
    )

});



//export default EdiaAnnotationDisplay;