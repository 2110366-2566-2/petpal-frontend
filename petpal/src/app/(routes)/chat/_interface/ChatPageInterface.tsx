import ChatHistoryUserInterface from "./ChatHistoryUserInterface";
import { ExampleChatHistoryUser1, ExampleChatHistoryUser2, ExampleChatHistoryUser3 } from "./ChatHistoryUserInterface";
export default interface ChatPageinterface {
    ID: Number;
    Name: string;
    ChatHistoryList: ChatHistoryUserInterface[];
}

export var ExampleChatPageUser1: ChatPageinterface = {
    ID: 0,
    Name: "lungtuu",
    ChatHistoryList: [
        ExampleChatHistoryUser3, ExampleChatHistoryUser2, ExampleChatHistoryUser1
    ]
};
