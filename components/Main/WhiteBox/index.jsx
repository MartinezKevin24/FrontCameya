import React from 'react'

export default function WhiteBox({children}) {
  return (
    <div className='w-full max-w-3xl py-14 px-10 bg-white rounded-2xl'>
      {children}
    </div>
  )
}
