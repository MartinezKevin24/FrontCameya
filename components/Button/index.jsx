import classNames from "classnames";
import React from "react";
import { FaSpinner } from 'react-icons/fa'

export default function Botones({children, type, className="", loading, ...props}){
  return(
    <button 
      type={type}
      className={classNames([className, "w-full p-2 py-4 rounded-md",
        {"bg-purple hover:bg-purple-dark focus:bg-purple-darkest": !loading},
        {"bg-purple-light": loading}])} 
      {...props}
      >
      <span className="uppercase text-sm font-bold flex justify-center items-center h-full text-white whitespace-nowrap">
        {!loading ? children : <FaSpinner className="animate-spin text-2xl" />}
      </span>
    </button>
  );
}