import { observer } from "mobx-react-lite";
import Link from "next/link";
import { Card, Col, Row } from "react-bootstrap";

import { APIURL } from "@/constants";

import { useStore } from "../../../app/stores/store";

export default observer( function AttachmentFileList() {
    const {attachmentfileStore } = useStore();
     const {AttachmentfileRegistry} = attachmentfileStore;

    return (
        <Row>
            { 
                Array.from(AttachmentfileRegistry.values()).map(x=>(
                    <Col key={x.id_file}>
                        <Card style={{ width: '24rem',  height: '30rem'}} className="article-dashboard-card" >
                            <Link href={`/attachmentfile/${x.id_file}`}>
                                <Card.Img variant="top" src={APIURL + `/attachmentfiles/file/${x.id_file}`} />
                            </Link>
                            <Card.Body>
                                <Card.Title>{x.file_name}</Card.Title>
                                <Card.Text>{x.type_data}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
            )) }
        </Row>
    )
})