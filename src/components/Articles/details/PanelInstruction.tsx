import { marked } from "marked";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";

import { useStore } from "../../../app/stores/store";




export default observer( function PanelInstruction() {    

    const [descriptionAreaHeight, setDescriptionAreaHeight] = useState(0);
    
    
    const {instructionStore} = useStore();
    const { selectedInstruction } = instructionStore;


    
    
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        
        if(ref.current){
            setDescriptionAreaHeight(document.documentElement.clientHeight - ref.current.getBoundingClientRect().top);
        }
    })



    return (
        <div ref={ref} className="overflow-auto" style={{'height':`${descriptionAreaHeight}px`}}>
            {
                selectedInstruction && <div dangerouslySetInnerHTML={{__html: marked(selectedInstruction.short_description)}}></div>  
            }
        </div>
    )
})