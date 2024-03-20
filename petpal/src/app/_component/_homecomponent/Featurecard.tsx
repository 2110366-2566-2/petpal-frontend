import React from 'react'

export default function Featurecard({name,description}:{name: string, description: string}) {
  return (
    <div className='flex flex-col min-[900px]:max-w-[20%] max-w-[250px] min-h-[170px] p-5 bg-white shadow-lg rounded-lg'>
        <div className='text-xl font-bold mb-2'>
            {name}
        </div>
        <div className='text-sm text-gray-700'>
            {description}
        </div>
    </div>
  )
}
