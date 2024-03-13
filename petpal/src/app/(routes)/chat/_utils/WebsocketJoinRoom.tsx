import { useContext } from 'react'
import UserInterface from "../../profile/_interface/UserInterface"
import { WEBSOCKET_URL } from "@/app/_constants/env"
import { WebsocketContext } from './WebsocketProvider'
import UserRoomInterface from '../_interface/UserRoomInterface'


export default function WebsocketJoinRoom(roomId: number, User: UserRoomInterface, setConn: (value: any) => void) {
    const ws = new WebSocket(
        `${WEBSOCKET_URL}/chat/joinRoom/${roomId}?clientId=${User.Id}&username=${User.Username}&role=${User.Role}`
    )
    if (ws.OPEN) {
        setConn(ws)
        return
    }
}