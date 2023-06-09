import React from 'react'

export default function index({name, type, placeholder, ...props}) {
  return (
    <div>
      <input 
        type={type} 
        id={name}
        name={name}
        placeholder={placeholder}
        className="outline-none border-[1px] border-gray-dark rounded-sm py-2 px-3 placeholder:text-gray-dark h-full w-full bg-transparent"
        {...props}
        />
    </div>
  )
}
