export default async function getServices() {
    const response = await fetch("http://localhost:8080/service/searching", {
        method: "POST",
        credentials:'include',
        body: JSON.stringify({
            address: "",
            descending: true,
            end_price_range: 1000000,
            end_time: "5006-01-02T15:04:05Z",
            max_rating: 10000,
            min_rating: 0,
            page_number: 100,
            page_size: 1000,
            q: "",
            services_type: "",
            sort_by: "price",
            start_price_range: 0,
            start_time: "0000-01-02T15:04:05Z"
        }),
    });
    if(response.ok){
        console.log("Fetch service listing Success");
    }else{
        console.error("Failed to Fetch Service Listing");
        try {
            const errorMessage = await response.text();
            console.error("Error message:", errorMessage);
        } catch (error) {
            console.error("Failed to parse error message:", error);
        }
    }
    return await response.json();
};
