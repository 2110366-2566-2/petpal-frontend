'use client'
import { useState } from "react"
export default function({values,id,onChange,onDelete}:{values:any,id:any,onChange:any,onDelete:any}){
    const [deleteTime , setDeleteTime] = useState(false)
    const [dvalue , setDvalue] = useState(values.date)
    const [stimevalue , setStimevalue] = useState(values.stime)
    const [etimevalue , setEtimevalue] = useState(values.etime)
    if(deleteTime){
        return
    }
    return(
        <div className="flex">
        <div className="my-2 w-[100%] grid md:grid-cols-3 gap-x-2">
                        <div className='ml-2'>
                        
                        <input type='date' className='p-1 mt-1 block w-[100%] h-[45px] rounded-md shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary'
                        value={dvalue}
                        onChange={(e) => {onChange(id, 'date', e.target.value);setDvalue(e.target.value)}}/>
                        </div>
                        <div className='ml-2'>
                        <input type='time' className='p-1 mt-1 block w-[100%] h-[45px] rounded-md shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary'
                        value={stimevalue}
                        onChange={(e) => {onChange(id, 'stime', e.target.value);setStimevalue(e.target.value)}}/>
                        </div>
                        <div className='ml-2'>
                        <input type='time' className='p-1 mt-1 block w-[100%] h-[45px] rounded-md shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary'
                        value={etimevalue}
                        onChange={(e) => {onChange(id, 'etime', e.target.value);setEtimevalue(e.target.value)}}/>
                        </div>
        </div>
        <button className='bg-[#FF0000] text-white rounded-lg m-3'onClick={onDelete()}>Delete Timeslot</button>
        </div>
    )
}