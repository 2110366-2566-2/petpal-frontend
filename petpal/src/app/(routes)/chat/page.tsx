import React from "react";
import HeaderChatComponent from "./_components/HeaderChatComponent";
import ChatPreview from "./_components/ChatPreview";
import ChatPageinterface from "./_interface/ChatPageInterface";
import ChatHistoryUserInterface from "./_interface/ChatHistoryUserInterface";
import { ExampleChatPageUser1 } from "./_interface/ChatPageInterface";

export default function ChatPage() {
    var ChatPageUser: ChatPageinterface = ExampleChatPageUser1
    return (
        <div>
            <HeaderChatComponent></HeaderChatComponent>
            <ul>
                {ChatPageUser.ChatHistoryList.map((ChatHistoryUser) => <ChatPreview ChatHistoryUser={ChatHistoryUser} key={String(ChatHistoryUser.ID)} />)}
            </ul>
        </div>
    )
}