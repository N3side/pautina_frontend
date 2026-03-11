import AdminLayout from "@/widgets/admin-layout/ui/AdminLayout";
import ShowDashboard from "@/features/admin/show-dashboard/ShowDashboard";

export default function AdminPage() {
    return (
        <>
            <AdminLayout>
                <ShowDashboard />
            </AdminLayout>
        </>
    )
}