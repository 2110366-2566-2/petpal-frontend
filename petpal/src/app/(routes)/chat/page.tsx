"use client"
import React from "react";
import { useRouter } from "next/navigation";
// import { redirect } from 'next/navigation';
// import { usePathname } from 'next/navigation';

export default function ChatPage() {
    // var ChatPageUser: ChatPageinterface = ExampleChatPageUser1
    // const currentPage = usePathname();
    // redirect(currentPage + "/0")
    const router = useRouter()
    router.push('/chat/empty')
    return (
        <div className="">
            chat
        </div >
    )
}