import { useContext } from 'react'
import UserInterface from "@app/(routes)/profile/_interface/UserInterface"
import { WEBSOCKET_URL } from "@app/_constants/env"
import { WebsocketContext } from "@app/(routes)/chat/_utils/WebsocketProvider"

import UserRoomInterface from "@app/(routes)/chat/_interface/UserRoomInterface"


export default function WebsocketJoinRoom(roomId: number, User: UserRoomInterface, setConn: (value: WebSocket | null) => void) {
    const ws = new WebSocket(
        `${WEBSOCKET_URL}/chat/joinRoom/${roomId}?clientId=${User.Id}&username=${User.Username}&role=${User.Role}`
    )
    if (ws.OPEN) {
        setConn(ws)
        return
    }
}