import { observer } from "mobx-react-lite";
import Link from "next/link";
import { Row } from "react-bootstrap";

import { APIURL } from '@/constants';

import { useStore } from "../../../app/stores/store";

export default observer( function ArticleList() {
    const {userStore: {user}} = useStore();
    const {articleStore } = useStore();
    const {articleRegistry} = articleStore;

    return (
        <>
        <Row>
            { 
                Array.from(articleRegistry.values()).map(x=>(                    

                    <div key={x.id_article} className="col-sm-6 col-md-4 col-xl-3 mb-3">
                        <div>
                            <Link href={`/article/${x.id_article}`}>
                                {
                                    <img className="img-thumbnail mb-3" src={APIURL + `/attachmentfiles/file/${x.id_attachment_for_eye_catch}`} alt="" width="480" height="270" loading="lazy"></img>
                                }
                                <h3 className="h5 mb-1">{x.title}</h3>
                            </Link>
                            <p  className="text-muted">{x.short_description}</p>
                            { user && 
                                <>
                                    <Link className="btn btn-outline-primary" href={`/articleedit/${x.id_article}`}>Edit</Link>
                                    <p>{x.status}</p>
                                </>
                             }
                        </div>
                    </div>
            )) }

        </Row>
        </>


    )
})