import MessageInteraface from "../_interface/MessageInterface";
export default function HandleOnSubmitText(
    event: React.FormEvent<HTMLInputElement>,
    CurrentUserId: number,
    OtherPersonUserId: number,
    ShownMessageHistory: MessageInteraface[],
    SetShownMessageHistory: (value: MessageInteraface[]) => void
) {
    event.preventDefault();
    const MessageText: string = event.currentTarget.value;
    var NewMessage: MessageInteraface = {
        SenderID: CurrentUserId,
        ReciverID: OtherPersonUserId,
        Content: MessageText,
        TimeSend: new Date()
    }
    console.log(MessageText)
    const NewShownMessageHistory: MessageInteraface[] = [...ShownMessageHistory, NewMessage]
    SetShownMessageHistory(NewShownMessageHistory)
}