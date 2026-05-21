"use client"

import Layout from "@/widgets/user/layout-h-s-f/Layout";
import UpdateDocument from "@/features/create-document/ui/UpdateDocument";
import {usePathname} from "next/navigation";

export default function Page() {

    const id = usePathname()?.split("/")?.pop()

    return (
        <Layout>
            <div className="glass-effect rounded-[18px] p-8 w-full">
                {id && <UpdateDocument document_id={id} />}
            </div>
        </Layout>
    )
}