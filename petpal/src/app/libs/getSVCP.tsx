// import { useRouter } from "next/router";

export default async function getSVCP(id: string) {
    // const router = useRouter();
    // Access dynamic segments from the query object
    // const { id, ServiceId } = router.query;

    const response = await fetch(
        `http://localhost:8080/serviceproviders/${id}`,
        {
            method: "GET",
            // headers: {
            //     "Content-Type": "application/json",
            // },
        }
    );
    if (response.ok) {
    } else {
        console.log("get SVCP failed");
    }
    return await response.json();
}
