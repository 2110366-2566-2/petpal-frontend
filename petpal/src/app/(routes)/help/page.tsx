'use client'
import React, { useState } from 'react';
import Head from 'next/head';
import { Box, Button, FormControl, Input, InputAdornment, InputLabel, MenuItem, TextField } from '@mui/material';
import BasicButton from '@/app/_component/BasicButton';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import ReportForm, { FormReport } from '@app/(routes)/help/_components/report_form';




export default function ReportBug() {
  // const [bugTitle, setBugTitle] = useState('');
  // const [bugDescription, setBugDescription] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');



  const [formData, setFormData] = useState<FormReport>({
    description: '',
    photo: undefined,
  });

  const handleFormChange = (newFormData: FormReport) => {
    setFormData(newFormData);
  };

  const handleSubmit = () => {

    // Handle form submission with formData
    console.log('Form submitted:', formData);
  };


  return (
    <div className="bg-white shadow-xl   rounded-2xl   mt-10   container mx-auto  pb-5 max-w-4xl	 ">

      <div className='rounded-t-2xl bg-gray pt-5 pb-3 pl-10 mb-5'>

        <h1 className=" text-3xl font-medium pl-1">Report an issue in the usage website or service</h1>
      </div>

      <div className='px-5'>
        <h6 className="text-base text-gray-500 mt-2 mb-4 pl-1">If you're having trouble with your usage website or service, you've come to the right place. Please use this form to tell us about the issue that you're experiencing.</h6>
        <ReportForm formData={formData} handleChange={handleFormChange}>
        </ReportForm>


        <h6 className="text-base text-gray-500 mt-4 mb-4 pl-1">Thanks for taking the time to submit a report. While we don't reply to every report, we'll let you know if we need more details.</h6>

      </div>

      <div className="h-10 relative  flex">


        <p className="absolute  right-10">

          <BasicButton

            name={"Send"}

            onClick={handleSubmit}
          >
          </BasicButton>
        </p>
      </div>


    </div>
  );
}