export default async function getSVCP(id: string) {
    const response = await fetch(
        `http://localhost:8080/serviceproviders/${id}`,
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
