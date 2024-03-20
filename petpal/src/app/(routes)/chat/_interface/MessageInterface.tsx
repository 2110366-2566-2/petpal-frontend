import CreateDateFromNow from "@app/(routes)/chat/_utils/CreateDateFromNow";

export default interface MessageInteraface {
    SenderID: Number;
    ReciverID: Number;
    Content: string;
    TimeSend: Date;
}

export var ExampleMessage0And1_1: MessageInteraface = {
    SenderID: 0,
    ReciverID: 1,
    Content: "Love me Love my Dog",
    TimeSend: new Date('2024-03-11T09:20:00Z'),
};

export var ExampleMessage0And1_2: MessageInteraface = {
    SenderID: 0,
    ReciverID: 1,
    Content: "lol lollllllllllllllllllllllllllllllllllllllllllllllllll",
    TimeSend: new Date('2024-03-11T09:20:10Z'),
};

export var ExampleMessage0And1_3: MessageInteraface = {
    SenderID: 1,
    ReciverID: 0,
    Content: "roger That we love 555",
    TimeSend: new Date('2024-03-11T09:20:15Z'),
};


export var ExampleMessage0And2_1: MessageInteraface = {
    SenderID: 2,
    ReciverID: 0,
    Content: "roger That we love money1",
    TimeSend: new Date('2024-02-10T07:20:00Z'),
}

export var ExampleMessage0And2_2: MessageInteraface = {
    SenderID: 2,
    ReciverID: 0,
    Content: "roger That we love money2",
    TimeSend: new Date('2024-02-10T07:25:00Z'),
}

export var ExampleMessage0And2_3: MessageInteraface = {
    SenderID: 0,
    ReciverID: 2,
    Content: "roger That we love money3",
    TimeSend: new Date('2024-02-11T07:25:00Z'),
}

export var ExampleMessage0And2_4: MessageInteraface = {
    SenderID: 0,
    ReciverID: 2,
    Content: "roger That we love money",
    TimeSend: new Date('2024-03-11T07:25:00Z'),
}
export var ExampleMessage0And2_5: MessageInteraface = {
    SenderID: 0,
    ReciverID: 2,
    Content: "roger That we love money",
    TimeSend: new Date('2024-02-11T19:25:00Z'),
}