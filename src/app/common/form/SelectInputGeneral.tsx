import { useField } from "formik";
import React from "react";
import { Form } from "react-bootstrap";
import { OptionBase } from "../../models/Optionbase";

//https://codesandbox.io/s/react-bootstrap-formik-pb831?from-embed=&file=/src/form-select-field.js:0-1270
//https://awesome-linus.com/2020/01/10/react-props-function-type/
//https://www.robinwieruch.de/react-dropdown/
/*
type SelectOption = {
    label: string
    value: string
  }*/

interface Props{
    placeholder: string;
    name:string;
    options: Array<OptionBase>;
    label?: string;
}


export default function SelectInputGeneral(props: Props){
  
    const [field, meta, helpers] = useField(props.name);

    return (
      <Form.Group>
        { props.label && <Form.Label>{props.label}</Form.Label> }
        <Form.Select
          name={props.name}
          value={field.value}
          onChange={(d) => helpers.setValue(d.target.value) }
          onBlur = {() => helpers.setTouched(true)} 
          placeholder={props.placeholder}
        >
          <option hidden>-- Select --</option>
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </Form.Select>
        {meta.touched && meta.error ? (
            <Form.Label>{meta.error}</Form.Label>
        ) : null}
      </Form.Group>
    );

    /*
    return (
      <Form.Group>
        <label>{props.label}</label>
        <select 
          name={props.name}
          value={field.value}
          onChange={(d) => helpers.setValue(d.target.value) }
          onBlur = {() => helpers.setTouched(true)} 
          placeholder={props.placeholder}
        >
          {props.options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
        {meta.touched && meta.error ? (
            <Form.Label>{meta.error}</Form.Label>
        ) : null}
      </Form.Group>
    );*/
  };
  