'use client'
import React from "react";
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';


export default async function ServiceListing(){
    const currentPage = usePathname();
    // redirect(currentPage+"/id")
    return (
        <h1>hello{currentPage}</h1>
    )
}