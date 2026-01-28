import HeaderWidget from "@/app/widgets/header/ui/HeaderWidget";
import SettingsWidget from "@/app/settings/ui/SettingsWidget";
import {CheckUser} from "@/shared/providers/UserProvider";

export default function Page() {
    return (
        <CheckUser>
            <HeaderWidget />
            <SettingsWidget />
        </CheckUser>
    )
}