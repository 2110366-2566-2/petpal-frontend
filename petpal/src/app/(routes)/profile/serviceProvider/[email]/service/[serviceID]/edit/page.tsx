'use client'
import { useState } from 'react'
const createServiceImage = require('../../../../../_components/createServiceImage.jpg')
import Image from 'next/image'
import SmallButtonComponent from '../../../../../_components/SmallButtonComponent'
import { createServiceButton , cancelServiceButton } from '../../../../../_interface/ButtonPropsInterface'
import AppointmentTime from '../../../../../_components/AppointmentTime'
import get_service_list from '../../../../../../../libs/service'
export default function createService({params}:{params:{email:string, serviceID:string}}){
    const [countTimeslot , setCountTimeslot] = useState(1)
    const [deleteTime , setDeleteTime] = useState(false)
    const [timeslot , setTimeslot] = useState([{id:0,value:{date:"",stime:"",etime:""}}])

    // get curent entity
    console.log(get_service_list())
    

    const addtimeslot = () =>{
        console.log("add timeslot" , timeslot)
        setTimeslot([...timeslot , 
        
            {
                id:countTimeslot,
                value:{date:"",stime:"",etime:""}
            }
            
        ])
    }

    const deletetimeslot = (idToDelete:Object) =>{
        return () => {
            console.log('delete timeslot',idToDelete)
            const updatedComponents = timeslot.filter((index) => index.id !== idToDelete);
            setTimeslot(updatedComponents);
            
        };
    }

    const handleInputChange = (id:any, inputName:any, newValue:any) => {
            console.log(id,inputName,newValue)
            setTimeslot(timeslot.map(component =>
            component.id === id ? { ...component, value: { ...component.value, [inputName]: newValue } } : component
            ));
            console.log('update timeslot' , timeslot)
      };

    return(
        <div className='items-center'>
            <div className=' md:flex m-[50px] items-center '>
                <div className='max-w-[300px] space-y-[10px] md:float-left m-auto mt-[0px] items-top md:ml-[50px] '>
                    <span className='text-black font-bold text-[32px]'>Create Service Listing</span>
                    <div>
                        <Image className = 'w-[300px] h-[250px] mx-auto md:mx-0 object-crop rounded-[20px] justify-center' src = {createServiceImage} alt='default'/>
                    </div>
                    <div className='hidden md:grid grid-cols-1 gap-[16px]'>
                    <SmallButtonComponent ButtonProps={createServiceButton}></SmallButtonComponent>
                    <SmallButtonComponent ButtonProps={cancelServiceButton}></SmallButtonComponent>
                    </div>
                </div>
                <div className='max-w-[500px] space-y-[10px] md:float-right m-auto mt-[0px] items-top md:ml-[20px]'>
                    {/* <span>Create Service Information</span> */}
                    
                    <div className="my-2">
                        <span className='text-black font-bold text-[32px]'>Service Name</span>
                        <input type='serviceName' className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
                        border-[#D9D9D9] border-[3px]'
                        placeholder='serviceName' />
                    </div>
                    <div className="my-2">
                        <span className='text-black font-bold text-[32px]'>Service Type</span>
                        <input type='servicestype' className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
                        border-[#D9D9D9] border-[3px]'
                         />
                    </div>
                    <div className="my-2">
                        <span className='text-black font-bold text-[32px]'>Detail Description</span>
                        <textarea className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
                        border-[#D9D9D9] border-[3px]'
                         />
                    </div>
                    <div>
                        <div className='grid grid-cols-1 md:grid-cols-3'>
                        <span className='text-black font-bold text-[32px] md:w-[30%]'>Date</span>
                        <span className='text-black font-bold text-[32px] md:w-[30%]'>Start Time</span>
                        <span className='text-black font-bold text-[32px] md:w-[30%]'>End Time</span>
                        </div>
                    </div>
                    <div>
                        {timeslot.map((component) => (
                            <div>
                            <AppointmentTime
                                key={component.id}
                                id={component.id}
                                values={component.value}
                                onChange={handleInputChange}
                                onDelete={()=>deletetimeslot(component.id)}
                            />
                            
                            </div>
                        ))}

                        {/* <div className='flex'>
                        <AppointmentTime/>
                        <button className='bg-[#D9D9D9]  justify-center items-center flex' onClick={()=>{setCountTimeslot(countTimeslot-1);setDeleteTime(true)}}>delete timeslot</button>
                        </div> */}

                        <button className='bg-[#D9D9D9]  justify-center items-center flex' onClick={()=>{setCountTimeslot(countTimeslot+1);addtimeslot()}}>Add timeslot</button>
                    </div>
                    
                    <div className="my-2">
                        <span className='text-black font-bold text-[32px]'>Price</span>
                        <input type='price' className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
                        border-[#D9D9D9] border-[3px]'
                        />
                    </div>
                    <div className="my-2 grid grid-cols-1">
                        <span className='text-black font-bold text-[32px]'>Cover Photo</span>
                        <button className="bg-[#D9D9D9] w-[158px] h-[45px] rounded-[10px] text-[18px] text-center p-[5px]" type='button'>Upload Image</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}