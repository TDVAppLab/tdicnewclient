import { useFormikContext } from 'formik';
import { marked } from 'marked';
import { useEffect } from 'react';

import type { Instruction } from '../../../app/models/instruction';




const PreviewInstructionDescription = () => {

    const {
      values,
    } = useFormikContext<Instruction>(); 


    useEffect(() => {
        }, [values.short_description]
    );

    
    return <div dangerouslySetInnerHTML={{__html: marked(values.short_description)}}></div>;
}

export default PreviewInstructionDescription;