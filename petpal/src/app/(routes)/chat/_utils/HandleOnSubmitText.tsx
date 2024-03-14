import MessageInteraface from "../_interface/MessageInterface";
export default function HandleOnSubmitText(
    message: string,
    CurrentUserId: number,
    OtherPersonUserId: number,
    ShownMessageHistory: MessageInteraface[],
    SetShownMessageHistory: (value: MessageInteraface[]) => void,

) {
    const MessageText: string = message;
    const NewMessage: MessageInteraface = {
        SenderID: CurrentUserId,
        ReciverID: OtherPersonUserId,
        Content: MessageText,
        TimeSend: new Date()
    }
    const NewShownMessageHistory: MessageInteraface[] = [...ShownMessageHistory, NewMessage]
    SetShownMessageHistory(NewShownMessageHistory)
}