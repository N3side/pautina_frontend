import AdminLayout from "@/widgets/admin-layout/ui/AdminLayout";
import ShowLogs from "@/features/admin/show-logs/ShowLogs"

export default function AdminLogsPage() {
    return (
        <AdminLayout>
            <ShowLogs />
        </AdminLayout>
    )
}