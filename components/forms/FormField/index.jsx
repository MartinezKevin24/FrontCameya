import React from 'react'
import {useField} from 'formik'
import FormError from "components/forms/FormError"
import classNames from 'classnames';

export default function FormField({name, type, placeholder, disabled = false,...props}) {

  const [field, meta] = useField(name);

  return (
    <div>
      <input 
        type={type} 
        id={name}
        {...field}
        name={name}
        placeholder={placeholder}
        className={classNames(["outline-none border-[1px] border-gray-dark rounded-sm py-2 px-3 placeholder:text-gray-dark h-full w-full bg-transparent",
          {"bg-gray-300 text-gray-500" : disabled}])}
        disabled={disabled}
        {...props}
        />
      {
        meta?.error && <FormError name={field.name}/>
      }
    </div>
  )
}
