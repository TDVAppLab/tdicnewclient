import { observer } from "mobx-react-lite";
import Link from "next/link";
import { Row } from "react-bootstrap";

import { useStore } from "@/app/stores/store";

export default observer( function ModelfileList() {
    const { modelfileStore } = useStore();
    const {ModelfileRegistry} = modelfileStore;

    return (
        <Row>
            { 
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                No.
                            </th>
                            <th>
                                ID
                            </th>
                            <th>
                                Part Number
                            </th>
                            <th>
                                Format
                            </th>
                            <th>
                                Length
                            </th>
                            <th>
                                License
                            </th>
                            <th>
                                Source
                            </th>
                            <th>
                                Author
                            </th>
                            <th>
                                Refferanced
                            </th>
                            <th>
                                Edit
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {                                
                        Array.from(ModelfileRegistry.values()).map((x,index)=>(                     
    
                            <tr key={x.id_part}>
                                <td>{index+1}</td>
                                <td>{x.id_part}</td>
                                <td>{x.part_number}</td>
                                <td>{x.format_data}</td>
                                <td>{x.file_length.toLocaleString()}</td>
                                <td>{x.license}</td>
                                <td><a href={x?.itemlink} target="_blank" rel="noopener noreferrer">Link</a></td>
                                <td>{x.author}</td>
                                <td>{x.count_use_instance}</td>
                                <td><Link href={`/modelfileedit/${x.id_part}`}>Edit</Link></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            }
        </Row>


    )
})