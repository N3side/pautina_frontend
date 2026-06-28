export function getRussianAnswers(number: number) {
    const mainMod = number % 100;
    const subMod = number % 10;

    if (mainMod > 10 && mainMod < 20) {
        return "ответов";
    }
    if (subMod === 1) {
        return "ответ";
    }
    if (subMod >= 2 && subMod <= 4) {
        return "ответа";
    }
    return "ответов";
}