import React from 'react'
import ServiceForm from 'components/ServiceForm'

export default function PostService() {
  return (
    <div className='w-full rounded-xl md:min-w-[300px] flex flex-col gap-3 md:max-w-[650px] bg-white'>
      <div className='pt-4 border-b-2 px-6 pb-3 text-sm font-bold text-gray-darkest'>
        <p>¿Qué servicio necesitas ahora?</p>
      </div>
      <div className='mx-6 mb-4 flex flex-row gap-4 items-center'>
        <div className='w-full'>
          <ServiceForm/>
        </div>
      </div>
    </div>
  )
} 