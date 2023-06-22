import React from 'react'
import { Formik, Form, Field } from 'formik'
import classNames from 'classnames'
import CategoryField from 'components/forms/CategoryField'
import { useSelector } from 'react-redux';
import Button from 'components/Button'
import { useRecoilState } from 'recoil'
import openPostState from 'atoms/services/openPostState'
import FormError from 'components/forms/FormError';
import ApiRoutes from 'constants/routes/api';
import * as Yup from 'yup'
import axios from 'axios';

const validationSchema = Yup.object().shape({
  "service_title": Yup.string()
    .required("Este campo es obligatorio."),
  "address": Yup.string()
    .required("Este campo es obligatorio."),
  "service_description": Yup.string()
    .required("Este campo es obligatorio."),
  "total_price": Yup.number()
    .min(1, 'El valor debe ser mayor a 1')
    .required("Este campo es obligatorio."),
  "categories": Yup.array()
    .min(1, 'Debes seleccionar al menos una categoría')
    .of(Yup.string())
})

export default function ServiceForm() {

  const user = useSelector(state => state.login.value.data)
  const [open, setOpen] = useRecoilState(openPostState);

  const initialValues = {
    service_title: '',
    service_description: '',
    categories: [],
    client_dni: user.dni,
    date_programmed: new Date(),
    address: '',
    total_price: 0,
    service_status: 0
  }

  const onSubmit = (values, {resetForm, setSubmitting}) => {
    axios.post(ApiRoutes.services.create, values)
      .then(response => {
        resetForm()
        setSubmitting(false)
        setOpen(false)
      })
      .catch(err => {
        console.log(err)
        setSubmitting(false)
      })
  }

  return (
    <div>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {
          ({values, isSubmitting})=>(
            <Form className='flex flex-col gap-2'>
              <div className='flex flex-row w-full gap-4'>
                <div className='rounded-full overflow-hidden h-12 w-[54px] block'>
                  <img src={user.profile_picture} alt="profile photo" className='w-12 h-12 object-cover'/>
                </div>
                <div className={classNames(['w-full', {"flex items-center" : !open}])}>
                  <Field 
                    name='service_title' 
                    id='service_title'
                    placeholder='Identifica tu servicio'
                    type='text' 
                    onClick={()=>setOpen(true)}
                    className={classNames(["w-full outline-none px-2 py-1 text-gray-darkest", { "border-b-[1px] mb-3" : open }])}
                    />
                  {
                    open &&
                    <div className='flex flex-col gap-3'>
                      <FormError name={"service_title"}/>
                      <Field 
                        name='address'
                        id='address'
                        placeholder='Dirección' 
                        className={classNames(["w-full outline-none px-2 py-1 border-b-[1px] text-gray-darkest"])}/>
                      <FormError name={"address"}/>
                      <Field 
                        name='service_description'
                        id='service_description'
                        as='textarea'
                        placeholder='Descripción' 
                        className={classNames(["w-full outline-none px-2 py-1 border-b-[1px] resize-none h-20 text-gray-darkest"])}/>
                      <FormError name={"service_description"}/>
                      <div className='flex flex-row gap-2 items-center'>
                        <p className='font-bold text-gray-darkest ml-1'>COP$</p>
                        <Field 
                          name='total_price'
                          id='total_price'
                          type='number'
                          placeholder='Precio ofrecido' 
                          className={classNames(["w-full outline-none px-2 py-1 border-b-[1px] text-gray-darkest"])}/>
                      </div>
                      <FormError name={"total_price"}/>
                      <CategoryField name="categories"/>
                    </div>
                  }
                </div>
              </div>
              {
                open &&
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  >
                  {isSubmitting ? "loading..." : "Enviar"}
                </Button>
              }
            </Form>
          )
        }
      </Formik>
    </div>
  )
}
