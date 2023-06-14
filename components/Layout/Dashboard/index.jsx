import React from 'react'
import NavbarDashboard from 'components/Main/NavbarDashboard'
import SideNavBar from 'components/Main/SideNavBar'

export default function Dashboard({children}) {
  return (
    <div className='bg-gray-lightest min-h-screen'>
      <NavbarDashboard/>
      <div className='flex flex-row overflow-hidden w-full'>
        <SideNavBar/>
        <div className='w-full overflow-y-auto ml-[64px] mr-3 mt-16 md:ml-[290px] md:mt-20 mb-8'>
          {children}
        </div>
      </div>
    </div>
  )
}
