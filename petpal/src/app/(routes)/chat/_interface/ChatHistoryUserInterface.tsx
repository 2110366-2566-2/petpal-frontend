import MessageInterface from "./MessageInterface";
import CreateDateFromNow from "../_utils/CreateDateFromNow";
import { ExampleMessage0And1_1, ExampleMessage0And1_3, ExampleMessage0And2_1, ExampleMessage0And2_2, ExampleMessage0And2_3, ExampleMessage0And2_4, ExampleMessage0And2_5 } from "./MessageInterface";
import MockImage from "../../../../../public/gold.jpg"
import { ChatResponse } from "@/app/_interface/chat/ChatResponse";
import ChatPageinterface from "./ChatPageInterface";
import { adapteerMessageResponseToMessageInterface } from "./MessageInterface";
import { getChatHistorySvcp } from "@/app/libs/chat/getChatHistorySvcp";
import { getChatHistoryUser } from "@/app/libs/chat/getChatHistoryUser";
import { MessageResponse } from "@/app/_interface/chat/MessageResponse";
import { getChatHistoryByRoomId } from "@/app/libs/chat/getChatHistoryByRoomId";
import { getUserById } from "@/app/libs/user/getUserById";
import { User } from "@/app/_interface/user/user";
import getSVCP from "@/app/libs/serviceProvider/getSVCP";
import { Svcp } from "@/app/_interface/svcp/svcp";
import adminPic from "../../../../../public/admin.png"

export default interface ChatHistoryUserInterface {
    Id: string;
    RoomId: string;
    Name: string;
    MessageHistory: MessageInterface[];
    Picture: string;
    LastSee: Date;
}

export var ExampleChatHistoryUser1: ChatHistoryUserInterface = {
    Id: '1',
    RoomId: '10',
    Name: "lungPom",
    MessageHistory: [ExampleMessage0And1_1, ExampleMessage0And1_3],
    Picture: MockImage.src,
    LastSee: CreateDateFromNow({}),
};

export var ExampleChatHistoryUser2: ChatHistoryUserInterface = {
    Id: '2',
    RoomId: '20',
    Name: "lungDang",
    MessageHistory: [ExampleMessage0And2_1, ExampleMessage0And2_2, ExampleMessage0And2_3, ExampleMessage0And2_4, ExampleMessage0And2_5],
    Picture: MockImage.src,
    LastSee: CreateDateFromNow({ Years: -1 }),
};

export var ExampleChatHistoryUser3: ChatHistoryUserInterface = {
    Id: '3',
    RoomId: '30',
    Name: "lungDum",
    MessageHistory: [],
    Picture: MockImage.src,
    LastSee: CreateDateFromNow({}),
};

export function adapterChatResponseToChatHistoryUserInterface(currentUser: ChatPageinterface, chatResponse: ChatResponse): Promise<ChatHistoryUserInterface> {
    // console.log("compareID", chatResponse.user0ID, currentUser.id)
    const isCurrentUserIsUser0 = chatResponse.user0ID === currentUser.id
    const Id = isCurrentUserIsUser0 ? chatResponse.user1ID as string : chatResponse.user0ID as string
    const userType = isCurrentUserIsUser0 ? chatResponse.user1Type as string : chatResponse.user0Type as string
    const RoomId = chatResponse.roomID as string
    let MessageHistory: MessageInterface[] = []
    let g = true
    return getChatHistoryByRoomId(RoomId).then((respone: ChatResponse) => {
        const messageList: MessageResponse[] = respone.messages!
        const newMassage: MessageInterface[] = messageList.map((message: MessageResponse) => adapteerMessageResponseToMessageInterface(message, chatResponse))
        MessageHistory = newMassage
        g = false
        // const Name = isCurrentUserIsUser0 ? chatResponse.user1ID as string : chatResponse.user0ID as string

        // const Picture: string = MockImage.src
        const LastSee: Date = CreateDateFromNow({})
        switch (userType) {
            case "user": {
                return getUserById(Id).then((respone: User) => {
                    const name = respone.username as string
                    const pic = respone.profilePicture as string
                    const result: ChatHistoryUserInterface = {
                        Id: Id,
                        Name: name,
                        RoomId: RoomId,
                        MessageHistory: MessageHistory,
                        Picture: pic,
                        LastSee: LastSee,
                    }
                    return result
                })
            } case "svcp": {
                return getSVCP(Id).then((respone: Svcp) => {
                    const name = respone.SVCPUsername as string
                    const pic = respone.SVCPImg as string
                    const result: ChatHistoryUserInterface = {
                        Id: Id,
                        Name: name,
                        RoomId: RoomId,
                        MessageHistory: MessageHistory,
                        Picture: pic,
                        LastSee: LastSee,
                    }
                    return result
                })
            } case "admin": {
                console.log("get admin")
                const result: ChatHistoryUserInterface = {
                    Id: Id,
                    Name: "ADMIN",
                    RoomId: RoomId,
                    MessageHistory: MessageHistory,
                    Picture: adminPic.src,
                    LastSee: LastSee,
                }
                return result

            }
            default: {
                console.log("wrong Type", userType)
                return getUserById(Id).then((respone: User) => {
                    const name = respone.username as string
                    const pic = respone.profilePicture as string
                    const result: ChatHistoryUserInterface = {
                        Id: Id,
                        Name: name,
                        RoomId: RoomId,
                        MessageHistory: MessageHistory,
                        Picture: pic,
                        LastSee: LastSee,
                    }
                    return result
                })
                break
            }
        }

        // const result: ChatHistoryUserInterface = {
        //     Id: Id,
        //     Name: Name,
        //     RoomId: RoomId,
        //     MessageHistory: MessageHistory,
        //     Picture: Picture,
        //     LastSee: LastSee,
        // }
        // return result
    })
}
