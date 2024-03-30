
import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import CheckBoxGeneral from '../../../app/common/form/CheckBoxGeneral';
import SelectInputGeneral from '../../../app/common/form/SelectInputGeneral';
import TextAreaGeneral from '../../../app/common/form/TextAreaGeneral';
import TextInputGeneral from '../../../app/common/form/TextInputGeneral';
import type { Instruction } from "../../../app/models/instruction";
import { useStore } from '../../../app/stores/store';
import PreviewInstructionDescription from './PreviewInstructionDescription';




const getDefaultValueOfInstruction = (id_article : string) => {
    const ans : Instruction = {
        id_article: id_article ? id_article : "",
        id_instruct: 0,
        id_view: 0,
        title: '',
        short_description: '',
        display_order: 0,
        memo: '',        
        subtitle: '',        
        is_automatic_camera_rotate: true,
        display_instance_sets: '',
    }
    return ans;
}

export default observer( function EditInstruction(){
    
    const {articleStore} = useStore();
    const {instructionStore} = useStore();
    const {selectedInstruction, setSelectedInstruction, updateInstruction, deleteInstruction, createInstruction, loadInstanceActionExecSettingAllArray, id_article: instructionId_article} = instructionStore;

    const {viewStore} = useStore();
    const {viewRegistry, getOptionArray : getViewOptionArray } = viewStore;

    
    const {annotationDisplayStore} = useStore();
    const {loadAnnotationDisplays, setSelectedAnnotationDisplayMap, selectedInstructionId, id_article : annotationDisplayId_article} = annotationDisplayStore;

    
    const [isDataCopyFromSelectedInstruction, setIsDataCopyFromSelectedInstruction] = useState(false);

    const [instruction, setInstruction] = useState<Instruction>(getDefaultValueOfInstruction(articleStore?.selectedArticle?.id_article!));


    const validationSchema = Yup.object({
        id_view: Yup.number().required().min(1),
        title: Yup.string().required(),
        short_description: Yup.string().nullable(),
        display_order: Yup.number().nullable(),
        memo: Yup.string().nullable(),
    });
    

    const validationSchemaDel = Yup.object({
        id_article: Yup.string().required(),
        id_instruct: Yup.number().required(),
    });

    useEffect(()=>{
        if(selectedInstruction){
            setInstruction(selectedInstruction);
        } else {
            setInstruction(getDefaultValueOfInstruction(articleStore?.selectedArticle?.id_article!));
        }
    }, [selectedInstruction]);
    /*
    useEffect(()=>{
        setInstruction(getDefaultValueOfInstruction(articleStore?.selectedArticle?.id_article!));
    }, [articleStore?.selectedArticle?.id_article]);*/

    useEffect(()=>{
    }, [viewRegistry.size]);
    

    

    function EntryNewInstruction() {
        if(isDataCopyFromSelectedInstruction && selectedInstruction) {
            
            
            const instruction_temp = {...selectedInstruction};
            instruction_temp.id_instruct=0;

            setInstruction(instruction_temp);

        } else {

            setInstruction(getDefaultValueOfInstruction(articleStore?.selectedArticle?.id_article!));
        }
    }
    
    async function handleFormSubmit(instruction:Instruction) {
        
        if(instruction.id_instruct === 0 ){
            let newInstruction = {
                ...instruction
            };

            const new_instruction = await createInstruction(newInstruction);
            await loadAnnotationDisplays(annotationDisplayId_article);
            await setSelectedAnnotationDisplayMap(selectedInstructionId);
            await loadInstanceActionExecSettingAllArray(instructionId_article);
            new_instruction && await setSelectedInstruction(new_instruction.id_instruct);
            toast.info('new instruction added');

        } else {
            await updateInstruction(instruction);
            
            toast.info('instruction updated');
        }
    }

    



    return(
        <div>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={instruction} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <Row>
                            <Col xs={2}><TextInputGeneral label='ID' name='id_instruct' placeholder='Instruction ID' disabled /></Col>
                            <Col xs={3}><TextInputGeneral label='Title' name='title' placeholder='Instruction Title' /></Col>
                            <Col xs={4}><SelectInputGeneral label='View ID' placeholder='id_view' name='id_view' options={getViewOptionArray()} /></Col>
                            <Col xs={3}><TextInputGeneral label='Display Order' name='display_order' placeholder='Display Order' /></Col>
                        </Row>

                        <hr />

                        <Row>
                            <Col >
                            
                                <Tabs defaultActiveKey={"editor"} id="article-editor-main-tab" className="mb-3">                                

                                    <Tab eventKey="editor" title="Editor">
                                    <TextAreaGeneral label='Short Description' placeholder='shortDescription' name='short_description' rows={15} />
                                    </Tab>

                                    <Tab eventKey="preview" title="Preview">
                                        <PreviewInstructionDescription />
                                    </Tab>

                                </Tabs>
                            
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col ><TextAreaGeneral label='MEMO' placeholder='memo' name='memo' rows={15}   /></Col>
                        </Row>

                        <Row>
                            <Col xs={4}><CheckBoxGeneral label='Auto Camera Rotate' name='is_automatic_camera_rotate'  /></Col>
                        </Row>
                        
                        
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>
                            {isSubmitting ? "Processing" : "Submit"}
                        </button>
                    </Form>
                )}

            </Formik>



            <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={instruction} 
                onSubmit={values => deleteInstruction(values).then(state => {setInstruction(getDefaultValueOfInstruction(articleStore?.selectedArticle?.id_article!))
                            toast.info('instruction deleted')})}>
                {({ handleSubmit, isValid, isSubmitting }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        <button disabled={!isValid || isSubmitting || instruction.id_instruct === 0} type = 'submit' className='btn btn-danger'>
                            {isSubmitting ? "Processing" : "Delete"}
                        </button>
                    </Form>
                )}
            </Formik>


            <button
                type = 'submit'
                className={"btn btn-secondary"}
                onClick={()=>{EntryNewInstruction()}}
                disabled = {instruction.id_instruct === 0 ? true : false}
            >
                {isDataCopyFromSelectedInstruction ? "Copy From Selected Instruction" : "Entry New Instruction"}
            </button>



            <div>
                <input type="checkbox" checked={isDataCopyFromSelectedInstruction} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIsDataCopyFromSelectedInstruction(event.target.checked)}/>
                <label>Data Copy From Selected Light</label>
            </div>


        </div>
    )
})