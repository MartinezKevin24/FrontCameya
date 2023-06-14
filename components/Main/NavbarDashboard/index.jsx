import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {MdLogout} from "react-icons/md";
import Logo from 'assets/Logo.png'

export default function NavbarDashboard() {

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
                  <li><Link href="/login"><a className="flex flex-row items-center gap-x-2 hover:text-red text-gray-darkest text-2xl"><MdLogout/></a></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
