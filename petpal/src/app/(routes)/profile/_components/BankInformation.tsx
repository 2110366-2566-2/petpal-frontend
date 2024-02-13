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
            <p>Bank Account</p>
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
                    <p>Account Number</p>
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
        </div>
    );
}