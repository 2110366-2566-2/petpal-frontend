"use client"
import React from "react";
// import HeaderChatComponent from "./_components/HeaderChatComponent";
// import ChatPreview from "./_components/ChatPreview";
// import ChatPageinterface from "./_interface/ChatPageInterface";
// import ChatHistoryUserInterface from "./_interface/ChatHistoryUserInterface";
// import { ExampleChatPageUser1 } from "./_interface/ChatPageInterface";
// import ChatSearchBar from "./_components/ChatSearchBar";
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function ChatPage() {
    // var ChatPageUser: ChatPageinterface = ExampleChatPageUser1
    const currentPage = usePathname();
    redirect(currentPage + "/0")
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