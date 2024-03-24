export default async function getServices() {
    const response = await fetch("http://localhost:8080/service/searching", {
        method: "POST",
        credentials:'include',
        body: JSON.stringify({
            descending : true,
            end_price_range: 1000000000,
            end_time: "2200-01-02T15:04:05Z",
            address: "",
            max_rating: 10000000000,
            min_rating: 0,
            page_number: 0,
            page_size: 0,
            q: "",
            services_type: "",
            sort_by: "",
            start_price_range: 0,
            start_time: "0001-01-02T15:04:05Z"
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
