import { observer } from "mobx-react-lite";

import { useStore } from "../../../app/stores/store";


export default observer( function ShowScreenObjectInfo() {

    const { modelFileEditorStore } = useStore();

    return (
        <>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>UUID</th>
                            <th>TYPE</th>
                            <th>NAME</th>
                            <th>VISIBLE</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        Array.from(modelFileEditorStore.sceneObjects.values()).map((x,index)=>(

                            <tr key={x.uuid}>
                                <td>{index}</td>
                                <td>{x.uuid}</td>
                                <td>{x.type}</td>
                                <td>{x.name}</td>
                                <td>{x.visible ? "yes" : "no" }</td>
                            </tr>
                            ))
                    }
                    
                    </tbody>
                </table>
            </div>
        </>
    )
  
})