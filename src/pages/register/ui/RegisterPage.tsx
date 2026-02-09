import HeaderWidget from "@/widgets/header/ui/HeaderWidget";
import RegisterWidget from "@/widgets/register/ui/RegisterWidget";
import {CheckGuest} from "@/entities/user";

export default function RegisterPage() {
    return (
        <CheckGuest>
            <HeaderWidget />
            <RegisterWidget />
        </CheckGuest>
    )
}