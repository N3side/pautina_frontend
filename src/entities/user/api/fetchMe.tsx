"use client"

import { $fetch } from "@/shared/api/fetch";
import {safeCookieStorage} from "@/shared/lib/utils/safeCookieStorage";

export const fetchMe = async () => {

    const token = safeCookieStorage.getItem("token")
    if (!token) return null

    try {
        const response = await $fetch("me", { isToast: false });
        return response?.json?.user || null;
    } catch (error) {
        return null;
    }
};