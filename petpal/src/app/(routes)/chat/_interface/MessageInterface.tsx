import CreateDateFromNow from "@app/(routes)/chat/_utils/CreateDateFromNow";
import { MessageResponse } from "@/app/_interface/chat/MessageResponse";

export default interface MessageInterface {
    SenderID: string;
    Content: string;
    TimeSend: Date;
}

export var ExampleMessage0And1_1: MessageInterface = {
    SenderID: '0',
    Content: "Hello User1",
    TimeSend: new Date('2024-03-11T09:20:00Z'),
};


export var ExampleMessage0And1_3: MessageInterface = {
    SenderID: '1',
    Content: "Hello User0",
    TimeSend: new Date('2024-03-11T09:20:15Z'),
};


export var ExampleMessage0And2_1: MessageInterface = {
    SenderID: '2',
    Content: "roger That we love money1",
    TimeSend: new Date('2024-02-10T07:20:00Z'),
}

export var ExampleMessage0And2_2: MessageInterface = {
    SenderID: '2',
    Content: "roger That we love money2",
    TimeSend: new Date('2024-02-10T07:25:00Z'),
}

export var ExampleMessage0And2_3: MessageInterface = {
    SenderID: '0',
    Content: "roger That we love money3",
    TimeSend: new Date('2024-02-11T07:25:00Z'),
}

export var ExampleMessage0And2_4: MessageInterface = {
    SenderID: '0',
    Content: "roger That we love money",
    TimeSend: new Date('2024-03-11T07:25:00Z'),
}
export var ExampleMessage0And2_5: MessageInterface = {
    SenderID: '0',
    Content: "roger That we love money",
    TimeSend: new Date('2024-02-11T19:25:00Z'),
}

export function adapteerMessageResponseToMessageInterface(messageResponse: MessageResponse): MessageInterface {
    const sender: string = String(messageResponse.sender) as string
    const content = messageResponse.content as string
    const timesend: Date = new Date(messageResponse.timestamp as string)
    const result: MessageInterface = {
        SenderID: sender,
        Content: content,
        TimeSend: timesend,
    }
    return result
}