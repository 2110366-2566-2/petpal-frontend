import { Issue, Convert } from "@app/(routes)/admin/issue/_interface/Issue"

export async function getIssueList(page:number, per:number) : Promise<Issue[]> {
    try {
        const response = await fetch(`http://localhost:8080/issue/?page=${page}&per=${per}`, {
            method: 'GET',
            credentials: 'include',
        });
        const issueList = Convert.toIssueList(await response.text())
        return issueList
    } catch (error) {
    }

    return []
}