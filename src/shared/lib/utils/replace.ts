import React from "react";

export const alphabetLatin: string = [...Array(26)].map((_, i) => String.fromCharCode(97 + i)).join("");
export const numbers = [...Array(10)].map((_, i) => i).join("");


export const allowedUsername: string = alphabetLatin + numbers + "_"

export const replaceChars = (str: string="", allowedSymbols: string=allowedUsername): string => {
    return str.split("").filter((i) => allowedSymbols.includes(i.toLowerCase())).join("")
}

export const autoReplace = (e: React.FormEvent<HTMLInputElement>, allowedSymbols: string=allowedUsername) => {
    const target = e.currentTarget
    target.value = replaceChars(target.value, allowedSymbols)
}