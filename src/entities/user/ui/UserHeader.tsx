"use client";

import Link from "next/link";
import Avatar from "@/shared/ui/Avatar/Avatar";
import {userLink} from "@/shared/lib/utils/userLink";
import {diffTimes, formatIsoDate} from "@/shared/lib/utils/time";
import {fullName} from "@/shared/lib/utils/fullName";
import ButtonOpener from "@/entities/buttons-opener/ButtonOpener";


interface Props {
    user: Record<string, any> | null;
    expandedButtons?: Record<string, any>[] | null;
    created_at?: string;
    size?: "default" | "mini";
    portal?: any
    is_deleted?: boolean
    updated?: boolean
    isEditing?: boolean
    actionsAtEnd?: boolean
}

export default function UserHeader({ user, expandedButtons, created_at, updated=false, size = "default", portal, is_deleted=false, isEditing=false, actionsAtEnd=true }: Props) {
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
                                    <span className={`font-bold text-text-main hover:underline truncate ${isMini ? "max-w-[110px]" : "max-w-[150px]"}`}>
                                        {fullName(user?.name)}️
                                    </span>
                                }
                                <span className="!text-text-muted hover:!underline truncate">
                                    {
                                        is_deleted ? "Удаленно" : `@${user?.short_id}`
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


                                {/*<p className="text-text-muted text-small">{updated && "(изменено)"}</p>*/}

                            </Link>

                            {expandedButtons && Array.isArray(expandedButtons) && expandedButtons.length > 0 && (
                                <ButtonOpener expandedButtons={expandedButtons} isMini={isMini} />
                            )}
                        </div>
                        
                        {portal}

                    </div>

                </div>

            </div>
        </div>
    );
}