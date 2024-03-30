import { observer } from 'mobx-react-lite';

import { useStore } from "../../../app/stores/store";


export default observer( function MaterialDisplay() {

    const {instanceobjectStore} = useStore();
    const {materialInfoRegistry} = instanceobjectStore;
    
    


    return (
        <div>

            <table className="table">
                <thead>
                    <tr>
                        <th>
                            
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Link
                        </th>
                        <th>
                            Auther
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {                                
                        Array.from(materialInfoRegistry.values()).map((x,index)=>(
                            <tr key={x.id_part}>
                                <td>{index+1}</td>
                                <td>{x.part_number}</td>
                                <td><a href={x?.itemlink} target="_blank" rel="noopener noreferrer">Link</a></td>
                                <td>{x.author}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
})
