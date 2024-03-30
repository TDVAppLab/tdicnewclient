
import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import type { View } from '@/app/models/view';

import TextInputGeneral from '../../../app/common/form/TextInputGeneral';
import { useStore } from '../../../app/stores/store';
import EditViewSubUpdateCurrentCameraInfo from './EditViewSubUpdateCurrentCameraInfo';




const getDefaultValueOfView = (id_article : string) => {
    const ans : View = {
        id_article: id_article ? id_article : "",
        id_view: 0,
        title: '',
        cam_pos_x: 0,
        cam_pos_y: 0,
        cam_pos_z: 0,
    
        cam_lookat_x: 0,
        cam_lookat_y: 0,
        cam_lookat_z: 0,
    
        cam_quat_x: 0,
        cam_quat_y: 0,
        cam_quat_z: 0,
        cam_quat_w: 0,
    
        obt_target_x: 0,
        obt_target_y: 0,
        obt_target_z: 0,
    }
    return ans;
}


export default observer( function EditView(){
    
    const { articleStore } = useStore();
    const { viewStore : {selectedView, updateView, createView, deleteView} } = useStore();

    
    const {instructionStore : {instructionRegistry}} = useStore();

    const {sceneInfoStore : {camera_pos, quaternion, orbit_target}} = useStore();

    
    const [isRefbyInstruction, setIsRefbyInstruction] = useState(false);

    
    const [isReflectCurrentCameraInfo, setIsReflectCurrentCameraInfo] = useState(false);
    const [isDataCopyFromSelectedView, setIsDataCopyFromSelectedView] = useState(false);

    const [view, setView] = useState<View>(getDefaultValueOfView(articleStore?.selectedArticle?.id_article!));


    const validationSchema = Yup.object({
        id_view: Yup.number().required(),
        title: Yup.string().required(),
    });
    

    const validationSchemaDel = Yup.object({
        id_article: Yup.string().required(),
        id_view: Yup.number().required(),
    });
    

    useEffect(()=>{
        if(selectedView){
            setView(selectedView);

            Array.from(instructionRegistry.values()).find(instruction => instruction.id_view === selectedView.id_view) ? setIsRefbyInstruction(true) : setIsRefbyInstruction(false);
        } else {
            setView(getDefaultValueOfView(articleStore?.selectedArticle?.id_article!));
            setIsRefbyInstruction(false);
        }



    }, [selectedView]);

    
    function handleFormSubmit(view:View) {
        if(view.id_view === 0 ){
            let newView = {
                ...view
            };
            //console.log(newView);
            createView(newView).then(state => toast.info('view added'));
        } else {
            updateView(view).then(state => toast.info('view updated'));
        }
    }
    
    async function handleFormViewDel(view:View) {
        await deleteView(view); 
        await setView(getDefaultValueOfView(articleStore?.selectedArticle?.id_article!));
        toast.info('view deleted');
    }


    function EntryNewView() {
        if(isDataCopyFromSelectedView && selectedView) {
            
            //const view_temp = selectedView;

            setView({
                id_article: articleStore?.selectedArticle?.id_article!,
                id_view: 0,
                title: selectedView.title,
                cam_pos_x: selectedView.cam_pos_x,
                cam_pos_y: selectedView.cam_pos_y,
                cam_pos_z: selectedView.cam_pos_z,
            
                cam_lookat_x: selectedView.cam_lookat_x,
                cam_lookat_y: selectedView.cam_lookat_y,
                cam_lookat_z: selectedView.cam_lookat_z,
            
                cam_quat_x: selectedView.cam_quat_x,
                cam_quat_y: selectedView.cam_quat_y,
                cam_quat_z: selectedView.cam_quat_z,
                cam_quat_w: selectedView.cam_quat_w,
            
                obt_target_x: selectedView.obt_target_x,
                obt_target_y: selectedView.obt_target_y,
                obt_target_z: selectedView.obt_target_z,
            });

        } else {

            setView(getDefaultValueOfView(articleStore?.selectedArticle?.id_article!));
        }
    }

    return(
        <div>         
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={view} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <Row>
                            <Col xs={3}><TextInputGeneral label='View ID' name='id_view' placeholder='View ID' disabled/></Col>
                            <Col xs={9}><TextInputGeneral label='Title' name='title' placeholder='title' /></Col>
                        </Row>

                        <hr />

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Elementname</th>
                                    <th>X</th>
                                    <th>Y</th>
                                    <th>Z</th>
                                    <th>W</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Camera Position</td>
                                    <td><TextInputGeneral label='' name='cam_pos_x' placeholder='cam_pos_x' /></td>
                                    <td><TextInputGeneral label='' name='cam_pos_y' placeholder='cam_pos_y' /></td>
                                    <td><TextInputGeneral label='' name='cam_pos_z' placeholder='cam_pos_z' /></td>
                                    <td></td>
                                </tr>                        
                                <tr>
                                    <td>Camera Look At</td>
                                    <td><TextInputGeneral label='' name='cam_lookat_x' placeholder='cam_lookat_x' /></td>
                                    <td><TextInputGeneral label='' name='cam_lookat_y' placeholder='cam_lookat_y' /></td>
                                    <td><TextInputGeneral label='' name='cam_lookat_z' placeholder='cam_lookat_z' /></td>
                                    <td></td>
                                </tr>
                                
                                <tr>
                                    <td>Camera Quaternion</td>
                                    <td><TextInputGeneral label='' name='cam_quat_x' placeholder='cam_quat_x' /></td>
                                    <td><TextInputGeneral label='' name='cam_quat_y' placeholder='cam_quat_y' /></td>
                                    <td><TextInputGeneral label='' name='cam_quat_z' placeholder='cam_quat_z' /></td>
                                    <td><TextInputGeneral label='' name='cam_quat_w' placeholder='cam_quat_w' /></td>
                                </tr>
                                
                                <tr>
                                    <td>Orbit Control Target</td>
                                    <td><TextInputGeneral label='' name='obt_target_x' placeholder='obt_target_x' /></td>
                                    <td><TextInputGeneral label='' name='obt_target_y' placeholder='obt_target_y' /></td>
                                    <td><TextInputGeneral label='' name='obt_target_z' placeholder='obt_target_z' /></td>
                                    <td></td>
                                    { 
                                        (camera_pos && quaternion && orbit_target && isReflectCurrentCameraInfo) &&  
                                            <EditViewSubUpdateCurrentCameraInfo camera_pos={camera_pos} quaternion={quaternion} orbit_target={orbit_target} /> 
                                    }
                                </tr>
                            </tbody>
                        </table>


                        <div>
                            <input type="checkbox" checked={isReflectCurrentCameraInfo} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIsReflectCurrentCameraInfo(event.target.checked)} />
                            <label>Reflect Current Camera Info</label>
                        </div>
            
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>
                            {isSubmitting ? "Processing" : "Submit"}
                        </button>
                        
                    </Form>
                )}

            </Formik>


            

            <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={view} 
                onSubmit={values => handleFormViewDel(values) }>
                {({ handleSubmit, isValid, isSubmitting }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        <button disabled={!isValid || isSubmitting || isRefbyInstruction || view.id_view === 0} type = 'submit' className='btn btn-danger'>
                            {isSubmitting ? "Processing" : "Delete"}
                        </button>
                    </Form>
                )}
            </Formik>

            <button
                type = 'submit'
                className={"btn btn-secondary"}
                onClick={()=>{EntryNewView()}}
                disabled = {view.id_view === 0 ? true : false}
            >
                {isDataCopyFromSelectedView ? "Copy From Selected View" : "Entry New View"}
            </button>
    
            <div>
                <input type="checkbox" checked={isDataCopyFromSelectedView} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setIsDataCopyFromSelectedView(event.target.checked)}/>
                <label>Data Copy From Selected View</label>
            </div>


            <div>
                {isRefbyInstruction ? "Ref by Instruction" : "Not Ref by Instruction" }
            </div>

        </div>
    )
})