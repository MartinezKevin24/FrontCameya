import React from 'react'
import ErrorRenderer from 'components/forms/ErrorRenderer'
import {ErrorMessage} from 'formik'

export default function FormError({name}) {
  return (
      <ErrorMessage
          name={name}
          component={ErrorRenderer}
          className="text-red text-sm pt-1"/>
  )
}
