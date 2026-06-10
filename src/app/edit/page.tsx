import EditUserInfo from "@/widgets/user/edit-user-info/ui/edit-user-info";
import Layout from "@/widgets/user/layout-h-s-f/Layout";
import {CheckUser} from "@/entities/user-entity";

export default function Page() {
    return (
        <CheckUser>
            <Layout>
                <EditUserInfo />
            </Layout>
        </CheckUser>
    )
}