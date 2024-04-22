import { API_URL } from "@/app/_constants/env";

export default async function getSVCP(id: string) {
    const response = await fetch(
        `${API_URL}/serviceproviders/${id}`,
        {
            method: "GET",
        }
    );
    if (!response.ok) {
        throw new Error("Failed to fetch service details");
    }
    const data = await response.json();
    console.log(data);
    return data;
}
