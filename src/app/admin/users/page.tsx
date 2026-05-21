import AdminLayout from "@/widgets/admin/admin-layout/ui/AdminLayout";
import ShowUsers from "@/features/admin/show-users/showUsers";

export const dynamic = 'force-dynamic'

export default function Page() {
    return (
        <AdminLayout>
            <ShowUsers />
        </AdminLayout>
    )
}