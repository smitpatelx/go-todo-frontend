import React from 'react';
import { Field, ErrorMessage } from 'formik';
import style from '@/styles/Forms.module.scss';

type DFormInputProps = {
  type: string,
  id: string,
  label: string,
  placeholder: string,
  autoComplete: string,
};

const DFormInput = ({
  type,
  id,
  label,
  placeholder,
  autoComplete,
}: DFormInputProps) => (
  <div className={style.inputContainer}>
    <label htmlFor={id}>{label}</label>
    <Field
      autoComplete={autoComplete}
      id={id}
      name={id}
      placeholder={placeholder}
      type={type}
    />
    <ErrorMessage name={id}>
      {(msg) => <div className={style.error}>{msg}</div>}
    </ErrorMessage>
  </div>
);

export default DFormInput;
