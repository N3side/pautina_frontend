import {safeLocalStorage} from "@/shared/utils/safeLocalStorage";

export function DeleteAuthorizationInfo() {
    safeLocalStorage.removeItem("login_position")
    safeLocalStorage.removeItem("login_email")
}