import { Issue } from "@app/(routes)/admin/issue/_interface/Issue"

export function getIssueList() : Issue[] {
    // TODO: fetch issue list from backend

    const issueTypeList : string[] = ["Refund", "System problem", "Service problem"]
    const issueStatusList : string[] = ["in progress", "done"]
    const issueTopicList : string[] = ["Why is my order not refunded?", "Why is the system down?", "Why is the service not working?"]
    const issueByList : string[] = ["John Doe", "Jane Doe", "John Smith", "Jane Smith"]
    const issueDateList : string[] = ["13/01/2022", "14/01/2022", "15/01/2022", "16/01/2022"]


    var ret :Issue[] = []
    for (let i = 0; i < 20; i++) {
        const issueTypeIndex = Math.floor(Math.random() * issueTypeList.length)
        const issueStatusIndex = Math.floor(Math.random() * issueStatusList.length)
        const issueTopicIndex = Math.floor(Math.random() * issueTopicList.length)
        const issueByIndex = Math.floor(Math.random() * issueByList.length)
        const issueDateIndex = Math.floor(Math.random() * issueDateList.length)

        ret.push({
            issueId: i,
            issueType: issueTypeList[issueTypeIndex],
            issueTopic: issueTopicList[issueTopicIndex],
            issueStatus: issueStatusList[issueStatusIndex],
            issueBy: issueByList[issueByIndex],
            issueDate: issueDateList[issueDateIndex]
        })
    }

    return ret
}