"use client"

interface ProjectStackBadgeProps {
    stack: {
        id: string | number;
        name: string;
        image_url?: string;
    }
}

export default function ProjectStackBadge({ stack }: ProjectStackBadgeProps) {
    return (
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] backdrop-blur-md hover:bg-white/[0.08] hover:border-white/20 transition-all">
            {stack.image_url && (
                <img
                    src={stack.image_url}
                    alt={stack.name}
                    className="w-4 h-4 object-contain filter drop-shadow-sm"
                />
            )}
            <span className="text-text-main font-medium text-[12px] tracking-wide whitespace-nowrap">
                {stack.name}
            </span>
        </div>
    );
}