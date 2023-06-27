import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {MdLogout} from "react-icons/md";
import Logo from 'assets/logo.png'
import { useDispatch } from "react-redux";
import { clearData } from "store/User/reducer"; 
import { useRouter } from 'next/router';

export default function NavbarDashboard() {

  const { push } = useRouter()
  const dispatch = useDispatch()

  const handleLogOut = async () => {
    await dispatch(clearData())
    push("/")
  }

  return (
    <div className='bg-white border-[2px] h-[56px] fixed w-full z-20'>
      <div className="w-full h-full">
        <div className="relative h-full">
          <div className="px-16 w-full h-full">
            <div className="flex md:justify-between justify-center items-center h-full">
              <div>
                <Image src={Logo} width={105} height={30} alt={"Cameya Logo"} />
              </div>
              <div className="hidden md:flex md:flex-row">
                <ul className="flex flex-row gap-x-10 items-center">
                  <li><div onClick={handleLogOut}><span className="flex flex-row items-center gap-x-2 hover:text-red text-gray-darkest text-2xl"><MdLogout/></span></div></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
