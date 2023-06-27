import React, {useState} from 'react'
import FormField from '@/components/forms/FormField'
import { Formik, Form } from 'formik'
import Button from 'components/Button'
import ApiRoutes from 'constants/routes/api'
import * as Yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'

const validationSchema = Yup.object().shape({
  "name": Yup.string()
    .required("Este campo es obligatorio.")
})

const validationSchemaEliminar = Yup.object().shape({
  "id": Yup.number()
    .min(1, 'El valor debe ser mayor a 1')
    .required("Este campo es obligatorio.")
})

export default function Categorias() {

  const [loading, setLoading] = useState(false)
  const [loadingEliminar, setLoadingEliminar] = useState(false)
  const [eliminated, setEliminated] = useState(null)

  const initialValues = {
    name: "",
  }

  const initialValuesEliminar = {
    id: 0,
  }

  const onSubmit = (values, {resetForm}) => {
    setLoading(true)

    axios.post(`${ApiRoutes.admin.createCategory}`, values)
      .then(response => {
        toast.success(`Categoria "${values.name}" registrada exitosamente!`, {
					position: toast.POSITION.TOP_RIGHT
				});
        setLoading(false)
        resetForm()
      })
      .catch(err => {
        toast.error(`Ups, hemos tenido un error al crear las categorias!`, {
					position: toast.POSITION.TOP_RIGHT
				});
        setLoading(false)
        console.log(err)
      })
  }

  const onSubmitEliminar = (values, {resetForm}) => {
    setLoadingEliminar(true)

    axios.delete(`${ApiRoutes.admin.deleteCategory}${values.id}`)
      .then(response => {
        toast.success(`Categoria "${response.data.message.name}" eliminada exitosamente!`, {
					position: toast.POSITION.TOP_RIGHT
				});
        setEliminated(response.data.message)
        setLoadingEliminar(false)
        resetForm()
      })
      .catch(err => {
        toast.error(`Categoria con id:"${values.id}" no encontrada!`, {
					position: toast.POSITION.TOP_RIGHT
				});
        setLoadingEliminar(false)
        console.log(err)
      })
  }

  return (
    <div className='z-0 sticky overflow-y-auto flex flex-col gap-6 whidth'>
      <div className='flex md:min-w-[300px] flex-col w-full md:max-w-[1000px]'>
        <div className='p-4 bg-white rounded-xl flex flex-col gap-5'>
          <h1 className='text-gray-darkest text-xl font-bold'>Crear categorias</h1>
          <div>
            <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
              {
                ({values, errors})=>(
                  <Form>
                    <div className="flex flex-col gap-4">
                      <FormField
                        name="name"
                        placeholder="Nombre de la nueva categoria"/>
                      <Button
                        loading={loading}
                        type="submit"
                        color="green">
                          Agregar categoria
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
        <div className='p-4 bg-white rounded-xl flex flex-col gap-5'>
          <h1 className='text-gray-darkest text-xl font-bold'>Eliminar categorias</h1>
          <div>
            <Formik onSubmit={onSubmitEliminar} initialValues={initialValuesEliminar} validationSchema={validationSchemaEliminar}>
              {
                ({values, errors})=>(
                  <Form>
                    <div className="flex flex-col gap-4">
                      <FormField
                        name="id"
                        type={"number"}
                        placeholder="Nombre de la categoria a eliminar"/>
                      <Button
                        loading={loadingEliminar}
                        type="submit">
                          Eliminar categoria
                      </Button>
                    </div>
                  </Form>
                )
              }
            </Formik>
          </div>
        </div>
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
