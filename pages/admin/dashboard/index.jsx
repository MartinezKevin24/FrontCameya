import React, {useState} from 'react'
import FormField from '@/components/forms/FormField'
import { Formik, Form } from 'formik'
import Button from 'components/Button'
import ApiRoutes from 'constants/routes/api'
import * as Yup from 'yup'
import axios from 'axios'

const validationSchema = Yup.object().shape({
  "dni_user": Yup.number()
    .required("Este campo es obligatorio.")
})

export default function Dashboard() {

  const [loading, setLoading] = useState(false)
  const [eliminated, setEliminated] = useState(null)

  const initialValues = {
    dni_user: 0,
  }

  const onSubmit = (values, {resetForm}) => {
    setLoading(true)

    axios.delete(`${ApiRoutes.admin.deleteUser}${values.dni_user}`)
      .then(response => {
        setEliminated(response.data.message)
        setLoading(false)
        resetForm()
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
      })

    setLoading(false)
  }

  return (
    <div className='z-0 sticky overflow-y-auto flex flex-col gap-6 whidth'>
      <div className='flex md:min-w-[300px] flex-col w-full md:max-w-[1000px]'>
        <div className='p-4 bg-white rounded-xl flex flex-col gap-5'>
          <h1 className='text-gray-darkest text-xl font-bold'>Eliminar usuarios</h1>
          <div>
            <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
                {
                  ({values, errors})=>(
                    <Form>
                      <div className="flex flex-col gap-4">
                        <FormField
                          name="dni_user"
                          type={"number"}
                          placeholder="DNI del usuario"/>
                        <Button
                          loading={loading}
                          type="submit">
                            Eliminar
                        </Button>
                      </div>
                    </Form>
                  )
                }
              </Formik>
            </div>
        </div>
      </div>

      <div className='flex md:min-w-[300px] flex-col w-full md:max-w-[1000px]'>
        {
          eliminated &&
          <div className='p-6 bg-white rounded-xl flex flex-col gap-4'>
            <h2 className='text-gray-darkest font-bold text-2xl'>Información del usuario eliminado</h2>
            <div className='flex flex-col gap-2'>
              <p><strong>DNI:</strong> {eliminated?.dni}</p>
              <p><strong>DNI Type:</strong> {eliminated?.dni_type}</p>
              <p><strong>Name:</strong> {eliminated?.name}</p>
              <p><strong>Last Name:</strong> {eliminated?.last_name}</p>
              <p><strong>Email:</strong> {eliminated?.email}</p>
              <p><strong>Phone:</strong> {eliminated?.phone}</p>
              <p><strong>Address:</strong> {eliminated?.address}</p>
              <p><strong>Profile Picture:</strong></p>
              <img src={eliminated?.profile_picture} alt="Profile Picture" className='w-30 h-30' />
              <p><strong>Birth Date:</strong> {eliminated?.birth_date}</p>
              <p><strong>Score:</strong> {eliminated?.score}</p>
              <p><strong>Is Worker:</strong> {eliminated?.is_worker ? 'Yes' : 'No'}</p>
            </div>
          </div>
        }
      </div>          

      <style jsx>{`

        .whidth{
          min-width: calc(100vw - 100px);
        }

        @media (min-width: 768px){
          .whidth{
            min-width: calc(100vw - 320px);
          }
        } 
      
      `}</style>
    </div>
  )
}
