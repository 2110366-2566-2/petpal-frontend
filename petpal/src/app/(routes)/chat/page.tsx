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
    router.push('')
    // return (
    //     <div className="">
    //         <div className="md:max-w-[450px] md:h-screen outline-8 border-solid border-r-2 h-full md:p-[30px] md:pr-[10px]">
    //             <div>
    //                 <HeaderChatComponent Text="Chats"></HeaderChatComponent>
    //                 <ChatSearchBar></ChatSearchBar>
    //             </div>
    //             <div className="space-y-[10px]">
    //                 <ul>
    //                     {ChatPageUser.ChatHistoryList.map((ChatHistoryUser) => <ChatPreview ChatHistoryUser={ChatHistoryUser} key={String(ChatHistoryUser.ID)} />)}
    //                 </ul>
    //             </div>
    //         </div>
    //         <div>

    //         </div>
    //     </div >
    // )
}