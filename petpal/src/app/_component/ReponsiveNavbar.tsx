"use client";
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import Button from '../(routes)/register/_components/Button';

interface NavBarProps {
    brandName: string;
    navItems: {name : string , link:string}[];
}

export default function ReponsiveNavbar({ brandName, navItems }: NavBarProps) {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-[#D9D9D9]">
            <div className="md:px-10 justify-between items-center md:vlock">
                <div className="md:flex text-2xl cursor-pointer items-center gap-2 pl-9">
                    <a className="font-bold" href="./">{brandName}</a>
                </div>

                <div className="md:hidden cursor-pointer" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                    <span className="text-3xl">&#9776;</span>
                </div>

                <ul className={`md:flex pl-9 md:pl-0 ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
                    {navItems.map((link, index) => (
                        <li key={index} className="my-7 md:my-0 md:ml-8"> 
                            <a href={link.link}>{link.name}</a>
                        </li>
                    ))}
                    <li className="my-7 md:my-0 md:ml-8">
                        <form className="flex items-center">
                            <input
                                className="border-2 mt-1 p-1 block rounded-lg border-gray-300 shadow-sm
                                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="pl-3" type="submit">
                                <SearchIcon/>
                            </button>
                        </form>
                    </li>
                    <li className="my-7 md:my-0 md:ml-8">
                        <Link href={"./login"}>
                            <Button name={"LOGIN"}/>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
