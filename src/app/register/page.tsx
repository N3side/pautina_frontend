import HeaderWidget from "@/widgets/user/header/ui/HeaderWidget";
import RegisterWidget from "@/widgets/user/register/ui/RegisterWidget";
import {CheckGuest} from "@/entities/user-entity";
import FooterWidget from "@/widgets/user/footer/ui/FooterWidget";

export default function Page() {
    return (
        <CheckGuest>
            <HeaderWidget />
            <RegisterWidget />
            <FooterWidget />
        </CheckGuest>
    )
}