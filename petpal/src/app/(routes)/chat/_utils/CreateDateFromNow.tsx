interface CreateDateFromNowParameterInterface {
    Years?: number,
    Months?: number,
    Days?: number,
    Hours?: number,
    Mins?: number,
    Seconds?: number,
}

export default function CreateDateFromNow(
    { Years = 0,
        Months = 0,
        Days = 0,
        Hours = 0,
        Mins = 0,
        Seconds = 0, }: CreateDateFromNowParameterInterface
): Date {
    var WantedTime: Date = new Date()
    WantedTime.setFullYear(WantedTime.getFullYear() + Years)
    WantedTime.setMonth(WantedTime.getMonth() + Months)
    WantedTime.setDate(WantedTime.getDate() + Days)
    WantedTime.setHours(WantedTime.getHours() + Hours)
    WantedTime.setMinutes(WantedTime.getMinutes() + Mins);
    WantedTime.setSeconds(WantedTime.getSeconds() + Seconds)
    return WantedTime
}
