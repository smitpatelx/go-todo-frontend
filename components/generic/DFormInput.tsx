import { FunctionComponent } from 'react';
import style from '@/styles/Forms.module.scss';
import { Field, ErrorMessage } from 'formik';

type DFormInputProps = {
  type: string,
  id: string,
  label: string,
  placeholder: string,
  autoComplete: string,
};

const DFormInput: FunctionComponent<DFormInputProps> = ({
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
