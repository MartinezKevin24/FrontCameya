import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useSelector } from 'react-redux';
import FormField from 'components/forms/FormField'
import Button from "components/Button";
import DateField from 'components/forms/DateField';

export default function Profile() {

  const user = useSelector(state => state.login.value.data)

  const initalValues = {
    ...user,
    birth_date: new Date(user.birth_date.replace(/-/g, '\/'))
  }

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <div className='w-full'>
      <div className='w-full max-w-3xl py-14 px-10 bg-white rounded-md'>
        <Formik initialValues={initalValues} onSubmit={onSubmit}>
          {
            ({values}) => (
              <Form>
                <div className="flex flex-col gap-3">
                  <h1 className='text-gray-darkest text-2xl font-bold'>Información de Cameya</h1>
                  <div>
                    <label htmlFor="name" className='text-gray-darkest text-sm'>Nombres</label>
                    <FormField
                      name="name"
                      id="name"
                      placeholder="Nombres"/>
                  </div>
                  <div>
                    <label htmlFor="last_name" className='text-gray-darkest text-sm'>Apellidos</label>
                    <FormField
                      name="last_name"
                      id="last_name"
                      placeholder="Apellidos"/>
                  </div>
                  <div className='grid grid-cols-2 gap-4 w-full'>
                    <div>
                      <label htmlFor="dni_type" className='text-gray-darkest text-sm'>Tipo de identificación</label>
                      <Field as="select" name="dni_type" id="dni_type" disabled={true} 
                        className={"border-gray-dark rounded-sm border-[1px] py-[7.5px] bg-gray-300 w-full outline-none"}>
                        <option disabled value="">Tipo de documento</option>
                        <option value={"CC"}>Cédula de ciudadania</option>
                        <option value={"CE"}>Cédula de extranjería</option>
                        <option value={"DNI"}>Documento Nacional de Identidad</option>
                      </Field>
                    </div>
                    <div>
                      <label htmlFor="dni" className='text-gray-darkest text-sm'>Numero de identifiación</label>
                      <FormField
                        name="dni"
                        id="dni"
                        placeholder="Identificación"
                        disabled={true}/>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="birth_date" className='text-gray-darkest text-sm'>Fecha de nacimiento</label>
                    <Field
                      name="birth_date"
                      id="birth_date"
                      component={DateField}/>
                  </div>
                  <div>
                    <label htmlFor="email" className='text-gray-darkest text-sm'>Email</label>
                    <FormField
                      name="email"
                      id="email"
                      placeholder="john@doe.com"
                      disabled={true}/>
                  </div>
                  <div>
                    <label htmlFor="address" className='text-gray-darkest text-sm'>Dirección</label>
                    <FormField
                      name="address"
                      id="address"
                      placeholder="Dirección"/>
                  </div>
                  <div>
                    <label htmlFor="phone" className='text-gray-darkest text-sm'>Teléfono</label>
                    <FormField
                      name="phone"
                      id="phone"
                      placeholder="Telefono"/>
                  </div>
                  <div className='mt-4'>
                    <Button
                      type="submit">
                        Guardar cambios
                    </Button>
                  </div>
                </div>
              </Form>
            )
          }
        </Formik>
      </div>
    </div>
  )
}
