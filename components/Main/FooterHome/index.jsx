import React from 'react'
import Link from 'next/link'

export default function FooterHome() {
  return (
    <div className='w-full bg-slate-900 py-1 text-center'>
      <Link href='/legal'>
      <p className='text-white'>© 2023 CameYa! S.A.S. Todos los derechos reservados.</p>
      </Link>
    </div>
  )
}
