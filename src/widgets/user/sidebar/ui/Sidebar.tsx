"use client"

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Elem from "@/widgets/user/sidebar/ui/Elem";
import {homeLink, userLink} from "@/shared/lib/utils/userLink";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "@/entities/user";

interface Props {
    className?: string
}

export default function Sidebar({className}: Props) {

    const {user} = useContext(UserContext)
    const [scrolled, setScrolled] = useState(true);


    const elems = [
        !user && {
            Icon: HomeOutlinedIcon,
            text: "Главная",
            link: homeLink
        },
        user && {
            Icon: AccountCircleOutlinedIcon,
            text: "Профиль",
            link: userLink(user?.publication?.public_url)
        },
        user && {
            Icon: SettingsOutlinedIcon,
            text: "Настройки",
            link: "/settings"
        },
    ]

    return (
        <div
            className={`
                flex flex-col w-full gap-1
                transition-all duration-300 ease-in-out
                lg:fixed
            }
                ${className}
            `}
        >
            {elems?.map((elem, key) =>
                    elem && <Elem
                        Icon={elem?.Icon}
                        text={elem?.text}
                        href={elem?.link}
                        key={key}
                    />
            )}
        </div>
    )
}