import React from 'react'
import {useField} from 'formik'
import FormError from "components/forms/FormError"

export default function FormField({name, type, placeholder, ...props}) {

  const [field, meta] = useField(name);

  return (
    <div>
      <input 
        type={type} 
        id={name}
        {...field}
        name={name}
        placeholder={placeholder}
        className="outline-none border-[1px] border-gray-dark rounded-sm py-2 px-3 placeholder:text-gray-dark h-full w-full bg-transparent"
        {...props}
        />
      {
        meta?.error && <FormError name={field.name}/>
      }
    </div>
  )
}
