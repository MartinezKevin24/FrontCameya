import React from 'react'
import SideNavBarAdmin from "../../Main/SideNavbarAdmin"

export default function AdminDashboard({children}) {
  return (
    <div className='bg-gray-lightest min-h-screen'>
      <div className='flex flex-row overflow-hidden w-full'>
        <SideNavBarAdmin/>
        <div className='w-full overflow-y-auto ml-[64px] mr-3 h-full md:ml-[290px] my-4 mb-8'>
          {children}
        </div>
      </div>
    </div>
  )
}
