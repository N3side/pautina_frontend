"use client"

import Layout from "@/widgets/user/layout-h-s-f/Layout";
import UpdateDocument from "@/features/create-document/ui/UpdateDocument";
import {usePathname} from "next/navigation";
import UpdateProject from "@/features/update-project/UpdateProject";

export default function Page() {

    const id = usePathname()?.split("/")?.pop()

    return (
        <Layout>
            <div className="glass-effect rounded-[18px] p-8 w-full">
                {id && <UpdateProject />}
            </div>
        </Layout>
    )
}