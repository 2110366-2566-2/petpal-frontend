import { API_URL } from "@/app/_constants/env";
import { Issue, Convert } from "@app/(routes)/admin/issue/_interface/Issue"

export async function getIssueList(page:number, per:number) : Promise<Issue[]> {
    try {
        const response = await fetch(`${API_URL}/issue/?page=${page}&per=${per}`, {
            method: 'GET',
            credentials: 'include',
        });
        const issueList = Convert.toIssueList(await response.text())
        return issueList
    } catch (error) {
    }

    return []
}