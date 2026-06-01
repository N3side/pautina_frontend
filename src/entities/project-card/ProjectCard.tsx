"use client"

import Gallery from "@/entities/gallery/Gallery";
import ProjectStackBadge from "@/entities/project-stack-badge/ProjectStackBadge";
import { useModal } from "@/shared/lib/hooks/useModal";
import { Modal } from "@/shared/ui/Modals/Modal";
import ProjectModalWidget from "@/widgets/user/modal-project-widget/ProjectModalWidget";
import EventIcon from "@mui/icons-material/Event";
import {dots} from "../../shared/styles/patterns/dots";

interface ProjectCardProps {
    project: Record<string, any>;
    isMyProfile: boolean;
    onClick?: () => void;
}

export default function ProjectCard({ project, isMyProfile }: ProjectCardProps) {
    const { isOpen, open, close } = useModal();

    return (
        <>
            <div
                className="group flex flex-col h-full cursor-pointer overflow-hidden rounded-3xl border border-border-default/40  p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_12px_40px_rgba(14,165,233,0.15)]"
                onClick={open}
            >
                {/* Галерея */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="relative mb-5 w-full aspect-video rounded-2xl overflow-hidden border border-border-default/20 "
                    style={{
                        backgroundImage: `url("${dots}")`
                    }}
                >
                    <Gallery gallery={project?.gallery} />
                    {/* Легкий градиент поверх картинки при наведении для глубины */}
                </div>

                {/* Основной контент */}
                <div className="flex flex-col flex-grow gap-3.5">
                    {/* Заголовок и ссылки */}
                    <div className="flex items-start justify-between gap-4">
                        <h4 className="text-lg font-bold text-text-main line-clamp-2 transition-colors duration-200 group-hover:text-brand">
                            {project?.name || "Без названия"}
                        </h4>

                        <div className="flex shrink-0 gap-1" onClick={(e) => e.stopPropagation()}>
                            {project?.repo_link && (
                                <a
                                    href={"https://" + project.repo_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center rounded-xl p-2.5 text-text-muted transition-all duration-200 hover:bg-brand/10 hover:text-brand"
                                    title="Репозиторий"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                </a>
                            )}
                            {project?.link && (
                                <a
                                    href={"https://" + project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center rounded-xl p-2.5 text-text-muted transition-all duration-200 hover:bg-brand/10 hover:text-brand"
                                    title="Сайт"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Описание */}
                    {project?.description && (
                        <p className="text-sm leading-relaxed text-text-muted line-clamp-2">
                            {project.description}
                        </p>
                    )}

                    {/* Стек технологий */}
                    {project?.stacks && project.stacks.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-2">
                            {project.stacks.map((stack: any, i: number) => (
                                <ProjectStackBadge key={stack.id || i} stack={stack} />
                            ))}
                        </div>
                    )}

                    {/* Футер карточки (Даты) */}
                    {project?.start_date && (
                        <div className="mt-auto pt-4">
                            <div className="flex items-start justify-between rounded-2xl bg-surface p-3 px-4
                                flex-col min-[500px]:flex-row min-[500px]:items-center gap-2"
                            >
                                <div className="flex items-center gap-2">
                                    <EventIcon className="text-text-muted/80" fontSize="small" />
                                    <span className="text-sm font-medium text-text-muted">
                                        Сроки
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5 text-sm font-medium text-text-main">
                                    <time dateTime={project?.start_date}>{project?.start_date}</time>
                                    <span className="font-normal text-text-muted/50">—</span>
                                    {project?.end_date ? (
                                        <time dateTime={project?.end_date}>{project?.end_date}</time>
                                    ) : (
                                        <span className="rounded-lg bg-brand/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-brand">
                                            в процессе
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={isOpen} close={close}>
                <ProjectModalWidget
                    project={project}
                    isMyProfile={isMyProfile}
                />
            </Modal>
        </>
    );
}