import CreateDateFromNow from "../_utils/CreateDateFromNow";

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
    TimeSend: CreateDateFromNow({ Mins: -15 }),
};

export var ExampleMessage0And1_2: MessageInteraface = {
    SenderID: 0,
    ReciverID: 1,
    Content: "lol lollllllllllllllllllllllllllllllllllllllllllllllllll",
    TimeSend: CreateDateFromNow({ Mins: -15, Seconds: 10 }),
};

export var ExampleMessage0And1_3: MessageInteraface = {
    SenderID: 1,
    ReciverID: 0,
    Content: "roger That we love 555",
    TimeSend: CreateDateFromNow({ Mins: -15, Seconds: 15 }),
};


export var ExampleMessage0And2_1: MessageInteraface = {
    SenderID: 2,
    ReciverID: 0,
    Content: "roger That we love money",
    TimeSend: CreateDateFromNow({ Mins: -30 }),
}

export var ExampleMessage0And2_2: MessageInteraface = {
    SenderID: 2,
    ReciverID: 0,
    Content: "roger That we love money",
    TimeSend: CreateDateFromNow({ Mins: -30, Seconds: 15 }),
}

export var ExampleMessage0And2_3: MessageInteraface = {
    SenderID: 0,
    ReciverID: 2,
    Content: "roger That we love money",
    TimeSend: CreateDateFromNow({ Mins: -30, Seconds: 30 }),
}

export var ExampleMessage0And2_4: MessageInteraface = {
    SenderID: 0,
    ReciverID: 2,
    Content: "roger That we love money",
    TimeSend: CreateDateFromNow({ Mins: -30, Seconds: 45 }),
}
export var ExampleMessage0And2_5: MessageInteraface = {
    SenderID: 0,
    ReciverID: 2,
    Content: "roger That we love money",
    TimeSend: CreateDateFromNow({ Mins: -30, Seconds: 60 }),
}