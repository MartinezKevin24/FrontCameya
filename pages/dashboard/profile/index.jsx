import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { AiFillStar, AiFillCamera } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import ImageModal from 'components/Profile/ImageModal';
import PageRoutes from 'constants/routes/pages';
import Link from 'next/link';
import perfil from 'assets/perfil.png'
import Image from 'next/image';
import classNames from 'classnames';
import WhiteBox from '@/components/Main/WhiteBox';

export default function Profile() {

  const user = useSelector(state => state.login?.value?.data)
  const [open, setOpen] = useState(false)

  return (
    <div className='w-full'>
      {
        open && <ImageModal setOpen={setOpen}/>
      }
      <WhiteBox>
        <div className='flex flex-col gap-11'>
          <div className='flex justify-center items-center flex-col gap-6'>
            <div className='flex justify-center'>
              <div className='relative'>
                <div className={classNames(['bg-gray-light flex rounded-full w-36 overflow-hidden h-36 border-[3px] relative border-gray-dark', { "p-4 flex justify-center" : !user?.profile_picture }])}>
                  {
                    user?.profile_picture 
                    ?
                    <img src={user?.profile_picture} alt={`Profile photo ${user?.name} ${user?.last_name}`} className='absolute h-full w-full object-cover'/>
                    :
                    <Image src={perfil} alt={`Profile photo ${user?.name} ${user?.last_name}`} width={110} height={60}/>
                  }
                </div>
                <div className='absolute -bottom-2 right-2 text-4xl cursor-pointer text-gray-dark'
                  onClick={()=>setOpen(true)}>
                  <AiFillCamera/>
                </div>
              </div>
            </div>
            <div className='text-center'>
              <p className='font-semibold text-gray-darkest text-4xl flex 
                flex-row gap-2 items-center'>
                  {user?.name} {user?.last_name} 
                  <Link href={PageRoutes.dashboard.profile_edit}><span className='text-2xl text-gray-400 cursor-pointer'><BiEdit/></span></Link>
              </p>
              <p className='font-semibold text-gray'>{user?.email}</p>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='grid grid-cols-2 gap-3'>
              <span className='text-end text-gray-dark'>{user?.dni_type}:</span> <span className='font-semibold text-gray-darkest'>{user?.dni}</span>
            </p>
            <p className='grid grid-cols-2 gap-3'>
              <span className='text-end text-gray-dark'>Fecha de nacimiento:</span> <span className='font-semibold text-gray-darkest'>{user?.birth_date}</span>
            </p>
            <p className='grid grid-cols-2 gap-3'>
              <span className='text-end text-gray-dark'>Teléfono:</span> <span className='font-semibold text-gray-darkest'>{user?.phone}</span>
            </p>
            <p className='grid grid-cols-2 gap-3'>
              <span className='text-end text-gray-dark'>Calificación:</span> <span className='flex flex-row gap-1 items-center font-semibold text-gray-darkest'>{user?.score} <span className='text-yellow text-lg mb-1'><AiFillStar/></span></span>
            </p>
          </div>
        </div>
      </WhiteBox>
    </div>
  )
}
