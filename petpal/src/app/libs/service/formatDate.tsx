export function formatTimeToHourMinute(datetimeString: string): string {
    const offset = new Date().getTimezoneOffset();
    const date = new Date(datetimeString);
    date.setTime(date.getTime() + offset * 60000)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
}

export function formatDate(datetimeString: string): string {
    const offset = new Date().getTimezoneOffset();
    const date = new Date(datetimeString);
    date.setTime(date.getTime() + offset * 60000)
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
}
