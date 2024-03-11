import MessageInteraface from "../_interface/MessageInterface"
export default function ChatBubble({ MessageHistory, OtherPersonUserId }: { MessageHistory: MessageInteraface, OtherPersonUserId: number }) {
    const IsOtherPersonMessage: boolean = MessageHistory.SenderID == OtherPersonUserId
    console.log(IsOtherPersonMessage, MessageHistory.SenderID, OtherPersonUserId)
    const BgColor: string = ((IsOtherPersonMessage) ? "bg-[#FFFFFF]" : "bg-[#FF8A00]")
    const ItemsAlign: string = ((IsOtherPersonMessage) ? "items-start" : "items-end")
    const Margin: string = ((IsOtherPersonMessage) ? "mr-auto" : "ml-auto")
    return (
        <li>
            <div className={`flex flex-grow justify-items-end`}>
                <div className={`${Margin} flex flex-col ${ItemsAlign} ${BgColor} rounded-[10px] px-[15px] p-[5px] w-fit`}>
                    <div>
                        <p>{MessageHistory.Content}</p>
                    </div>
                    <div>
                        <p className="text-[10px]">{`${MessageHistory.TimeSend.getHours()}:${MessageHistory.TimeSend.getMinutes()}`}</p>
                    </div>
                </div>
            </div>
        </li>
    )
}