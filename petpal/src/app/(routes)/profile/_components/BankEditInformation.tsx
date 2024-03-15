'use client'


import {ChangeEvent, useState} from 'react'
import React from 'react'
import BankButton from './BankButton';
import FetchedBankInformation from './FetchedBankInformation'
import { setdefaultBank } from '@/app/libs/user/userBackend';

export default function BankEditInformation(){
    const [accountNumber , setAccountNumber] = useState("")
    const [bankAccount , setBankAccount] = useState("")
    const [buttonName ,setButtonName] = useState("Set/Delete Account")
    const [buttonClick ,setButtonClick] = useState(false)
    // const [refreshComponent , setRefreshComponent] = useState(0)

    const handleBankAccountChange = (e:ChangeEvent<HTMLSelectElement>) =>{
        setBankAccount(e.target.value)
    }

    const handleSubmit = () =>{
        // console.log(buttonClick)
        if(buttonClick == false){
            setButtonName("Set/Delete Account")
        }else{
            setButtonName("Submit")
        }
        setButtonClick(!buttonClick)
        // alert(buttonClick)
        
        return
        // try{
        //     console.log(Log,bankAccount , accountNumber)
        //     const response = await setdefaultBank(Log,accountNumber , bankAccount)
        //     console.log('setbank',response)
        // }catch(err){
        //     throw new Error('cant set default bank while click button')
        // }
        
    }

    let banks = [
        {id:0 , name : "None"},
        {id: 1 , name: "Kasikorn"},
        {id: 2 , name: "Krungthai"},
        {id: 3 , name: "SCB"}
    ]
    return(
        <div>
            {!buttonClick &&
                <FetchedBankInformation />
            }
            {buttonClick &&
                <div>
                <div className='accountNumber'>
                    <span className='text-black font-bold text-[16px]'>Accout Number</span>
                        <input type="text" className='mt-1 block w-full rounded-md shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary border-[#D9D9D9] border-[3px]'
                        placeholder='x-xxx-x-xxxx' 
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}/>
                </div>
                <div className='flex flex-col'>
                    <span className='text-black font-bold text-[16px]'>Bank Name</span>
                    <select value={bankAccount} onChange={handleBankAccountChange}>
                        {
                        banks.map((bank) => 
                            <option value={bank.name} > 
                                {bank.name}
                            </option>
                        )
                        }
                    </select>
                </div>
                {/* <BankButton ButtonProps={handleSubmit}/> */}
            </div>
            }
            <button className = 'bg-gray' onClick={() => {handleSubmit()}}>{buttonName}</button>
        </div>
    )
}