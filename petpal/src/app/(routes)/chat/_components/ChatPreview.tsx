import ChatHistoryUserInterface from "../_interface/ChatHistoryUserInterface";
import MockImage from "../../../../../public/gold.jpg"
import MessageInteraface from "../_interface/MessageInterface";

var getLastSendTimeText = (MessageHistory: MessageInteraface[]) => {
    var ArrayLength: number = MessageHistory.length
    if (ArrayLength == 0) {
        return <p className="text-buttom text-[8px] text-white">00/00</p>
    } else {
        var LastMessageSent = MessageHistory[MessageHistory.length - 1].TimeSend
        var Day = LastMessageSent.getDate()
        var Month = LastMessageSent.getMonth()
        return (
            <p className="text-buttom text-[8px]">{Day}/{Month}</p>
        )
    }
}

var getLastSendText = (MessageHistory: MessageInteraface[]) => {
    var ArrayLength: number = MessageHistory.length
    if (ArrayLength == 0) {
        return <p className="text-left mr-auto truncate text-white" >No Text</p>
    } else {
        var LastMessageContent = MessageHistory[MessageHistory.length - 1].Content
        return (
            <p className="text-left mr-auto truncate" > {LastMessageContent}</p>
        )
    }
}

var getNumReadNotification = (MessageHistory: MessageInteraface[], LastSee: Date) => {
    let count: number = 0
    for (let i = 0; i < MessageHistory.length; i++) {
        if (MessageHistory[i].TimeSend > LastSee) {
            count += 1
        }
    }
    if (count != 0) {
        return (
            <p className="text-right text-[8px]">{count}</p>
        )
    } else {
        return (
            <p className="text-right text-[8px] text-white">0</p>
        )
    }
}

export default function ChatPreview({ ChatHistoryUser }: { ChatHistoryUser: ChatHistoryUserInterface }): JSX.Element {
    var ID: Number = ChatHistoryUser.ID
    var Name: string = ChatHistoryUser.Name
    var MessageHistory: MessageInteraface[] = ChatHistoryUser.MessageHistory
    var Picture: string = ChatHistoryUser.Picture
    var LastSee: Date = ChatHistoryUser.LastSee

    return (
        <div className="bg-white flex felx-row p-[20px] space-x-[20px] stroke-black">
            <img src={Picture} alt="" className="w-[40px] h-[40px] rounded-full" />
            <div className="m-auto block grow">
                <div className="m-auto flex felx-row space-x-[10px]">
                    <p className="text-left mr-auto">{Name}</p>
                    {getLastSendTimeText(MessageHistory)}
                </div>
                <div className="m-auto flex felx-row space-x-[10px]">
                    {getLastSendText(MessageHistory)}
                    {getNumReadNotification(MessageHistory, LastSee)}
                </div>
            </div>
        </div>
    )
}