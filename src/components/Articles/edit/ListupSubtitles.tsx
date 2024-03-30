import { observer } from 'mobx-react-lite';

import { useStore } from "../../../app/stores/store";


export default observer( function ListupSubtitles() {

    
    const {instructionStore} = useStore();
    const {selectedSubtitles} = instructionStore;

    


    return (
        <div>

            <table className="table">
                <thead>
                    <tr>
                        <th>
                            No.
                        </th>
                        <th>
                            MEMO
                        </th>
                    </tr>
                </thead>
                <tbody>
                {                                
                    selectedSubtitles?.map((x,index)=>(                        

                        <tr key={index.toString()}>
                            <td>{index}</td>
                            <td>{x}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
})




