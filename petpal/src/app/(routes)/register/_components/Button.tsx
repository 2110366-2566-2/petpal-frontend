import React from 'react'

export default function Button({name}:{name:string}) {
  return (
    <button className="m-3 py-2 px-5 bg-[#FF872F] text-white font-semibold rounded-full shadow-md hover:bg-orange-500 
      focus:outline-none focus:ring focus:ring-orange-400 focus:ring-opacity-75">
      {name}
    </button>
  )
}
