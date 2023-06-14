import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';
import { useField } from 'formik';
import FormError from "components/forms/FormError"
import { useRef } from 'react';
import { AiFillCamera } from 'react-icons/ai'
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
    <div className='flex justify-center gap-6'>

      {
        field.value &&
        <div className='w-full flex justify-center items-center bg-gray-lightest border-dashed border-[2px] border-gray mb-6 py-4 border-spacing-5'>
          <div className='max-w-lg'>
            <img src={preview} alt="Photo profile"/>
          </div>
        </div>
      }

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
