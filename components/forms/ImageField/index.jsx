import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';
import { useField } from 'formik';
import FormError from "components/forms/FormError"
import { useRef } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa'
import Button from 'components/Button'

export default function ImageField({name, ...props}) {

  const { setFieldValue } = useFormikContext()
  const [ field , meta] = useField(name);
  const [ preview, setPreview ] = useState(null)
  const imageRef = useRef();

  useEffect(()=>{
    if (field.value instanceof File) {
      const reader = new FileReader();
      reader.readAsDataURL(field.value);
      reader.onload = () => {
        setPreview(reader.result);
      };
    }
  },[field.value])

  return (
    <div className='flex justify-center flex-col gap-6'>

      <div className='w-full min-h-[470px] max-h-[470px] flex justify-center items-center bg-gray-lightest border-dashed border-[2px] 
        border-gray cursor-pointer py-4 border-spacing-5 overflow-hidden' onClick={()=>imageRef.current.click()}>
        <div className='max-w-lg flex justify-center items-center'>
          {
            field.value ?
            <img src={preview} alt="Photo profile" className='w-8/12 h-full'/>
            :
            <div className='flex flex-col justify-center items-center text-gray-darkest'>
              <p className='text-8xl'><FaCloudUploadAlt/></p>
              <p className='text-center font-bold text-xl'>Sube una foto de perfil</p>
            </div>
          }
        </div>
      </div>

      <Button
        type="button"
        hidden={field.value}
        onClick={()=>imageRef.current.click()}
        >
        Subir
      </Button>

      <input 
        type="file" 
        hidden
        ref={imageRef}
        name={name} 
        id={name}
        {...props}
        onChange={(e)=>{
          setFieldValue(name, e.target.files[0]);
        }}/>

      {
        meta?.error && <FormError name={field.name}/>
      }
      
    </div>
  )
}
