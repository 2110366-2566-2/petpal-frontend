import CreateDateFromNow from "../_utils/CreateDateFromNow";

export default interface MessageInterface {
    SenderID: Number;
    ReceiverID: Number;
    Content: string;
    TimeSend: Date;
}

export var ExampleMessage0And1_1: MessageInterface = {
    SenderID: 0,
    ReceiverID: 1,
    Content: "Love me Love my Dog",
    TimeSend: new Date('2024-03-11T09:20:00Z'),
};

export var ExampleMessage0And1_2: MessageInterface = {
    SenderID: 0,
    ReceiverID: 1,
    Content: "lol lollllllllllllllllllllllllllllllllllllllllllllllllll",
    TimeSend: new Date('2024-03-11T09:20:10Z'),
};

export var ExampleMessage0And1_3: MessageInterface = {
    SenderID: 1,
    ReceiverID: 0,
    Content: "roger That we love 555",
    TimeSend: new Date('2024-03-11T09:20:15Z'),
};


export var ExampleMessage0And2_1: MessageInterface = {
    SenderID: 2,
    ReceiverID: 0,
    Content: "roger That we love money1",
    TimeSend: new Date('2024-02-10T07:20:00Z'),
}

export var ExampleMessage0And2_2: MessageInterface = {
    SenderID: 2,
    ReceiverID: 0,
    Content: "roger That we love money2",
    TimeSend: new Date('2024-02-10T07:25:00Z'),
}

export var ExampleMessage0And2_3: MessageInterface = {
    SenderID: 0,
    ReceiverID: 2,
    Content: "roger That we love money3",
    TimeSend: new Date('2024-02-11T07:25:00Z'),
}

export var ExampleMessage0And2_4: MessageInterface = {
    SenderID: 0,
    ReceiverID: 2,
    Content: "roger That we love money",
    TimeSend: new Date('2024-03-11T07:25:00Z'),
}
export var ExampleMessage0And2_5: MessageInterface = {
    SenderID: 0,
    ReceiverID: 2,
    Content: "roger That we love money",
    TimeSend: new Date('2024-02-11T19:25:00Z'),
}