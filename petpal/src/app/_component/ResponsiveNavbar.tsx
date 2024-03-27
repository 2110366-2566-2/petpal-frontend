"use client";
import React, {useContext, useEffect, useState } from 'react'
import Link from 'next/link';
import Button from '../(routes)/register/_components/Button';
import BasicButton from './BasicButton';
import { AnimatePresence, motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import { deleteCookie, hasCookie } from 'cookies-next';
import { AuthContext } from '../_contexts/AuthContext';

interface NavBarProps {
    brandName: string;
    navItems: {name : string , link:string}[];
}

export default function ResponsiveNavbar({ brandName, navItems }: NavBarProps) {
    const [isMobile, setIsMobile] = useState(false);
    const {currentEntity , setCurrentEntity , isLogin , setIsLogin} = useContext(AuthContext)

    const toggleMobileMenu = () => {
      setIsMobile(!isMobile);
    };
    const router = useRouter()

    const onClickButtonHandler = () =>{
        if(!isLogin){
            router.push("/login");
        }else{
            // Logout by Clear a "token" cookie
            deleteCookie('token');
            setIsLogin(false);
            setCurrentEntity(null);
        }
    };
    // everytime current user and islogin change reload it 
    useEffect(() =>{
        router.refresh();
    },[currentEntity,isLogin])
    
    const menuVars = {
        initial: {
          scaleY: 0,
        },
        animate: {
          scaleY: 1,
          transition: {
            duration: 0.5,
            ease: [0.12, 0, 0.39, 0],
            y: { stiffness: 1000}
          },
        },
        exit: {
          scaleY: 0,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            y: { stiffness: 1000 }
          },
        },
      };
     
    return (
        <div className='sticky top-0 z-50'>
        <nav className="w-full bg-[#D9D9D9] flex flex-row justify-between items-center px-2 md:py-0 py-2">
            <div className="md:px-10 justify-between items-center md:flex md:flex-row ">
                <a className = "hidden min-[900px]:flex font-bold text-2xl" href="/">{brandName}</a>
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
                <Link href={"/login"} className="hidden min-[900px]:flex"><Button name={isLogin ? "LOGOUT" : "LOGIN"} onClick={onClickButtonHandler}/></Link>
            </div>
            <button className="min-[900px]:hidden text-white cursor-pointer" onClick={toggleMobileMenu}>
               { isMobile ? (<CloseIcon className='text-[#000000]'/>) : 
                (
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
                )
            }
            </button>
            
        </nav>
        <AnimatePresence>
        {
            isMobile && (
            <motion.div 
                variants={menuVars}
                initial="initial"
                animate="animate"
                exit="exit"
                className='min-[900px]:hidden w-full py-2 bg-[#D9D9D9] origin-top fixed'>
                <div
                    className=''
                >
                    <ul className="flex flex-col">
                        {
                            navItems.map((link) => 
                                <li key="{link}"> 
                                    <a href = {link.link} className='p-3 flex flex-row justify-center items-center hover:bg-[#e9e9e9]'>{link.name}</a>
                                </li>
                            )
                        }
                    </ul>
                    <Link href={"/login"} className="flex justify-center py-1"><BasicButton name={isLogin ? "LOGOUT" : "LOGIN"} onClick={onClickButtonHandler}/></Link>
                </div>
            </motion.div>
            )
        }
        </AnimatePresence>
        </div>
    );
}