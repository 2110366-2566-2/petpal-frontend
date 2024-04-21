import { generateRoomId } from "@/app/_utils/chat/generateRoomId"
import { checkIfRoomExist } from "@/app/libs/chat/checkIfRoomExist"
import { craeteNewRoom } from "@/app/libs/chat/createNewRoom"
import { ChatResponse } from "@/app/_interface/chat/ChatResponse"
import { EntityType } from "@/app/_enum/currentEntity/EntityType"
import { MessageResponse } from "@/app/_interface/chat/MessageResponse"
import { getChatHistoryByRoomId } from "@/app/libs/chat/getChatHistoryByRoomId"
import { setChatHistoryByRoomId } from "@/app/libs/chat/setChatHistoryByRoomId"

const createDateTimeStringNow = () => {
    const now: Date = new Date()
    const year = String(10000 + now.getFullYear()).substring(5 - 4)
    const month = String(100 + now.getMonth()).substring(3 - 2)
    const day = String(100 + now.getDate()).substring(3 - 2)
    const hours = String(100 + now.getHours()).substring(3 - 2)
    const minutes = String(100 + now.getMinutes()).substring(3 - 2)
    const second = String(100 + now.getSeconds()).substring(3 - 2)
    return `${year}-${month}-${day}T${hours}:${minutes}:${second}Z`
}

const addMessage = (roomId: string, currentMessage: string, sender: number = 0, check_duplicate: boolean = false) => {
    getChatHistoryByRoomId(roomId).then((response: ChatResponse) => {
        let newMessageList: MessageResponse[] = response.messages!
        let goodToGo: boolean = true
        if (check_duplicate) {
            for (let message of newMessageList) {
                if (message.content! === currentMessage) {
                    goodToGo = false
                    break
                }
            }
        }
        if (goodToGo) {
            const newMessage: MessageResponse = {
                content: currentMessage,
                messageType: "text",
                sender: sender,
                timestamp: createDateTimeStringNow()
            }
            newMessageList.push(newMessage)
            const updateChatResponse: ChatResponse = {
                dateCreated: response.dateCreated,
                messages: newMessageList,
                roomID: response.roomID,
                user0ID: response.user0ID,
                user0Type: response.user0Type,
                user1ID: response.user1ID,
                user1Type: response.user1Type
            }
            console.log("updateChatResponse", updateChatResponse)
            setChatHistoryByRoomId(updateChatResponse)
        }
    }
    )
}

export function chatButtonFunction(myUserId: string, targetUserId: string, myType: EntityType | undefined, targetType: EntityType, speacial_message: string | undefined = undefined, check_duplicate: boolean = false) {
    const roomId0: string = generateRoomId(myUserId, targetUserId)
    const roomId1: string = generateRoomId(targetUserId, myUserId)
    if (targetUserId !== myUserId) {
        checkIfRoomExist(roomId0).then((response) => {
            if (!response) {
                checkIfRoomExist(roomId1).then((response) => {
                    if (!response) {
                        let messageList: MessageResponse[] = []
                        if (speacial_message !== undefined) {
                            const new_message: MessageResponse = {
                                content: speacial_message,
                                messageType: "text",
                                sender: 0,
                                timestamp: createDateTimeStringNow(),
                            }
                            messageList.push(new_message)
                        }
                        const newChatResponse: ChatResponse = {
                            dateCreated: "",
                            messages: messageList,
                            roomID: roomId0,
                            user0ID: myUserId,
                            user0Type: myType as string,
                            user1ID: targetUserId,
                            user1Type: targetType,
                        }
                        console.log("newChatResponse", JSON.stringify(newChatResponse))
                        craeteNewRoom(newChatResponse).then((response) => {
                            console.log(response)
                        })
                    } else {
                        if (speacial_message !== undefined) {
                            addMessage(roomId1, speacial_message, 1, check_duplicate)
                        }
                    }
                })
            } else {
                if (speacial_message !== undefined) {
                    addMessage(roomId0, speacial_message, 0, check_duplicate)
                }
            }
        }
        )
    }
}