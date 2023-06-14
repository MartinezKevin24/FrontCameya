import React from 'react'
import { useSelector } from 'react-redux';
import { AiFillStar, AiFillCamera } from 'react-icons/ai'
import Image from 'next/image';
import perfil from 'assets/perfil.png'
import ImageModal from 'components/Profile/ImageModal';

export default function Profile() {

  const user = useSelector(state => state.login?.value?.data)

  return (
    <div className='w-full'>
      <ImageModal/>
      <div className='w-full max-w-3xl py-14 px-10 bg-white rounded-md flex flex-col gap-11'>
        <div className='flex justify-center relative'>
          <div className='bg-gray-light flex rounded-full w-36 px-6 py-6'>
            <Image src={perfil} alt={`Profile photo ${user?.name} ${user?.last_name}`} width={100} height={100}/>
          </div>
          <div className='absolute -bottom-4 text-4xl cursor-pointer'>
            <AiFillCamera/>
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
