import React from 'react'
import { useField } from 'formik'

export default function CategoryField({name}) {

  const [field, meta, helpers] = useField(name);

  const handleChange = (e) => {
    if(!field.value.includes(e.target.value) && e.target.value !== "")
      helpers.setValue([...field.value, e.target.value])
  }

  const removeOption = (value) =>{
    const updatedArray = field.value.filter(item => item !== value);
    helpers.setValue(updatedArray);
  }

  return (
    <div className='flex flex-col gap-4'>
      <select name={name} id={name} onChange={handleChange} className='w-full border-b-[1px] px-2 py-2 text-gray-dark outline-none'>
        <option value="" defaultChecked>Elige una categoría</option>
        <option value="carpinteria">Carpintería</option>
        <option value="plomeria">Plomería</option>
        <option value="electricidad">Electricidad</option>
        <option value="albañileria">Albañilería</option>
        <option value="pintura">Pintura</option>
        <option value="jardineria">Jardinería</option>
        <option value="limpieza">Limpieza</option>
        <option value="cerrajeria">Cerrajería</option>
        <option value="cuidado de mascotas">Cuidado de mascotas</option>
        <option value="llantería">Llantería</option>
      </select>
      <div className='flex flex-wrap gap-2 p-3 mb-1 rounded-lg bg-gray-lightest w-full min-h-[60px]'>
        {
          field.value.map((category, i) => (
            <div key={i} className='px-2 py-1 rounded-lg flex flex-row items-center gap-2 bg-sky-600'>
              <p className='text-gray-lightest'>{category}</p>
              <p 
                onClick={()=>removeOption(category)}
                className='py-[2x] flex items-center justify-center px-[6px] rounded-full hover:bg-gray 
                hover:text-gray-dark cursor-pointer text-gray-lightest font-bold text-xs'>
                  x
              </p>
            </div>
          ))
        }
      </div>
    </div>
  )
}
