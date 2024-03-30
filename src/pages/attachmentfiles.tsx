import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';

import { useStore } from '@/app/stores/store';
import AttachmentFileList from '@/components/attachmentfiles/dashboard/AttachmentFileList';
import LoadingComponent from '@/components/layout/LoadingComponents';

//import AttachmentFileList from './AttachmentFileList';

export default observer(function AttachmentFileDashboard() {        
    const {attachmentfileStore} = useStore();
    const {loadAttachmentfiles, AttachmentfileRegistry} = attachmentfileStore;
  
    useEffect(() => {
        if(AttachmentfileRegistry.size <= 1) loadAttachmentfiles();
    },[AttachmentfileRegistry.size, loadAttachmentfiles])
  
  
    if(attachmentfileStore.loading) return <LoadingComponent content='Loading attachments...' />



    return(
        <Container>
            <Link href={`/attachmentfileupload`}>
                <h3 >Create</h3>
            </Link>
            
            <hr />
            <AttachmentFileList />
        </Container>
    )
})