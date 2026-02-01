import {safeLocalStorage} from "@/shared/utils/safeLocalStorage";

export function DeleteRegistrationInfo(): void {
    safeLocalStorage.removeItem("city")
    safeLocalStorage.removeItem("city_id")
    safeLocalStorage.removeItem("email_otp")
    safeLocalStorage.removeItem("register_position")
    safeLocalStorage.removeItem("user_email")
    safeLocalStorage.removeItem("user_name")
    safeLocalStorage.removeItem("post")
    safeLocalStorage.removeItem("organization")
    safeLocalStorage.removeItem("department")
    safeLocalStorage.removeItem("selectedStatus")
    safeLocalStorage.removeItem("schoolStudyStatus")
    safeLocalStorage.removeItem("source")
    safeLocalStorage.removeItem("custom_text")
    safeLocalStorage.removeItem("course")
}