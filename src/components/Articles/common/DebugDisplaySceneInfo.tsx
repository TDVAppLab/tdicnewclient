import { useEffect, useRef, useState } from 'react';
import { Quaternion, Vector3 } from 'three';

import { useStore } from "../../../app/stores/store";
import Bool2String from './Bool2String';



// ループで実行したい処理 を callback関数に渡す
const useAnimationFrame = (callback = () => {}) => {
    const reqIdRef = useRef<number>();
    const loop = () => {
      reqIdRef.current = requestAnimationFrame(loop);
      callback();
    };
  
    useEffect(() => {
      reqIdRef.current = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(reqIdRef.current!);
    }, []);
  };
  



  const DebugDisplaySceneInfo = () => {
    const {sceneInfoStore} = useStore();
    const [cam_pos, setCamPos] = useState(new Vector3(0,0,0));
    const [target, setTarget] = useState(new Vector3(0,0,0));
    const [quaternion, setQuaternion] = useState(new Quaternion(0,0,0,0));
    const [mode_transport, setmode_transport] = useState(false);
    
    //const {sceneInfoStore} = useStore();
//    const [quaternion, setQuaternion] = useState(new Quaternion(0,0,0,0));
  
    useAnimationFrame(() => {
      setCamPos(new Vector3(sceneInfoStore?.camera_pos?.x!,sceneInfoStore?.camera_pos?.y!,sceneInfoStore?.camera_pos?.z!));
      setTarget(new Vector3(sceneInfoStore?.orbit_target?.x!,sceneInfoStore?.orbit_target?.y!,sceneInfoStore?.orbit_target?.z!));
      setQuaternion(new Quaternion(sceneInfoStore?.quaternion?.x!,sceneInfoStore?.quaternion?.y!,sceneInfoStore?.quaternion?.z!,sceneInfoStore?.quaternion?.w!));
      setmode_transport(sceneInfoStore.mode_transport);
    });
  
    return (
      <div>
        <p>Mode TSP:{Bool2String(mode_transport)}</p>
        <table className="table">
            <thead>
                <tr>
                    <th>Elementname</th>
                    <th>X</th>
                    <th>Y</th>
                    <th>Z</th>
                    <th>W</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Camera Position</td>
                    <td>{cam_pos?.x.toFixed(4)}</td>
                    <td>{cam_pos?.y.toFixed(4)}</td>
                    <td>{cam_pos?.z.toFixed(4)}</td>
                    <td></td>
                </tr>                        
                <tr>
                    <td>Camera Look At</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Camera Quaternion</td>
                    <td>{quaternion?.x.toFixed(4)}</td>
                    <td>{quaternion?.y.toFixed(4)}</td>
                    <td>{quaternion?.z.toFixed(4)}</td>
                    <td>{quaternion?.w.toFixed(4)}</td>
                </tr>
                <tr>
                    <td>Orbit Control Target</td>
                    <td>{target?.x.toFixed(4)}</td>
                    <td>{target?.y.toFixed(4)}</td>
                    <td>{target?.z.toFixed(4)}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>

      </div>
    );
  };


  
  export default DebugDisplaySceneInfo;