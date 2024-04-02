'use client';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import IssueCard from "@app/(routes)/admin/issue/_compoment/IssueCard";
import { Issue } from "@app/(routes)/admin/issue/_interface/Issue";
import { getIssueList } from "@app/(routes)/admin/issue/_utils/IssueAPI";

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
        const mockIssueList: Issue[] = getIssueList()
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
        var currentIssueType = selectedIssueType.slice()
        if (selectedIssueType.includes(index)) {
            currentIssueType = currentIssueType.filter((value) => value !== index)
        } else {
            currentIssueType.push(index)
        }
        setSelectedIssueType(currentIssueType)
    }

    function handleFilterIssueStatus(index: number) {
        setIssueList([])
        var currentIssueStatus = selectedIssueStatus.slice()
        if (selectedIssueStatus.includes(index)) {
            currentIssueStatus = currentIssueStatus.filter((value) => value !== index)
        } else {
            currentIssueStatus.push(index)
        }
        setSelectedIssueStatus(currentIssueStatus)
    }

    return (
        <div className="flex flex-row h-full">
            {/* position fixed */}
            <div className="w-[200px] h-full p-4 flex flex-col items-center justify-start gap-4 fixed">
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
                <AnimatePresence>
                {isMyIssue && <motion.div className="flex flex-col items-start justify-start gap-3 w-full text-[20px]" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                    <h2>Issue status</h2>
                    <div className="flex flex-col items-start justify-start gap-2">
                        {issueStatus.map((type, index) => (
                            <div key={index} className="flex items-center justify-start gap-2 text-[14px] font-light ml-4">
                                <input type="checkbox" id={type} name={type} value={type} onClick={() => {handleFilterIssueStatus(index)}} defaultChecked={selectedIssueStatus.includes(index)} /> 
                                <label htmlFor={type}>{type}</label>
                            </div>
                        ))}
                    </div>
                </motion.div>}
                </AnimatePresence>
            </div>
            <div className="flex-1 h-full p-4 flex items-top justify-center flex-col items-center ml-[200px]">
                {(issueList.length > 0) ? issueList.map((issue, index) => (
                    <IssueCard key={index} issue={issue} isMyIssue={isMyIssue} />
                )) : <p>Loading issue</p>}
            </div>
        </div>
    );
}
