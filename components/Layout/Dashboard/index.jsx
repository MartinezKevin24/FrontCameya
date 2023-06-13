import React from 'react'
import NavbarDashboard from 'components/Main/NavbarDashboard'
import SideNavBar from 'components/Main/SideNavBar'

export default function Dashboard({children}) {
  return (
    <div className='bg-gray-lightest h-screen overflow-y-auto'>
      <NavbarDashboard/>
      <div className='flex flex-row'>
        <SideNavBar/>
        <div className='mx-10 my-6 w-full'>
          {children}
        </div>
      </div>
    </div>
  )
}
