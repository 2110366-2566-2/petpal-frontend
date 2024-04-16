export default async function getUnverified() {
    const response = await fetch("http://localhost:8080/serviceproviders/unverified", {
      method: "GET",
      credentials: 'include'
    });
  
    if (response.ok) {
      console.log("Fetch unverified service providers success");
      console.log(response.json)
    } else {
      console.error("Failed to fetch unverified service providers");
      try {
        const errorMessage = await response.text();
        console.error("Error message:", errorMessage);
      } catch (error) {
        console.error("Failed to parse error message:", error);
      }
    }
  
    return await response.json();
  }
  