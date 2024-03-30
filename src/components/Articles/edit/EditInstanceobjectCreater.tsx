import { Form,Formik  } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from 'yup';

import SelectInputGeneral from "../../../app/common/form/SelectInputGeneral";
import TextInputGeneral from "../../../app/common/form/TextInputGeneral";
import type { Instanceobject } from '../../../app/models/Instanceobject';
import { getDefaultValueOfInstanceobject } from '../../../app/models/Instanceobject';
import { useStore } from "../../../app/stores/store";





export default observer( function EditInstanceobjectCreater(){
    const {articleStore} = useStore();
    const {selectedArticle} = articleStore;

    const {instanceobjectStore} = useStore();
    const {createInstanceobject, updateInstanceobjects, deleteInstanceobject, selectedInstanceobject} = instanceobjectStore;

    const {modelfileStore} = useStore();
    const {loading : loadingModelfile, getOptionArray} = modelfileStore;

    const [instanceobject, setInstancepart] = useState<Instanceobject>(getDefaultValueOfInstanceobject(selectedArticle?.id_article!));


    useEffect(()=>{
        if(selectedArticle?.id_article && !loadingModelfile){
            setInstancepart(getDefaultValueOfInstanceobject(selectedArticle?.id_article!));
        }
    }, [selectedArticle?.id_article, loadingModelfile]);

    
    useEffect(()=>{
        
        if(selectedInstanceobject){
            setInstancepart(selectedInstanceobject);
        } else {
            setInstancepart(getDefaultValueOfInstanceobject(selectedArticle?.id_article!));
        }
    }, [selectedInstanceobject]);
    
    

    const validationSchemaInstanceEdit = Yup.object({
        id_article: Yup.string().required(),
    });
    
    const validationSchemaInstanceDel = Yup.object({
        id_article: Yup.string().required(),
        id_instance: Yup.number().min(1, 'The minimum amount is one').required(),
    });

    async function handleFormInstanceobjectCreate(value:Instanceobject) {
        if(value.id_instance === 0 ){
            let newObject = {
                ...value
            }
            await createInstanceobject(newObject);        
            toast.info('instanceobjects created');
        } else {
            const values : Instanceobject[] = [];
            values.push(value);
            await updateInstanceobjects(values);
            await toast.info('annotation updated');
        }
    }


    async function handleFormInstanceobjectDelete(values:Instanceobject) {
        console.log("delete called")
        await deleteInstanceobject(values);
        toast.info('instanceobject deleted');
        
    }

    
//    if(loadingModelfile) return <LoadingComponent content="Loading ..." />

    return(
        <div>         
            <h4>Model Create and Edit</h4> 

            <div>
            {<Formik            
                    validationSchema={validationSchemaInstanceEdit}
                    enableReinitialize 
                    initialValues={instanceobject} 
                    onSubmit={(values) => handleFormInstanceobjectCreate(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                            <Row>
                                <Col xs={3}><TextInputGeneral label='Instance ID' name='id_instance' placeholder='Instance ID' disabled /></Col>
                                <Col xs={6}><SelectInputGeneral label='Part Number' placeholder='Part Number' name='id_part' options={getOptionArray()} /></Col>
                                <Col xs={3}><TextInputGeneral label='Scale' name='scale' placeholder='Scale' /></Col>
                            </Row>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>
                                            
                                        </th>
                                        <th>
                                            X
                                        </th>
                                        <th>
                                            Y
                                        </th>
                                        <th>
                                            Z
                                        </th>
                                        <th>
                                            W
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>POS</td>
                                        <td><TextInputGeneral name={`pos_x`} placeholder='POS X' /></td>
                                        <td><TextInputGeneral name={`pos_y`} placeholder='POS Y' /></td>
                                        <td><TextInputGeneral name={`pos_z`} placeholder='POS Z' /></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Quaternion</td>
                                        <td><TextInputGeneral name={`quaternion_x`} placeholder='X' /></td>
                                        <td><TextInputGeneral name={`quaternion_y`} placeholder='Y' /></td>
                                        <td><TextInputGeneral name={`quaternion_z`} placeholder='Z' /></td>
                                        <td><TextInputGeneral name={`quaternion_w`} placeholder='W' /></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>
                                {isSubmitting ? "Processing" : "Submit"}
                            </button>
                        </Form>
                    )}

                </Formik> }


                {<Formik
                    validateOnMount={true}
                    validationSchema={validationSchemaInstanceDel}
                    enableReinitialize 
                    initialValues={instanceobject} 
                    onSubmit={(values) => handleFormInstanceobjectDelete(values)}>
                    {({ handleSubmit, isValid, isSubmitting }) => (
                        <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>                            
                            <button disabled={!isValid || isSubmitting} type = 'submit' className='btn btn-danger'>
                                {isSubmitting ? "Processing" : "Delete"}
                            </button>
                        </Form>
                    )}

                </Formik> }


            </div>

        </div>
    )
})
