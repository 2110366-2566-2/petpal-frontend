export default async function getServices() {
    try {

        const response = await fetch("http://localhost:8080/service/searching", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "descending": true,
                "end_price_range": 1000000000,
                "end_time": "2200-01-02T15:04:05Z",
                "address": "",
                "max_rating": 10000000000,
                "min_rating": 0,
                "page_number": 0,
                "page_size": 0,
                "q": "",
                "services_type": "",
                "sort_by": "",
                "start_price_range": 0,
                "start_time": "0001-01-02T15:04:05Z"
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
