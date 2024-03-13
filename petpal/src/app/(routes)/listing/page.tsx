'use client'
import React from "react";
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Searchbar from "./_components/Searchbar";
import Searchresult from "./_components/Searchresult";


export default async function ServiceListing(){
    const currentPage = usePathname();
    
    return (
        <main>
            <Searchbar/>
            <Searchresult/>
        </main>
    )
}