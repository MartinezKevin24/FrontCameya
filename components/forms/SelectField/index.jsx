import React from 'react'

export default function SelectField({name}) {
  return (
    <div>
      <select name={name} id={name} className='w-full border-b-[1px] px-2 py-2 text-gray-dark outline-none'>
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
    </div>
  )
}
