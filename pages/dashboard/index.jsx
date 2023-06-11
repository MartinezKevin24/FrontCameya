import React from 'react'
import NavbarDashboard from 'components/Main/NavbarDashboard'
import SideNavBar from '@/components/Main/SideNavBar'

export default function Dashboard({children}) {
  return (
    <div className='bg-gray-lightest h-screen'>
      <NavbarDashboard/>
      <SideNavBar/>
      <div className='h-125'>
        {children}
      </div>
    </div>
  )
}
