
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useEffect } from 'react';

import LoadingComponent from '@/components/layout/LoadingComponents';

import { useStore } from '../../../app/stores/store';
import EditInstanceobjectCreater from './EditInstanceobjectCreater';


export default observer( function EditInstanceobject(){
    
    const {instanceobjectStore} = useStore();
    const {setSelectedInstanceobject, selectedInstanceobject, instanceobjectRegistry, updateInstanceobjects, loading : loadingInstanceobject} = instanceobjectStore;

    //const [instanceobjects, setInstanceobjects] = useState<Instanceobject[]>([]);

    const {modelfileStore} = useStore();
    const {loadModelfiles, ModelfileRegistry, loading : loadingModelfile} = modelfileStore;


    useEffect(()=>{
        //instanceobjectRegistry && setInstanceobjects(Array.from(instanceobjectRegistry.values()));        
        //if(instanceobjectRegistry && !loadingModelfile && !loadingInstanceobject){
        //    setInstanceobjects(Array.from(instanceobjectRegistry.values()));
    //}

    }, [instanceobjectRegistry, loadingModelfile, loadingInstanceobject]);

    

    useEffect(()=>{
        loadModelfiles(false);
    }, []);


    //if(instanceobjects.length<1) return null;
    if(loadingModelfile || loadingInstanceobject) return <LoadingComponent content="Loading ..." />

    return(
        <div>
            <EditInstanceobjectCreater />
            <table className="table">
                <thead>
                    <tr>
                        <th rowSpan={2}>
                            No.
                        </th>
                        <th colSpan={2}>
                            ID
                        </th>
                        <th rowSpan={2}>
                            Part Number
                        </th>
                        <th rowSpan={2}>
                            X
                        </th>
                        <th rowSpan={2}>
                            Y
                        </th>
                        <th rowSpan={2}>
                            Z
                        </th>
                        <th rowSpan={2}>
                            Scale
                        </th>
                    </tr>
                    <tr>
                        <th>
                            Ins.
                        </th>
                        <th>
                            Part
                        </th>
                    </tr>
                </thead>
                <tbody>
                {                                
                    Array.from(instanceobjectRegistry.values()).map((x,index)=>(
                        <tr key={x.id_instance}>
                            <td><div>{index+1}</div></td>
                            <td><div>{x.id_instance}</div></td>
                            <td><div><Link href={`/modelfileedit/${x.id_part}`}>{x.id_part}</Link></div></td>
                            <td>{ModelfileRegistry.get(x.id_part)?.part_number}</td>
                            <td>{x.pos_x}</td>
                            <td>{x.pos_y}</td>
                            <td>{x.pos_z}</td>
                            <td>{x.scale}</td>
                            <td>
                                <button key={x.id_instance}
                                        type = 'button'
                                        className={ x.id_instance === selectedInstanceobject?.id_instance ? "btn btn-secondary" :  "btn btn-outline-secondary"}
                                        onClick={()=>{setSelectedInstanceobject(x.id_instance)}} 
                                    >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

        </div>
    )
})