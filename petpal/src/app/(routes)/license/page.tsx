'use client'

import React from 'react'
import 'tailwindcss/tailwind.css'
import { useState } from 'react'
import { API_URL } from '@/app/_constants/env'

export default function License() {
  
  const [file, setFile] = useState<File>()

  const handleSubmit = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }
    if (file.type != 'application/pdf') {
      // File is a PDF
      document.getElementById('attach_label')?.style.setProperty('color', 'red');
      console.log('Only pdf!');
      return;
    }
    document.getElementById('attach_label')?.style.setProperty('color', 'black');

    console.log('file', file);
    try {
      const formData = new FormData();
      formData.append('svcpEmail', 'pooh@gg');
      formData.set('license', file);

      const response = await fetch(API_URL + '/serviceprovider/upload-license', {
        method: 'POST',
        body: formData,
      })
      console.log('response', response.json());

      if (response.ok) {
        console.log('Profile image uploaded successfully');
        // Handle success as needed
      } else {
        console.error('Error uploading profile image:', response.statusText);
        // Handle error as needed
      }
    } catch (error) {
      console.error('Error uploading profile image:', error);
      // Handle error as needed
    }

  };


  return <div className="max-w-6xl mx-auto ">
  <div className="flex justify-center min-h-fit">
        
    <div className="w-[600px] mx-auto p-4 bg-gray-10 rounded-lg shadow-md " >
        <br/>
        <div className='bg-[#FF872F]'>

        <p className="text-2xl  text-center text-white p-3">อัพโหลดใบอนุญาตดำเนินการสถานพยาบาลสัตว์</p>
       
        </div>
        
        <p className="text-sm font-extralight p-4 text-gray-900">&#x2022;อัพโหลดใบอนุญาตดำเนินการสถานพยาบาลสัตว์เพื่อยืนยันการเป็นสถานพยาบาลสัตว์</p>
          <form className=" mx-auto p-4 rounded-lg " >
      <label className="block text-base mb-2" >

       <span  id='attach_label'>  
       Attach Document (only .pdf):
        </span>
        <input
          type="file"
         
          className="mt-2 p-2 border border-gray-300 rounded-md w-full"

          onChange={(e) => setFile(e.target.files?.[0])}
        />
      </label>

        <br/>
      <button
        onClick={handleSubmit}
        type="button"
        className="bg-[#FF872F] text-white py-2 px-4 rounded-full text-base
        hover:bg-[#fb6a00] transition duration-300 ease-in-out "
      >
        Upload
      </button>
    </form>


    <div className='border-t-4 border-b-4  border-solid border-[#FF872F] mx-5 py-3 text-base'>
        <span>
            สถานะใบอนุญาต :&#160;&#160;&#160;
        </span>
        <span>
        รอการตรวจสอบ
        </span>
    </div>
    </div>
            </div>

</div>
}
