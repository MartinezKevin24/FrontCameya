import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { AiFillStar, AiFillCamera } from 'react-icons/ai'
import Image from 'next/image';
import perfil from 'assets/perfil.png'
import ImageModal from 'components/Profile/ImageModal';

export default function Profile() {

  const user = useSelector(state => state.login?.value?.data)
  const [open, setOpen] = useState(false)

  console.log(user)

  return (
    <div className='w-full'>
      {
        open && <ImageModal setOpen={setOpen}/>
      }
      <div className='w-full max-w-3xl py-14 px-10 bg-white rounded-md flex flex-col gap-11'>
        <div className='flex justify-center'>
          <div className='relative'>
            <div className='bg-gray-light flex rounded-full w-36 overflow-hidden h-36 border-[2px] relative border-gray-darkest'>
              <img src={user?.profile_picture} alt={`Profile photo ${user?.name} ${user?.last_name}`} className='absolute h-full'/>
            </div>
            <div className='absolute -bottom-2 right-2 text-4xl cursor-pointer text-gray-darkest'
              onClick={()=>setOpen(true)}>
              <AiFillCamera/>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='grid grid-cols-2 gap-3'>
            <span className='text-end text-gray-dark'>Nombre completo:</span> <span className='font-semibold text-gray-darkest'>{user?.name} {user?.last_name}</span>
          </p>
          <p className='grid grid-cols-2 gap-3'>
            <span className='text-end text-gray-dark'>{user?.dni_type}:</span> <span className='font-semibold text-gray-darkest'>{user?.dni}</span>
          </p>
          <p className='grid grid-cols-2 gap-3'>
            <span className='text-end text-gray-dark'>Fecha de nacimiento:</span> <span className='font-semibold text-gray-darkest'>{user?.birth_date}</span>
          </p>
          <p className='grid grid-cols-2 gap-3'>
            <span className='text-end text-gray-dark'>Email:</span> <span className='font-semibold text-gray-darkest'>{user?.email}</span>
          </p>
          <p className='grid grid-cols-2 gap-3'>
            <span className='text-end text-gray-dark'>Teléfono:</span> <span className='font-semibold text-gray-darkest'>{user?.phone}</span>
          </p>
          <p className='grid grid-cols-2 gap-3'>
            <span className='text-end text-gray-dark'>Calificación:</span> <span className='flex flex-row gap-1 items-center font-semibold text-gray-darkest'>{user?.score} <span className='text-yellow text-lg mb-1'><AiFillStar/></span></span>
          </p>
        </div>
      </div>
    </div>
  )
}
