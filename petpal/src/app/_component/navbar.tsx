import Link from "next/link";
import Button from "../(routes)/register/_components/Button";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";

interface NavBarProps {
    brandName: string;
    navItems: {name : string , link:string}[];
}
  
function NavBar({ brandName, navItems }: NavBarProps) {
    
    return (
        <nav className="bg-[#D9D9D9]">
            <div className="md:px-10 justify-center items-center md:flex">
                <div className="md:flex text-2xl cursor-pointer items-center gap-2 pl-9">
                    <a className = "font-bold" href="./">{brandName}</a>
                </div>
                
                <ul className="hidden md:flex pl-9 md:pl-0">
                    {
                        navItems.map((link) => 
                            <li key="{link}" className="my-7 md:my-0 md:ml-8"> 
                                <a href = {link.link}>{link.name}</a>
                            </li>
                        )
                    }
                </ul>
                <form className="hidden md:flex pl-9 md:pl-0 mr-4 ml-4 basis-4/5 justify-end ">
                    
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
                <Link href={"/login"} className="hidden md:flex"><Button name={"LOGIN"}/></Link>
            </div>
        
        </nav>
    );
}

  export default NavBar;