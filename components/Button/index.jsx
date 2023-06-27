import classNames from "classnames";
import React from "react";
import { FaSpinner } from 'react-icons/fa'

export default function Botones({children, type, className="", color, loading, disabled, ...props}){
  return(
    <button 
      type={type}
      disabled={disabled}
      className={classNames([className, "w-full p-2 py-4 rounded-md",
        {"opacity-60" : disabled}, 
        {"bg-emerald-600 focus:bg-emerald-400" : color === "green"},
        {"bg-red hover:bg-red-600 focus:bg-red-500" : color === "red"},
        {"hover:bg-emerald-500" : color === "green" && !disabled},
        {"bg-purple hover:bg-purple-dark focus:bg-purple-darkest": !loading && !color},
        {"bg-purple-light": loading && !color}])} 
      {...props}
      >
      <span className="uppercase text-sm font-bold flex justify-center items-center h-full text-white whitespace-nowrap">
        {!loading ? children : <FaSpinner className="animate-spin text-2xl" />}
      </span>
    </button>
  );
}