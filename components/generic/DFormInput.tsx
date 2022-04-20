import React from 'react';
import { Field, ErrorMessage, ErrorMessageProps } from 'formik';
import style from '@/styles/Forms.module.scss';

const ErrorMessageFC = ErrorMessage as React.FC<ErrorMessageProps>;

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
    <ErrorMessageFC name={id}>
      {(msg) => <div className={style.error}>{msg}</div>}
    </ErrorMessageFC>
  </div>
);

export default DFormInput;
