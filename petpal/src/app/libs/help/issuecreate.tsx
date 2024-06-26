import { API_URL } from "@/app/_constants/env";

export default async function issueCreate(
    details : string,
    issueType  : string,
    attachedImage: File | undefined,
    associatedBookingID : string | null,
) {
    const formData = new FormData();
    formData.append('details', details);
    formData.append('issueType', issueType);
    if(attachedImage !== undefined)
        formData.append('attachedImage', attachedImage);
    if(associatedBookingID)
        formData.append('associatedBookingID', associatedBookingID);


    const response = await fetch(`${API_URL}/issue/`, {
        method: "POST",
        credentials:'include',
        body: formData,
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.error("failed to create issue");
    }
}
