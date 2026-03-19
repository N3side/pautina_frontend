import SettingsWidget from "@/widgets/user/settings/ui/SettingsWidget";
import {CheckUser} from "@/entities/user";
import Layout from "@/widgets/user/layout-h-s-f/Layout";

export default function SettingsPage() {
    return (
        <CheckUser>
            <Layout>
                <SettingsWidget />
            </Layout>
        </CheckUser>
    )
}