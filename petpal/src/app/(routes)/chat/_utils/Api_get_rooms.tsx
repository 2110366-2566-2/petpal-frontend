import { API_URL } from "@/app/_constants/env"
export default async function getRoom(setRooms: (value: object) => void): Promise<void> {
    try {
        const res = await fetch(`${API_URL}/chat/getRooms`, {
            method: 'GET',
            body: JSON.stringify({

            })
        })

        const data = await res.json()
        if (res.ok) {
            setRooms(data)
        }
    } catch (err) {
        console.log(err)
    }
}