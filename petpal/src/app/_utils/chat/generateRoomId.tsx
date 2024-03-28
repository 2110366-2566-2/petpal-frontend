export function generateRoomId(sender0Id: string, sender1Id: string) {
    return `${sender0Id}__${sender1Id}`
}