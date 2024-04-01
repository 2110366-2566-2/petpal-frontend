'use client';
import React, { useEffect, useState } from 'react';

interface Issue {
    issueId: number
    issueTopic: string
    issueType: string
    issueStatus: string
    issueBy: string
    issueDate: string
}

function IssueCard({ issue, isMyIssue }: { issue: Issue, isMyIssue: boolean }) {

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
                    {/* background opacity */}
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

export default function Home() {
    const [isMyIssue, setIsMyIssue] = useState<boolean>(false)
    const [selectedIssueType, setSelectedIssueType] = useState<number[]>([])
    const [selectedIssueStatus, setSelectedIssueStatus] = useState<number[]>([0])
    const [issueList, setIssueList] = useState<Issue[]>([])

    const button1Color: string = ((!isMyIssue) ? "bg-[#FF872F]" : "bg-[#D9D9D9]")
    const button1Shadow: string = ((!isMyIssue) ? "shadow-lg" : "")
    const button2Color: string = ((isMyIssue) ? "bg-[#FF872F]" : "bg-[#D9D9D9]")
    const button2Shadow: string = ((isMyIssue) ? "shadow-lg" : "")

    const issueType: string[] = ["Refund", "System problem", "Service problem"]
    const issueStatus: string[] = ["in progress", "done"]

    useEffect(() => {
        // TODO: fetch issue list from backend
        const mockIssueList: Issue[] = [
            {
                issueId: 1,
                issueType: "Refund",
                issueTopic: "Refund my order",
                issueStatus: "in progress",
                issueBy: "John Doe",
                issueDate: "13/01/2022"
            },
            {
                issueId: 2,
                issueType: "System problem",
                issueTopic: "Can't login",
                issueStatus: "done",
                issueBy: "Jane Doe",
                issueDate: "02/01/2022"
            },
            {
                issueId: 3,
                issueType: "Service problem",
                issueTopic: "Can't find my order",
                issueStatus: "in progress",
                issueBy: "John Doe",
                issueDate: "03/01/2022"
            }
        ]
        setIssueList(mockIssueList)
    }, [isMyIssue, selectedIssueType, selectedIssueStatus])

    function handleIssueMenuClick(index: boolean) {
        if (index === isMyIssue) {
            return
        }
        setIsMyIssue(!isMyIssue)
        setIssueList([])
    }

    function handleFilterIssueType(index: number) {
        setIssueList([])
        var currentIssueType = selectedIssueType
        if (selectedIssueType.includes(index)) {
            currentIssueType = currentIssueType.filter((value) => value !== index)
            setSelectedIssueType(currentIssueType)
        } else {
            currentIssueType.push(index)
            setSelectedIssueType(currentIssueType)
        }
        console.log(currentIssueType)
    }

    function handleFilterIssueStatus(index: number) {
        setIssueList([])
        var currentIssueStatus = selectedIssueStatus
        if (selectedIssueStatus.includes(index)) {
            currentIssueStatus = currentIssueStatus.filter((value) => value !== index)
            setSelectedIssueStatus(currentIssueStatus)
        } else {
            currentIssueStatus.push(index)
            setSelectedIssueStatus(currentIssueStatus)
        }
        console.log(currentIssueStatus)
    }

    return (
        <div className="flex flex-row h-full">
            <div className="w-[200px] h-full p-4 flex flex-col items-center justify-center gap-4">
                <button className={`w-[150px] ${button1Color} ${button1Shadow} rounded-[8px] h-[40px] flex items-center justify-center text-[18px] font-light`} onClick={()=>{handleIssueMenuClick(false)}}>
                    issue pool
                </button>
                <button className={`w-[150px] ${button2Color} ${button2Shadow} rounded-[8px] h-[40px] flex items-center justify-center text-[18px] font-light`} onClick={()=>{handleIssueMenuClick(true)}}>
                    my issue
                </button>
                <div className="flex flex-col items-start justify-start gap-3 w-full text-[20px]">
                    <h2>Issue type</h2>
                    <div className="flex flex-col items-start justify-start gap-2">
                        {issueType.map((type, index) => (
                            <div key={index} className="flex items-center justify-start gap-2 text-[14px] font-light ml-4">
                                <input type="checkbox" id={type} name={type} value={type} onClick={() => {handleFilterIssueType(index)}} defaultChecked={selectedIssueType.includes(index)}/>
                                <label htmlFor={type}>{type}</label>
                            </div>
                        ))}
                    </div>
                </div>
                {isMyIssue && <div className="flex flex-col items-start justify-start gap-3 w-full text-[20px]">
                    <h2>Issue status</h2>
                    <div className="flex flex-col items-start justify-start gap-2">
                        {issueStatus.map((type, index) => (
                            <div key={index} className="flex items-center justify-start gap-2 text-[14px] font-light ml-4">
                                <input type="checkbox" id={type} name={type} value={type} onClick={() => {handleFilterIssueStatus(index)}} defaultChecked={selectedIssueStatus.includes(index)} /> 
                                <label htmlFor={type}>{type}</label>
                            </div>
                        ))}
                    </div>
                </div>}
            </div>
            <div className="border-2 border-red-500 flex-1 h-full p-4 flex items-top justify-center flex-col items-center">
                {(issueList.length > 0) ? issueList.map((issue, index) => (
                    <IssueCard key={index} issue={issue} isMyIssue={isMyIssue} />
                )) : <p>Loading issue</p>}
            </div>
        </div>
    );
}
