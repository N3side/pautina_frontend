import SettingsPage from "@/pages/settings/ui/SettingsPage";
import {CheckUser} from "@/entities/user";

export default function Page() {
    return (
        <CheckUser>
            <SettingsPage />
        </CheckUser>
    )
}