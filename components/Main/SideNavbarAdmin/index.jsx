import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { clearAdminData } from "store/Admin/reducer"; 
import PageRoutes from 'constants/routes/pages';
import { AiFillHome, AiTwotoneMail, AiFillSetting } from 'react-icons/ai'

export default function SideNavBarAdmin() {

  const user = useSelector(state => state.admin.value.data)
  const dispatch = useDispatch()

  const routes = [
    {name: 'Usuarios', path: [PageRoutes.admin.dashboard], icon: <AiFillHome/>},
    {name: 'Categorias', path: [PageRoutes.admin.categorias], icon: <AiTwotoneMail/>},
    {name: 'Servicios', path: [PageRoutes.admin.servicios], icon: <AiFillSetting/>}
  ];

  const { pathname, push } = useRouter()

  const pathActive = (path) => {
    if (path.includes(pathname)) 
      return true
    else
      return false
  }

  useEffect(() => {
    if(!user){
      push("/admin")
    }
  })

  const handleLogOut = async () => {
    await dispatch(clearAdminData())
    push("/admin")
  }

  return (
    <div className='md:max-w-[270px] md:w-68 max-w-[60px] fixed bg-white border-r-[1px] pt-5 height top-0 z-0 drop-shadow-sm h-screen'>
      <div className='h-full'>
        <div className='flex flex-col justify-between height'>
          <div className='flex flex-col gap-2'>
            <ul className='my-4 flex flex-col'>
              {
                routes.map((route, i) => ( 
                  <Link href={route.path[0]} passHref key={i}>
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
          <div className='flex py-3 border-t-[1px] relative text-gray-darkest hover:text-red 
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
          min-height: calc(100vh - 22px);
        }
        
      `}</style>
    
    </div>
  )
}
