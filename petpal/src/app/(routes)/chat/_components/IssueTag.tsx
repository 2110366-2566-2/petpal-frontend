import issueTagInterface from "../_interface/issueTagInterface"

export default function IssueTag({ issueProps }: { issueProps: issueTagInterface }) {
    const issueId: string = issueProps.id
    const issueType: string = issueProps.type
    const issueDetail: string = issueProps.Detail
    const issueStatus: string = issueProps.status
    return (
        <div className={`flex flex-grow py-[10px] px-[70px]`}>
            <div className={`m-auto max-w-[800px] flex flex-col flex-grow bg-[#FFFF00] rounded-[10px] px-[30px] py-[20px]`}>
                <h1 className="text-center pb-[20px] text-[24px]">{issueStatus}</h1>
                <div className="flex flex-row">
                    <div className="m-auto text-left w-1/2 align-top p-auto outline-8 border-solid border-r-2">
                        <p>Issue Id : {issueId}</p>
                        <p>type : {issueType}</p>
                        <p>Issue Date : {`${issueProps.issueDate.getDate()}/${issueProps.issueDate.getMonth()}/${issueProps.issueDate.getFullYear()} ${issueProps.issueDate.getHours()}:${issueProps.issueDate.getMinutes()}`}</p>
                    </div>
                    <div className="m-auto align-top w-1/2 pl-[50px] pr-[20px]">
                        <p>Detail :</p>
                        <p>{issueDetail}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}