"use client";
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import Button from '../(routes)/register/_components/Button';
import { ClassNames } from '@emotion/react';
import BasicButton from './BasicButton';

interface NavBarProps {
    brandName: string;
    navItems: {name : string , link:string}[];
}

export default function ReponsiveNavbar({ brandName, navItems }: NavBarProps) {
    const [isMobile, setIsMobile] = useState(false);

    const toggleMobileMenu = () => {
      setIsMobile(!isMobile);
    };

     
    return (
        <div className='sticky top-0'>
        <nav className="w-full bg-[#D9D9D9] flex flex-row justify-between items-center px-2 md:py-0 py-2">
            <div className="md:px-10 justify-between items-center md:flex md:flex-row ">
                <a className = "hidden min-[900px]:flex font-bold text-2xl" href="./">{brandName}</a>
                <ul className="hidden min-[900px]:flex pl-9 md:pl-0">
                    {
                        navItems.map((link) => 
                            <li key="{link}" className="my-7 md:my-0 md:ml-8"> 
                                <a href = {link.link}>{link.name}</a>
                            </li>
                        )
                    }
                </ul>
            </div>
            <button className="min-[900px]:hidden text-transparent">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke=""
                className="h-6 w-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
            </button>
            <a className = "flex min-[900px]:hidden font-bold text-2xl" href="./">{brandName}</a>
            <div className='flex flex-row justify-between items-center'>     
                <form className="hidden min-[900px]:flex pl-9 md:pl-0 mr-4 ml-4 basis-4/5 justify-end "> 
                    <input
                    className="my-7 md:my-0 md:ml-8 border-2 mt-1 p-1 block rounded-lg border-gray-300 shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    />
                    <button className="pl-3" type="submit">
                     <SearchIcon/>
                    </button>
                </form>
                <Link href={"./login"} className="hidden min-[900px]:flex"><Button name={"LOGIN"}/></Link>
            </div>
            <button className="min-[900px]:hidden text-white cursor-pointer" onClick={toggleMobileMenu}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
                className="h-6 w-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
            </button>
            
        </nav>
        {
            isMobile && (
            <div className='bg-gray-200'>
                <div className='flex flex-row justify-center items-center border-b border-gray-300'>     
                    <form className="flex justify-center items-center"> 
                        <input
                        className="m-2 p-1 block rounded-lg border-gray-300 shadow-sm
                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        />
                        <button className="" type="submit">
                        <SearchIcon/>
                        </button>
                    </form>
                </div>
                <ul className="flex flex-col">
                    {
                        navItems.map((link) => 
                            <li key="{link}" className=""> 
                                <a href = {link.link} className='p-3 flex flex-row justify-center items-center border-b border-gray-300'>{link.name}</a>
                            </li>
                        )
                    }
                </ul>
                <Link href={"./login"} className="flex justify-center py-1" onClick={toggleMobileMenu}><BasicButton name={"LOGIN"}/></Link>
            </div>
            )
        }
        </div>
    );
}
