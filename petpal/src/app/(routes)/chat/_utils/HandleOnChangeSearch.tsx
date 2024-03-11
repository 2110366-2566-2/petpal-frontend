import ChatHistoryUserInterface from "../_interface/ChatHistoryUserInterface"
export default function OnChangeSearch(event: React.ChangeEvent<HTMLInputElement>, AllChatHistory: ChatHistoryUserInterface[], SetShownChatHistoryUserList: (value: ChatHistoryUserInterface[]) => void): void {
    const SearchText: string = event.target.value
    let NewShownChatHistory: ChatHistoryUserInterface[] = []
    if (SearchText == "") {
        NewShownChatHistory = AllChatHistory
    } else {
        let ChatHistory: ChatHistoryUserInterface
        for (let index = 0; index < AllChatHistory.length; index++) {
            ChatHistory = AllChatHistory[index]
            if (ChatHistory.Name.toLowerCase().includes(SearchText.toLowerCase())) NewShownChatHistory.push(ChatHistory)
        }
    }
    SetShownChatHistoryUserList(NewShownChatHistory)
}