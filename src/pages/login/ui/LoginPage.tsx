import HeaderWidget from "@/widgets/user/header/ui/HeaderWidget";
import LoginWidget from "@/widgets/user/login/ui/LoginWidget";
import {CheckIsNotUser} from "@/entities/user";
import FooterWidget from "@/widgets/user/footer/ui/FooterWidget";

export default function LoginPage() {
    return (
        <CheckIsNotUser>
            <HeaderWidget />
            <LoginWidget />
            <FooterWidget />
        </CheckIsNotUser>
    )
}