import { useField } from "formik";
import React from "react";
import { Form } from 'react-bootstrap'

interface Props{
    placeholder: string;
    name:string;
    rows:number;
    label?: string;
}

export default function TextAreaGeneral(props: Props){
    const[field, meta] = useField(props.name);
    return (
        <>
        <Form.Group>
            { props.label && <Form.Label>{props.label}</Form.Label> }
            <Form.Control as="textarea" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Form.Label>{meta.error}</Form.Label>
            ) : null}
        </Form.Group>
        </>
    )
}