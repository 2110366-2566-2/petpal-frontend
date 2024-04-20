'use client'

import {deleteBank, getCurrentEntity, setdefaultBank} from '@app/libs/user/userBackend';
import BankEditInformation from "@app/(routes)/profile/_components/BankEditInformation";
import BankButton from "@app/(routes)/profile/_components/BankButton";
import { LoginApi } from '@/app/libs/user/userBackend';
import { setCookie } from "cookies-next";
import { useState , useEffect, ReactEventHandler, ReactElement, ReactComponentElement } from 'react';

export default function FetchBankInformation(){
    
    const [addAndDeleteReq , setAddAndDeleteReq] = useState(false)
    
    const [userInfo , setUserInfo] = useState(null)
    const [haveBank , setHaveBank] = useState(false)
    const [defAccount , setDefAccount] = useState("")
    const [defBank , setDefBank] = useState("")
    const [userType , setUserType] = useState("")
    const [errorMessage , setErrorMessage] = useState("")

    useEffect(() => {

        const fetchCurrentEntity = async () => {
            // const LogData = await LoginApi()
            // setCookie("token",LogData?.data.AccessToken);
            // console.log("logdata from login",LogData)
            // setUserType(LogData?.data.logintype)
            const entity =await getCurrentEntity()
            setUserType(()=>{
                if(!entity.id) return "serviceproviders"
                else return "user"
            })
            setUserInfo(entity)
            setHaveBank(entity.defaultAccountNumber != "" && entity.defaultBank != "")
            setAddAndDeleteReq(!(entity.defaultAccountNumber != "" && entity.defaultBank != ""))
            setDefAccount(entity.defaultAccountNumber)
            setDefBank(entity.defaultBank)

        };
        fetchCurrentEntity();
    } , [addAndDeleteReq])


    let banks = [
        {id:0 , name : "None"},
        {id: 1 , name: "Kasikorn"},
        {id: 2 , name: "Krungthai"},
        {id: 3 , name: "SCB"}
    ]
    // const haveBank = true;
    // console.log(haveBank)
    // const defAccount = ""
    // const defBank = ""
    const handleClickDelete = async(event:any) => {
        event.preventDefault();
        setAddAndDeleteReq(true)
        setHaveBank(false)
        if(userType){
            await deleteBank(userType);
        }
    };
    const handleClickAdd = async(event:any) => {
        event.preventDefault();
        if(isNaN(Number(defAccount)) || defAccount.length!=10){
            setErrorMessage("Incorrect account number")
        }else if(defBank == 'None' || defBank == ""){
            console.log("not select bank")
            setErrorMessage("Please select the bank")
        }else{
            setErrorMessage("")
            setAddAndDeleteReq(false)
            setHaveBank(true)
            console.log("correct",defBank)
            if(userType && defAccount && defBank){
                await setdefaultBank(userType,defAccount,defBank);
            }
        }
    };

    if(!userInfo){
        return <p>loading...</p>
    }else{
        // console.log("userinfo",userInfo)
    }

    return (
        <div className = "my-2">
            <span className='text-black font-bold text-[20px]'>Bank Account</span>
            {haveBank && 
            <div className="Added bank account">
                <div className='accountNumber'> 
                    <span className='text-black font-bold text-[16px]'>Accout Number</span>
                    <div>
                    <span>{String(defAccount)}</span>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-black font-bold text-[16px]'>Bank Name</span>
                    <div>
                    <span>{String(defBank)}</span>
                    </div>
                </div>
                <button className='bg-[#D9D9D9] hover:bg-[#FF0000] hover:text-white w-[102px] rounded-[10px] text-[18px] text-center p-[5px] mt-4' onClick={async (e) => {handleClickDelete(e)}}>
                    Delete
                </button>
            </div>
            }
            {!haveBank && 
            <div>
                <div>   
                    <span className='text-black font-bold text-[16px]'>No Default Bank Account</span>
                </div>
                <div className='accountNumber'>
                <span className='text-black font-bold text-[16px]'>Accout Number</span>
                    <input type="text" className='p-1 mt-1 block w-full rounded-md shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary border-[#D9D9D9] border-[3px]'
                    placeholder='1234567890' 
                    value={defAccount}
                    onChange={(e) => setDefAccount(e.target.value)}/>
                </div>
                <div className='flex flex-col'>
                    <span className='text-black font-bold text-[16px]'>Bank Name</span>
                    <select value={defBank} onChange={(e)=>{setDefBank(e.target.value)}}
                        className='p-1 border-[#D9D9D9] border-[3px] rounded-md'>
                        {
                        banks.map((bank) => 
                            <option value={bank.name} > 
                                {bank.name}
                            </option>
                        )
                        }
                    </select>
                </div>
                <button className='bg-[#D9D9D9] hover:bg-blue hover:text-white w-[102px] rounded-[10px] text-[18px] text-center p-[5px] mt-4' onClick={async (e) => {handleClickAdd(e)}}>
                    Add
                </button>
                {
                    (errorMessage != "") &&
                    <div className='ml-1'>
                    <span className='text-[#FF0000]'>{errorMessage}</span>
                    </div>
                }
            </div>
            }
        </div>

    );
}