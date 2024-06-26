'use client'
import { useState , useEffect } from 'react'
import createServiceImage from "@app/(routes)/profile/_components/createServiceImage.jpg"
import Image from 'next/image'
import SmallButtonComponent from "@app/(routes)/profile/_components/SmallButtonComponent"
import ButtonPropsInterface from '@app/(routes)/profile/_interface/ButtonPropsInterface'
import { createServiceButton , cancelServiceButton } from "@app/(routes)/profile/_interface/ButtonPropsInterface"
import AppointmentTime from "@app/(routes)/profile/_components/AppointmentTime"
import createServiceApi from '@/app/libs/service/createServiceApi'
import { useRouter } from 'next/navigation'

export default function CreateServiceForm(){
    const [countTimeslot , setCountTimeslot] = useState(1)
    const [deleteTime , setDeleteTime] = useState(false)
    const [timeslot , setTimeslot] = useState([{id:0,value:{date:"",stime:"",etime:""}}])
    const [formattime , setFormattime] = useState([{id:0,start:"",end:""}])
    
    const [serviceName , setServiceName] = useState("")
    const [serviceDes , setServiceDes] = useState("")
    const [serviceType , setServiceType] = useState("")
    const [price , setPrice] = useState(0)

    
    const addtimeslot = () =>{
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

    const postService = async (
        price:number,
        serviceDescription:string,
        serviceName:string,
        serviceType:string,
        timeslot:Array<Object>
        ) => {
        return await createServiceApi(price,serviceDescription,serviceName,serviceType,timeslot)
    }
    
    const convertTime = () =>{
        type timeFormat = {
            startTime:string,
            endTime:string
        }
        var allTime: timeFormat[] = []
        for(var time of timeslot){
            const addTime : timeFormat = {
                startTime : time.value.date+'T'+time.value.stime+':00Z',
                endTime : time.value.date+'T'+time.value.etime+':00Z'
            }
            allTime.push(addTime)
        }
        console.log(allTime)
        return allTime
    }

    let thisCreateServiceButton: ButtonPropsInterface = createServiceButton
    thisCreateServiceButton.Link = "../"
    const router = useRouter()

    return(
        <div className='items-center'>
            <div className=' md:flex m-[50px] items-center '>
                <div className='max-w-[300px] space-y-[10px] md:float-left m-auto mt-[0px] items-top md:ml-[50px] '>
                    <span className='text-black font-bold text-[32px]'>Create Service Listing</span>
                    <div>
                        <Image className = 'w-[300px] h-[250px] mx-auto md:mx-0 object-crop rounded-[20px] justify-center' src = {createServiceImage} alt='default'/>
                    </div>
                    <div className='hidden md:grid grid-cols-1 gap-[16px]'>
                    <SmallButtonComponent ButtonProps={createServiceButton} onClick={async() => {postService(price,serviceDes,serviceName,serviceType,convertTime()); router.push(thisCreateServiceButton.Link)}}></SmallButtonComponent>
                    <SmallButtonComponent ButtonProps={cancelServiceButton}></SmallButtonComponent>
                    </div>
                </div>
                <div className='max-w-[500px] space-y-[10px] md:float-right m-auto mt-[0px] items-top md:ml-[20px]'>
                    {/* <span>Create Service Information</span> */}
                    
                    <div className="my-2">
                        <span className='text-black font-bold text-[32px]'>Service Name</span>
                        <input type='serviceName' className='p-1 mt-1 block w-[100%] h[45px] rounded-md shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
                        border-[#D9D9D9] border-[3px]'
                        placeholder='serviceName' 
                        value={serviceName}
                        onChange={(e) => {setServiceName(e.target.value)}}
                        />
                    </div>
                    <div className="my-2">
                        <span className='text-black font-bold text-[32px]'>Service Type</span>
                        <input type='servicestype' className='p-1 mt-1 block w-[100%] h[45px] rounded-md shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
                        border-[#D9D9D9] border-[3px]'
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                         />
                    </div>
                    <div className="my-2">
                        <span className='text-black font-bold text-[32px]'>Detail Description</span>
                        <textarea className='p-1 mt-1 block w-[100%] h[45px] rounded-md shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
                        border-[#D9D9D9] border-[3px]'
                        value={serviceDes}
                        onChange={(e) => setServiceDes(e.target.value)}
                         />
                    </div>
                    <div>
                        <div className='flex flex-row'>
                        <span className='text-black font-semibold text-[24px] md:w-[70%]'>Date</span>
                        <span className='text-black font-semibold text-[24px] md:w-[70%]'>Start Time</span>
                        <span className='text-black font-semibold text-[24px] md:w-[100%]'>End Time</span>
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

                        <button className='mx-3 p-1 bg-blue text-white rounded-lg hover:text-blue hover:bg-white border-blue border-2 justify-center items-center flex' onClick={()=>{setCountTimeslot(countTimeslot+1);addtimeslot()}}>Add timeslot</button>
                    </div>
                    
                    <div className="my-2 ">
                        <span className='text-black font-bold text-[32px]'>Price</span>
                        <div className='flex'>
                        <input type='price' className='p-1 mt-1 block w-[30%] h[45px] rounded-md shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
                        border-[#D9D9D9] border-[3px]'
                        value={price}
                        onChange={(e) => {setPrice(Number(e.target.value))}}/>
                        <span className='ml-2 mt-1  justify-center text-black text-[20px]'>Baht</span>
                        </div>
                    </div>
                    {/*<div className="my-2 grid grid-cols-1">
                        <span className='text-black font-bold text-[32px]'>Cover Photo</span>
                        <button className="bg-[#D9D9D9] w-[158px] h-[45px] rounded-[10px] text-[18px] text-center p-[5px]" type='button'>Upload Image</button>
                    </div>*/}
                    <div className='mt-2 md:hidden grid grid-cols-1 gap-[16px]'>
                    <SmallButtonComponent ButtonProps={createServiceButton} onClick={async() => {postService(price,serviceDes,serviceName,serviceType,convertTime()); router.push(thisCreateServiceButton.Link)}}></SmallButtonComponent>
                    {/* <button className= 'bg-[#aad]'onClick={async() => {postService(price,serviceDes,serviceName,serviceType,convertTime())}}> submit </button> */}
                    <SmallButtonComponent ButtonProps={cancelServiceButton}></SmallButtonComponent>
                    </div>
                </div>
            </div>
        </div>
    )
}