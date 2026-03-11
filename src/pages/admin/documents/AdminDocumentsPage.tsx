import AdminLayout from "@/widgets/admin-layout/ui/AdminLayout";
import ShowDocuments from "@/features/admin/show-documents/showDocuments"


export default function AdminDocumentsPage() {
    return (
        <AdminLayout>
            <ShowDocuments />
        </AdminLayout>
    )
}