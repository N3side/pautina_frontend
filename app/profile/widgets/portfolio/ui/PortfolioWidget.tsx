import {PautinaText} from "@/shared/styles/typography/text"
import {Heading} from "@/shared/styles/typography/headings"

import Book from "@/shared/vector/Book"
import {Button} from "@mui/material"
import {CardProps, cards, categories, CategoriesProps} from "@/app/profile/widgets/portfolio/model"
import Card from "@/app/profile/widgets/portfolio/ui/Card"
import {COLORS, colorStyles} from "@/shared/styles/colors"
import {WheelXScrollProvider} from "@/shared/components/WheelScrollXWrapper"
import {useContext, useEffect, useState} from "react"
import {WindowContext} from "@/shared/providers/WindowProvider"
import {useModal} from "@/shared/components/Modal"
import {AchievementWidget} from "@/app/profile/widgets/portfolio/ui/AchievementWidget";


export default function PortfolioWidget() {

    const {_window} = useContext(WindowContext)

    const {modal,open} = useModal({children: <AchievementWidget />})

    return (
        <>
            <section className="mt-[clamp(30px,1.250vw_+_26.000px,50px)]">
                <header className={`flex justify-between items-center ${_window?.innerWidth && _window?.innerWidth <= 555 ? "flex-col items-start gap-3" : ""}`}>
                    <div className={`flex flex-col ${_window?.innerWidth && _window?.innerWidth <= 555 ? "" : "gap-[5px]"}`}>
                        <Heading variant="h5" style={{fontWeight: 700}}>
                            Портфолио
                        </Heading>

                        <PautinaText variant="small">
                            Достижения, сертификаты и проекты
                        </PautinaText>
                    </div>

                    <Button className={`flex gap-[10px] items-center h-[fit-content] ${_window?.innerWidth && _window.innerWidth <= 555 ? "w-full" : ""}`} style={{
                        background: colorStyles.text.h6.light,
                        textTransform: "none",
                        padding: "10px 20px",
                        borderRadius: "8px"
                    }}>
                        <Book />
                        <PautinaText variant="small" className="whitespace-nowrap" color={COLORS.white}>
                            Добавить документ
                        </PautinaText>
                    </Button>
                </header>

                <main>
                    <ul className="mt-[clamp(30px,1.250vw_+_26.000px,50px)]">

                        <WheelXScrollProvider>
                            {categories?.map((category: CategoriesProps, i) =>
                                <li key={i} className="flex items-center gap-[8px] py-[10px] px-[20px] rounded-[40px]" style={{
                                    border: `1px solid ${COLORS.gray[2]}`,
                                }}>
                                    <PautinaText variant="small" color={colorStyles.text.p.light} style={{fontWeight: 500}}>
                                        {category?.text}
                                    </PautinaText>
                                    <div className="px-[7px] py-[3px]">
                                        <PautinaText variant="tiny" color={colorStyles.text.p.light} style={{fontWeight: 500}}>
                                            {category?.count}
                                        </PautinaText>
                                    </div>
                                </li>
                            )}
                        </WheelXScrollProvider>


                    </ul>

                    <div className={`mt-[clamp(15px,1.250vw_+_11.000px,35px)] 
                    ${_window?.innerWidth && _window?.innerWidth >= 1024 ? "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]" : "grid-cols-[repeat(auto-fit,minmax(230px,1fr))]"} grid gap-y-[clamp(15px,1.250vw_+_11.000px,35px)] 
                    gap-x-[clamp(15px,1.250vw_+_11.000px,35px)]`}>

                        {cards?.map((card: CardProps, i) =>
                            <Card
                                key={i}
                                image={card?.image}
                                date={card?.date}
                                category={card?.category}
                                type={card?.category}
                                title={card?.title}
                                onClick={open}
                            />
                        )}
                    </div>
                </main>
                {modal}
            </section>
        </>
    )
}