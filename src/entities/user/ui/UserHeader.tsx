"use client";

import {ButtonHTMLAttributes, ComponentType} from "react";
import Link from "next/link";
import DropDown from "@/shared/ui/DropDown/DropDown";
import RoundedIconWrapper from "@/shared/ui/IconWrapper/RoundedIconWrapper";
import Avatar from "@/shared/ui/Avatar/Avatar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {userLink} from "@/shared/lib/utils/userLink";
import {diffTimes, formatIsoDate} from "@/shared/lib/utils/time";
import {fullName} from "@/shared/lib/utils/fullName";
import ExpandText from "@/shared/ui/expand-text/ExpandText";
import AdjustableText from "@/shared/ui/adjustable-text/AdjustableText";
import EmojiDropdown from "@/features/select-emoji/EmojiDropdown";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";

// Исправили типы: теперь строго для кнопки, а не для дива
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    text: string;
    Icon: ComponentType<any>;
}

function CustomButton({ className, text, Icon, ...props }: ButtonProps) {
    return (
        <button
            className={`!max-w-[200px] !w-full !text-left !px-4 !py-3 !text-sm !rounded-[8px] !text-text-main !hover:bg-neutral-500/10 !transition-colors ${className}`}
            {...props}
        >
            <div className="flex gap-3 items-center">
                <Icon className="!text-[20px] !text-text-muted" />
                <p className="w-fit text-text-muted font-semibold text-small">
                    {text}
                </p>
            </div>
        </button>
    );
}

interface Props {
    user: Record<string, any> | null;
    expandedButtons?: Record<string, any>[] | null;
    content: string
    setContent: (content: string) => void
    created_at?: string;
    size?: "default" | "mini";
    portal?: any
    is_deleted?: boolean
    updated?: boolean
    isEditing?: boolean
    actionsAtEnd?: boolean
}

export default function UserHeader({ user, expandedButtons, content, setContent, created_at, updated=false, size = "default", portal, is_deleted=false, isEditing=false, actionsAtEnd=true }: Props) {
    const isMini = size === "mini";

    const diffInHours = created_at ? diffTimes(new Date(), created_at, "hour") : 0;
    const diffInMinutes = created_at ? diffTimes(new Date(), created_at, "min") : 0;

    return (
        <div className="flex justify-between items-center w-full">

            <div className={`flex items-center min-w-0 w-full ${isMini ? "gap-1.5" : "text-[15px] gap-2"}`}>

                <div className="flex gap-2 items-start min-w-0 w-full">

                    <Link href={userLink(user?.short_id)} className="shrink-0">
                        <Avatar
                            image_url={user?.avatar}
                            className={isMini ? "!w-8 !h-8" : "!w-11 !h-11"}
                        />
                    </Link>

                    <div className="flex-col flex min-w-0 w-full">

                        <div className={`flex items-center ${actionsAtEnd ? "justify-between" : "gap-2"}`}>

                            <Link href={userLink(user?.short_id)} className="flex items-center gap-1 min-w-0 w-fit">
                                {user?.name &&
                                    <span className={`font-bold text-text-main hover:underline truncate ${
                                        isMini ? "max-w-[110px]" : "max-w-[150px]"
                                    }`}>
                                    {fullName(user?.name)}️
                                </span>
                                }
                                <span className="!text-text-muted hover:!underline truncate">
                                    {
                                        is_deleted ? "Удаленно" : `@${user?.username}`
                                    }
                                </span>

                                {created_at && (
                                    <div className="flex gap-1.5 items-center shrink-0">
                                        <span className="text-text-muted/50">·</span>
                                        <span className="text-text-muted whitespace-nowrap">
                                        {diffInMinutes > 59 ?
                                            (diffInHours > 24 ? formatIsoDate(created_at) : `${diffInHours} ч.`)
                                            :
                                            `${diffInMinutes} мин.`
                                        }
                                    </span>
                                    </div>
                                )}


                                <p className="text-text-muted text-small">{updated && "(изменено)"}</p>

                            </Link>

                            {expandedButtons && Array.isArray(expandedButtons) && expandedButtons.length > 0 && (
                                <DropDown trigger={
                                    <RoundedIconWrapper
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                        }}
                                        Icon={MoreHorizIcon}
                                        className={`!z-100 ${isMini ? "!w-7 !h-7" : ""}`}
                                        iconClassname={isMini ? "!text-[18px]" : ""}
                                    />
                                }>
                                    <div className="glass-effect max-w-[220px] w-full rounded-2xl">
                                        {expandedButtons.map((btn, i) => (
                                            btn &&
                                            <CustomButton
                                                text={btn?.text}
                                                Icon={btn?.Icon}
                                                key={i}
                                                onClick={btn?.onClick}
                                            />
                                        ))}
                                    </div>
                                </DropDown>
                            )}
                        </div>

                        {
                            !isEditing ?
                                <ExpandText text={content} previewLength={20} className="max-w-[85%] w-full !mt-1" />
                                :
                                <div className="flex items-start border-b pb-1 mt-2 border-text-main" onClick={(e) => e.stopPropagation()}>
                                    <AdjustableText
                                        text={content}
                                        setText={setContent}
                                        placeholder="Контент"
                                    />

                                    <EmojiDropdown trigger={
                                        <RoundedIconWrapper btnHeight={20} btnWidth={40} Icon={SentimentSatisfiedOutlinedIcon} />
                                    } text={content} setText={setContent} />

                                </div>
                        }
                        
                        {portal}

                    </div>

                </div>

            </div>
        </div>
    );
}