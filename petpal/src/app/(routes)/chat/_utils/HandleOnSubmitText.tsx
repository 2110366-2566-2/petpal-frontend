import MessageInterface from "../_interface/MessageInterface";

export default function HandleOnSubmitText(
    message: string,
    CurrentUserId: string,
    OtherPersonUserId: string,
    ShownMessageHistory: MessageInterface[],
    SetShownMessageHistory: (value: MessageInterface[]) => void,
) {
    const MessageText: string = message;
    const NewMessage: MessageInterface = {
        SenderID: CurrentUserId,
        Content: MessageText,
        TimeSend: new Date()
    }
    const NewShownMessageHistory: MessageInterface[] = [...ShownMessageHistory, NewMessage]
    SetShownMessageHistory(NewShownMessageHistory)
}