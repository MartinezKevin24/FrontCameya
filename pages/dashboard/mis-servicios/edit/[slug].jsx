import React, { useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import FormError from 'components/forms/FormError';
import ApiRoutes from 'constants/routes/api';
import * as Yup from 'yup'
import axios from 'axios';
import Button from 'components/Button'
import classNames from 'classnames'
import CategoryField from 'components/forms/CategoryField'
import { useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';
import editService from 'atoms/services/editService';
import { useRouter } from 'next/router';
import PageRoutes from 'constants/routes/pages';

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

export default function EditService() {

  const user = useSelector(state => state.login.value.data)
  const [edit, setEdit] = useRecoilState(editService)
  const { push } = useRouter()

  const initialValues = edit ? edit : {
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
    axios.put(ApiRoutes.services.update, values)
      .then(response => {
        resetForm()
        push(PageRoutes.dashboard.services)
        setSubmitting(false)
      })
      .catch(err => {
        console.log(err)
        setSubmitting(false)
      })
  }

  useEffect(()=>{
    if(!edit)
      push(PageRoutes.dashboard.services)
  }, [])

  return (
    <div className='bg-white py-10 px-10 w-full rounded-xl md:min-w-[450px] md:max-w-[1000px] flex flex-col gap-6'>
      <h1 className='text-3xl font-bold text-gray-darkest'>Editando Servicio</h1>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {
          ({values, isSubmitting})=>(
            <Form className='flex flex-col gap-2'>
              <div className='flex flex-row w-full gap-4'>
                <div className={classNames(['w-full flex flex-col gap-3', {"flex items-center" : !open}])}>
                  <div>
                    <label htmlFor='service_title' className='font-bold text-gray-darkest px-1'>Titulo:</label>
                    <Field 
                      name='service_title' 
                      id='service_title'
                      placeholder='Identifica tu servicio'
                      type='text' 
                      className={classNames(["w-full outline-none px-2 py-1 text-gray-darkest border-b-[1px]"])}
                      />
                    <FormError name={"service_title"}/>
                  </div>
                  <div>
                    <label htmlFor='address' className='font-bold text-gray-darkest px-1'>Dirección:</label>
                    <Field 
                      name='address'
                      id='address'
                      placeholder='Dirección' 
                      className={classNames(["w-full outline-none px-2 py-1 border-b-[1px] text-gray-darkest"])}/>
                    <FormError name={"address"}/>
                  </div>
                  <div>
                    <label htmlFor='service_description' className='font-bold text-gray-darkest px-1'>Descripción:</label>
                    <Field 
                      name='service_description'
                      id='service_description'
                      as='textarea'
                      placeholder='Descripción' 
                      className={classNames(["w-full outline-none px-2 py-1 border-b-[1px] resize-none h-20 text-gray-darkest"])}/>
                    <FormError name={"service_description"}/>
                  </div>
                  <div>
                    <label htmlFor='total_price' className='font-bold text-gray-darkest px-1'>Precio Ofertado:</label>
                    <div className='flex flex-row gap-2 items-center mt-1'>
                      <p className='font-bold text-gray-darkest ml-1'>COP$</p>
                      <Field 
                        name='total_price'
                        id='total_price'
                        type='number'
                        placeholder='Precio ofrecido' 
                        className={classNames(["w-full outline-none px-2 py-1 border-b-[1px] text-gray-darkest"])}/>
                    </div>
                    <FormError name={"total_price"}/>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor='categories' className='font-bold text-gray-darkest px-1'>Categorias:</label>
                    <CategoryField name="categories"/>
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                >
                {isSubmitting ? "loading..." : "Editar Servicio"}
              </Button>
            </Form>
          )
        }
      </Formik>
    </div>
  )
}
