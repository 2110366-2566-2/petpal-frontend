'use client';
import React, { useState,useContext ,useEffect} from 'react';
import BasicButton from '@/app/_component/BasicButton';
import ReportForm, { FormReport } from '@app/(routes)/help/_components/report_form';
import issueCreate from '@app/libs/help/issuecreate';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AuthContext } from '@app/_contexts/AuthContext';


export default function ReportBug() {
  // const [bugTitle, setBugTitle] = useState('');
  // const [bugDescription, setBugDescription] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  const {currentEntity , setCurrentEntity , isLogin , setIsLogin} = useContext(AuthContext)
  const router = useRouter();
  
  useEffect(() => {
    if (isLogin === false) {
      router.push("/login");
    }
    else 
    {
      router.push('/help')
    }
  }, [isLogin, router]);

  const [formData, setFormData] = useState<FormReport>({
    description: '',
    photo: undefined,
    type: '',
  });

  const handleFormChange = (newFormData: FormReport) => {
    setFormData(newFormData);
  };

  const handleSubmit = async () => {

    // console.log('Form submitted:', formData);
    if(formData.description === '' || formData.type === ''){
      toast.error("Please fill Trouble type and Description fields");
      return;
    }

    try {
      await issueCreate(formData.description,  formData.type,formData.photo,null);
      toast.success("Thank you for submitting the report!");
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

        <h1 className=" text-3xl font-medium pl-1">Report an issue in the usage website or service</h1>
      </div>

      <div className='px-5'>
        <h6 className="text-base text-gray-500 mt-2 mb-4 pl-1">If you're having trouble with your usage website or service, you've come to the right place. Please use this form to tell us about the issue that you're experiencing.</h6>
        <ReportForm formData={formData} handleChange={handleFormChange} >
        </ReportForm>


        <h6 className="text-base text-gray-500 mt-4 mb-4 pl-1">Thanks for taking the time to submit a report. While we don't reply to every report, we'll let you know if we need more details.</h6>

      </div>

      <div className="h-10 relative  flex">


        <p className="absolute  right-10">

          <BasicButton

            name={"Send"}

            onClick={()=>handleSubmit()}
          >
          </BasicButton>
        </p>
      </div>


    </div>
  );
}





// pages/index.js
// 'use client'
// import React, { useState } from 'react';

// const IndexPage = () => {
//   const [formData, setFormData] = useState({
//     details: '',
//     issueType: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await issueCreate(formData.details,  formData.issueType,null,null);
      
//     } catch (error) {
//       // Handle error
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="details" value={formData.details} onChange={handleChange} />
//       <input type="text" name="issueType" value={formData.issueType} onChange={handleChange} />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default IndexPage;
