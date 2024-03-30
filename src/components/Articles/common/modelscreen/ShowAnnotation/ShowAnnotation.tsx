import "./styles.css"

import { Html, PivotControls, Sphere } from "@react-three/drei"
import React, { useEffect, useState } from 'react';
import { Matrix4, Vector3 } from 'three';

import type { Annotation } from '../../../../../app/models/Annotation';
import type { AnnotationDisplay } from '../../../../../app/models/AnnotationDisplay';


interface Props {
    annotationMap : Map<number, Annotation>;
    annotationDisplayMap : Map<number, AnnotationDisplay>;
    selectedAnnotationId : number | undefined;
    setSelectedAnnotationPosMoved: (selectedAnnotationPosMoved: Vector3) => void;
    isShowSelectedAnnotationDetailOnScreen : boolean;
    setSelectedAnnotation: (id_annotation: number) => Promise<Annotation | undefined>;
    isEditmode: boolean;
}


const ShowAnnotation  = ({annotationMap, annotationDisplayMap, selectedAnnotationId, setSelectedAnnotationPosMoved, isShowSelectedAnnotationDetailOnScreen, setSelectedAnnotation, isEditmode }: Props) => {
  const [matrix, setMatrix] = useState<Matrix4>();
  const [vec, setVec] = useState<Vector3>(new Vector3(0,0,0));

  
  useEffect(()=> {
    const m = new Matrix4();

    m.set
       (1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1);

    setMatrix(m);
    setVec(new Vector3(0,0,0));

  }, [selectedAnnotationId, annotationMap.get(selectedAnnotationId ? selectedAnnotationId : 0)])
  
  return (
    
        <>
        {
          Array.from(annotationMap.values()).map(annotation=>(
            
            (annotation.id_annotation === selectedAnnotationId) ?
              <SowAnnotationSub 
                annotation={annotation}
                isDisplayDescription = {annotationDisplayMap.get(annotation.id_annotation)?.is_display_description ? annotationDisplayMap.get(annotation.id_annotation)!.is_display_description : false}
                isSelected = {annotation.id_annotation === selectedAnnotationId}
                key={annotation.id_annotation}
                isShowHtml={isShowSelectedAnnotationDetailOnScreen} 
                pos={new Vector3(annotation.pos_x+vec.x,annotation.pos_y+vec.y,annotation.pos_z+vec.z)}
                setSelectedAnnotation={setSelectedAnnotation}
                isEditmode={isEditmode}
              />
            :
            (annotationDisplayMap.get(annotation.id_annotation)?.is_display ||annotation.id_annotation === selectedAnnotationId)
              && <SowAnnotationSub
                    annotation={annotation}
                    isDisplayDescription = {annotationDisplayMap.get(annotation.id_annotation)?.is_display_description ? annotationDisplayMap.get(annotation.id_annotation)!.is_display_description : false}
                    isSelected = {annotation.id_annotation === selectedAnnotationId}
                    key={annotation.id_annotation}
                    isShowHtml={true} 
                    pos={new Vector3(annotation.pos_x,annotation.pos_y,annotation.pos_z)}
                    setSelectedAnnotation={setSelectedAnnotation}
                    isEditmode={isEditmode}
                 />
          ))          
        }
        <PivotControls anchor={[0,0,0,]} depthTest={true} scale={1} lineWidth={2} offset={[0,0,0]} matrix={matrix}
          onDrag={(l,deltaL,w,deltaW) => {const v = new Vector3(); setSelectedAnnotationPosMoved(v.setFromMatrixPosition(w)); setVec(v.setFromMatrixPosition(w));}}
        >
        {
        selectedAnnotationId &&
          <Sphere scale={0} position={[annotationMap.get(selectedAnnotationId)?.pos_x!,annotationMap.get(selectedAnnotationId)?.pos_y!, annotationMap.get(selectedAnnotationId)?.pos_z!]}>
              <meshBasicMaterial color="#f3f3f3" />
          </Sphere>
        }
        </PivotControls>
        </>
    )
}


interface SubProps {
  annotation : Annotation;
  isDisplayDescription : boolean;
  isSelected : boolean;
  isShowHtml : boolean
  pos : Vector3;
  setSelectedAnnotation: (id_annotation: number) => Promise<Annotation | undefined>;
  isEditmode: boolean;
  //ref : useref

}


const SowAnnotationSub = ({annotation, isDisplayDescription, isSelected, isShowHtml, pos, setSelectedAnnotation, isEditmode} : SubProps) => {

  return (
    //<group position={[annotation.pos_x,annotation.pos_y,annotation.pos_z]}>
    <React.Fragment>
      { isShowHtml &&
      <Html
        className={ 
          `model-annotation `
          + (isDisplayDescription ? `model-annotation-displaytext ` : `` ) 
          + (isSelected ? `model-annotation annotation_editmode ` : `` )
        }
        position={new Vector3(pos.x+0.5,pos.y+0.5,pos.z+0.5)}
      >
        <div
        >
          <h4
            onClick={()=>{isEditmode && setSelectedAnnotation(annotation.id_annotation)}}
          >
            {annotation.title}
          </h4>                
          {(isDisplayDescription || isSelected) && <>{annotation.description1}</>}
        </div>
      </Html>
      }
      <arrowHelper args={[new Vector3( -0.5, -0.5, -0.5 ).normalize(), new Vector3(pos.x+0.5,pos.y+0.5,pos.z+0.5),Math.sqrt(0.5*0.5*3), "red"]} />            
    </React.Fragment>
    //</group>
  )
}






export default ShowAnnotation;