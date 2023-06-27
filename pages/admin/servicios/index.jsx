import React, {useState} from 'react'
import FormField from '@/components/forms/FormField'
import { Formik, Form } from 'formik'
import Button from 'components/Button'
import ApiRoutes from 'constants/routes/api'
import * as Yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'

const validationSchema = Yup.object().shape({
  "id_service": Yup.number()
    .required("Este campo es obligatorio.")
})

export default function Servicios() {

  const [loading, setLoading] = useState(false)
  const [eliminated, setEliminated] = useState(null)

  const initialValues = {
    id_service: 0,
  }

  const onSubmit = (values, {resetForm}) => {
    setLoading(true)

    axios.delete(`${ApiRoutes.admin.deleteService}${values.id_service}`)
      .then(response => {
        setEliminated(response.data.message)
        setLoading(false)
        resetForm()
      })
      .catch(err => {
        toast.error(`Ups, No existe un servicio con la id:${values.id_service}!`, {
					position: toast.POSITION.TOP_RIGHT
				});
        setLoading(false)
        console.log(err)
      })

    setLoading(false)
  }

  return (
    <div className='z-0 sticky overflow-y-auto flex flex-col gap-6 whidth'>
      <div className='flex md:min-w-[300px] flex-col w-full md:max-w-[1000px]'>
        <div className='p-4 bg-white rounded-xl flex flex-col gap-5'>
          <h1 className='text-gray-darkest text-xl font-bold'>Eliminar Servicio</h1>
          <div>
            <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
                {
                  ({values, errors})=>(
                    <Form>
                      <div className="flex flex-col gap-4">
                        <FormField
                          name="id_service"
                          type={"number"}
                          placeholder="ID del servicio"/>
                        <Button
                          loading={loading}
                          type="submit">
                            Remover Servicio
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
            <h2 className='text-gray-darkest font-bold text-2xl'>Información del servicio eliminado</h2>
            <div className='flex flex-col gap-2'>
              <p><strong>ID:</strong> {eliminated?.id}</p>
              <p><strong>Date Programmed:</strong> {eliminated?.date_programmed}</p>
              <p><strong>Address:</strong> {eliminated?.address}</p>
              <p><strong>Total Price:</strong> {eliminated?.total_price}</p>
              <p><strong>Service Status:</strong> {eliminated?.service_status}</p>
              <p><strong>Client Score:</strong> {eliminated?.client_score}</p>
              <p><strong>Worker Score:</strong> {eliminated?.worker_score}</p>
              <p><strong>Service Description:</strong> {eliminated?.service_description}</p>
              <p><strong>Client DNI:</strong> {eliminated?.client_dni}</p>
              <p><strong>Worker DNI:</strong> {eliminated?.worker_dni ? eliminated?.worker_dni : "No existe"}</p>
              <p><strong>Service Title:</strong> {eliminated?.service_title}</p>
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
