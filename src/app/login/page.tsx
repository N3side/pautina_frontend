import HeaderWidget from "@/widgets/user/header/ui/HeaderWidget";
import LoginWidget from "@/widgets/user/login/ui/LoginWidget";
import FooterWidget from "@/widgets/user/footer/ui/FooterWidget";
import {CheckIsNotUser} from "@/entities/user-entity";

export default function Page() {
    return (
        <div>
            <CheckIsNotUser>
                <HeaderWidget />
                <LoginWidget />
                <FooterWidget />
            </CheckIsNotUser>
        </div>
    )
}