import React from 'react'
import Image from 'next/image'
import TruncateText from 'components/Dashboard/TruncateText'
import {AiFillStar} from 'react-icons/ai'
import Button from 'components/Button'
import { useRouter } from 'next/router'
import ApiRoutes from 'constants/routes/api'
import axios from 'axios'
import PageRoutes from 'constants/routes/pages'

export default function CardApplication({user, service}) {

  const { push } = useRouter()

  const handleRemove = () => {

  }

  const handleAccept = () => {
    const form_values = {
      id_worker: user.worker_dni,
      id_service: service.id
    }

    axios.put(ApiRoutes.services.updatePostulation, form_values)
      .then((response) => {
        console.log(response)
        push(PageRoutes.dashboard.services.index)
      })
      .catch((error) => {
        console.log(error)
      })

    console.log(form_values)

  }

  console.log(user)

  return (
    <div className='bg-blue-200 rounded-lg p-6 px-8 flex flex-col gap-3'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row items-center gap-3'>
          <div className='rounded-full w-10 h-10 overflow-hidden'>
            {
              user.Worker.User.profile_picture !== "NN" &&
              <Image src={user.Worker.User.profile_picture} alt="profile photo" width={40} height={40}/>
            }
          </div>
          <div className='font-semibold text-lg flex flex-col text-gray-darkest'>
            <p>{user.Worker.User.name} {user.Worker.User.last_name}</p>	
          </div>
        </div>
        <div className='flex flex-row items-center justify-center'>
          <p className='flex flex-row gap-1 items-center font-semibold text-gray-dark'>{user.Worker.User.score}<span className='text-yellow text-lg mb-1'><AiFillStar/></span></p>
        </div>
      </div>
      <div className='flex flex-col gap-1 mb-3'>
        <p className='text-gray-darkest font-bold'>Email: <span className='font-normal'>{user.Worker.User.email}</span></p>
        <p className='text-gray-darkest font-bold'>Teléfono: <span className='font-normal'>{user.Worker.User.phone}</span></p>
        <p className='text-gray-darkest font-bold'>Campo de especialidad: <span className='font-normal'>{user.Worker.service_type}</span></p>
        <p className='text-gray-darkest font-bold'>Promedio valor hora: <span className='font-normal'>{user.Worker.rate_hour}</span></p>
        <div>
          <p className='text-gray-darkest font-bold'>Descripción laboral:</p>
          <TruncateText text={user.Worker.service_detail} maxLength={200}/>
        </div>

      </div>
      <div className='flex flex-col md:flex-row md:gap-4 gap-3'>
        {/* <Button
          className='bg-red hover:bg-red-600 focus:bg-red-500'
          onClick={()=>handleRemove()}>
          Eliminar
        </Button> */}
        <Button
          color={"green"}
          onClick={()=>handleAccept()}>
          Aceptar
        </Button>
      </div>
    </div>
  )
}
