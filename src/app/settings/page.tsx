import SettingsWidget from "@/widgets/user/settings/ui/SettingsWidget";
import {CheckUser} from "../../entities/user-entity";
import Layout from "@/widgets/user/layout-h-s-f/Layout";

export default function Page() {
    return (
        <CheckUser>
            <Layout>
                <SettingsWidget />
            </Layout>
        </CheckUser>
    )
}