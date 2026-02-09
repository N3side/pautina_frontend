import HeaderWidget from "@/widgets/header/ui/HeaderWidget";
import LoginWidget from "@/widgets/login/ui/LoginWidget";
import {CheckIsNotUser} from "@/entities/user";

export default function LoginPage() {
    return (
        <CheckIsNotUser>
            <HeaderWidget />
            <LoginWidget />
        </CheckIsNotUser>
    )
}