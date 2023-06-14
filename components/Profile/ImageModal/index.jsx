import React from 'react'
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import ImageField from 'components/forms/ImageField';
import Button from 'components/Button'

const validationSchema = Yup.object().shape({
  image: Yup.mixed().required('Debes seleccionar una imagen'),
});

export default function ImageModal() {

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className='fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-container'>
      <div className='w-11/12 md:w-4/6 bg-white py-6 px-2 md:px-4'>
        <div className='container'>
          <Formik
            initialValues={{ image: null }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({values}) => (
              <Form>
                <ImageField name="image"/>
                {values.image && 
                  <Button type="submit" >
                    Cargar
                  </Button>
                }
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <style jsx>{`

        .bg-container{
          background: rgba(20, 20, 20, 0.50);
        }

      `}</style>
    </div>
  )
}
