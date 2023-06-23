import React from 'react'
import Image from 'next/image'
import TruncateText from 'components/Dashboard/TruncateText'
import {AiFillStar} from 'react-icons/ai'
import Button from 'components/Button'

export default function CardApplication({user}) {

  const handleRemove = () => {

  }

  const handleAccept = () => {

  }

  return (
    <div className='bg-blue-200 rounded-lg p-6 px-8 flex flex-col gap-3'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row items-center gap-3'>
          <div className='rounded-full w-10 h-10 overflow-hidden'>
            {
              user.profile_picture !== "NN" &&
              <Image src={user.profile_picture} alt="profile photo" width={40} height={40}/>
            }
          </div>
          <div className='font-semibold text-lg flex flex-col text-gray-darkest'>
            <p>{user.name} {user.last_name}</p>	
          </div>
        </div>
        <div className='flex flex-row items-center justify-center'>
          <p className='flex flex-row gap-1 items-center font-semibold text-gray-dark'>{user.score}<span className='text-yellow text-lg mb-1'><AiFillStar/></span></p>
        </div>
      </div>
      <div className='flex flex-col gap-1 mb-3'>
        <p className='text-gray-darkest font-bold'>Email: <span className='font-normal'>{user.email}</span></p>
        <p className='text-gray-darkest font-bold'>Teléfono: <span className='font-normal'>{user.phone}</span></p>
        <p className='text-gray-darkest font-bold'>Campo de especialidad: <span className='font-normal'>{user.service_type}</span></p>
        <div>
          <p className='text-gray-darkest font-bold'>Descripción laboral:</p>
          <TruncateText text={user.service_detail} maxLength={200}/>
        </div>
      </div>
      <div className='flex flex-col md:flex-row md:gap-4 gap-3'>
        <Button
          className='bg-red hover:bg-red-600 focus:bg-red-500'
          onClick={()=>handleRemove()}>
          Eliminar
        </Button>
        <Button
          className='bg-emerald-600 hover:bg-emerald-500 focus:bg-emerald-400'
          onClick={()=>handleRemove()}>
          Aceptar
        </Button>
      </div>
    </div>
  )
}
