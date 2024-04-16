import issueTagInterface from "../_interface/issueTagInterface"

export default function IssueTag({ issueProps }: { issueProps: issueTagInterface }) {
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