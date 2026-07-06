import BrandActionButton from "@/shared/ui/Buttons/BrandActionButton";
import Pagination from "@/features/pagination/ui/Pagination";
import {useEffect, useState} from "react";
import usePaginate from "@/shared/lib/hooks/usePaginate";
import {$fetch} from "@/shared/api/fetch";
import CardSkeleton from "@/entities/document-card/CardSkeleton";
import ProjectCard from "@/entities/project-card/ProjectCard";
import {useRouter} from "next/navigation";

interface Props {
    isMyProfile: boolean,
    trueUser?: Record<string, any> | null
    setIsEmpty: (isEmpty: boolean) => void

}

export default function ProjectsWidget({isMyProfile, trueUser, setIsEmpty}: Props) {

    const [projects, setProjects] = useState<Record<string, any>[] | null>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const {page, setPage, lastPage, setLastPage} = usePaginate()

    async function getProjects() {

        setIsLoading(true)

        const response = await $fetch(`projects/user/${trueUser?.main?.id}?page=${page}`,
            {onLoadingChange: setIsLoading}
        )
        const projects_ = response?.json?.projects
        const page_ = response?.json?.current_page
        const lastPage_ = response?.json?.last_page

        setProjects(projects_)

        setPage(page_)
        setLastPage(lastPage_)
    }

    useEffect(() => {
        if (trueUser) {
            getProjects()
        }
    }, [trueUser, page]);

    const router = useRouter()

    async function createProject() {
        const response = await $fetch("projects", {
            method: "POST"
        })

        const project_id = response?.json?.project_id

        if (project_id) {
            router.replace(`/edit/project/${project_id}`)
        }
    }

    const [isVisible, setIsVisible] = useState<boolean>(true)

    useEffect(() => {
        const hasData = !!(projects && Array.isArray(projects) && projects.length > 0);

        setIsVisible(isMyProfile || isLoading || hasData);
        setIsEmpty(isLoading || hasData);
    }, [isMyProfile, isLoading, projects]);


    return (
        isVisible &&
        <section className="w-full glass-effect rounded-[18px] p-6 flex flex-col gap-4">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col gap-1">
                    <h4 className="text-text-main font-bold tracking-tight">
                        Проекты
                    </h4>
                </div>
                {isMyProfile && (
                    <BrandActionButton onClick={createProject}>
                        Добавить проект
                    </BrandActionButton>
                )}
            </header>

            <main className="flex flex-col gap-4">
                {projects && Array.isArray(projects) && projects?.length > 0 &&
                    <div className="flex flex-col gap-4 mt-4">
                        {!isLoading ? projects?.map((project, i) => (
                                <ProjectCard
                                    key={i}
                                    project={project}
                                />
                            )) :
                            [...Array(3)].map((e, key) =>
                                <CardSkeleton key={key} />
                            )
                        }
                    </div>
                }

                {projects &&
                    <Pagination currentPage={page} totalPages={lastPage} setCurrentPage={setPage} />
                }
            </main>

        </section>
    )
}