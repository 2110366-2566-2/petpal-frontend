'use client'


import getBankAccount from '@/app/libs/getBankAccount';
import React , {useState} from 'react'
import BankDefault from './BankDefault';
import BankEditInformation from './BankEditInformation';

export default function BankInformation(){
    
    const [isOpen, setIsOpen] = useState(false);
    function setIsOpenValue(value:boolean) {
        setIsOpen(value);
    }
    let banks = [
        {id:0 , name : "None"},
        {id: 1 , name: "Kasikorn"},
        {id: 2 , name: "Krungthai"},
        {id: 3 , name: "SCB"}
    ]



    let userType = "user"

    // const bankdefault = await getBankAccount(userType)

    return (
        <div className = "my-2">
              <span className='text-black font-bold text-[32px]'>Bank Account</span>
            {/* <BankDefault bankJson = {bankdefault}/>  */}
            {isOpen && 
                <div className='Added bank account'>
                    <div>
                        <p>Account Number</p>
                        <p>422-841634687</p>
                    </div>
                    <div>
                        <p>Bank</p>
                        <p>Kasikorn</p>
                    </div>
                    <button className = 'border-2'type='button' onClick={() => {setIsOpenValue(false)}}>cancel</button>
                </div>
            }
            <div>
            {!isOpen && 
            <div className="Not Added bank account">
                <div className='accountNumber'>
                <span className='text-black font-bold text-[24px]'>Accout Number</span>
                    <input type="text" className='mt-1 block w-full rounded-md shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 peer-focus:text-primary border-[#D9D9D9] border-[3px]'
                    placeholder='x-xxx-x-xxxx'/>
                </div>
                <div className='flex flex-col'>
                <span className='text-black font-bold text-[24px]'>Bank Name</span>
                    <select >
                        {
                        banks.map((bank) => 
                            <option value={bank.id} > 
                                {bank.name}
                            </option>
                        )
                        }
                    </select>
                </div>
                <button className='bg-[#D9D9D9] w-[102px] rounded-[10px] text-[18px] text-center p-[5px] mt-4' onClick={() => {setIsOpenValue(true)}}>confirm</button>
            </div>}
        </div>
        </div>
    );
}