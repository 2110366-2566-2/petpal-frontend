import ChatHistoryUserInterface from "@app/(routes)/chat/_interface/ChatHistoryUserInterface";
import { ExampleChatHistoryUser1, ExampleChatHistoryUser2, ExampleChatHistoryUser3 } from "@app/(routes)/chat/_interface/ChatHistoryUserInterface";
import { EntityType } from "@/app/_enum/currentEntity/EntityType";

export default interface ChatPageinterface {
    id: string;
    name: string;
    type: EntityType
    chatHistoryList: ChatHistoryUserInterface[];
}

export var ExampleChatPageUser1: ChatPageinterface = {
    id: "0",
    name: "lungtuu",
    type: EntityType.USER,
    chatHistoryList: [
        ExampleChatHistoryUser3
    ]
};
