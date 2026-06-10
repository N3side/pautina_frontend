import HeaderWidget from "@/widgets/user/header/ui/HeaderWidget";
import LoginWidget from "@/widgets/user/otp-login/ui/LoginWidget";
import FooterWidget from "@/widgets/user/footer/ui/FooterWidget";
import {CheckIsNotUser} from "@/entities/user-entity";

export default function Page() {
    return (
        <CheckIsNotUser>
            <HeaderWidget />
            <LoginWidget />
            <FooterWidget />
        </CheckIsNotUser>
    )
}