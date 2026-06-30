import Gallery from "@/entities/gallery/Gallery";
import ProjectStackBadge from "@/entities/project-stack-badge/ProjectStackBadge";
import EventIcon from "@mui/icons-material/Event";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import Link from "next/link";
import { dots } from "@/shared/styles/patterns/dots";
import { normalizeUrl } from "@/shared/lib/utils/urlHelper";

interface Props {
    project: Record<string, any> | null;
    isMyProfile: boolean;
}

export default function ProjectModalWidget({
       project,
       isMyProfile,
   }: Props) {
    return (
        <div className="flex h-full flex-col">
            <div className="flex flex-1 flex-col">
                {/* Галерея */}
                <div
                    className="w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    {project?.gallery?.length ? (
                        <Gallery
                            gallery={project.gallery}
                            className="w-full max-h-[600px]"
                        />
                    ) : (
                        <div
                            className="aspect-video w-full rounded-xl"
                            style={{
                                backgroundImage: `url("${dots}")`,
                            }}
                        />
                    )}
                </div>

                {/* Заголовок */}
                <div className="mt-5 flex items-start justify-between gap-4">
                    <h5 className="font-bold text-text-main break-words">
                        {project?.title || "Без названия"}
                    </h5>

                    <div className="flex shrink-0 gap-1.5">
                        {project?.repo_link && (
                            <a
                                href={normalizeUrl(project.repo_link)}
                                target="_blank"
                                rel="noreferrer"
                                title="Репозиторий"
                                className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-white/10 hover:text-text-main"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12 24 5.373 18.627 0 12 0Z" />
                                </svg>
                            </a>
                        )}

                        {project?.link && (
                            <a
                                href={normalizeUrl(project.link)}
                                target="_blank"
                                rel="noreferrer"
                                title="Сайт"
                                className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-white/10 hover:text-text-main"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>

                {/* Описание */}
                {project?.description && (
                    <p className="mt-2 text-text-muted leading-relaxed">
                        {project.description}
                    </p>
                )}
            </div>

            {/* Нижний блок */}
            <div className="mt-2">
                {project?.stacks?.length > 0 && (
                    <>
                        <h6 className="font-bold text-text-main">
                            Стеки
                        </h6>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {project && project.stacks.map((stack: any, i: number) => (
                                <ProjectStackBadge
                                    key={stack.id || i}
                                    stack={stack}
                                />
                            ))}
                        </div>
                    </>
                )}

                {project?.start_date && (
                    <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-wide">
                        <div className="flex items-center gap-2 text-text-muted">
                            <EventIcon className="!text-text-muted" />

                            <span>Разработка:</span>
                        </div>

                        <div className="flex items-center gap-2 text-text-muted">
                            <time dateTime={project.start_date}>
                                {project.start_date}
                            </time>

                            <span>—</span>

                            {project.end_date ? (
                                <time dateTime={project.end_date}>
                                    {project.end_date}
                                </time>
                            ) : (
                                <span className="rounded-md bg-brand/10 px-2 py-1 text-[10px] font-bold normal-case text-brand">
                                    в процессе
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {isMyProfile && (
                    <div className="mt-6">
                        <Link href={`/edit/project/${project?.id}`}>
                            <ButtonLarge>
                                Редактировать
                            </ButtonLarge>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}