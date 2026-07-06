"use client";

import Gallery from "@/entities/gallery/Gallery";
import {useModal} from "@/shared/lib/hooks/useModal";
import {normalizeUrl} from "@/shared/lib/utils/urlHelper";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import BrandActionButton from "@/shared/ui/Buttons/BrandActionButton";
import {Stack} from "@/entities/stack/Stack";
import {dots} from "@/shared/styles/patterns/dots";
import ExpandText from "@/shared/ui/expand-text/ExpandText";
import Link from "next/link";
import {useContext} from "react";
import {UserContext} from "@/entities/user";


interface ProjectCardProps {
    project: Record<string, any>;
}

export default function ProjectCard({
        project,
    }: ProjectCardProps) {

    const { open, isOpen, close } = useModal();

    const title = project?.title || "Без названия";

    const stacks = Array.isArray(project?.stacks) ? project.stacks : [];
    const hasLive = Boolean(project?.link);

    const {user} = useContext(UserContext)

    const isMyProject = project?.user_id === user?.main?.id

    return (
        <div
            // onClick={() => router.push(`edit${project?.id}`)}
        >
            <article

                // router.push(`projects/${project?.id}`, {
                //     state: {
                //         user_short_id: "111"
                //     }
                // })
                className="
            group relative cursor-pointer overflow-hidden duration-300 hover:border-brand/45
            hover:scale-101 transition-all hover:translate-y-[-3px]
            "
            >
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.18fr)]">

                    {project?.gallery && project?.gallery?.length > 0 ?
                        <Gallery gallery={project?.gallery} />
                        :
                        <div className="w-full h-full" style={{backgroundImage: `url("${dots}")`}}>

                        </div>
                    }

                    <div className="flex min-w-0 flex-col px-2 py-4 sm:px-5 justify-between">

                        <div className="flex flex-col gap-3">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="text-tiny font-bold uppercase tracking-[0.13em] text-text-muted">
                                        {(project?.start_date || project?.end_date) &&
                                            Math.max(
                                                +(project?.start_date?.slice(0,4) || "0"),
                                                +(project?.end_date?.slice(0,4) || "0")
                                            ) || ""
                                        }
                                        {/*<span className="mx-1.5 opacity-50">•</span>*/}
                                        {/*{project?.category || "DESIGN + FRONTEND"}*/}
                                    </p>

                                    <h4 className="truncate font-extrabold tracking-tight text-text-main">
                                        {title}
                                    </h4>
                                </div>

                                <div
                                    className="flex shrink-0 items-center gap-1.5"
                                >
                                    {hasLive && (
                                        <a
                                            href={normalizeUrl(project.link)}
                                            target="_blank"
                                            rel="noreferrer"
                                            title="Открыть сайт"
                                            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border-default px-3 text-button-sm text-text-muted transition-colors hover:border-brand hover:text-brand"
                                        >
                                            <LanguageRoundedIcon sx={{ fontSize: 18 }} />
                                            <span className="hidden sm:inline">ссылка</span>
                                        </a>
                                    )}
                                </div>
                            </div>


                            <div className="max-h-[100px] overflow-y-scroll">
                                <ExpandText text={project?.description} previewLength={150} canCloseOnExpanded={false} />
                            </div>

                            {/*<p className="line-clamp-3 text-secondary text-text-muted max-w-full w-full">*/}
                            {/*    */}
                            {/*</p>*/}

                        </div>

                        <div className="flex flex-col gap-3">
                            {stacks.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-1.5">
                                    {stacks.slice(0, 4).map((stack: any, index: number) => (
                                        <Stack stack={stack} key={stack?.id} className="" />
                                    ))}

                                    {stacks.length > 4 && (
                                        <span className="inline-flex items-center rounded-lg border border-border-default px-2 py-1 text-tiny font-bold text-text-muted">
                                    +{stacks.length - 4}
                                </span>
                                    )}
                                </div>
                            )}
                            <div className="flex items-end justify-between">

                                {isMyProject &&
                                    <Link href={`edit/project/${project?.id}`}>
                                        <BrandActionButton>
                                            Редактировать
                                        </BrandActionButton>
                                    </Link>
                                }

                                <div className="text-tiny text-text-muted">
                                    {(project?.start_date || project?.end_date) &&
                                        `${project?.start_date || "????"} — ${project?.end_date || "????"}`
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/*<Modal isOpen={isOpen} close={close}>*/}
                {/*    <ProjectModalWidget*/}
                {/*        project={project}*/}
                {/*        isMyProfile={isMyProfile}*/}
                {/*    />*/}
                {/*</Modal>*/}

            </article>
        </div>
    );
}