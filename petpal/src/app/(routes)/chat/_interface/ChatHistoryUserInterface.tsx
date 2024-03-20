import MessageInteraface from "@app/(routes)/chat/_interface/MessageInterface";
import CreateDateFromNow from "@app/(routes)/chat/_utils/CreateDateFromNow";
import { 
    ExampleMessage0And1_1, 
    ExampleMessage0And1_2, 
    ExampleMessage0And1_3, 
    ExampleMessage0And2_1, 
    ExampleMessage0And2_2, 
    ExampleMessage0And2_3, 
    ExampleMessage0And2_4, 
    ExampleMessage0And2_5 } from "@app/(routes)/chat/_interface/MessageInterface";
import MockImage from "../../../../../public/gold.jpg"


export default interface ChatHistoryUserInterface {
    Id: number;
    RoomId: number;
    Name: string;
    MessageHistory: MessageInteraface[];
    Picture: string;
    LastSee: Date
}

export var ExampleChatHistoryUser1: ChatHistoryUserInterface = {
    Id: 1,
    RoomId: 10,
    Name: "lungPom",
    MessageHistory: [ExampleMessage0And1_1, ExampleMessage0And1_2, ExampleMessage0And1_3],
    Picture: MockImage.src,
    LastSee: CreateDateFromNow({}),
};

export var ExampleChatHistoryUser2: ChatHistoryUserInterface = {
    Id: 2,
    RoomId: 20,
    Name: "lungDang",
    MessageHistory: [ExampleMessage0And2_1, ExampleMessage0And2_2, ExampleMessage0And2_3, ExampleMessage0And2_4, ExampleMessage0And2_5],
    Picture: MockImage.src,
    LastSee: CreateDateFromNow({ Years: -1 }),
};

export var ExampleChatHistoryUser3: ChatHistoryUserInterface = {
    Id: 3,
    RoomId: 30,
    Name: "lungDum",
    MessageHistory: [],
    Picture: MockImage.src,
    LastSee: CreateDateFromNow({}),
};
