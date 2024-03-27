import ChatHistoryUserInterface from "@app/(routes)/chat/_interface/ChatHistoryUserInterface";
import { ExampleChatHistoryUser1 } from "@app/(routes)/chat/_interface/ChatHistoryUserInterface";

export default function UserIdToSelectChat(AllChatHistory: ChatHistoryUserInterface[], UserId: string): ChatHistoryUserInterface {
    const DefaultSelectChat: ChatHistoryUserInterface = AllChatHistory[AllChatHistory.length - 1]
    let ChatHistory: ChatHistoryUserInterface
    for (let index = 0; index < AllChatHistory.length; index++) {
        ChatHistory = AllChatHistory[index]
        if (ChatHistory.Id == UserId) return ChatHistory
    }
    if (DefaultSelectChat == undefined) {
        console.log("DefaultSelectChat is ", DefaultSelectChat)
        return ExampleChatHistoryUser1
    }
    else {
        return DefaultSelectChat
    }
}