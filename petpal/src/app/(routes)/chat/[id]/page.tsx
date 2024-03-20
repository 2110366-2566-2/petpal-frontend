"use client"
import React from "react";
import { useState, useEffect, useContext, useRef } from "react";

import HeaderChatHistory from "@app/(routes)/chat/_components/HeaderChatHistory";
import HeaderChatComponent from "@app/(routes)/chat/_components/HeaderChatComponent";
import ChatPreview from "@app/(routes)/chat/_components/ChatPreview";
import ChatHistoryBody from "@app/(routes)/chat/_components/ChatHistoryBody";
import WebSocketProvider from "@app/(routes)/chat/_utils/WebsocketProvider";

import ChatHistoryUserInterface from "@app/(routes)/chat/_interface/ChatHistoryUserInterface";
import ChatPageinterface from "@app/(routes)/chat/_interface/ChatPageInterface";
import MessageInteraface from "@app/(routes)/chat/_interface/MessageInterface";
import UserRoomInterface from "@app/(routes)/chat/_interface/UserRoomInterface";

import { ExampleChatPageUser1 } from "@app/(routes)/chat/_interface/ChatPageInterface";
import { WebsocketContext } from "@app/(routes)/chat/_utils/WebsocketProvider";

import OnChangeSearch from "@app/(routes)/chat/_utils/HandleOnChangeSearch";
import HandleOnSubmitText from "@app/(routes)/chat/_utils/HandleOnSubmitText";

import PlusIcon from "@app/(routes)/chat/_src/PlusIcon.png";
import Maginifying from "@app/(routes)/chat/_src/Magnifying.png";
import ImageLogo from "@app/(routes)/chat/_src/ImageLogo.png";

import UserIdToSelectChat from "@app/(routes)/chat/_utils/UseIdToSelectChat";

import WebsocketJoinRoom from "@app/(routes)/chat/_utils/WebsocketJoinRoom";

type Message = {
    content: string
    client_id: string
    username: string
    room_id: string
    type: 'recv' | 'self'
}

type Conn = WebSocket | null

export default function ChatHistory({ params }: { params: { Id: number } }) {
    const [UserId, setUserId] = useState<number>(params.Id);
    const [IsShowChatPreview, SetIsShowChatPreview] = useState<boolean>(UserId == 0)
    const ChatPageUser: ChatPageinterface = ExampleChatPageUser1
    const AllChatHistory: ChatHistoryUserInterface[] = ChatPageUser.ChatHistoryList
    const SelectedChatHistory: ChatHistoryUserInterface = UserIdToSelectChat(AllChatHistory, UserId)
    const [ShownMessageHistory, SetShownMessageHistory] = useState<MessageInteraface[]>(SelectedChatHistory.MessageHistory)
    const [ShownChatHistoryUserList, SetShownChatHistoryUserList] = useState<ChatHistoryUserInterface[]>(AllChatHistory)
    // const { conn, setConn } = useContext(WebsocketContext)
    const [conn, setConn] = useState<Conn>(null)

    const connection = useRef<WebSocket | null>(null)


    useEffect(() => {
        SetShownMessageHistory(SelectedChatHistory.MessageHistory)
    }, [UserId])

    const [currentMessage, setCurrentMessage] = useState<string>("");
    useEffect(() => {
        let ChatHistory
        for (ChatHistory of AllChatHistory) {
            // const UserRoom: UserRoomInterface = {
            //     Id: UserId,
            //     Username: `UserId:${UserId}`,
            //     Role: "user",

            // }
            // WebsocketJoinRoom(ChatHistory.RoomId, UserRoom, setConn)
        }
        WebsocketJoinRoom(AllChatHistory[0].RoomId, { Id: UserId, Username: `UserId:${UserId}`, Role: "user" }, setConn)
    }, [])
    useEffect(() => {
        if (conn == null) {
            console.log("Does not have conn might error")
            return;
        }
        console.log("connect")
        conn.onerror = (error) => {
            console.log(`Websocket error: ${error.target}`);
        };
        conn.onopen = (event) => {
            console.log("connection start")
            conn.send("connection start")
        }
        conn.onmessage = (message) => {
            // const m: Message = JSON.parse(message.data)
            // console.log(m.content)
            console.log(message.data)
        }
        connection.current = conn

    }, [conn])

    const sendMessage = () => {
        HandleOnSubmitText(currentMessage, 0, UserId, ShownMessageHistory, SetShownMessageHistory)
        conn?.send(currentMessage)
        setCurrentMessage("");
    }
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
                            {ShownChatHistoryUserList.map((ChatHistoryUser: ChatHistoryUserInterface) => <ChatPreview ChatHistoryUser={ChatHistoryUser} setUserId={setUserId} key={String(ChatHistoryUser.Id)} />)}
                        </ul>
                    </div>
                </div>
                <div className={`${IsShowChatPreview ? "hidden md:flex" : "flex-row md:flex"} items-top md:flex-col md:float-right flex-grow   my-[0px] md:p-[10px] space-y-[10px]`}>
                    <div className="border-solid border-b-2 border-[#D9D9D9a1]">
                        <HeaderChatHistory Text={SelectedChatHistory.Name} ImgSrc={SelectedChatHistory.Picture}></HeaderChatHistory>
                    </div>
                    <div className="h-[100px] bg-[#D9D9D9] flex-grow flex-col p-[10px] justify-items-end overflow-y-scroll">
                        <ChatHistoryBody ShownMessageHistory={ShownMessageHistory} OtherPersonUserId={UserId}></ChatHistoryBody>
                    </div>
                    {/* <ChatHistoryBody ShownMessageHistory={ShownMessageHistory} OtherPersonUserId={UserId}></ChatHistoryBody> */}
                    <div className="pl-[15px] h-[75px] bg-white flex flex-row space-x-[15px] items-center">
                        <img src={PlusIcon.src} alt="Maginifying" className="w-[24px] h-[24px] my-auto" />
                        <input name="message" className="h-[50px] bg-[#D9D9D9CC] outline-none my-auto flex-grow p-[10px] rounded-[15px]" type="text" placeholder="Typing a message..." value={currentMessage}
                            onChange={(event) => {
                                setCurrentMessage(event.target.value);
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    sendMessage()
                                }
                            }}
                        />
                        <img src={ImageLogo.src} alt="Maginifying" className="w-[24px] h-[24px] my-auto" />
                        <p></p>
                    </div>
                </div>
            </div >
        </div >
    )

}

