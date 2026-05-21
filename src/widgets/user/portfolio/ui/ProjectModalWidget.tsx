import ProjectGallery from "@/entities/project-gallery/ProjectGallery";
import ProjectStackBadge from "@/entities/project-stack-badge/ProjectStackBadge";

interface Props {
    project: Record<string, any> | null
    isMyProfile: boolean
}

import EventIcon from '@mui/icons-material/Event';
import {useRouter} from "next/navigation";
import ActionButton from "@/shared/ui/Buttons/ActionButton";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import Link from "next/link";

export default function ProjectModalWidget({project, isMyProfile}: Props) {

    const router = useRouter()

    return (
        <div
            className="flex flex-col h-full group relative"
            onClick={() => {
                open()
            }} // Теперь при клике открывается модалка
        >
            <div onClick={(e) => e.stopPropagation()}>
                <ProjectGallery gallery={project?.gallery} className="!h-full !max-h-[400px]" />
            </div>

            <div className="mt-2 pl-1 flex flex-col pb-6">
                <div className="flex justify-between items-center">
                    <h4 className="font-bold text-text-main transition-colors">
                        {project?.name || "Без названия"}
                    </h4>

                    <div className="flex gap-1.5">
                        {project?.repo_link && (
                            <a href={"https://" + project.repo_link} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-white/10 transition-colors" title="Репозиторий">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            </a>
                        )}
                        {project?.link && (
                            <a href={"https://" + project.link} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-white/10 transition-colors" title="Сайт">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </a>
                        )}
                    </div>
                </div>

                {project?.description && (
                    <p className="text-secondary text-text-muted line-clamp-2 leading-relaxed">
                        {project.description}
                    </p>
                )}

                <div className="flex flex-col mt-5">
                    <h5 className="text-text-main font-bold">Стеки:</h5>

                    {/* Стеки (в карточке показываем ограниченно, либо все) */}
                    {project?.stacks && project.stacks.length > 0 && (
                        <div className="mt-2">
                            <div className="flex flex-wrap gap-2">
                                {project.stacks.map((stack: any, i: number) => (
                                    <ProjectStackBadge key={stack.id || i} stack={stack} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {project?.start_date && (
                    <div className="flex items-center gap-2 mt-7 mb-3 text-xs font-medium tracking-wide uppercase">
                        <div className="flex items-center gap-2 text-text-muted/80">
                            <EventIcon className="!text-text-muted" />
                            <p className="text-text-muted">Разработка:</p>
                        </div>

                        <div className="flex items-center gap-1 text-text-muted">
                            <time dateTime={project?.start_date}>{project?.start_date}</time>
                            <span className="text-text-muted">—</span>
                            {project?.end_date ? (
                                <time dateTime={project?.end_date}>{project?.end_date}</time>
                            ) : (
                                <span className="px-1.5 py-0.5 rounded-md bg-brand/10 text-brand text-[10px] uppercase font-bold tracking-normal normal-case">
                                    в процессе
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {isMyProfile &&
                    <Link href={`/edit/project/${project?.id}`}>
                        <ButtonLarge>
                            Редактировать
                        </ButtonLarge>
                    </Link>
                }


            </div>
        </div>
    )
}