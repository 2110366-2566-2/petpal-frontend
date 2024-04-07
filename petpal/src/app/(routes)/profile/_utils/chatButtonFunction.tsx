import { generateRoomId } from "@/app/_utils/chat/generateRoomId"
import { checkIfRoomExist } from "@/app/libs/chat/checkIfRoomExist"
import { craeteNewRoom } from "@/app/libs/chat/createNewRoom"
import { ChatResponse } from "@/app/_interface/chat/ChatResponse"
import { EntityType } from "@/app/_enum/currentEntity/EntityType"

export function chatButtonFunction(myUserId: string, targetUserId: string, myType: EntityType | undefined, targetType: EntityType) {
    const roomId0: string = generateRoomId(myUserId, targetUserId)
    const roomId1: string = generateRoomId(targetUserId, myUserId)
    if (targetUserId !== myUserId) {
        checkIfRoomExist(roomId0).then((response) => {
            if (!response) {
                checkIfRoomExist(roomId1).then((response) => {
                    if (!response) {
                        const newChatResponse: ChatResponse = {
                            dateCreated: "",
                            messages: [],
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
                    }
                })
            }
        }
        )
    }
}