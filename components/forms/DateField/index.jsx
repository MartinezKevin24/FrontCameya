import React from 'react'
import {useField} from 'formik'
import Datepicker from 'react-datepicker'
import classNames from 'classnames'

export default function DateField({form, disable, ...props}) {

  const [field, meta] = useField(props.field.name);

  return (
    <div>
      <Datepicker
        dateFormat="MM/dd/yyyy"
        {...field}
        {...props}
        selected={field.value}
        disabled={disable}
        className={classNames(["px-3 form-control w-full border border-gray-darkest rounded-sm h-10 text-sm placeholder:text-gray-dark", 
                              {'bg-gray-lightest':disable}])}
        placeholderText='MM/DD/YEAR'
        onChange={(val) => form.setFieldValue(field.name, new Date(val))}
      />
      {
        meta.error &&
        <div className="flex items-center pt-1 text-red">
          <span className='icon icon-alert mr-1'/>
          <span className="text-sm">
            {props.errorMessage ? props.errorMessage : meta.error}
          </span>
        </div>
      }
    </div>
  )
}
