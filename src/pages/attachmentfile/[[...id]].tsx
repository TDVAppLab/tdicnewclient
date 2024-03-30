import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useStore } from "@/app/stores/store";
import LoadingComponent from "@/components/layout/LoadingComponents";
import { APIURL } from "@/constants";




export default observer( function AttachmentFileDetails() {

    
    const router = useRouter()
    const { id } = router.query
    
    const {attachmentfileStore} = useStore();
    const {loadAttachmentfile, selectedAttachmentfile, loading} = attachmentfileStore;

    useEffect(()=> {

        if(id) {
            loadAttachmentfile(id[0]);
        }

    }, [id])

    
    if(loading) return (<LoadingComponent />);


    return (
        <>
         
         


            <div className="row">

            <div className="col-md-3"></div>


            <div className="col-md-6">

                <h4>Attachment Management</h4>

                <Link href="/attachmentfiles">Return Index</Link>


                <dl className="row">
                    <dt className="col-sm-2">
                        Image
                    </dt>
                    <dd className="col-sm-12">
                        {
                         id && <img src={APIURL + `/attachmentfiles/file/${id}`} alt="" loading="lazy"></img>
                        }
                    </dd>

                    <dt className="col-sm-2">
                        IF File
                    </dt>
                    <dd className="col-sm-10">
                        {id}
                    </dd>
                    <dt className="col-sm-2">
                        File Name
                    </dt>
                    <dd className="col-sm-10">
                        {selectedAttachmentfile?.file_name}
                    </dd>
                    <dt className="col-sm-2">
                        DATA TYPE
                    </dt>
                    <dd className="col-sm-10">
                        {selectedAttachmentfile?.type_data}
                    </dd>
                    <dt className="col-sm-2">
                        FileSize[KB]
                    </dt>
                    <dd className="col-sm-10">
                        {
                            (selectedAttachmentfile ? selectedAttachmentfile.file_length : 0) / 1000
                        }
                    </dd>
                    <dt className="col-sm-2">
                        Item Link
                    </dt>
                    <dd className="col-sm-10">
                        {selectedAttachmentfile?.itemlink}
                    </dd>
                    <dt className="col-sm-2">
                        license
                    </dt>
                    <dd className="col-sm-10">
                        {selectedAttachmentfile?.license}
                    </dd>
                </dl>
                <div>
                    <Link href="/attachmentfiles">Return Index</Link> |
                    <Link href={`/attachmentfileedit/${id}`}>Edit</Link>
                </div>
            </div>

            </div>
        </>
    )
})

