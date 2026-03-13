import HeaderWidget from "@/widgets/header/ui/HeaderWidget";
import RegisterWidget from "@/widgets/register/ui/RegisterWidget";
import {CheckGuest} from "@/entities/user";
import FooterWidget from "@/widgets/footer/ui/FooterWidget";

export default function RegisterPage() {
    return (
        <CheckGuest>
            <HeaderWidget />
            <RegisterWidget />
            <FooterWidget />
        </CheckGuest>
    )
}