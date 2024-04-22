import { API_URL } from "@/app/_constants/env";
import { Convert, Issue } from "@app/(routes)/admin/issue/_interface/Issue";

export async function getIssueList(page: number, per: number): Promise<Issue[]> {
    try {
        const response = await fetch(`${API_URL}/issue/?page=${page}&per=${per}`, {
            method: 'GET',
            credentials: 'include',
        });
        const issueList = Convert.toIssueList(await response.text())
        console.log('get comment list', issueList)
        return issueList
    } catch (error) {
        console.log('error', error)
    }

    return []
}

export async function getIssueById(issueId: string): Promise<Issue> {
    try {
        const response = await fetch(`${API_URL}/issue/${issueId}`, {
            method: 'GET',
            credentials: 'include',
        });
        const issue: Issue = Convert.toIssue(await response.text())
        return issue
    } catch (error) {
    }

    return {}
}