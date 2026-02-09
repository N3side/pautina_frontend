export const pad = (n: string | number) => +n < 10 ? "0" + n : +n

export const unpad = (s: string) => {
    return s.charAt(0) === "0" ? s.slice(1,) : s
}

export const isoTime = (date: Date) => {
    return [date.getFullYear(), date.getMonth() + 1, date.getDay()].map((i) =>
        pad(i)
    ).join("-")
}

export const toDate = (date: string) => {
    const [year, month, day] = date.split("-").map(i => +unpad(i))

    return new Date(year, month, day)
}

export const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
};