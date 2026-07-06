"use client"

import Layout from "@/widgets/user/layout-h-s-f/Layout";
import ActionButton from "@/shared/ui/Buttons/ActionButton";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {usePathname, useRouter} from "next/navigation";
import Gallery from "@/entities/gallery/Gallery";
import {useContext, useEffect, useState} from "react";
import {$fetch} from "@/shared/api/fetch";
import {Stack} from "@/entities/stack/Stack";
import {UserContext} from "@/entities/user";
import IconWrapper from "@/shared/ui/Buttons/IconWrapper";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import ExpandText from "@/shared/ui/expand-text/ExpandText";
import BrandActionButton from "@/shared/ui/Buttons/BrandActionButton";
import CallMadeIcon from '@mui/icons-material/CallMade';
import ProjectCard from "@/entities/project-card/ProjectCard";


export default function Page() {

    const router = useRouter()
    const [project, setProject] = useState<Record<string, any> | null>(null)

    const id = usePathname().split("/")?.pop()

    async function getProject(project_id: string) {
        const response = await $fetch(`projects/${project_id}`)

        const project_ = response?.json?.project

        if (project_) {
            setProject(project_)
        }
    }

    useEffect(() => {
        if (id) getProject(id)
    }, []);

    const {user} = useContext(UserContext)

    const isMyProject = project?.user_id === user?.main?.id

    return (
        <Layout>
            <div className="flex flex-col gap-4">
                <ActionButton className="gap-2 !px-4 w-fit" onClick={() => router.back()}>
                    <KeyboardBackspaceIcon className="text-text-muted" />
                    <p className="text-text-muted font-semibold text-small">
                        Вернуться в профиль
                    </p>
                </ActionButton>

                <ProjectCard project={project} isMyProject={isMyProject} redirectOnClick={false} />
            </div>
        </Layout>
    )
}