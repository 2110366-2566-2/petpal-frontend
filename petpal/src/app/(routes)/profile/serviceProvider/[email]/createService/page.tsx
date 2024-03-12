import createServiceImage from '../../../_components/createServiceImage.jpg'
import Image from 'next/image'

export default function createService(){
    return(
        <div className='items-center'>
            <div className=' md:flex m-[50px] items-center '>
                <div className='max-w-[300px] space-y-[10px] md:float-left m-auto mt-[0px] items-top '>
                    <span>Create Service Listing</span>
                    <div>
                        <Image className = 'w-[300px] h-[250px] mx-auto md:mx-0 object-crop rounded-[20px] justify-center' src = {createServiceImage} alt='default'/>
                    </div>
                </div>
                <div className='max-w-[300px] space-y-[10px] md:float-right m-auto mt-[0px] items-top md:ml-[20px]'>
                    <span>Create Service Information</span>
                    
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
                        <input type='detailDescription' className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
                        border-[#D9D9D9] border-[3px]'
                         />
                    </div>
                    <div className="my-2">
                        <span className='text-black font-bold text-[32px]'>Date</span>
                        <input type='date' className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
                        '/>
                    </div>
                    <div className="my-2">
                        <span className='text-black font-bold text-[32px]'>Price</span>
                        <input type='price' className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
                        border-[#D9D9D9] border-[3px]'
                        />
                    </div>
                    <div className="my-2">
                        <span className='text-black font-bold text-[32px]'>Cover Photo</span>
                        <input type='photo' className='mt-1 block w-[100%] h[45px] rounded-md shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary
                        border-[#D9D9D9] border-[3px]'
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}