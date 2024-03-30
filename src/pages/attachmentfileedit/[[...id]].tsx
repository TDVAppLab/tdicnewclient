import { Form,Formik  } from "formik";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//import { Modelfile } from "../../../app/models/ModelFile";
import { Col, Row } from "react-bootstrap";
import * as Yup from 'yup';

import CheckBoxGeneral from "@/app/common/form/CheckBoxGeneral";
import TextInputGeneral from "@/app/common/form/TextInputGeneral";
import type { Attachmentfile } from "@/app/models/attachmentfile";
import { useStore } from "@/app/stores/store";
import LoadingComponent from "@/components/layout/LoadingComponents";
import { APIURL } from "@/constants";


export default observer( function AttachmentfileEdit(){
    //const { modelfileStore} = useStore();
    //const { loadModelfile, updateModelfile, deleteModelfile, loading } = modelfileStore;

    
    
    const {attachmentfileStore} = useStore();
    const {loadAttachmentfile, updateAttachmentfile, deleteAttachmentfile, loading} = attachmentfileStore;

    const router = useRouter()
    const { id } = router.query

    const [attachmentfile, setAttachmentfile] = useState<Attachmentfile>({
        
        id_file: '',
        name:  '',
        type_data:  '',
        format_data:  '',
        file_name:  '',

        file_length: 0,

        itemlink:  '',
        license:  '',

        memo:  '',
        isActive: false,

        create_user:  '',
        create_datetime: null,
        latest_update_user:  '',
        latest_update_datetime: null,

        target_article_id:  '',

    });


    const validationSchema = Yup.object({
        name: Yup.string().required('The part_number is required'),
        /*
        shortDescription: Yup.string().nullable(),
        startDatetimeScheduled: Yup.date().nullable(),
        startDatetimeActual: Yup.date().nullable(),
        endDatetimeScheduled: Yup.date().nullable(),
        endDatetimeActual: Yup.date().nullable(),
        status: Yup.number().required(),*/
    });
    

    const validationSchemaDel = Yup.object({
        id_file: Yup.number()
        .min(1, 'The minimum amount is one').required(),
    });

    useEffect(()=>{
        //loadStatuses().then(()=>{
        //    console.log(statusRegistry);
        //});
    }, []);

    useEffect(()=>{
        if(id) loadAttachmentfile(id[0]).then(attachmentfile => setAttachmentfile(attachmentfile!))
    }, [id, loadAttachmentfile]);

    
    function handleFormSubmit(attachmentfile:Attachmentfile) {
        if(attachmentfile.id_file === '' ){
        } else {
            updateAttachmentfile(attachmentfile);
        }
    }

    
    function handleFormSubmitDelete(attachmentfile:Attachmentfile) {
        
        if(attachmentfile.id_file === '' ){
        } else {
            
            deleteAttachmentfile(attachmentfile);
        }
    }

    if(loading) return <LoadingComponent content="Loading task..." />

    return(
        <div>         
            <h3>Model Edit</h3> 

            <div>
            {
                id && <img src={APIURL + `/attachmentfiles/file/${id[0]}`} alt="" loading="lazy"></img>
            }
            </div>

            <hr />

            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={attachmentfile} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        
                        <Row>
                            <Col xs={4}><label>Type Data</label><input className="form-control" value={attachmentfile.type_data} disabled /></Col>
                            <Col xs={4}><label>File Name</label><input className="form-control" value={attachmentfile.file_name} disabled /></Col>
                            <Col xs={4}><label>File Length</label><input className="form-control" value={attachmentfile.file_length} disabled /></Col>
                        </Row>

                        <Row>
                            <Col xs={4}><TextInputGeneral label='name' name='name' placeholder='name' /></Col>
                            <Col xs={2}><TextInputGeneral label='Format Fata' name='format_data' placeholder='format_data' /></Col>
                        </Row>

                        <Row>
                            <Col xs={10}><TextInputGeneral label='Itemlink' name='itemlink' placeholder='itemlink' /></Col>
                            <Col xs={4}><TextInputGeneral label='License' name='license' placeholder='license' /></Col>
                            <Col xs={4}><TextInputGeneral label='Target_article_id' name='target_article_id' placeholder='target_article_id' /></Col>
                            <Col xs={4}><CheckBoxGeneral label='isActive' name='isActive'  /></Col>
                        </Row>
                        
                        <Row>
                            <Col xs={6}><TextInputGeneral label='Memo' name='memo' placeholder='memo' /></Col>
                        </Row>
                        
                              
                        <button disabled={!isValid || !dirty || isSubmitting} 
                            type = 'submit' >Submit</button>
                    </Form>
                )}

            </Formik>

            <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={attachmentfile} 
                onSubmit={values => handleFormSubmitDelete(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        <button disabled={!isValid || isSubmitting} 
                            type = 'submit' >Delete</button>
                    </Form>
                )}
            </Formik>
            
            <hr />

            <div>
                <Link href="/attachmentfiles">Return Index</Link> |
                <Link href={`/attachmentfile/${id ? id[0] : ''}`}>Details</Link>
            </div>
        </div>
    )
})