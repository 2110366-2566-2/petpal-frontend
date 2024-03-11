import ChatHistoryUserInterface from "../_interface/ChatHistoryUserInterface";
export default function UserIdToSelectChat(AllChatHistory: ChatHistoryUserInterface[], UserId: number): ChatHistoryUserInterface {
    const DefaultSelectChat = AllChatHistory[AllChatHistory.length - 1]
    let ChatHistory: ChatHistoryUserInterface
    for (let index = 0; index < AllChatHistory.length; index++) {
        ChatHistory = AllChatHistory[index]
        if (ChatHistory.ID == UserId) return ChatHistory
    }
    return DefaultSelectChat
}