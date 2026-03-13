import HeaderWidget from "@/widgets/header/ui/HeaderWidget";
import LoginWidget from "@/widgets/login/ui/LoginWidget";
import {CheckIsNotUser} from "@/entities/user";
import FooterWidget from "@/widgets/footer/ui/FooterWidget";

export default function LoginPage() {
    return (
        <CheckIsNotUser>
            <HeaderWidget />
            <LoginWidget />
            <FooterWidget />
        </CheckIsNotUser>
    )
}