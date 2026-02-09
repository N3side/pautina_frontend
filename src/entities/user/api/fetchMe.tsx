"use client"

import { $fetch } from "@/shared/api/fetch";

export const fetchMe = async () => {
    try {
        const response = await $fetch("me", { isToast: false });
        return response?.json?.user || null;
    } catch (error) {
        return null;
    }
};