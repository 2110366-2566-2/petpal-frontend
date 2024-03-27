import MessageInterface from "./MessageInterface";
import CreateDateFromNow from "../_utils/CreateDateFromNow";
import { ExampleMessage0And1_1, ExampleMessage0And1_3, ExampleMessage0And2_1, ExampleMessage0And2_2, ExampleMessage0And2_3, ExampleMessage0And2_4, ExampleMessage0And2_5 } from "./MessageInterface";
import MockImage from "../../../../../public/gold.jpg"
import { ChatResponse } from "@/app/_interface/chat/ChatResponse";
import ChatPageinterface from "./ChatPageInterface";
import { adapteerMessageResponseToMessageInterface } from "./MessageInterface";
import { getChatHistorySvcp } from "@/app/libs/chat/getChatHistorySvcp";
import { getChatHistoryUser } from "@/app/libs/chat/getChatHistoryUser";

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

export function adapterChatResponseToChatHistoryUserInterface(currentUser: ChatPageinterface, chatResponse: ChatResponse): ChatHistoryUserInterface {
    console.log("compareID", chatResponse.user0ID, currentUser.id)
    const isCurrentUserIsUser0 = chatResponse.user0ID === currentUser.id
    const Id = isCurrentUserIsUser0 ? chatResponse.user1ID as string : chatResponse.user0ID as string
    const Name = isCurrentUserIsUser0 ? chatResponse.user1ID as string : chatResponse.user0ID as string
    const RoomId = chatResponse.roomID as string
    const targetType: string = isCurrentUserIsUser0 ? chatResponse.user0Type as string : chatResponse.user1Type as string
    let MessageHistory: MessageInterface[] = []
    // switch (targetType) {
    //     case "user": {
    //         const chatHistoryuser = getChatHistoryUser()
    //         break
    //     }
    //     case "svcp": {
    //         break
    //     }
    //     default: {
    //         console.log("invalid type")
    //         console.log(targetType)
    //         break
    //     }
    // }
    const Picture: string = MockImage.src
    const LastSee: Date = CreateDateFromNow({})
    const result: ChatHistoryUserInterface = {
        Id: Id,
        Name: Name,
        RoomId: RoomId,
        MessageHistory: MessageHistory,
        Picture: Picture,
        LastSee: LastSee,
    }
    return result
}
