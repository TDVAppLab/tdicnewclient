import { useField } from "formik";
import React from "react";
import { Form } from 'react-bootstrap'
//https://www.codedaily.io/courses/Formik-for-Beginners/Checkbox-Field

interface Props{
    //placeholder: string;
    name:string;
    //type: string;
    label?: string;
}

export default function CheckBoxGeneral(props: Props){
    const[field, meta] = useField({ name: props.name, type: "checkbox" }
        );
    //console.log(field);
    return (
        <>
            <Form.Check {...field} type='checkbox' label={props.label} />
            {meta.touched && meta.error ? (
                <Form.Label>{meta.error}</Form.Label>
            ) : null}
        </>
    )
}