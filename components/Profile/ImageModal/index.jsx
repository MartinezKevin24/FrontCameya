import React, { useEffect } from 'react'
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import ImageField from 'components/forms/ImageField';
import Button from 'components/Button'
import { useRef } from 'react';
import ApiRoutes from 'constants/routes/api';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { insertData } from 'store/User/reducer';

const validationSchema = Yup.object().shape({
  image: Yup.mixed().required('Debes seleccionar una imagen'),
});

export default function ImageModal({setOpen}) {

  const refModal = useRef()
  const refFather = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.login?.value?.data)

  const handleClickOutside = (e) => {
    if(refModal.current && !refModal.current.contains(e.target) && refFather.current.contains(e.target))
      setOpen(false)
  }

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('image', values.image);
    formData.append('dni', values.dni);

    axios.post(ApiRoutes.profile.change_photo, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(res => {
        dispatch(insertData({data: {...user, profile_picture: res?.data?.message}}))
        setOpen(false)
      })
      .catch(err => console.log(err))
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [refModal.current]);

  return (
    <div ref={refFather} className='fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-container'>
      <div ref={refModal} className='w-11/12 md:w-4/6 bg-white py-6 px-2 md:px-4 relative'>
        <div className='bg-purple hover:bg-purple-dark focus:bg-purple-darkest w-8 h-7 flex justify-center items-center text-white 
          absolute top-0 right-0 cursor-pointer text-2xl' onClick={()=>setOpen(false)}>
          x
        </div>
        <div className='container'>
          <Formik
            initialValues={{ image: null, dni: user?.dni }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({values}) => (
              <Form>
                <ImageField name="image"/>
                {values.image && 
                  <Button type="submit" className='mt-6' >
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
