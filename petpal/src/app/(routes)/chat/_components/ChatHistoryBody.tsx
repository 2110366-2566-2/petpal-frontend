
import ChatBubble from "@app/(routes)/chat/_components/ChatBubble";
import MessageInteraface from "@app/(routes)/chat/_interface/MessageInterface";
import IssueTag from "./IssueTag";
import issueTagInterface from "../_interface/issueTagInterface";
import { getIssueById } from "../../admin/issue/_utils/IssueAPI";
import { Issue } from "../../admin/issue/_interface/Issue";

export async function createMessageList(ShownMessageHistory: MessageInteraface[], OtherPersonUserId: string): Promise<JSX.Element[]> {
    const SPEACIAL_TAG_LIST: string[] = [
        "<ISSUE_TAGE>", // <ISSUE_TAGE>${issueId}
    ]
    var MessageElementList: JSX.Element[] = []
    // let isReady: boolean = true
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
                const issueResponse: Issue = await getIssueById(issueId)
                const issueTagProps: issueTagInterface = {
                    id: issueResponse.issueID as string,
                    issueDate: new Date(issueResponse.issueDate as string),
                    type: issueResponse.issueType as string,
                    status: issueResponse.isResolved as boolean ? "Resolved" : "In progress",
                    Detail: issueResponse.details as string
                }
                messageList = <IssueTag key={count} issueProps={issueTagProps}></IssueTag>

            }
            else {
                messageList = <ChatBubble key={count} MessageHistory={MessageHistory} OtherPersonUserId={OtherPersonUserId}></ChatBubble>
            }
            MessageElementList.push(messageList)
            count += 1
        }
    }
    // while (!isReady) {
    //     console.log("waithing for issue tag")
    // }
    return MessageElementList
}

// export default async function ChatHistoryBody({ ShownMessageHistory, OtherPersonUserId }: { ShownMessageHistory: MessageInteraface[], OtherPersonUserId: string }) {
//     return (
//         <div className="space-y-[5px] mt-auto flex flex-col">
//             {
//                 createMessageList(ShownMessageHistory, OtherPersonUserId)
//             }
//         </div>
//     )
// }