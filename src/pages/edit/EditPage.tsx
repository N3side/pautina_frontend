import EditUserInfo from "@/widgets/user/edit-user-info/ui/edit-user-info";
import Layout from "@/widgets/user/layout-h-s-f/Layout";
import {CheckUser} from "@/entities/user";

export default function EditPage() {
    return (
        <CheckUser>
            <Layout>
                <EditUserInfo />
            </Layout>
        </CheckUser>
    )
}