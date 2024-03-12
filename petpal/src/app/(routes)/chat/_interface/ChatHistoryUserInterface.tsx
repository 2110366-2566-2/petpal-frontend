import MessageInteraface from "./MessageInterface";
import CreateDateFromNow from "../_utils/CreateDateFromNow";
import { ExampleMessage0And1_1, ExampleMessage0And1_2, ExampleMessage0And1_3, ExampleMessage0And2_1, ExampleMessage0And2_2, ExampleMessage0And2_3, ExampleMessage0And2_4, ExampleMessage0And2_5 } from "./MessageInterface";
import MockImage from "../../../../../public/gold.jpg"

export default interface ChatHistoryUserInterface {
    ID: number;
    Name: string;
    MessageHistory: MessageInteraface[];
    Picture: string;
    LastSee: Date
}

export var ExampleChatHistoryUser1: ChatHistoryUserInterface = {
    ID: 1,
    Name: "lungPom",
    MessageHistory: [ExampleMessage0And1_1, ExampleMessage0And1_2, ExampleMessage0And1_3],
    Picture: MockImage.src,
    LastSee: CreateDateFromNow({}),
};

export var ExampleChatHistoryUser2: ChatHistoryUserInterface = {
    ID: 2,
    Name: "lungDang",
    MessageHistory: [ExampleMessage0And2_1, ExampleMessage0And2_2, ExampleMessage0And2_3, ExampleMessage0And2_4, ExampleMessage0And2_5],
    Picture: MockImage.src,
    LastSee: CreateDateFromNow({ Years: -1 }),
};

export var ExampleChatHistoryUser3: ChatHistoryUserInterface = {
    ID: 3,
    Name: "lungDum",
    MessageHistory: [],
    Picture: MockImage.src,
    LastSee: CreateDateFromNow({}),
};
