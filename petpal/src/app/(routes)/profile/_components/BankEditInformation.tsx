'use client'


import {useState} from 'react'
import React from 'react'


export default function BankEditInformation(){
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
    return(
        <div>
            {!isOpen && 
            <div className="Not Added bank account">
                <div className='accountNumber'>
                <span className='text-black font-bold text-[24px]'>Account</span>
                    <form className="md:flex pl-9 md:pl-0 ">
                    <input
                    className="border-2"
                    type="text"
                    placeholder="422-xxxxxxxx"
                    />
                    </form>
                </div>
                <div className='bankName'>
                    <p>Bank Name</p>
                    <select>
                        {
                        banks.map((bank) => 
                            <option value={bank.id} > 
                                {bank.name}
                            </option>
                        )
                        }
                    </select>
                </div>
                <button className = 'border-2'type='button' onClick={() => {setIsOpenValue(true)}}>confirm</button>
            </div>}
        </div>
    )
}