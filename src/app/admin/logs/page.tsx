import AdminLayout from "@/widgets/admin/admin-layout/ui/AdminLayout";
import ShowLogs from "@/features/admin/show-logs/ShowLogs"

export const dynamic = 'force-dynamic'

export default function Page() {
    return (
        <AdminLayout>
            <ShowLogs />
        </AdminLayout>
    )
}