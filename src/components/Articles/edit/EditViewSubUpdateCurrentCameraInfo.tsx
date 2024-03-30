import { useFormikContext } from 'formik';
import { useEffect, useRef } from 'react';
import type { Quaternion, Vector3 } from 'three';


interface Props{
    camera_pos: Vector3;
    quaternion: Quaternion;
    orbit_target: Vector3;
}

const EditViewSubUpdateCurrentCameraInfo = ({camera_pos, quaternion, orbit_target} : Props) => {

    const {
      setFieldValue,
    } = useFormikContext(); 


    const reqIdRef = useRef<number>();

    const loop = () => {
        // ループしたい処理
        reqIdRef.current = requestAnimationFrame(loop);

        
        setFieldValue("cam_pos_x",camera_pos.x);
        setFieldValue("cam_pos_y",camera_pos.y);
        setFieldValue("cam_pos_z",camera_pos.z);
        
        setFieldValue("cam_quat_x",quaternion.x);
        setFieldValue("cam_quat_y",quaternion.y);
        setFieldValue("cam_quat_z",quaternion.z);
        setFieldValue("cam_quat_w",quaternion.w);

        setFieldValue("obt_target_x",orbit_target.x);
        setFieldValue("obt_target_y",orbit_target.y);
        setFieldValue("obt_target_z",orbit_target.z);
    };

    useEffect(() => {
        loop();
        return () => cancelAnimationFrame(reqIdRef.current!);
    }, []);

    return ( null );
  }


export default  EditViewSubUpdateCurrentCameraInfo;