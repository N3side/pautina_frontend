"use client";

import { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {
    count: number;
    Icon: any;
    ActiveIcon?: any;
    active?: boolean;
    hover?: boolean;
    activeColorClass?: string;
    showCount?: boolean
}

export default function SocialButton({
         showCount=true,
         count,
         Icon,
         ActiveIcon,
         active = false,
         hover = true,
         activeColorClass = "text-red-500",
         className,
         ...props
     }: Props) {
    return (
        <button
            type="button"
            className={`flex items-center gap-1 group border-none bg-transparent outline-none p-0 ${
                hover ? "cursor-pointer" : "cursor-default"
            } ${className || ""}`}
            {...props}
        >
            <div
                className={`p-2 aspect-square h-9 w-9 flex justify-center items-center rounded-full transition-all duration-300 ${
                    active ? "bg-red-500/10" : hover ? "group-hover:bg-neutral-500/10" : ""
                } group-active:scale-95`} /* Эффект нажатия через простой CSS */
            >
                {active && ActiveIcon ? (
                    <ActiveIcon
                        key="active"
                        className={activeColorClass}
                    />
                ) : (
                    <Icon
                        key="inactive"
                        fontSize="small"
                        className="text-text-muted transition-transform duration-300 group-hover:scale-110"
                    />
                )}
            </div>

            <p className={`text-small font-medium transition-colors duration-300 tabular-nums ${
                active ? activeColorClass : "text-text-muted"
            }`}>
                {showCount && count}
            </p>
        </button>
    );
}