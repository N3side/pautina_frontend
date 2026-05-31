import AdminLayout from "@/widgets/admin/admin-layout/ui/AdminLayout";
import ShowDashboard from "@/features/admin/show-dashboard/ShowDashboard";
import {CheckAdmin} from "../../entities/user-entity/lib/guards/CheckAdmin"

export default function Page() {
    return (
        <CheckAdmin>
            <AdminLayout>
                <ShowDashboard />
            </AdminLayout>
        </CheckAdmin>
    )
}