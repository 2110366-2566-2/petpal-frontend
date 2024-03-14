import ChatBubble from "./ChatBubble";
// import TimeDivide from "./TimeDivide";

import MessageInteraface from "../_interface/MessageInterface";

function createMessageWithTime(ShownMessageHistory: MessageInteraface[], OtherPersonUserId: number): JSX.Element[] {
    var MessageElementList: JSX.Element[] = []
    if (ShownMessageHistory.length > 1) {
        let MessageHistory: MessageInteraface
        let LastTime: Date = ShownMessageHistory[0].TimeSend
        // MessageElementList.push(<TimeDivide time={LastTime}></TimeDivide>)
        let count = 0
        for (MessageHistory of ShownMessageHistory) {

            MessageElementList.push(<ChatBubble key={count} MessageHistory={MessageHistory} OtherPersonUserId={OtherPersonUserId}></ChatBubble>)
            count += 1
        }
    }
    return MessageElementList
}

export default function ChatHistoryBody({ ShownMessageHistory, OtherPersonUserId }: { ShownMessageHistory: MessageInteraface[], OtherPersonUserId: number }) {
    return (
        <ul className="space-y-[5px] mt-auto">
            {
                createMessageWithTime(ShownMessageHistory, OtherPersonUserId)
            }
        </ul>
    )
}