import React from 'react'
import Link from 'next/link'

export default function FooterHome() {
  return (
    <div className='w-full bg-slate-900 py-1 text-center'>
      <Link href='/legal' passHref>
        <p className='text-white hover:text-gray-lightest cursor-pointer'>© 2023 CameYa! S.A.S. Todos los derechos reservados.</p>
      </Link>
    </div>
  )
}
