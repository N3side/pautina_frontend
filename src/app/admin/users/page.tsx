import AdminLayout from "@/widgets/admin/admin-layout/ui/AdminLayout";
import ShowUsers from "@/features/admin/show-users/showUsers";
import {CheckAdmin} from "../../../entities/user-entity/lib/guards/CheckAdmin";

export const dynamic = 'force-dynamic'

export default function Page() {
    return (
        <CheckAdmin>
            <AdminLayout>
                <ShowUsers />
            </AdminLayout>
        </CheckAdmin>
    )
}