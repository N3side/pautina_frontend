"use client"

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Elem from "@/widgets/user/sidebar/ui/Elem";
import {homeLink, userLink} from "@/shared/lib/utils/userLink";
import {useContext} from "react";
import {UserContext} from "@/entities/user";

interface Props {
    className?: string
}

export default function Sidebar({className}: Props) {

    const {user} = useContext(UserContext)

    const elems = [
        {
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
        <div className={`flex flex-col max-w-full w-full gap-1 lg:max-w-[180px] ${className}`}>
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