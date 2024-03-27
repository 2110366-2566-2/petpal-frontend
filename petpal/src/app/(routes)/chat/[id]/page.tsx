"use client"
import React from "react";
import { useState, useEffect } from "react";
import HeaderChatHistory from "../_components/HeaderChatHistory";
import HeaderChatComponent from "../_components/HeaderChatComponent";
import ChatPreview from "../_components/ChatPreview";
import ChatHistoryBody from "../_components/ChatHistoryBody";
import ChatHistoryUserInterface from "../_interface/ChatHistoryUserInterface";
import ChatPageinterface from "../_interface/ChatPageInterface";
import MessageInterface from "../_interface/MessageInterface";
import { ExampleChatPageUser1 } from "../_interface/ChatPageInterface";
import OnChangeSearch from "../_utils/HandleOnChangeSearch";
import HandleOnSubmitText from "../_utils/HandleOnSubmitText";
import PlusIcon from "../_src/PlusIcon.png"
import Maginifying from "../_src/Magnifying.png"
import ImageLogo from "../_src/ImageLogo.png"
import UserIdToSelectChat from "../_utils/UseIdToSelectChat";
import WebsocketJoinRoom from "../_utils/WebsocketJoinRoom";
import { getCurrentEntity } from "@/app/libs/user/userBackend";
import { getCurrentEntityUser } from "@/app/libs/currentEntiity/getCurrentEntityUser";
import { getCurrentEntitySvcp } from "@/app/libs/currentEntiity/getCurrentEntitySvcp";
import { getCurrentEntityType, isCurrentEntityTypeUser, isCurrentEntityTypeSvcp } from "@/app/libs/currentEntiity/getCurrentEntityType";
import { getChatHistorySvcp } from "@/app/libs/chat/getChatHistorySvcp";
import { getChatHistoryUser } from "@/app/libs/chat/getChatHistoryUser";
import { setChatHistoryByRoomId } from "@/app/libs/chat/setChatHistoryByRoomId";
import { ChatResponse } from "@/app/_interface/chat/ChatResponse";
import { MessageResponse } from "@/app/_interface/chat/MessageResponse";
import { adapterChatResponseToChatHistoryUserInterface } from "../_interface/ChatHistoryUserInterface";

type Message = {
    content: string
    client_id: string
    username: string
    room_id: string
    timestamp: Date
    type: 'recv' | 'self'
}

type Conn = WebSocket | null
type ConnWithName = {
    id: string,
    conn: Conn
}

export default function ChatHistory({ params }: { params: { id: string } }) {
    const [targetUserId, setTargetUserId] = useState<string>(params.id);
    const [IsShowChatPreview, SetIsShowChatPreview] = useState<boolean>(false)
    const [chatPageUser, setChatPageUser] = useState<ChatPageinterface>(ExampleChatPageUser1)
    const [allChatHistory, setAllChatHistory] = useState<ChatHistoryUserInterface[]>(ExampleChatPageUser1.chatHistoryList)
    const [selectedChatHistory, setSelectedChatHistory] = useState<ChatHistoryUserInterface>(UserIdToSelectChat(allChatHistory, targetUserId))
    const [shownMessageHistory, SetShownMessageHistory] = useState<MessageInterface[]>(selectedChatHistory.MessageHistory)

    const [ShownChatHistoryUserList, SetShownChatHistoryUserList] = useState<ChatHistoryUserInterface[]>(allChatHistory)
    // const [conn, setConn] = useState<Conn>(null)
    const [connWithNameList, setConnWithNameList] = useState<ConnWithName[]>([])
    const [currentMessage, setCurrentMessage] = useState<string>("");
    useEffect(() => {
        getCurrentEntity().then((res) => {
            let newChatPageUser: ChatPageinterface = {
                id: "",
                name: "",
                type: "user",
                chatHistoryList: []
            }
            if (isCurrentEntityTypeUser(res)) {
                newChatPageUser.id = res.id as string
                newChatPageUser.name = res.username as string
                newChatPageUser.type = "user"
            } else {
                newChatPageUser.id = res.SVCPID as string
                newChatPageUser.name = res.SVCPUsername as string
                newChatPageUser.type = "svcp"
            }
            console.log("newChatPageUser", newChatPageUser)
            setChatPageUser(newChatPageUser)
        })

        // const
        // const mockChat: ChatResponse = {
        //     dateCreated: "",
        //     messages: [],
        //     roomID: "6603dc263637f21e66992a24//6603dc263637f21e66992a25",
        //     user0ID: "6603dc263637f21e66992a24",
        //     user0Type: "user",
        //     user1ID: "6603dc263637f21e66992a25",
        //     user1Type: "user"
        // }
        // setChatHistoryByRoomId(mockChat)
    }, [])

    useEffect(() => {
        switch (chatPageUser.type) {
            case "user": {
                getChatHistoryUser().then((reponse) => {
                    console.log("ChatHistoryReponse", reponse)
                    const newAllChatHistory = reponse.map((message: ChatResponse) => adapterChatResponseToChatHistoryUserInterface(chatPageUser, message))
                    setAllChatHistory(newAllChatHistory)
                })
                break
            } case "svcp": {
                getChatHistorySvcp().then((reponse) => {
                    console.log("ChatHistoryReponse", reponse)
                    const newAllChatHistory = reponse.map((message: ChatResponse) => adapterChatResponseToChatHistoryUserInterface(chatPageUser, message))
                    setAllChatHistory(newAllChatHistory)
                })
                break
            } default: {
                console.log("error!!!")
            }
        }
    }, [chatPageUser])
    useEffect(() => {
        let newConnWithNameList: ConnWithName[] = []
        for (var chat of allChatHistory) {
            const ws = WebsocketJoinRoom(chat.RoomId, { Id: chatPageUser.id, Username: chatPageUser.name, Role: chatPageUser.type });
            if (ws == null) {
                console.log("Connection is not established. Skipping event handler setup.");
                return;
            }
            // When websocket is start
            ws.onopen = () => {
                console.log(`Connecting to Websocket with Romm:${chat.RoomId}`)
                // Load Chat History
                // let ChatHistory
                // for (ChatHistory of AllChatHistory) {
                // const UserRoom: UserRoomInterface = {
                //     Id: UserId,
                //     Username: `UserId:${UserId}`,
                //     Role: "user",
                // }
                // WebsocketJoinRoom(ChatHistory.RoomId, UserRoom, setConn)
                // }
            }
            ws.onmessage = (message) => {
                const m: Message = JSON.parse(message.data);
                if (m.content !== "A new user has joined the room" && m.content !== "user left the chat") {
                    HandleOnSubmitText(m.content, chatPageUser.id, chat.Id, shownMessageHistory, SetShownMessageHistory)
                }
            };
            // When socket is close 
            ws.onclose = () => {
                // save chat history soon
                // setChatHistoryByRoomId()
            }
            // setConn(ws);
            const newConnWithName: ConnWithName = {
                id: chat.Id,
                conn: ws
            }
            newConnWithNameList.push(newConnWithName)
        }
        setConnWithNameList(newConnWithNameList)

        SetShownChatHistoryUserList(allChatHistory)
    }, [allChatHistory])

    useEffect(() => {
        const newSelectedChat: ChatHistoryUserInterface = UserIdToSelectChat(allChatHistory, targetUserId)
        setSelectedChatHistory(newSelectedChat)
    }, [targetUserId])

    useEffect(() => {
        const newShownMessageHistory: MessageInterface[] = selectedChatHistory.MessageHistory
        SetShownMessageHistory(newShownMessageHistory)
    }, [selectedChatHistory])

    const sendMessage = () => {
        if (currentMessage === '') return;
        HandleOnSubmitText(currentMessage, chatPageUser.id, targetUserId, shownMessageHistory, SetShownMessageHistory)
        let selectedConn: Conn = null
        for (var connWithName of connWithNameList) {
            if (connWithName.id == targetUserId) {
                selectedConn = connWithName.conn
                break
            }
        }
        selectedConn?.send(currentMessage)
        setCurrentMessage("");
    }

    const showChatCSS: string = IsShowChatPreview ? "md:flex md:flex-col" : "hidden md:flex md:flex-col"

    return (
        <div className="h-[calc(100vh-64px)]">
            <div className="flex flex-row items-top grow h-full">
                <div className={`${showChatCSS} h-inherit flex-grow md:float-left md:max-w-[400px] outline-8 border-solid border-r-2 md:p-[30px] md:pr-[10px]`}>
                    <div>
                        <HeaderChatComponent Text="Chats"></HeaderChatComponent>
                        <div className="p-[10px] md:px-[0px] md:pt-[0px]">
                            <div className="flex flex-row space-x-[10px] m-auto bg-[#D9D9D9] py-[2px] px-[20px] rounded-[5px]">
                                <img src={Maginifying.src} alt="Maginifying" className="w-[12px] h-[12px] my-auto" />
                                <input onChange={(event) => OnChangeSearch(event, allChatHistory, SetShownChatHistoryUserList)} className="bg-[#D9D9D9] outline-none" type="text" placeholder="Search" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-[10px]">
                        <ul className="flex flex-col-reverse">
                            {ShownChatHistoryUserList.map((ChatHistoryUser: ChatHistoryUserInterface) => <ChatPreview ChatHistoryUser={ChatHistoryUser} setUserId={setTargetUserId} key={String(ChatHistoryUser.Id)} />)}
                        </ul>
                    </div>
                </div>
                <div className={`${IsShowChatPreview ? "hidden md:flex" : "flex-row md:flex"} items-top md:flex-col md:float-right flex-grow   my-[0px] md:p-[10px] space-y-[10px]`}>
                    <div className="border-solid border-b-2 border-[#D9D9D9a1]">
                        <HeaderChatHistory Text={selectedChatHistory.Name} ImgSrc={selectedChatHistory.Picture}></HeaderChatHistory>
                    </div>
                    <div className="h-[100px] bg-[#D9D9D9] flex-grow flex-col p-[10px] justify-items-end overflow-y-scroll">
                        <ChatHistoryBody ShownMessageHistory={shownMessageHistory} OtherPersonUserId={targetUserId}></ChatHistoryBody>
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

