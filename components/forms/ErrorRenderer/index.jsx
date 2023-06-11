import React from 'react'

export default function ErrorRenderer({children}) {
  return (
      <span className="flex items-center gap-1 pt-1 text-red">
        <span className='icon icon-alert text-lg mb-[2px]'/>
        <span className="text-sm">
          {children}
        </span>
      </span>
  )
}