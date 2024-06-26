import ChatHistoryUserInterface from "@app/(routes)/chat/_interface/ChatHistoryUserInterface";
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation';

import MessageInterface from "../_interface/MessageInterface";


var getLastSendTimeText = (MessageHistory: MessageInterface[]) => {
    var ArrayLength: number = MessageHistory.length
    if (ArrayLength == 0) {
        return <p className="text-buttom text-[8px] text-white font-extralight select-none"></p>
    } else {
        var LastMessageSent = MessageHistory[MessageHistory.length - 1].TimeSend
        var Day = LastMessageSent.getDate()
        var Month = LastMessageSent.getMonth()
        return (
            <p className="text-buttom text-[8px] font-extralight select-none">{Day}/{Month}</p>
        )
    }
}

var getLastSendText = (MessageHistory: MessageInterface[]) => {
    var ArrayLength: number = MessageHistory.length
    if (ArrayLength == 0) {
        return <div className="text-left mr-auto truncate text-white font-extralight text-[14px] select-none" ></div>
    } else {
        var LastMessageContent = MessageHistory[MessageHistory.length - 1].Content
        return (
            <p className="text-left mr-auto truncate font-extralight text-[14px] select-none" > {LastMessageContent}</p>
        )
    }
}

var getNumReadNotification = (MessageHistory: MessageInterface[], LastSee: Date) => {
    let count: number = 0
    for (let i = 0; i < MessageHistory.length; i++) {
        if (MessageHistory[i].TimeSend > LastSee) {
            count += 1
        }
    }
    var countText: string
    if (count != 0) {
        if (count > 99) {
            countText = "99+"
        } else {
            countText = count.toString()
        }
        return (
            <div className="flex h-[15px] w-[15px] rounded-[20px] bg-[#FF8A00] select-none">
                <p className="text-center items-center text-[8px] font-light m-auto">{countText}</p>
            </div>
        )
    } else {
        return (
            <p></p>
        )
    }
}




export default function ChatPreview({ ChatHistoryUser, setUserId }: { ChatHistoryUser: ChatHistoryUserInterface, setUserId: (value: string) => void }): JSX.Element {
    var Id: string = ChatHistoryUser.Id
    var Name: string = ChatHistoryUser.Name
    var MessageHistory: MessageInterface[] = ChatHistoryUser.MessageHistory
    var Picture: string = ChatHistoryUser.Picture
    var LastSee: Date = ChatHistoryUser.LastSee
    let picutreString: string = ""
    if (Picture !== undefined) {
        picutreString = Picture.includes("static") ? Picture : `data:image/png;base64, ${Picture}`
    }

    return (
        <div onClick={() => { setUserId(Id) }} className="bg-white flex felx-row px-[20px] py-[12px] space-x-[20px] hover:bg-[#D9D9D9A1] focus:bg-[#000000] overflow-hidden">
            <img src={picutreString} alt="" className="w-[60px] h-[60px] rounded-full select-none" />
            <div className="m-auto block grow">
                <div className="m-auto flex felx-row space-x-[10px]">
                    <p className="text-left mr-auto">{Name}</p>
                    {getLastSendTimeText(MessageHistory)}
                </div>
                {/* <div className="m-auto flex felx-row space-x-[10px]">
                    {getLastSendText(MessageHistory)}
                    {getNumReadNotification(MessageHistory, LastSee)}
                </div> */}
            </div>
        </div>
    )
}