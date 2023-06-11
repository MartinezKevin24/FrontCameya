import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {MdLogout} from "react-icons/md";
import Logo from 'assets/Logo.png'

export default function NavbarDashboard() {

  return (
    <div className='bg-white border-[2px] relative z-20'>
      <div className="w-full py-2">
        <div className="relative">
          <div className="container w-full">
            <div className="flex container justify-between">
              <div>
                <Image src={Logo} width={190} height={50} alt={"Cameya Logo"} />
              </div>
              <div className="hidden md:flex md:flex-row">
                <ul className="flex flex-row gap-x-10 items-center">
                  <li><Link href="/login"><a className="flex flex-row items-center gap-x-2 text-gray-darkest text-2xl"><MdLogout/></a></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
