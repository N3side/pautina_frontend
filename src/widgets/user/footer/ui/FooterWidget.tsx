"use client"

import LogoLight from "@/shared/assets/images/vector/logo/LogoLight";
import {Container} from "@/shared/ui/Container/Container";
import NavigationLink from "@/shared/ui/Navigation/NavigationLink";
import Link from "next/link";
import VkIcon from "@/shared/assets/images/vector/vk/VkIcon";
import {Telegram} from "@mui/icons-material";
import TelegramIcon from "@mui/icons-material/Telegram";
import {MaxIcon} from "@/shared/assets/images/vector/max/MaxIcon";
import EditIcon from "@mui/icons-material/Edit";
import IconWrapper from "@/shared/ui/Buttons/IconWrapper";
import toast from "react-hot-toast";



function Heading({text}) {
    return <p className="text-text-main text-large font-semibold">{text}</p>
}

export const links = [
    {
        Icon: VkIcon,
        href: "https://vk.com/im/channels/-236408213"
    },
    {
        Icon: TelegramIcon,
        href: "https://t.me/pautinatop"
    },
    {
        Icon: MaxIcon,
        href: "https://max.ru/join/kpMiVZSxKP2p6q3MqxgUhCHKaN9EVrD_Rkw7itrE2K0"
    },
]

export const LogoLink = ({link}) => {
    return (
        <Link href={link?.href} target="_blank">
            <IconWrapper className="group">
                <link.Icon className="text-small cursor-pointer whitespace-nowrap transition-colors duration-200 font-semibold !text-[18px] text-text-muted group-hover:text-text-main"/>
            </IconWrapper>
        </Link>
    )
}

export default function FooterWidget() {
    return (
        <div className="glass-effect mt-[250px] py-[60px]">
            <Container>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[clamp(16px,1.500vw+11.200px,40px)]">
                    <div className="flex flex-col gap-4">
                        <LogoLight />
                        <p className="text-secondary text-text-muted">Единая экосистема для хранения сертификатов, проектов и достижений</p>
                    </div>
                    <div className="flex flex-col gap-4">
                       <Heading text="Навигация" />
                        <div className="flex flex-col gap-2">
                            <NavigationLink>
                                Главная
                            </NavigationLink>
                            <NavigationLink href="https://t.me/pautina_admin">
                                Написать в поддержку
                            </NavigationLink>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Heading text="Подписывайтесь" />
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] gap-2">
                            {links?.map((link, i) =>
                                <LogoLink
                                    key={i}
                                    link={link}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Heading text="Больше информации" />
                        <div className="flex flex-col gap-2">
                            <NavigationLink className="whitespace-pre-wrap" href="https://docs.google.com/document/d/1-mDw1_bSwmQAsuOAiOjGiAxW-fhcxbRyRg4tSFOCBJQ/edit?usp=sharing" target="_blank">
                                Пользовательское соглашение
                            </NavigationLink>
                            <NavigationLink className="whitespace-pre-wrap" href="https://docs.google.com/document/d/1l0Vqo7sirSn4_dqWWlq-Y58pQ2u9p8EtcsInNhQy5m0/edit?usp=sharing" target="_blank">
                                Политика конфидициальности
                            </NavigationLink>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}