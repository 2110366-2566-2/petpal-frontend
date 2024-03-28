import ChatHistoryUserInterface from "@app/(routes)/chat/_interface/ChatHistoryUserInterface";
import { ExampleChatHistoryUser1, ExampleChatHistoryUser2, ExampleChatHistoryUser3 } from "@app/(routes)/chat/_interface/ChatHistoryUserInterface";

export default interface ChatPageinterface {
    id: string;
    name: string;
    type: "svcp" | "user"
    chatHistoryList: ChatHistoryUserInterface[];
}

export var ExampleChatPageUser1: ChatPageinterface = {
    id: "0",
    name: "lungtuu",
    type: "user",
    chatHistoryList: [
        ExampleChatHistoryUser3
    ]
};
