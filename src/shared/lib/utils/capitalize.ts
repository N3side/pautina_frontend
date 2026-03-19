export function Capitalize(text) {
    if (!text) return
    const f = text.charAt(0).toUpperCase()
    return f + text.slice(1,)
}