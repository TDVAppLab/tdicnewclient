


import { observer } from 'mobx-react-lite';

import { useStore } from "../../../app/stores/store";
import Bool2String from './Bool2String';


export default observer( function DebugDisplayModelLoadingInfo() {

    


    //const {instancepartStore} = useStore();
    //const {modelLoadingRegistry, instancepartRegistry, getModelLoading} = instancepartStore;

    const {instanceobjectStore} = useStore();
    const {instanceobjectRegistry, getModelLoading} = instanceobjectStore;
    


    return (
        <div>

            <hr />

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
                            Part Number
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
                            Scale
                        </th>
                    </tr>
                </thead>
                <tbody>
                {          
                    instanceobjectRegistry.size>0 && Array.from(instanceobjectRegistry.values()).map((x,index)=>(         
                        <tr key={x.id_instance}>
                            <td><div>{index+1}</div></td>
                            <td><div>{Bool2String(getModelLoading(x.id_instance)!)}</div></td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
})
