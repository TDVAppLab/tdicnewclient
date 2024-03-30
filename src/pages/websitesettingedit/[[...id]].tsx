import { Form,Formik  } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import * as Yup from 'yup';

import agent from "@/app/api/agent";
import TextAreaGeneral from "@/app/common/form/TextAreaGeneral";
import TextInputGeneral from "@/app/common/form/TextInputGeneral";
import type { WebsiteSetting } from "@/app/models/WebsiteSetting";
import LoadingComponent from "@/components/layout/LoadingComponents";



export default function WebsiteSettingForm(){

    

    const router = useRouter()
    const { id } = router.query
    
    const [websiteSetting, setWebsiteSetting] = useState<WebsiteSetting>({        
        title:  '',
        data:  '',
        memo:  '',
    });

    const [isCreateMode, setIsCreateMode] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);


    
    useEffect(() => {
        if(id){
            setLoading(true);
            agent.WebsiteSettings.details(id[0]).then(sitesetting => {
                sitesetting && setWebsiteSetting(sitesetting);
                setIsCreateMode(false);
                setLoading(false);
            })
        }
    },[id]);

    const validationSchema = Yup.object({
        title: Yup.string().required(),
    });
    

    const validationSchemaDel = Yup.object({
        title: Yup.string().required(),
    });
    
    function handleFormSubmit(object:WebsiteSetting) {
        if(isCreateMode){
            agent.WebsiteSettings.create(object);
        } else {
            agent.WebsiteSettings.update(object);
        }
    }

    
    function handleFormSubmitDelete(object:WebsiteSetting) {
        if(isCreateMode){
        } else {
            console.log("called attach delete");
            agent.WebsiteSettings.delete(object.title);
        }
    }

    

    if(loading) return <LoadingComponent />

    return(
        <div>         
            <h3>Model Edit</h3> 

            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={websiteSetting} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        
                        
                        <Row>
                            <Col xs={4}><TextInputGeneral label='Title' name='title' placeholder='title' disabled={!isCreateMode} /></Col>
                            <Col xs={12}><TextAreaGeneral label='Data' name='data' placeholder='data'  rows={2} /></Col>
                            <Col xs={12}><TextInputGeneral label='MEMO' name='memo' placeholder='memo' /></Col>
                        </Row>
                        
                              
                        <button disabled={!isValid || !dirty || isSubmitting} 
                            type = 'submit' >Submit</button>
                    </Form>
                )}

            </Formik>

            <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={websiteSetting} 
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
                <Link href="/websitesettings">Return Index</Link>
            </div>




        </div>
    )
}