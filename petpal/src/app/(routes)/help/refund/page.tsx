'use client'
import React, { useState,useContext,useEffect } from 'react';
import BasicButton from '@/app/_component/BasicButton';
import RefundForm, { RefundReport } from '@app/(routes)/help/refund/_components/refund_form';
import { useRouter,useSearchParams  } from "next/navigation";
import toast from "react-hot-toast";
import { AuthContext } from '@app/_contexts/AuthContext';
import issueCreate from '@app/libs/help/issuecreate';

export default function ReportBug() {
  // const [bugTitle, setBugTitle] = useState('');
  // const [bugDescription, setBugDescription] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const {currentEntity , setCurrentEntity , isLogin , setIsLogin} = useContext(AuthContext)
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('bookingid')

  useEffect(() => {
    if (isLogin === false) {
      router.push("/login");
    }
    else 
    {
      router.push('/help/refund?bookingid=' + bookingId)
    }
  }, [isLogin, router]);

  const [formData, setFormData] = useState<RefundReport>({
    description: '',
    photo: undefined,
  });

  const handleFormChange = (newFormData: RefundReport) => {
    setFormData(newFormData);
  };

  const handleSubmit = async () => {

    // console.log('Form submitted:', formData);
    if(formData.description === '' ){
      toast.error("Please fill Trouble type and Description fields");
      return;
    }

    try {
      await issueCreate(formData.description, 'refund',formData.photo,bookingId);
      toast.success("Request for refund has been submitted successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Failed to submit the report");
      // Handle error
    }

    // Handle form submission with formData
    console.log('Form submitted:', formData);
  };


  return (
    <div className="bg-white shadow-xl   rounded-2xl   mt-10   container mx-auto  pb-5 max-w-4xl	 ">

      <div className='rounded-t-2xl bg-gray pt-5 pb-3 pl-10 mb-5'>

        <h1 className=" text-3xl font-medium pl-1">Request a refund from petpal service</h1>
      </div>

      <div className='px-5'>
        <h6 className="text-base text-gray-500 mt-2 mb-4 pl-1">We understand that sometimes things don't go as planned, and you may need to request a refund for the service you've purchased from us. Please take a moment to tell us about your Reason for requesting a refund to consideration of refund.</h6>
        <RefundForm  formData={formData} handleChange={handleFormChange}>
        </RefundForm>


        <h6 className="text-base text-gray-500 mt-4 mb-4 pl-1">Thanks for taking the time to submit a report.</h6>

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