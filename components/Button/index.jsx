import classNames from "classnames";
import React from "react";

export default function Botones({children, type, className="", ...props}){
  return(
    <button 
      type={type}
      className={classNames([className, "w-full p-2 py-4 rounded-md bg-purple hover:bg-purple-dark focus:bg-purple-darkest"])} 
      {...props}
      >
      <span className="uppercase text-sm font-bold flex justify-center items-center h-full text-white whitespace-nowrap">
        {children}
      </span>
    </button>
  );
}