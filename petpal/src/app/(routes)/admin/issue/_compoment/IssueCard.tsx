import { Issue } from "@app/(routes)/admin/issue/_interface/Issue";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function IssueCard({ issue, isMyIssue }: { issue: Issue, isMyIssue: boolean }) {
    const [isShow, setIsShow] = useState<boolean>(issue.isResolved? false : true)
    const router = useRouter()

    const buttonColor = isMyIssue ? "bg-[#90A8FF]" : "bg-[#9BE38F]"
    const typeBackground = issue.issueType === "refund" ? "bg-[#7392FF]" : issue.issueType === "system" ? "bg-[#FF6847]" : "bg-[#52D83C]"
    const issueTopic = issue.details? issue.details.substring(0, 20)+"..." : "No details specified"
    const issueBy = issue.reporterID? issue.reporterID : "No reporter specified"

    const issueDate = issue.issueDate? new Date(issue.issueDate).toLocaleDateString('en-GB') : "No date specified"
    const issueStatus = issue.isResolved? "Resolved" : "In progress"


    function handleIssueAction() {
        if (isMyIssue) {
            const res = fetch(`http://localhost:8080/issue/resolve/${issue.issueID}`, {
                method: 'POST',
                credentials: 'include',
            })
            setIsShow(false)
        } else {
            const res = fetch(`http://localhost:8080/issue/accept/${issue.issueID}`, {
                method: 'POST',
                credentials: 'include',
            })
            setIsShow(false)
        }
    }

    function handleIssueClick() {
        router.push(`/admin/issue/${issue.issueID}`)
    }
    

    return (
        <div className={`bg-[#E8E8E8] ml-[32px] mr-[32px] mt-[8px] mb-[8px] p-4 rounded-[8px] w-full flex flex-row items-center justify-between shadow-md`} onClick={()=>{handleIssueClick()}}>
            <div className="gap-[10px] flex flex-col">
                <div className="flex flex-row items-center gap-[10px]">
                    <h2 className="text-[18px] font-bold">{issueTopic}</h2>
                    <div className={`${typeBackground} text-[14px] rounded-[10px] pl-[8px] pr-[8px] pt-[4px] pb-[4px] w-fit font-light text-white
                    `}>{issue.issueType}</div>
                </div>
                <p className="text-[14px] font-light">Issue person: {issueBy}</p>
                <p className="text-[14px] font-light">Issue date: {issueDate}</p>
                {isMyIssue && <p className="text-[14px] font-light">Issue status: {issueStatus}</p>}
            </div>
            <button className={`${buttonColor} pl-[16px] pr-[16px] pt-[8px] pb-[8px] rounded-[8px] font-light text-[16px]`} onClick={handleIssueAction} disabled={!isShow} style={{visibility: !isShow? "hidden" : "visible"}}>
                {isMyIssue ? "Resolve" : "Take it"}
            </button>
        </div>
    )
}