import {safeLocalStorage} from "@/shared/lib/utils/safeLocalStorage";

export function DeleteAuthorizationInfo() {
    safeLocalStorage.removeItem("login_position")
    safeLocalStorage.removeItem("login_email")
}