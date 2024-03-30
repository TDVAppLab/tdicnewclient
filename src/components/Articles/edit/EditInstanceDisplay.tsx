import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import agent from '../../../app/api/agent';
import CheckBoxGeneral from '../../../app/common/form/CheckBoxGeneral';
import TextInputGeneral from '../../../app/common/form/TextInputGeneral';
import type { InstanceActionExecSetting } from '../../../app/models/InstanceActionExecSetting';
import type { InstanceDisplay } from '../../../app/models/InstanceDisplay';
import { useStore } from '../../../app/stores/store';


export default observer( function EditInstanceDisplay(){
    
    const {instructionStore} = useStore();
    const {selectedInstruction, instanceDisplayRegistry, instanceActionExecSettingRegistry, updateInstanceDisplay, resetInstanceDisplay} = instructionStore;


    const validationSchema = Yup.object({
        title: Yup.string().required(),
    });

    const validationSchemaUpdateInstanceActionClips = Yup.object({
        id_assy: Yup.number().required(),
    });
    

    
    async function handleFormSubmit(instanceparts:InstanceDisplay[]) {
        if(selectedInstruction){
            const object = selectedInstruction;
            object.display_instance_sets = JSON.stringify ( instanceparts );
            await updateInstanceDisplay(object);
            toast.info('instance display updated');
        }
    }


    
    async function handleFormInstanceActionClipsUpd(id_article : string,id_instruct : number, values : InstanceActionExecSetting[]) {        
        await instructionStore.updateInstanceActionClips(id_article,id_instruct,values);
        toast.info('instance actionClips updated');
    }


    

    if(instructionStore.instructionRegistry.size<1) return null;

    return(
        <div>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={Array.from(instanceDisplayRegistry.values())!} 
                onSubmit={(values) => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        No.
                                    </th>
                                    <th>
                                        ID Inst
                                    </th>
                                    <th>
                                        isDisplay
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                instanceDisplayRegistry && Array.from(instanceDisplayRegistry.values()).map((instanceDisplay,index)=> (
                                    <tr key={`[${index}]EditInstanceDisplaytable`}>
                                        <td><div>{index+1}</div></td>
                                        <td><div>{instanceDisplay.id_instance}</div></td>
                                        <td><CheckBoxGeneral label='' name={`[${index}]isDisplay`}  /></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>
                            {isSubmitting ? "Processing" : "Submit"}
                        </button>
                    </Form>
                )}

            </Formik>

            <button 
                type = 'submit'
                className={"btn btn-danger"}
                onClick={()=>{selectedInstruction && resetInstanceDisplay(selectedInstruction.id_article)}} 
            >
                {"Reset Instance Display Object"}
            </button>


            <Formik
                validationSchema={validationSchemaUpdateInstanceActionClips}
                enableReinitialize 
                initialValues={instanceActionExecSettingRegistry!} 
                onSubmit={(values) =>                     
                    selectedInstruction && handleFormInstanceActionClipsUpd(selectedInstruction.id_article,selectedInstruction.id_instruct,values)
                    }>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        No.
                                    </th>
                                    <th>
                                        id_instruct
                                    </th>
                                    <th>
                                        ID Inst
                                    </th>
                                    <th>
                                        ID Part
                                    </th>
                                    <th>
                                        Internal No
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Exec
                                    </th>
                                    <th>
                                        Loop
                                    </th>
                                    <th>
                                        Clamp Finished
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                instanceActionExecSettingRegistry.map((instanceActionExecSetting,index)=> (
                                    <tr key={index}>
                                        <td><div>{index+1}</div></td>
                                        <td><div>{instanceActionExecSetting.id_instruct}</div></td>
                                        <td><div>{instanceActionExecSetting.id_instance}</div></td>
                                        <td><div>{instanceActionExecSetting.id_part}</div></td>
                                        <td><div>{instanceActionExecSetting.no}</div></td>
                                        <td><div>{instanceActionExecSetting.name}</div></td>
                                        <td><CheckBoxGeneral label='' name={`[${index}]is_exec`}  /></td>
                                        <td><TextInputGeneral name={`[${index}]num_loop`} placeholder='num_loop' /></td>
                                        <td><CheckBoxGeneral label='' name={`[${index}]is_clamp_when_finished`}  /></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>

                        
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary'>
                            {isSubmitting ? "Processing" : "Submit"}
                        </button>
                    </Form>
                )}

            </Formik>
            
            <button 
                type = 'submit'
                className={"btn btn-danger"}
                onClick={()=>{                    
                        if(selectedInstruction){
                            agent.Instructions.resetInstanceActionClips(selectedInstruction.id_article);
                        }
                    }
                }
            >
                {"ResetInstanceActionClips"}
            </button>
        </div>
    )
})