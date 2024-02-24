import React from "react";
import HeaderChatComponent from "./_components/HeaderChatComponent";
import ChatPreview from "./_components/ChatPreview";
import ChatPageinterface from "./_interface/ChatPageInterface";
import ChatHistoryUserInterface from "./_interface/ChatHistoryUserInterface";
import { ExampleChatPageUser1 } from "./_interface/ChatPageInterface";
import ChatSearchBar from "./_components/ChatSearchBar";

export default function ChatPage() {
    var ChatPageUser: ChatPageinterface = ExampleChatPageUser1
    return (
        <div className="md:p-[30px]">
            <div className="md:max-w-[450px] outline-8 border-solid border-r-2 h-full pr-[10px]">
                <div>
                    <HeaderChatComponent></HeaderChatComponent>
                    <ChatSearchBar></ChatSearchBar>
                </div>
                <div className="space-y-[10px]">
                    <ul>
                        {ChatPageUser.ChatHistoryList.map((ChatHistoryUser) => <ChatPreview ChatHistoryUser={ChatHistoryUser} key={String(ChatHistoryUser.ID)} />)}
                    </ul>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}