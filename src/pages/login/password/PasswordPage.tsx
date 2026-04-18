import HeaderWidget from "@/widgets/user/header/ui/HeaderWidget";
import {CheckIsNotUser} from "@/entities/user";
import FooterWidget from "@/widgets/user/footer/ui/FooterWidget";
import PasswordWidget from "@/widgets/user/login/ui/PasswordWidget";

export default function PasswordPage() {
    return (
        <CheckIsNotUser>
            <HeaderWidget />
            <PasswordWidget />
            <FooterWidget />
        </CheckIsNotUser>
    )
}