import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux';
import perfil from 'assets/perfil.png'
import { FaPencilAlt } from "react-icons/fa"
import Image from 'next/image'
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { clearData } from "store/User/reducer"; 
import PageRoutes from 'constants/routes/pages';
import { AiFillHome, AiTwotoneMail, AiFillSetting } from 'react-icons/ai'

export default function SideNavBar() {

  const data = useSelector(state => state.login.value.data)
  const dispatch = useDispatch()

  const routes = [
    {name: 'Inicio', path: PageRoutes.dashboard.index, icon: <AiFillHome/>},
    {name: 'Mis Servicios', path: '/dashboard/mis-servicios', icon: <AiTwotoneMail/>},
    {name: 'Ajustes', path: '/dashboard/ajustes', icon: <AiFillSetting/>}
  ];

  const { pathname, push } = useRouter()

  const pathActive = (path) => {
    if (pathname === path)
      return true
    else
      return false
  }

  const handleLogOut = async () => {
    await dispatch(clearData())
    push("/")
  }

  return (
    <div className='md:max-w-[270px] md:w-68 max-w-[60px] fixed bg-white border-r-[1px] mt-[56px] pt-5 height top-0 z-0 drop-shadow-sm'>
      <div className='h-full'>
        <div className='flex flex-col justify-between height pb-4'>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row items-center justify-center md:justify-normal gap-3 bg-gray-extralight border-[1px] rounded-xl md:py-2 py-1 md:px-3 md:mx-3 mx-1'>
              <Link href={PageRoutes.dashboard.perfil} passHref>
                <div className='bg-gray w-11/12 md:w-12 py-1 md:h-12 cursor-pointer flex justify-center items-center rounded-full'>
                  <Image src={perfil} alt="imagen de perfil" width={30} height={30}/>
                </div>
              </Link>
              <div className='leading-5 font-bold text-gray-darkest text-sm md:block hidden'>
                <p>{data?.name} {data?.last_name}</p>
                <Link href={PageRoutes.dashboard.perfil} passHref>
                  <p className='text-gray-light font-normal flex flex-row gap-1 cursor-pointer hover:text-gray'>
                    <span className='text-xs flex items-center mb-[3px]'>
                      <FaPencilAlt/>
                    </span>
                    Edit
                  </p>
                </Link>
              </div>
            </div>
            <ul className='my-4 flex flex-col'>
              {
                routes.map((route, i) => ( 
                  <Link href={route.path} passHref key={i}>
                    <li key={i} className={classNames(['px-4 py-3 relative cursor-pointer hover:text-blue-pale font-bold flex items-center gap-x-3', 
                      {"text-blue-pale bg-white md:w-[275px] md:shadow-menu rounded-e-xl md:mb-2" : pathActive(route.path)}, 
                      { "text-gray-darkest": !pathActive(route.path)}])}>
                      <span className='mb-[3px] text-xl'>{route.icon}</span>
                      <span className={classNames(['w-1 rounded-e-lg h-2/4 block bg-blue-pale absolute left-0', 
                        { "hidden" : !pathActive(route.path)}])}/>
                      <span className='hidden md:block'>{route.name}</span>
                    </li>
                  </Link>
                  )
                )
              }
            </ul>
          </div>
          <div className='flex py-3 border-t-[1px] md:hidden relative text-gray-darkest hover:text-red 
            md:items-center cursor-pointer' onClick={handleLogOut}>
            <span className='mb-[3px] pl-4 text-xl z-[1]'><MdLogout/></span>
            <span className={'absolute font-bold md:flex hidden items-center mr-7 justify-center w-full'}>
              Cerrar sesión
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        
        .height{
          min-height: calc(100vh - 56px);
        }
        
      `}</style>
    
    </div>
  )
}
