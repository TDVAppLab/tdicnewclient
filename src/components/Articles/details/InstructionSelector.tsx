import { observer } from "mobx-react-lite";

import { useStore } from "../../../app/stores/store";




export default observer( function InstructionSelector() {

    const {instructionStore} = useStore();
    const {selectedInstruction, setSelectedInstruction, instructionRegistry} = instructionStore;


    return (
        <>
            {
                Array.from(instructionRegistry.values()).map(x=>(
                    <button key={x.id_instruct}
                        type = 'submit'
                        className={x.id_instruct===selectedInstruction?.id_instruct ? "btn btn-primary" : "btn btn-outline-primary"}
                        onClick={()=>{setSelectedInstruction(x.id_instruct)}} 
                    >
                        {x.title}
                    </button>
                ))
            }
        </>
    )
})