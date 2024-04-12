import { Issue } from "@app/(routes)/admin/issue/_interface/Issue";

export default function IssueCard({ issue, isMyIssue }: { issue: Issue, isMyIssue: boolean }) {
    const buttonColor = isMyIssue ? "bg-[#90A8FF]" : "bg-[#9BE38F]"
    const typeBackground = issue.issueType === "Refund" ? "bg-[#7392FF]" : issue.issueType === "System problem" ? "bg-[#FF6847]" : "bg-[#52D83C]"

    function handleIssueAction() {
        if (isMyIssue) { //TODO: redirect to resolve issue

        } else { //TODO: redirect to take issue

        }
    }

    return (
        <div className={`bg-[#E8E8E8] ml-[32px] mr-[32px] mt-[8px] mb-[8px] p-4 rounded-[8px] w-full flex flex-row items-center justify-between shadow-md`}>
            <div className="gap-[10px] flex flex-col">
                <div className="flex flex-row items-center gap-[10px]">
                    <h2 className="text-[18px] font-bold">{issue.issueTopic}</h2>
                    <div className={`${typeBackground} text-[14px] rounded-[10px] pl-[8px] pr-[8px] pt-[4px] pb-[4px] w-fit font-light text-white
                    `}>{issue.issueType}</div>
                </div>
                <p className="text-[14px] font-light">Issue person: {issue.issueBy}</p>
                <p className="text-[14px] font-light">Issue date: {issue.issueDate}</p>
                {isMyIssue && <p className="text-[14px] font-light">Issue status: {issue.issueStatus}</p>}
            </div>
            <button className={`${buttonColor} pl-[16px] pr-[16px] pt-[8px] pb-[8px] rounded-[8px] font-light text-[16px]`} onClick={handleIssueAction}>
                {isMyIssue ? "Resolve" : "Take it"}
            </button>
        </div>
    )
}