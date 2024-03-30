import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import type { Vector3 } from 'three';


interface Props{
    pos_annotation: Vector3;
    pos_drug: Vector3;
}

const EditAnnotationSubUpdatePos = ({pos_annotation,pos_drug} : Props) => {

    const {
      setFieldValue,
    } = useFormikContext();

    useEffect(() => {

        setFieldValue("pos_x",pos_annotation.x + pos_drug.x);
        setFieldValue("pos_y",pos_annotation.y + pos_drug.y);
        setFieldValue("pos_z",pos_annotation.z + pos_drug.z);
        //console.log(pos);
    }, [pos_drug]);

    return ( null );
  }


export default  EditAnnotationSubUpdatePos;