import { observer } from "mobx-react-lite";
import { Col, Form, Row } from "react-bootstrap";

import { useStore } from "../../../app/stores/store";



export default observer( function SubtitleSelector() {

    
    const {instructionStore} = useStore();

    
    const {selectedSubtitleIndex, setSelectedSubtitleIndex} = instructionStore;



    return (

        <div>
            <Row>
                <Col xs={1}>
                    <button 
                        type = 'submit'
                        className={"btn btn-primary"}
                        onClick={()=>{setSelectedSubtitleIndex(selectedSubtitleIndex-1)}} 
                    >
                        PRV
                    </button>
                </Col>
                <Col xs={1}>
                    <Form.Control type="input" value={selectedSubtitleIndex} disabled/>
                </Col>
                <Col xs={1}>
                    <button 
                        type = 'submit'
                        className={"btn btn-primary"}
                        onClick={()=>{setSelectedSubtitleIndex(selectedSubtitleIndex+1)}} 
                    >
                        NEXT
                    </button>
                </Col>
            </Row>                            
        </div>

    )
})