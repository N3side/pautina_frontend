"use client"

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Elem from "@/widgets/user/sidebar/ui/Elem";
import {homeLink, userLink} from "@/shared/lib/utils/userLink";
import {useContext, useMemo} from "react";
import {UserContext} from "@/entities/user-entity";
import ForumIcon from '@mui/icons-material/Forum';
import PersonIcon from '@mui/icons-material/Person';
import {usePathname} from "next/navigation";
import toast from "react-hot-toast";

interface Props {
    className?: string
}

export default function Sidebar({className}: Props) {

    const {user} = useContext(UserContext)
    const pathname = usePathname() // например: "/" или "/settings"

    const elems = useMemo(() => [
        !user && {
            Icon: HomeOutlinedIcon,
            text: "Главная",
            link: homeLink, // например: "/"
            path: "/" // путь для сравнения
        },
        user && {
            Icon: PersonIcon,
            text: "Профиль",
            link: userLink(user?.publication?.public_url), // полный URL с поддоменом
            path: "/" // профиль находится на корневом пути
        },
        user && {
            Icon: ForumIcon,
            text: "Лента",
            link: "/feed",
            path: "/feed"
        },
        user && {
            Icon: SettingsOutlinedIcon,
            text: "Настройки",
            link: "/edit?step=settings",
            path: "/edit"
        },
    ].filter(Boolean), [user]);

    return (
        <div
            className={`
                flex flex-col w-full gap-2
                transition-all duration-300 ease-in-out
                ${className}
            `}
        >
            {elems?.map((elem, key) => {
                // Сравниваем путь, а не полный URL
                const currentPath = pathname.split('?')[0];
                const isActive = elem.path === currentPath;

                return (
                    <Elem
                        isActive={isActive}
                        Icon={elem.Icon}
                        text={elem.text}
                        href={elem.link}
                        key={key}
                        onClick={(e) => elem?.path == "/feed" && toast.success("скоро...") }
                    />
                )
            })}
        </div>
    )
}