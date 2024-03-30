import { useField } from "formik";
import React from "react";
import { Form } from 'react-bootstrap'

interface Props{
    placeholder: string;
    name:string;
    type?: string;
    label?: string;
    disabled?: boolean;
}

export default function FileInputGeneral(props: Props){
    const[field, meta, helpers] = useField<File>(props.name);

    const { setValue } = helpers;
    
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            //console.log(event.target.files[0]);
            setValue(event.target.files[0]);
        }
    }
    
    return (
        <Form.Group>
            { props.label && <Form.Label>{props.label}</Form.Label> }
            <Form.Control {...props} onChange={handleChange} />
            {meta.touched && meta.error ? (
                <Form.Label>{meta.error}</Form.Label>
            ) : null}
        </Form.Group>
    )
}

/*
import { Field, FieldProps, useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { Form } from 'react-bootstrap'


type FormikImageFieldProps = InputHTMLAttributes<HTMLElement> & {
    label: string;
    name: string;
    component?: string;
  };

const FileInputGeneral: React.FC<FormikImageFieldProps> = ({
    label,
    size: _,
    ...props
    }) => {
    const [field, { error, touched }, helper] = useField<FieldProps>(props);

    return (
        <>
            <Field
                {...field}
                {...props}
                type="file"
                onChange={(e: any) => {
                    helper.setValue(e.currentTarget.files);
                    console.log(e.currentTarget.files);
                }}
                id={field.name}
                className={`bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 ${
                touched && error ? "border-red-600" : ""
                }`}
            />
        </>
    )
}

//https://stackoverflow.com/questions/65051992/cant-upload-file-with-usefield-in-formik


export default FileInputGeneral;

*/