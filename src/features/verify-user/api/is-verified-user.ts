import {$fetch} from "@/shared/api/fetch";

export async function IsVerifiedUser(callback) {
    const response = await $fetch("me/verified")

    callback(response?.json?.verified)
}