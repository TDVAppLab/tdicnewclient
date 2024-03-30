
import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Vector3 } from 'three';
import * as Yup from 'yup';

import TextAreaGeneral from '../../../app/common/form/TextAreaGeneral';
import TextInputGeneral from '../../../app/common/form/TextInputGeneral';
import type { Annotation} from '../../../app/models/Annotation';
import { getDefaultValueOfAnnotation } from '../../../app/models/Annotation';
import { useStore } from '../../../app/stores/store';
import EdiaAnnotationDisplay from "./EditAnnotationDisplay";
import EditAnnotationSubUpdatePos from './EditAnnotationSubUpdatePos';





export default observer( function EditAnnotation(){
    
    const {articleStore} = useStore();
    const {annotationStore} = useStore();
    const {selectedAnnotation, editAnnotationInternal, updateAnnotation, createAnnotation, deleteAnnotation, setSelectedAnnotation, selectedAnnotationPosMoved, isShowSelectedAnnotationDetailOnScreen, setIsShowSelectedAnnotationDetailOnScreen} = annotationStore;
    const {sceneInfoStore : {orbit_target}} = useStore();

    const {annotationDisplayStore} = useStore();
    const {loadAnnotationDisplays, setSelectedAnnotationDisplayMap, deleteAnnotationDisplayArray, selectedInstructionId, id_article : annotationDisplayId_article} = annotationDisplayStore;

    const [isDataCopyFromSelectedAnnotation, setIsDataCopyFromSelectedAnnotation] = useState(false);


    const [annotation, setAnnotation] = useState<Annotation>(getDefaultValueOfAnnotation(articleStore?.selectedArticle?.id_article!));


    const validationSchema = Yup.object({
        title: Yup.string().required(),
    });
    

    const validationSchemaDel = Yup.object({
        id_article: Yup.string().required(),
        id_annotation: Yup.number().required(),
    });

    useEffect(()=>{
        
        if(selectedAnnotation){
            setAnnotation(selectedAnnotation);
        } else {
            setAnnotation(getDefaultValueOfAnnotation(articleStore?.selectedArticle?.id_article!));
        }


    }, [selectedAnnotation]);

    
    async function handleFormAnnotationUpd(annotation:Annotation) {
        if(annotation.id_annotation === 0 ){
            let newAnnotation = {
                ...annotation
            };
            await createAnnotation(newAnnotation);
            await loadAnnotationDisplays(annotationDisplayId_article);
            await setSelectedAnnotationDisplayMap(selectedInstructionId);
            await toast.info('annotation added');
        } else {
            await updateAnnotation(annotation);
            await toast.info('annotation updated');
        }
    }

    async function handleFormAnnotationDel(values:Annotation) {
        
        await deleteAnnotation(values);
        await deleteAnnotationDisplayArray(values.id_annotation);
        setAnnotation(getDefaultValueOfAnnotation(articleStore?.selectedArticle?.id_article!));
        toast.info('annotation deleted');
    }
    


    
    const handleInputChangeAnnotationPosition=(diff_pos: Vector3) => {
        
        const temp_annotation = {...annotation};
        temp_annotation.pos_x += diff_pos.x;
        temp_annotation.pos_y += diff_pos.y;
        temp_annotation.pos_z += diff_pos.z;

        editAnnotationInternal(temp_annotation);
    }



    const EntryNewAnnotation = () => {
        
        if(isDataCopyFromSelectedAnnotation && selectedAnnotation) {

            
            const temp_annotation = {...selectedAnnotation};
            temp_annotation.id_annotation=0;
            
            editAnnotationInternal(temp_annotation);
            setSelectedAnnotation(0);

        } else {
            const temp_annotation_new = getDefaultValueOfAnnotation(articleStore?.selectedArticle?.id_article!);
            temp_annotation_new.pos_x = orbit_target?.x!;
            temp_annotation_new.pos_y = orbit_target?.y!;
            temp_annotation_new.pos_z = orbit_target?.z!;
            editAnnotationInternal(temp_annotation_new);
            setSelectedAnnotation(0);
        }
    }
    

    const handleSetNewAnnotationPosition = () => {
        
        const temp_annotation = {...annotation};

        temp_annotation.pos_x = orbit_target?.x!;
        temp_annotation.pos_y = orbit_target?.y!;
        temp_annotation.pos_z = orbit_target?.z!;
        editAnnotationInternal(temp_annotation);
        setSelectedAnnotation(annotation.id_annotation);
    }

    return(
        <>
        <EdiaAnnotationDisplay EntryNewAnnotation={EntryNewAnnotation} setAnnotation={setAnnotation} />
        <div>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={annotation} 
                onSubmit={values => handleFormAnnotationUpd(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <Row>
                            <Col xs={3}><TextInputGeneral label='Annotation ID' name='id_annotation' placeholder='Annotation ID' disabled /></Col>
                            <Col xs={6}><TextInputGeneral label='Annotation Title' name='title' placeholder='Annotation Title' /></Col>
                            <Col xs={3}><TextInputGeneral label='Status' name='status' placeholder='Status' /></Col>
                        </Row>

                        <hr />

                        <Row>
                            <Col ><TextAreaGeneral label='Description1' placeholder='Description1' name='description1' rows={1}   /></Col>
                            <Col ><TextAreaGeneral label='Description2' placeholder='Description2' name='description2' rows={1}   /></Col>
                        </Row>


                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Axis</th>
                                    <th>POS</th>
                                    <th>OP</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>X</td>
                                    <td><TextInputGeneral label='' name='pos_x' placeholder='POS X' /></td>
                                    <td>
                                        <button type = 'button' className={"btn btn-outline-danger btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(-1,0,0))}} >-1 </button>
                                        <button type = 'button' className={"btn btn-outline-danger btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(-0.1,0,0))}} >-0.1</button>
                                        <button type = 'button' className={"btn btn-outline-danger btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(-0.01,0,0))}} >-0.01</button>
                                        <button type = 'button' className={"btn btn-outline-danger btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0.01,0,0))}} >+0.01</button>
                                        <button type = 'button' className={"btn btn-outline-danger btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0.1,0,0))}} >+0.1</button>
                                        <button type = 'button' className={"btn btn-outline-danger btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(1,0,0))}} >+1 </button>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td>Y</td>
                                    <td><TextInputGeneral label='' name='pos_y' placeholder='POS Y' /></td>
                                    <td>
                                        <button type = 'button' className={"btn btn-outline-success btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,-1,0))}} >-1 </button>
                                        <button type = 'button' className={"btn btn-outline-success btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,-0.1,0))}} >-0.1</button>
                                        <button type = 'button' className={"btn btn-outline-success btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,-0.01,0))}} >-0.01</button>
                                        <button type = 'button' className={"btn btn-outline-success btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0.01,0))}} >+0.01</button>
                                        <button type = 'button' className={"btn btn-outline-success btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0.1,0))}} >+0.1</button>
                                        <button type = 'button' className={"btn btn-outline-success btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,1,0))}} >+1 </button>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td>Z</td>
                                    <td><TextInputGeneral label='' name='pos_z' placeholder='POS Z' /></td>
                                    <td>
                                        <button type = 'button' className={"btn btn-outline-primary btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0,-1))}} >-1 </button>
                                        <button type = 'button' className={"btn btn-outline-primary btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0,-0.1))}} >-0.1</button>
                                        <button type = 'button' className={"btn btn-outline-primary btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0,-0.01))}} >-0.01</button>
                                        <button type = 'button' className={"btn btn-outline-primary btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0,0.01))}} >+0.01</button>
                                        <button type = 'button' className={"btn btn-outline-primary btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0,0.1))}} >+0.1</button>
                                        <button type = 'button' className={"btn btn-outline-primary btn-sm"} onClick={()=>{handleInputChangeAnnotationPosition(new Vector3(0,0,1))}} >+1 </button>
                                    </td>
                                </tr>


                            </tbody>
                        </table>

                        
            
                        <div>
                            <input type="checkbox" checked={isShowSelectedAnnotationDetailOnScreen} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIsShowSelectedAnnotationDetailOnScreen(event.target.checked)}/>
                            <label>Show Selected Annotations Detail</label>
                        </div>


                        { 
                            (selectedAnnotationPosMoved && selectedAnnotation) &&  
                                <EditAnnotationSubUpdatePos pos_drug={selectedAnnotationPosMoved} pos_annotation = {new Vector3( selectedAnnotation.pos_x,selectedAnnotation.pos_y,selectedAnnotation.pos_z)} /> 
                        }
                        
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>
                            {isSubmitting ? "Processing" : "Submit"}
                        </button>
                    </Form>
                )}

            </Formik>
            

            <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={annotation} 
                onSubmit={values => handleFormAnnotationDel(values)}>
                {({ handleSubmit, isValid, isSubmitting }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        <button disabled={!isValid || isSubmitting || annotation.id_annotation === 0} type = 'submit' className='btn btn-danger'>
                            {isSubmitting ? "Processing" : "Delete"}
                        </button>
                    </Form>
                )}
            </Formik>

            <button
                type = 'submit'
                className={"btn btn-secondary"}
                onClick={()=>{EntryNewAnnotation()}}
                disabled = {   annotation.id_annotation === 0 ? true : false}
            >
                {isDataCopyFromSelectedAnnotation ? "Copy From Selected Annotation" : "Entry New Annotation"}
            </button>

            <div>
                <input type="checkbox" checked={isDataCopyFromSelectedAnnotation} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIsDataCopyFromSelectedAnnotation(event.target.checked)}/>
                <label>Data Copy From Selected View</label>
            </div>

            


            <button
                type = 'submit'
                className={"btn btn-outline-primary"}
                onClick={()=>{handleSetNewAnnotationPosition()}} 
            >
                Set Annotation Position with Current Orbit
            </button>
        </div>
        </>
    )
})