"use client"

import Gallery from "@/entities/gallery/Gallery";
import ProjectStackBadge from "@/entities/project-stack-badge/ProjectStackBadge";
import { useModal } from "@/shared/lib/hooks/useModal";
import { Modal } from "@/shared/ui/Modals/Modal";
import ProjectModalWidget from "@/widgets/user/modal-project-widget/ProjectModalWidget";
import EventIcon from "@mui/icons-material/Event";
import { dots } from "@/shared/styles/patterns/dots";
import {normalizeUrl} from "@/shared/lib/utils/urlHelper";
import {useEffect} from "react";

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
                className="group relative flex flex-col h-full cursor-pointer overflow-hidden rounded-[28px] backdrop-blur-md p-4 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2 hover:scale-[1.015]"
                onClick={open}
            >
                {/* 1. Эффект радиального свечения из правого верхнего угла */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand/20 via-brand/0 to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110 pointer-events-none" />

                {/* 2. Эффект пролетающего блика (Shine) */}
                <div className="absolute inset-0 -translate-x-[150%] skew-x-[-30deg] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-[150%] group-hover:opacity-100 z-10 pointer-events-none" />

                {/* Галерея / Превью проекта */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="relative mb-4 w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.08] bg-neutral-900/50"
                    style={{
                        backgroundImage: `url("${dots}")`,
                        backgroundSize: '24px 24px'
                    }}
                >
                    {/* 3. Легкий зум, поворот и повышение яркости картинки */}
                    <div className="w-full h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-rotate-1 group-hover:brightness-110">
                        <Gallery gallery={project?.gallery} autoFlip={true} />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Контентная часть */}
                <div className="flex flex-col flex-grow px-1 z-20">
                    <div className="flex items-start justify-between gap-4 mb-2.5">
                        {/* 4. Сдвиг заголовка при ховере */}
                        <h4 className="text-xl font-bold tracking-tight text-text-main line-clamp-1 transition-all duration-300 group-hover:translate-x-1">
                            {project?.name || "Без названия"}
                        </h4>

                        {/* Кнопки действий со свечением */}
                        <div className="flex shrink-0 gap-1.5 translate-x-1" onClick={(e) => e.stopPropagation()}>
                            {project?.repo_link && (
                                <a
                                    href={normalizeUrl(project.repo_link)}
                                    target="_blank"
                                    className="flex items-center justify-center rounded-xl p-2 text-text-muted/70 bg-white/[0.02] border border-white/[0.05] transition-all duration-300 hover:-translate-y-1 hover:bg-brand/10 hover:text-brand hover:border-brand/40 hover:shadow-[0_0_15px_-3px_rgba(14,165,233,0.4)]"
                                    title="Репозиторий"
                                >
                                    <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                </a>
                            )}
                            {project?.link && (
                                <a
                                    href={normalizeUrl(project.link)}
                                    target="_blank"
                                    className="flex items-center justify-center rounded-xl p-2 text-text-muted/70 bg-white/[0.02] border border-white/[0.05] transition-all duration-300 hover:-translate-y-1 hover:bg-brand/10 hover:text-brand hover:border-brand/40 hover:shadow-[0_0_15px_-3px_rgba(14,165,233,0.4)]"
                                    title="Сайт"
                                >
                                    <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Описание проекта */}
                    {project?.description && (
                        <p className="text-sm leading-relaxed text-text-muted/70 line-clamp-2 mb-4 font-normal transition-colors duration-300 group-hover:text-text-muted/90">
                            {project.description}
                        </p>
                    )}

                    {/* Стек технологий */}
                    {project?.stacks && project.stacks.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5 transition-transform duration-500 group-hover:translate-x-0.5">
                            {project.stacks.slice(0, 4).map((stack: any, i: number) => (
                                <ProjectStackBadge key={stack.id || i} stack={stack} />
                            ))}
                            {project.stacks.length > 4 && (
                                <span className="inline-flex items-center rounded-lg bg-white/[0.04] px-2 py-0.5 text-xs font-medium text-text-muted border border-white/[0.02]">
                                    +{project.stacks.length - 4}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Футер с датами */}
                    {project?.start_date && (
                        <div className="mt-auto pt-3 border-t border-white/[0.05] transition-colors duration-500 group-hover:border-white/[0.1] flex items-center justify-between text-xs font-medium">
                            <div className="flex items-center gap-1.5 text-text-muted/60">
                                <EventIcon className="text-text-muted/40 transition-colors duration-300" style={{ fontSize: 15 }} />
                                <span>Сроки разработки</span>
                            </div>

                            <div className="flex items-center gap-1.5 text-text-main/80 transition-colors duration-300 group-hover:text-text-main">
                                <time dateTime={project?.start_date}>{project?.start_date}</time>
                                <span className="text-white/20">—</span>
                                {project?.end_date ? (
                                    <time dateTime={project?.end_date}>{project?.end_date}</time>
                                ) : (
                                    <span className="relative flex items-center gap-1.5 rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand border border-brand/20">
                                        <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
                                        в процессе
                                    </span>
                                )}
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