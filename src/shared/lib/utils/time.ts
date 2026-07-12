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


type TimeUnit = 'ms' | 'sec' | 'min' | 'hour' | 'day';

/**
 * Функция вычитает время timeB из timeA (timeA - timeB)
 * @param timeA - Первая дата (ISO строка, строка даты или объект Date)
 * @param timeB - Вторая дата, обычно из Laravel (ISO строка, строка даты или объект Date)
 * @param unit - Единица измерения результата
 * @returns Разница во времени в виде округленного числа
 */
export function diffTimes(
    timeA: string | Date,
    timeB: string | Date,
    unit: TimeUnit = 'min'
): number {
    const dateA = new Date(timeA);
    const dateB = new Date(timeB);

    // .getTime() гарантированно возвращает number (миллисекунды)
    const msDiff = dateA.getTime() - dateB.getTime();

    switch (unit) {
        case 'sec':  return Math.floor(msDiff / 1000);
        case 'min':  return Math.floor(msDiff / (1000 * 60));
        case 'hour': return Math.floor(msDiff / (1000 * 60 * 60));
        case 'day':  return Math.floor(msDiff / (1000 * 60 * 60 * 24));
        case 'ms':
        default:     return msDiff;
    }
}

/**
 * Форматирует дату:
 * - Если текущий год: "21 июн."
 * - Если прошлые годы: "21 июн. 2025 г."
 */
export function formatIsoDate(isoTime: string | Date): string {
    const postDate = new Date(isoTime);
    const currentDate = new Date();

    const isCurrentYear = postDate.getFullYear() === currentDate.getFullYear();

    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
    };

    if (!isCurrentYear) {
        options.year = 'numeric';
    }

    const formatter = new Intl.DateTimeFormat('ru-RU', options);
    let formattedDate = formatter.format(postDate);

    // Убираем возможные дубликаты "г." или "г" в конце,
    // если они вдруг появились от Intl, и добавляем свой один раз.
    if (!isCurrentYear) {
        // Удаляем любые "г." или "г" в конце строки, чтобы очистить перед добавлением
        formattedDate = formattedDate.replace(/г\.?$/, '').trim();
        return `${formattedDate} г.`;
    }

    return formattedDate;
}

export const combineDateTime = (date: string, time: string) => {
    if (!date || !time) return null;
    // Результат: "2026-07-10T14:30"
    return `${date}T${time}`;
};

export const parseDateTime = (isoString: string | null | undefined) => {
    if (!isoString) return { date: "", time: "" };

    const parts = isoString.split(/[\sT]/);
    if (parts.length >= 2) {
        const timePart = parts[1].substring(0, 5);
        return { date: parts[0], time: timePart };
    }
    return { date: "", time: "" };
};