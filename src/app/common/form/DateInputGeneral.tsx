import { useField } from "formik";
import React from "react";
import { Form } from "react-bootstrap";
import DatePicker, {ReactDatePickerProps} from 'react-datepicker';

export default function DateInputGeneral(props: Partial<ReactDatePickerProps>){
    const[field, meta, helpers] = useField(props.name!);
    return (
        <Form.Group>
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <Form.Label basic color='red'>{meta.error}</Form.Label>
            ) : null}
        </Form.Group>
    )
}