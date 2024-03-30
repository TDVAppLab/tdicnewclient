import { Form, Formik } from 'formik';
import { redirect } from 'next/navigation';
import React, {useState} from 'react';
import { Col, Row } from 'react-bootstrap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as Yup from 'yup';

import { APIURL } from '@/constants';

import agent from '../../../app/api/agent';
import FileInputGeneral from '../../../app/common/form/FileInputGeneral';
import type { ModelfileUploadDtO } from '../../../app/models/ModelFile';
import type { PartAnimationClip } from '../../../app/models/PartAnimationClip';
import { useStore } from '../../../app/stores/store';

function ModelfileUploader() {  

    const { modelfileStore} = useStore();
    const { selectedModelfile } = modelfileStore;
    
    
    const [modelfile, setModelfile] = useState<ModelfileUploadDtO>({
        id_part: "",
        part_number: '',
        version: 0,
        file_data: new File([],''),
        type_data: '',
        format_data: '',
        file_name: '',
        file_length: 0,
        itemlink: '',
        license: '',
        author: '',
        memo: '',
        create_datetime: null,
        latest_update_datetime: null,
    });
/*
    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png"
      ];*/

    const validationSchema = Yup.object({
        file_data: Yup.mixed().required('A file is required')
        /*.test(
          "fileSize",
          "File too large",
          value => 100 <= value.size
        )*/
        .test(
          "name",
          "File not Selected",
          //@ts-ignore
          value => value.name !== ""
        )
/*        .test(
          "fileFormat",
          "Unsupported Format",
          value => value && SUPPORTED_FORMATS.includes(value.type)
        )*/
    });

    async function handleFormSubmit(event: ModelfileUploadDtO) {

        const formData = new FormData();

        if(event.file_data && selectedModelfile){
            
            formData.append('file', event.file_data);

            
            const ans_step2 = await (await agent.Modelfiles.uploadmodelfile(selectedModelfile.id_part, formData)).data;

            //console.log(ans_step2);

            const str_url_partapi = APIURL + `/modelfiles/file/${ans_step2.id_part}`

            const glfLoader = new GLTFLoader();

            const PartAnimationClips : PartAnimationClip[] = [];
            

            await glfLoader.loadAsync(str_url_partapi).then(gltf => {
                
                gltf.animations.forEach((animation,index)=>{
                    PartAnimationClips.push({no:index, name: animation.name})
                })
            
            });
    
            if(ans_step2.id_part && PartAnimationClips.length > 0){
                await agent.Modelfiles.updatePartAnimationClip(ans_step2.id_part,PartAnimationClips);        
            }
            
            ans_step2 && redirect(`/modelfileedit/${ans_step2.id_part}`);

        }

    }

    return (

        <Formik
            validateOnMount={true}
            validationSchema={validationSchema}
            enableReinitialize 
            initialValues={modelfile} 
            onSubmit={values => handleFormSubmit(values)}>
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                    
                    <Row>
                        <Col xs={4}><FileInputGeneral label='' type="file" name='file_data' placeholder='file_data' /></Col>
                    </Row>      
                    
                    <hr />       
                    
                    <button disabled={!isValid || isSubmitting} type = 'submit' className='btn btn-primary'>Upload</button>
                </Form>
            )}

        </Formik>
    )
}

export default ModelfileUploader;