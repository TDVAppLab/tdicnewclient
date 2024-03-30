
import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { NoToneMapping, sRGBEncoding } from 'three';
import {v4} from 'uuid';
import * as Yup from 'yup';

import LoadingComponent from '@/components/layout/LoadingComponents';

import SelectInputGeneral from '../../../app/common/form/SelectInputGeneral';
import TextAreaGeneral from '../../../app/common/form/TextAreaGeneral';
import TextInputGeneral from '../../../app/common/form/TextInputGeneral';
import type { Article } from '../../../app/models/article';
import { useStore } from '../../../app/stores/store';

export default observer( function EditArticleSub(){
    

    
    const [isDataLoadingFinished, setIsDataLoadingFinished]= useState<boolean>(false);
    
    const {articleStore} = useStore();
    const {selectedArticle, updateArticle, createArticle, deleteArticle, duplicateArticle} = articleStore;

    
    const {mArticleStatusStore} = useStore();
    const {loadStatuses, loading : loadingstatus, getOptionArray : getMArticleStatusOptionArray } = mArticleStatusStore;

    
    //const {assemblyStore} = useStore();
    //const {loadAssemblies, loading: loadingAssembly, getOptionArray : getAssemblyOptionArray } = assemblyStore;


    const [article, setArticle] = useState<Article>({
            
        id_article: "",
        id_assy: 0,

        title: '',
        short_description: '',
        long_description: '',
        meta_description: '',
        meta_category: '',

        status: 1,



        gammaOutput: false,
    
        outputEncoding: sRGBEncoding,
        toneMapping: NoToneMapping,
        exposure: 0.0,
        environment: "Neutral",

        id_attachment_for_eye_catch: null,

        bg_color:'#000000',
        isStarrySky: false,
    });


    const validationSchema = Yup.object({
        title: Yup.string().required(),
    });
    

    const validationSchemaDel = Yup.object({
        id_article: Yup.string().required(),
    });

    useEffect(()=>{
        loadStatuses().then(()=>{
        });
        //loadAssemblies();
    }, []);

    useEffect(()=>{
        selectedArticle && setArticle(selectedArticle);
        loadStatuses();
    }, [selectedArticle]);


    useEffect(() => { 
        setIsDataLoadingFinished(!(loadingstatus));        
    },[loadingstatus])
    

    async function handleFormArticleUpd(object:Article) {
        if(object.id_article === "" ){
            let newObject = {
                ...object
            }

            newObject.id_article=v4();

            const ans_article = await createArticle(newObject);
            ans_article && redirect(`/articleedit/${ans_article.id_article}`);
            toast.success('new article added');
        } else {
            await updateArticle(object);
            toast.info('article updeted');
        }
    }

    async function handleFormArticleDel(values:Article) {
        
        await deleteArticle(values);
        redirect(`/`);
        toast.info('article deleted');
    }

    async function handleFormArticleDuplicate(values:Article) {
        
        const ans_article = await duplicateArticle(values);
        ans_article && redirect(`/articleedit/${ans_article.id_article}`); 
        toast.info('article duplicated');
    }

    if(!isDataLoadingFinished) return (<><LoadingComponent /></>);

    return(
        <div>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={article} 
                onSubmit={values => handleFormArticleUpd(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <Row>
                            <Col xs={3}><SelectInputGeneral label='Status' placeholder='status' name='status' options={getMArticleStatusOptionArray()} /></Col>
                            <Col xs={9}><TextInputGeneral label='Article Title' name='title' placeholder='Article Title' /></Col>
                        </Row>

                        <hr />
                        
                        <Row>
                            <Col ><TextAreaGeneral label='Short Description' placeholder='Description' name='short_description' rows={3}   /></Col>
                        </Row>
                        
                        <Row>
                            <Col ><TextAreaGeneral label='Long Description' placeholder='Description' name='long_description' rows={3}   /></Col>
                        </Row>

                        <hr />
                        
                        
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>
                            {isSubmitting ? "Processing" : "submit"}
                        </button>
                    </Form>
                )}

            </Formik>

            { article.id_article !== "" &&
            <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={article} 
                onSubmit={values => {handleFormArticleDel(values)}}>
                {({ handleSubmit, isValid, isSubmitting }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        <button disabled={!isValid || isSubmitting} type = 'submit' className='btn btn-danger'>
                            {isSubmitting ? "Processing" : "Delete"}
                        </button>
                    </Form>
                )}
            </Formik>
            }


            { article.id_article !== "" &&
            <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={article} 
                onSubmit={values => handleFormArticleDuplicate(values)}>
                {({ handleSubmit, isValid, isSubmitting }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        <button disabled={!isValid || isSubmitting} type = 'submit' className='btn btn-warning'>
                            {isSubmitting ? "Processing" : "Duplicate"}
                        </button>
                    </Form>
                )}
            </Formik>
            }

            

        </div>
    )
})