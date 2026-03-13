"use client"

import LogoLight from "@/shared/assets/images/vector/logo/LogoLight";
import {Container} from "@/shared/ui/Container/Container";
import NavigationLink from "@/shared/ui/Navigation/NavigationLink";

function Heading({text}) {
    return <p className="text-text-main text-large font-semibold">{text}</p>
}

export default function FooterWidget() {
    return (
        <div className="glass-effect mt-[200px] py-[60px]">
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
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Heading text="Контакты" />
                        <div className="flex flex-col gap-2">
                            <NavigationLink href="https://t.me/pautina_top" target="_blank">
                                Телеграм
                            </NavigationLink>
                            <NavigationLink href="https://vk.com/pautina_top" target="_blank">
                                ВК
                            </NavigationLink>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Heading text="Больше информации" />
                        <div className="flex flex-col gap-2">
                            <NavigationLink>
                                Политика конфидициальности
                            </NavigationLink>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}