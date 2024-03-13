"use client"
import React from "react";
import { useState, useEffect, useContext } from "react";

import HeaderChatHistory from "../_components/HeaderChatHistory";
import HeaderChatComponent from "../_components/HeaderChatComponent";
import ChatPreview from "../_components/ChatPreview";
import ChatBubble from "../_components/ChatBubble";

import ChatHistoryUserInterface from "../_interface/ChatHistoryUserInterface";
import ChatPageinterface from "../_interface/ChatPageInterface";
import MessageInteraface from "../_interface/MessageInterface";

import { ExampleChatPageUser1 } from "../_interface/ChatPageInterface";
import { WebsocketContext } from "../_utils/websocket_provider";

import OnChangeSearch from "../_utils/HandleOnChangeSearch";
import HandleOnSubmitText from "../_utils/HandleOnSubmitText";

import PlusIcon from "../_src/PlusIcon.png"
import Maginifying from "../_src/Magnifying.png"
import UserIdToSelectChat from "../_utils/UseIdToSelectChat";

export default function ChatHistory({ params }: { params: { Id: number } }) {
    var [UserId, setUserId] = useState<number>(params.Id);
    var [IsShowChatPreview, SetIsShowChatPreview] = useState<boolean>(UserId == 0)
    var ChatPageUser: ChatPageinterface = ExampleChatPageUser1
    var AllChatHistory: ChatHistoryUserInterface[] = ChatPageUser.ChatHistoryList
    var SelectedChatHistory: ChatHistoryUserInterface = UserIdToSelectChat(AllChatHistory, UserId)
    const [ShownMessageHistory, SetShownMessageHistory] = useState<MessageInteraface[]>(SelectedChatHistory.MessageHistory)
    var [ShownChatHistoryUserList, SetShownChatHistoryUserList] = useState<ChatHistoryUserInterface[]>(AllChatHistory)

    useEffect(() => {
        SetShownMessageHistory(SelectedChatHistory.MessageHistory)
    }, [UserId])

    const [rooms, setRooms] = useState<{ id: string; name: string }[]>([])
    const [roomName, setRoomName] = useState('')
    const { setConn } = useContext(WebsocketContext)

    return (
        <div className="h-[calc(100vh-64px)]">
            <div className="flex flex-row items-top grow h-full">
                <div className={`${IsShowChatPreview ? "md:flex md:flex-col" : "hidden md:flex md:flex-col"} h-inherit flex-grow md:float-left md:max-w-[400px] outline-8 border-solid border-r-2 md:p-[30px] md:pr-[10px]`}>
                    <div>
                        <HeaderChatComponent Text="Chats"></HeaderChatComponent>
                        <div className="p-[10px] md:px-[0px] md:pt-[0px]">
                            <div className="flex flex-row space-x-[10px] m-auto bg-[#D9D9D9] py-[2px] px-[20px] rounded-[5px]">
                                <img src={Maginifying.src} alt="Maginifying" className="w-[12px] h-[12px] my-auto" />
                                <input onChange={(event) => OnChangeSearch(event, AllChatHistory, SetShownChatHistoryUserList)} className="bg-[#D9D9D9] outline-none" type="text" placeholder="Search" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-[10px]">
                        <ul className="flex flex-col-reverse">
                            {ShownChatHistoryUserList.map((ChatHistoryUser: ChatHistoryUserInterface) => <ChatPreview ChatHistoryUser={ChatHistoryUser} setUserId={setUserId} key={String(ChatHistoryUser.ID)} />)}
                        </ul>
                    </div>
                </div>
                <div className={`${IsShowChatPreview ? "hidden md:flex" : "flex-row md:flex"} items-top md:flex-col md:float-right flex-grow   my-[0px] md:p-[10px] space-y-[10px]`}>
                    <div className="border-solid border-b-2 border-[#D9D9D9a1]">
                        <HeaderChatHistory Text={SelectedChatHistory.Name} ImgSrc={SelectedChatHistory.Picture}></HeaderChatHistory>
                    </div>
                    <div className="h-[100px] bg-[#D9D9D9] flex-grow flex-col p-[10px] justify-items-end">
                        <ul className="space-y-[5px] mt-auto">
                            {ShownMessageHistory.map((MessageHistory: MessageInteraface) => <ChatBubble MessageHistory={MessageHistory} OtherPersonUserId={UserId}></ChatBubble>)}
                        </ul>
                    </div>
                    <div className="h-[75px] bg-white flex flex-row space-x-[5px] items-center">
                        <img src={PlusIcon.src} alt="Maginifying" className="w-[24px] h-[24px] my-auto" />
                        <div className="h-[50px] bg-[#D9D9D9CC] flex-grow rounded-[15px] items-center text-left">
                            <input onSubmit={(event) => { HandleOnSubmitText(event, 0, UserId, ShownMessageHistory, SetShownMessageHistory) }} name="message" className="h-[50px] bg-[#D9D9D9CC] outline-none my-auto" type="text" placeholder="Typing a message..." />
                        </div>
                        <p></p>
                    </div>
                </div>
            </div >
        </div >
    )

}
