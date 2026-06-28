import ProjectStackBadge from "@/entities/project-stack-badge/ProjectStackBadge";
import {Stack} from "@/entities/stack/Stack";

interface Props {
    stacks?: Record<string, any>[] | null
    hideAfter?: number
}

export default function OnlyShowStacks({stacks, hideAfter=6}: Props) {
    return (
        stacks && stacks.length > 0 &&
        <div className="flex mt-2 flex-wrap gap-1.5 transition-transform duration-500 group-hover:translate-x-0.5">
            {stacks.slice(0, hideAfter).map((stack: any, i: number) => (
                <Stack key={stack?.id} stack={stack} />
                // <ProjectStackBadge key={stack.id || i} stack={stack}/>
            ))}
            {stacks.length > 6 && (
                <span
                    className="inline-flex items-center rounded-lg bg-white/[0.04] px-2 py-0.5 text-xs font-medium text-text-muted border border-white/[0.02]">
                +{stacks.length - hideAfter}
            </span>
            )}
        </div>
    )
}