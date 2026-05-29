"use client"

import AdminLayout from "@/widgets/admin/admin-layout/ui/AdminLayout";
import ShowDocuments from "@/features/admin/show-documents/showDocuments"
import {CheckAdmin} from "@/entities/user/lib/guards/CheckAdmin";

export default function Page() {
    return (
        <CheckAdmin>
            <AdminLayout>
                <ShowDocuments />
            </AdminLayout>
        </CheckAdmin>
    )
}