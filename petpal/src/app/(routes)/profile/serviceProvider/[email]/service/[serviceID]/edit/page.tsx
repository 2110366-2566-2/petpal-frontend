'use client'
import { useState, useEffect } from 'react'
const createServiceImage = require('../../../../../_components/createServiceImage.jpg')
import Image from 'next/image'
import SmallButtonComponent from '../../../../../_components/SmallButtonComponent'
import { editServiceButton , cancelServiceButton } from '../../../../../_interface/ButtonPropsInterface'
import AppointmentTime from '../../../../../_components/AppointmentTime'
import get_service_by_id from '../../../../../../../libs/service/service'
import  {ServiceInterface, TimeslotInterface}  from '../../_interface/service'
import updateServiceAPI from '@/app/libs/service/updateServiceApi'

export default function editService({params}:{params:{email:string, serviceId:string}}){
    const [countTimeslot , setCountTimeslot] = useState(1)
    const [deleteTime , setDeleteTime] = useState(false)
    const [timeslot , setTimeslot] = useState<{id:number, value:{date:string, stime:string, etime:string}}[]>([])

    // get service information by id
    const [service_name, setServiceName] = useState('')
    const [service_type, setServiceType] = useState('')
    const [service_description, setServiceDescription] = useState('')
    const [price, setPrice] = useState(0)
    console.log('param id', params.serviceId)
    useEffect(() => {
        get_service_by_id(params.serviceId).then((service : ServiceInterface) => {
            console.log('service', service)
            // copy values from service to state
            setServiceName(service.serviceName)
            setServiceType(service.serviceType)
            setServiceDescription(service.serviceDescription)
            setPrice(service.price)

            // set timeslot
            console.log('service timeslots', service.timeslots)
            service.timeslots?.forEach((timeslot_item : TimeslotInterface) => {
                console.log('timeslot_item', timeslot_item)
                const date = timeslot_item.startTime.split('T')[0]
                const startDate = new Date(timeslot_item.startTime)
                const endDate = new Date(timeslot_item.endTime)
                const stime = (startDate.getHours() < 10 ? '0' : '') + startDate.getHours() + ':' + (startDate.getMinutes() < 10 ? '0' : '') + startDate.getMinutes()
                const etime = (endDate.getHours() < 10 ? '0' : '') + endDate.getHours() + ':' + (endDate.getMinutes() < 10 ? '0' : '') + endDate.getMinutes()

                var newTimeslot = {
                    id:countTimeslot,
                    value:{date:date,stime:stime,etime:etime}
                }
                setCountTimeslot(countTimeslot+1)
                setTimeslot([...timeslot, newTimeslot])
            })
            console.log('timeslot', timeslot)
        })
    }, [])

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
            var newTimeslot = timeslot.slice(0);
            newTimeslot = newTimeslot.map(component =>
                component.id === id ? { ...component, value: { ...component.value, [inputName]: newValue } } : component
            );
            setTimeslot(newTimeslot);
            console.log('update timeslot' , newTimeslot)
    };

    const updateService = async (
        service_id:string,
        service_name:string,
        service_type:string,
        service_description:string,
        price:number,
        timeslot:Array<Object>
    ) => {
        return await updateServiceAPI(service_id, service_name, service_type, service_description, price, timeslot)
    }

    const navigateBack = () => {
        window.history.back()
    }

    return(
        <div className='items-center'>
            <div className=' md:flex m-[50px] items-center '>
                <div className='max-w-[300px] space-y-[10px] md:float-left m-auto mt-[0px] items-top md:ml-[50px] '>
                    <span className='text-black font-bold text-[32px]'>Edit Service Detail</span>
                    <div>
                        <Image className = 'w-[300px] h-[250px] mx-auto md:mx-0 object-crop rounded-[20px] justify-center' src = {createServiceImage} alt='default'/>
                    </div>
                </div>
                <div className='max-w-[500px] space-y-[10px] md:float-right m-auto mt-[0px] items-top md:ml-[20px]'>
                    
                    <div className="my-2">
                        <span className='text-black font-bold text-[32px]'>Service Name</span>
                        <input type='serviceName' className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
                        border-[#D9D9D9] border-[3px]'
                        defaultValue={service_name}
                        onChange={(e) => setServiceName(e.target.value)}
                         />
                    </div>
                    <div className="my-2">
                        <span className='text-black font-bold text-[32px]'>Service Type</span>
                        <input type='servicestype' className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
                        border-[#D9D9D9] border-[3px]'
                        defaultValue={service_type}
                        onChange={(e) => setServiceType(e.target.value)}
                         />
                    </div>
                    <div className="my-2">
                        <span className='text-black font-bold text-[32px]'>Detail Description</span>
                        <textarea className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
                        border-[#D9D9D9] border-[3px]'
                        defaultValue={service_description}
                        onChange={(e) => setServiceDescription(e.target.value)}
                         />
                    </div>
                    <div>
                        <div className='grid grid-cols-1 md:grid-cols-3'>
                        <span className='text-black font-bold text-[22px] md:w-[30%]'>Date</span>
                        <span className='text-black font-bold text-[22px] md:w-[30%]'>Start Time</span>
                        <span className='text-black font-bold text-[22px] md:w-[30%]'>End Time</span>
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
                        defaultValue={price}
                        onChange={(e) => setPrice(parseInt(e.target.value))}
                        />
                    </div>
                    <div className='hidden md:grid grid-cols-2 gap-[16px]'>
                        <SmallButtonComponent ButtonProps={editServiceButton} onClick={async() => {updateService(params.serviceId, service_name, service_type, service_description, price, timeslot)}}></SmallButtonComponent>
                        <SmallButtonComponent ButtonProps={cancelServiceButton}></SmallButtonComponent>
                    </div>
                </div>
            </div>
        </div>
    )
}