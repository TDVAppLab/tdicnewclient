import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import TextAreaGeneral from '../../../app/common/form/TextAreaGeneral';
import TextInputGeneral from '../../../app/common/form/TextInputGeneral';
import type { Light } from '../../../app/models/Light';
import { useStore } from '../../../app/stores/store';




const getDefaultValueOfLight = (id_article : string) => {
    const ans : Light = {
        id_article: id_article ? id_article : "",
        id_light: 0,
        light_type: '',
        title:  '',
        short_description:  '',
        color: 0,
        intensity: 0,
        px: 0,
        py: 0,
        pz: 0,
        distance: 0,
        decay: 0,
        power: 0,
        shadow: 0,
        tx: 0,
        ty: 0,
        tz: 0,
        skycolor: 0,
        groundcolor: 0,
        is_lensflare: false,
        lfsize: 0,
        file_data: null,
        light_object: null,
    }
    return ans;
}

export default observer( function EditLight(){
    
    const {articleStore} = useStore();
    const {lightStore} = useStore();
    const {selectedLight, createLight, updateLight, deleteLight} = lightStore;


    const [isDataCopyFromSelectedLight, setIsDataCopyFromSelectedLight] = useState(false);

    const [light, setLight] = useState<Light>(getDefaultValueOfLight(articleStore?.selectedArticle?.id_article!));


    const validationSchema = Yup.object({
        title: Yup.string().required(),
    });
    

    const validationSchemaDel = Yup.object({
        id_article: Yup.string().required(),
        id_light: Yup.number().required(),
    });

    useEffect(()=>{
        if(selectedLight){
            setLight(selectedLight);
        } else {
            setLight(getDefaultValueOfLight(articleStore?.selectedArticle?.id_article!));
        }
    }, [selectedLight]);

    
    async function handleFormLightUpd(values:Light) {
        if(values.id_light === 0 ){
            let newLight = {
                ...values
            };
            //console.log(newLight);
            await createLight(newLight);
            toast.info('light added');
        } else {
            await updateLight(values);
            toast.info('light updated');
        }
    }

    async function handleFormLightDel(values:Light) {

        await deleteLight(values);
        await setLight(getDefaultValueOfLight(articleStore?.selectedArticle?.id_article!));
        toast.info('light deleted');
    }
    

    function EntryNewLight() {
        if(isDataCopyFromSelectedLight && selectedLight) {
            
            
            const light_temp = {...selectedLight};
            light_temp.id_light=0;

            setLight(light_temp);

        } else {

            const temp_light_new = getDefaultValueOfLight(articleStore?.selectedArticle?.id_article!);
            setLight(temp_light_new);
            
        }
    }

    return(
        <div>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={light} 
                onSubmit={values => handleFormLightUpd(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <Row>
                            <Col xs={2}><TextInputGeneral label='Light ID' name='id_light' placeholder='Light ID' disabled /></Col>
                            <Col xs={4}><TextInputGeneral label='Light Type' name='light_type' placeholder='Light Type' /></Col>
                            <Col xs={6}><TextInputGeneral label='Light Title' name='title' placeholder='Light Title' /></Col>
                        </Row>

                        <Row>
                            <Col ><TextAreaGeneral label='Description' placeholder='Description' name='short_description' rows={1}   /></Col>
                        </Row>

                        <Row>
                            <Col xs={4}><TextInputGeneral label='Color' name='color' placeholder='Color' /></Col>
                            <Col xs={4}><TextInputGeneral label='Intensity' name='intensity' placeholder='Intensity' /></Col>
                        </Row>

                        <Row>
                            <Col xs={4}><TextInputGeneral label='POS X' name='px' placeholder='POS X' /></Col>
                            <Col xs={4}><TextInputGeneral label='POS Y' name='py' placeholder='POS Y' /></Col>
                            <Col xs={4}><TextInputGeneral label='POS Z' name='pz' placeholder='POS Z' /></Col>
                        </Row>

                        <hr />

                        
                        <Row>
                            <Col xs={4}><TextInputGeneral label='Distance' name='distance' placeholder='Distance' /></Col>
                            <Col xs={4}><TextInputGeneral label='Decay' name='decay' placeholder='Decay' /></Col>
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
                initialValues={light} 
                onSubmit={values => handleFormLightDel(values)}>
                {({ handleSubmit, isValid, isSubmitting }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        <button disabled={!isValid || isSubmitting || light.id_light === 0} type = 'submit' className='btn btn-danger'>
                            {isSubmitting ? "Processing" : "Delete"}
                        </button>
                    </Form>
                )}
            </Formik>




            
            <button
                type = 'submit'
                className={"btn btn-secondary"}
                onClick={()=>{EntryNewLight()}}
                disabled = {light.id_light === 0 ? true : false}
            >
                {isDataCopyFromSelectedLight ? "Copy From Selected Light" : "Entry New Light"}
            </button>

            
            <div>
                <input type="checkbox" checked={isDataCopyFromSelectedLight} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIsDataCopyFromSelectedLight(event.target.checked)}/>
                <label>Data Copy From Selected Light</label>
            </div>
        </div>
    )
})

