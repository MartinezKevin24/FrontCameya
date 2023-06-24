import React from 'react'
import Button from 'components/Button'
import { useRouter } from 'next/router'
import { clearData } from "store/User/reducer"; 
import PageRoutes from 'constants/routes/pages'
import { useDispatch } from "react-redux";

export default function Ajustes() {

  const { push } = useRouter()
  const dispatch = useDispatch()

  const handleConfig = () => {
    push(PageRoutes.dashboard.profile.index)
  }

  const handleLogOut = async() => {
    await dispatch(clearData())
    push("/")
  }

  return (
    <div className='bg-white py-10 px-10 w-full rounded-xl md:min-w-[450px] md:max-w-[1000px] flex flex-col gap-6'>
      <h1 className='text-2xl text-gray-darkest font-bold'>Ajustes</h1>
      <Button
        onClick={()=>handleConfig()}>
        Configuración del perfil
      </Button>
      <Button 
        onClick={()=>handleLogOut()}
        className='bg-red hover:bg-red-600 focus:bg-red-500'>
        Cerrar Sesión
      </Button>
    </div>
  )
}
