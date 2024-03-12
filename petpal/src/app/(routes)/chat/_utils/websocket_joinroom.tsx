import { useContext } from 'react'
import UserInterface from "../../profile/_interface/UserInterface"
import { WEBSOCKET_URL } from "@/app/_constants/env"
import { WebsocketContext } from './websocket_provider'


export default function joinRoom(roomId: string, User: { id: number, username: string, role: 'user' | "svcp" }) {
    const { setConn } = useContext(WebsocketContext)
    const ws = new WebSocket(
        `${WEBSOCKET_URL}/chat/joinRoom/${roomId}?clientId=${User.id}&username=${User.username}&role=${User.role}`
    )
    if (ws.OPEN) {
        setConn(ws)
        return
    }
}