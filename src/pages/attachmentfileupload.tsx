import React, {useState} from 'react';

import agent from '@/app/api/agent';




function AttachmentfileUpload() {

  const [file, setFile] = useState<File>()


  function handleChange(event: any) {
    console.log(event);
    if (event.target.files) {
        setFile(event.target.files[0]);

    }
  }
  
  function handleSubmit(event: any) {
    event.preventDefault()
    const formData = new FormData();

    if(file){
        
        formData.append('file', file);
        
        agent.Attachmentfiles.fileupload(formData).then((response) => {

        });

    }

  }

  return (
    <div className="App">
        <form onSubmit={handleSubmit}>
          <h1>Attachment File Upload</h1>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
    </div>
  );
}

export default AttachmentfileUpload;