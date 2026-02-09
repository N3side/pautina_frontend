import HeaderWidget from "@/widgets/header/ui/HeaderWidget";
import SettingsWidget from "@/widgets/settings/ui/SettingsWidget";
import {CheckUser} from "@/entities/user";

export default function SettingsPage() {
    return (
        <CheckUser>
            <HeaderWidget />
            <SettingsWidget />
        </CheckUser>
    )
}