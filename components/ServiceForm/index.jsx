import React , {useState} from 'react'
import { Formik, Form, Field } from 'formik'
import classNames from 'classnames'
import CategoryField from 'components/forms/CategoryField'
import { useSelector } from 'react-redux';
import Button from 'components/Button'

export default function ServiceForm() {

  const user = useSelector(state => state.login.value.data)

  const [open, setOpen] = useState(false)

  const initialValues = {
    title: '',
    service_description: '',
    categories: [],
    client_dni: '',
    date_programed: new Date(),
    address: '',
    price: 0
  }

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <div>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}>
        {
          ({values})=>(
            <Form className='flex flex-col gap-2'>
              <div className='flex flex-row w-full gap-4'>
                <div className='rounded-full overflow-hidden h-12 w-[54px] block'>
                  <img src={user.profile_picture} alt="profile photo" className='w-12 h-12 object-cover'/>
                </div>
                <div className={classNames(['w-full', {"flex items-center" : !open}])}>
                  <Field 
                    name='title' 
                    id='title'
                    placeholder='Identifica tu servicio'
                    type='text' 
                    onClick={()=>setOpen(true)}
                    className={classNames(["w-full outline-none px-2 py-1", { "border-b-[1px] mb-3" : open }])}
                    />
                  {
                    open &&
                    <div className='flex flex-col gap-3'>
                      <Field 
                        name='address'
                        id='address'
                        type='text'
                        placeholder='Dirección' 
                        className={classNames(["w-full outline-none px-2 py-1 border-b-[1px]"])}/>
                      <Field 
                        name='service_description'
                        id='service_description'
                        as='textarea'
                        placeholder='Descripción' 
                        className={classNames(["w-full outline-none px-2 py-1 border-b-[1px] resize-none h-20"])}/>
                      <Field 
                        name='total'
                        id='total'
                        type='number'
                        placeholder='Precio ofrecido' 
                        className={classNames(["w-full outline-none px-2 py-1 border-b-[1px]"])}/>
                      <CategoryField name="categories"/>
                    </div>
                  }
                </div>
              </div>
              {
                open &&
                <Button
                  type="submit"
                  >
                  Enviar
                </Button>
              }
            </Form>
          )
        }
      </Formik>
    </div>
  )
}
