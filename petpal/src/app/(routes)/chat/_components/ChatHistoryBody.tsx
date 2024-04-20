import ChatBubble from "@app/(routes)/chat/_components/ChatBubble";
import MessageInteraface from "@app/(routes)/chat/_interface/MessageInterface";
import IssueTag from "./IssueTag";
import issueTagInterface from "../_interface/issueTagInterface";

function createMessageList(ShownMessageHistory: MessageInteraface[], OtherPersonUserId: string): JSX.Element[] {
    const SPEACIAL_TAG_LIST: string[] = [
        "<ISSUE_TAGE>", // <ISSUE_TAGE>${issueId}
    ]
    var MessageElementList: JSX.Element[] = []
    if (ShownMessageHistory.length >= 1) {
        let MessageHistory: MessageInteraface
        let LastTime: Date = ShownMessageHistory[0].TimeSend
        // MessageElementList.push(<TimeDivide time={LastTime}></TimeDivide>)
        let count = 0
        for (MessageHistory of ShownMessageHistory) {
            let messageList: JSX.Element
            const content: string = MessageHistory.Content
            const isIssueTag: boolean = content.includes(SPEACIAL_TAG_LIST[0])
            if (isIssueTag) {
                const issueId: string = content.replace(SPEACIAL_TAG_LIST[0], "")

                const issueTagProps: issueTagInterface = {
                    id: "test",
                    issueDate: new Date(),
                    type: "walk dog",
                    status: "testing",
                    price: 500,
                    Detail: "so my dog walker disappeared for half the session. can i get a refund? maybe ban that guy too"
                }
                console.log("issue tag detected")
                messageList = <IssueTag key={count} issueProps={issueTagProps}></IssueTag>
                // messageList = <ChatBubble key={count} MessageHistory={MessageHistory} OtherPersonUserId={OtherPersonUserId}></ChatBubble>

            }
            else {
                messageList = <ChatBubble key={count} MessageHistory={MessageHistory} OtherPersonUserId={OtherPersonUserId}></ChatBubble>
            }
            MessageElementList.push(messageList)
            count += 1
        }
    }
    return MessageElementList
}

export default function ChatHistoryBody({ ShownMessageHistory, OtherPersonUserId }: { ShownMessageHistory: MessageInteraface[], OtherPersonUserId: string }) {
    return (
        <div className="space-y-[5px] mt-auto flex flex-col">
            {
                createMessageList(ShownMessageHistory, OtherPersonUserId)
            }
        </div>
    )
}