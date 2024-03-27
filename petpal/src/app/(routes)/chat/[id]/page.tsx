"use client"
import React from "react";
import { useState, useEffect, useContext } from "react";
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
import { AuthContext } from "@/app/_contexts/AuthContext";

// type Message = {
//     content: string
//     client_id: string
//     username: string
//     room_id: string
//     timestamp: Date
//     type: 'recv' | 'self'
// }

type Message = {
    content: string,
    roomId: string,
    userId: string,
    username: string,
    role: string,
    MessageType: string,
    TimeStamp: string,
}

type Conn = WebSocket | null
type ConnWithName = {
    id: string,
    conn: Conn
}


export default function ChatHistory({ params }: { params: { id: string } }) {
    const { currentEntity, setCurrentEntity } = useContext(AuthContext)
    const [targetUserId, setTargetUserId] = useState<string>(params.id);
    const [IsShowChatPreview, SetIsShowChatPreview] = useState<boolean>(false)
    const [chatPageUser, setChatPageUser] = useState<ChatPageinterface>()
    const [allChatHistory, setAllChatHistory] = useState<ChatHistoryUserInterface[]>([])
    const [selectedChatHistory, setSelectedChatHistory] = useState<ChatHistoryUserInterface>()
    const [shownMessageHistory, SetShownMessageHistory] = useState<MessageInterface[]>([])

    const [ShownChatHistoryUserList, SetShownChatHistoryUserList] = useState<ChatHistoryUserInterface[]>()
    const [connWithNameList, setConnWithNameList] = useState<ConnWithName[]>([])
    const [currentMessage, setCurrentMessage] = useState<string>("");

    const [lastestReceivedMessage, setLastestReceivedMessage] = useState<MessageInterface>()
    const connRecivedHandle = (message: string, senderId: string,) => {
        const MessageText: string = message;
        const NewMessage: MessageInterface = {
            SenderID: senderId,
            Content: MessageText,
            TimeSend: new Date()
        }
        setLastestReceivedMessage(NewMessage)
    };
    useEffect(() => {
        // if (currentEntity !== null) {
        //     console.log("it me mario", currentEntity)
        // }
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
    }, [currentEntity])

    useEffect(() => {
        if (chatPageUser !== undefined) {
            console.log("chatPageUser 5434", chatPageUser)
            switch (chatPageUser.type) {
                case "user": {
                    getChatHistoryUser().then((reponse: ChatResponse[]) => {
                        console.log("ChatHistoryReponse User", reponse)
                        let newAllChatHistory: ChatHistoryUserInterface[] = []
                        reponse.map((message: ChatResponse) => {
                            adapterChatResponseToChatHistoryUserInterface(chatPageUser, message).then((result: ChatHistoryUserInterface) => {
                                newAllChatHistory.push(result)
                                setAllChatHistory(newAllChatHistory)
                            }
                            )
                        })
                        // console.log("newAllChatHistory", newAllChatHistory)
                        // setAllChatHistory(newAllChatHistory)
                    })
                    break
                } case "svcp": {
                    getChatHistorySvcp().then((reponse: ChatResponse[]) => {
                        // console.log("ChatHistoryReponse SVCP", reponse)
                        // const newAllChatHistory: ChatHistoryUserInterface[] = reponse.map((message: ChatResponse) => adapterChatResponseToChatHistoryUserInterface(chatPageUser, message))
                        // console.log("newAllChatHistory", newAllChatHistory)
                        // setAllChatHistory(newAllChatHistory)
                        console.log("ChatHistoryReponse User", reponse)
                        let newAllChatHistory: ChatHistoryUserInterface[] = []
                        reponse.map((message: ChatResponse) => {
                            adapterChatResponseToChatHistoryUserInterface(chatPageUser, message).then((result: ChatHistoryUserInterface) => {
                                newAllChatHistory.push(result)
                            }
                            )
                        })
                        setAllChatHistory(newAllChatHistory)
                    })
                    break
                } default: {
                    console.log("error!!!")
                    break
                }
            }
        }
    }, [chatPageUser])
    useEffect(() => {
        if (chatPageUser !== undefined && allChatHistory !== undefined) {
            let newConnWithNameList: ConnWithName[] = []
            let chat: ChatHistoryUserInterface
            for (chat of allChatHistory) {
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
                    if (m.content !== "A new user has joined the room" && m.content !== "user left the chat" && m.userId !== chatPageUser.id) {
                        connRecivedHandle(m.content, m.userId)
                    }
                    console.log("get", m)
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
                console.log(`CONN WITH Romm:${chat.RoomId}`)
                newConnWithNameList.push(newConnWithName)
            }
            console.log("setupConn", newConnWithNameList)
            setConnWithNameList(newConnWithNameList)

            SetShownChatHistoryUserList(allChatHistory)
        }
    }, [allChatHistory])

    useEffect(() => {
        if (chatPageUser !== undefined) {
            const newSelectedChat: ChatHistoryUserInterface = UserIdToSelectChat(allChatHistory, targetUserId)
            setSelectedChatHistory(newSelectedChat)
        }
    }, [targetUserId])

    useEffect(() => {
        if (selectedChatHistory !== undefined) {
            const newShownMessageHistory: MessageInterface[] = selectedChatHistory.MessageHistory
            SetShownMessageHistory(newShownMessageHistory)
        }
    }, [selectedChatHistory])

    useEffect(() => {
        console.log("ShownChatHistoryUserList", ShownChatHistoryUserList)
    }, [ShownChatHistoryUserList])

    useEffect(() => {
        console.log("shownMessageHistoryChange", shownMessageHistory)
    }, [shownMessageHistory])

    useEffect(() => {
        if (lastestReceivedMessage !== undefined) {
            const senderId: string = lastestReceivedMessage.SenderID
            if (targetUserId === senderId) {
                const NewShownMessageHistory: MessageInterface[] = [...shownMessageHistory, lastestReceivedMessage]
                SetShownMessageHistory(NewShownMessageHistory)
            }
            // var chatHistory: ChatHistoryUserInterface
            // for (let i = 0; i < allChatHistory.length; i++) {
            //     const chatHistory = allChatHistory[i]
            //     if (chatHistory.Id === senderId) {
            //         let allChatHistory = 
            //         let newChatHistory = chatHistory
            //     }
            // }
        }
        // allChatHistory:ChatHistoryUserInterface[]
    }, [lastestReceivedMessage])

    const sendMessage = () => {
        if (currentMessage === '') return;
        if (chatPageUser === undefined) return;
        HandleOnSubmitText(currentMessage, chatPageUser.id, shownMessageHistory, SetShownMessageHistory)
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
                        {(ShownChatHistoryUserList !== undefined) ? (
                            <ul className="flex flex-col-reverse">
                                {ShownChatHistoryUserList.map((ChatHistoryUser: ChatHistoryUserInterface) => <ChatPreview ChatHistoryUser={ChatHistoryUser} setUserId={setTargetUserId} key={String(ChatHistoryUser.Id)} />)}
                            </ul>
                        ) : (<></>)
                        }
                    </div>
                </div>
                <div className={`${IsShowChatPreview ? "hidden md:flex" : "flex-row md:flex"} items-top md:flex-col md:float-right flex-grow   my-[0px] md:p-[10px] space-y-[10px]`}>
                    {(selectedChatHistory !== undefined) ? (
                        <>
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
                        </>
                    ) : (<></>)
                    }
                </div>
            </div >
        </div >
    )

}

