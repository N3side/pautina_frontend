import AdminLayout from "@/widgets/admin/admin-layout/ui/AdminLayout";
import ShowLogs from "@/features/admin/show-logs/ShowLogs"
import {CheckAdmin} from "../../../entities/user-entity/lib/guards/CheckAdmin";

export const dynamic = 'force-dynamic'

export default function Page() {
    return (
        <CheckAdmin>
            <AdminLayout>
                <ShowLogs />
            </AdminLayout>
        </CheckAdmin>
    )
}