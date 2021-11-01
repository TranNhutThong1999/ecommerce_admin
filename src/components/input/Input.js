import './Input.css';
import React from 'react';
import Form, { Field } from 'rc-field-form';
const Input = ((props) => {
    const { name, error, input, rules } = props;
    // if (props.input.type === 'select') {
    //     return (
    //     <div className={`input-form d-flex ${error ? 'error':''}`}>
    //                     <label>Gender</label>
    //                     <select  value={props.value} onChange={props.onChange} {...props.input} >
    //                     <option value="Nam" > Nam</option>
    //                     <option value ="Nu" >Nu</option>
    //                   </select>
    //           { error && <h5>{error.message}</h5>}
    //       </div>
    //     )
    // }
    return (
        <div className={`input-form d-flex ${error? 'error':''}`}>
            <label htmlFor={props.id} > {props.lable}</label>
            <Field name={name} rules={rules}>
            <input {...input} />
            </Field>
            { error && <h5>{error}</h5>}
          </div>
    );
});
export default Input;