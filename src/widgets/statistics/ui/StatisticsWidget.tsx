"use client"

import { WindowContext } from "@/shared/lib/providers/WindowProvider"
import { COLORS, colorStyles } from "@/shared/styles/colors"
import { Heading } from "@/shared/styles/typography/headings"
import { PautinaText } from "@/shared/styles/typography/text"
import { Container } from "@/shared/ui/wrappers/Container"
import { useContext } from "react"

export default function StatisticsWidget() {

    const { _window } = useContext(WindowContext)

    const model = [
        {
            h: "100%",
            p: "Бесплатно"
        },
        {
            h: "5k+",
            p: "работ"
        },
        {
            h: "1.7k+",
            p: "Студентов"
        },
        {
            h: "24/7",
            p: "Доступ к данным"
        },
    ]

    return (
        <section
            className={`mt-[150px] py-[clamp(30px,1.875vw_+_24.000px,60px)]`}
            style={{ background: COLORS.gray[16] }}>
            <Container
                className={
                    `grid gap-y-[20px] 
                    ${_window?.innerWidth && _window?.innerWidth <= 1250
                        ? "grid-cols-2"
                        : "grid-cols-4"
                    }`}
            >
                {model.map((obj, i) =>
                    <div key={i} className="flex flex-col gap-[5px] items-center">
                        <Heading variant="h1" color={COLORS.white} style={{ fontWeight: 900 }}>
                            {obj?.h}
                        </Heading>
                        <PautinaText color={`${colorStyles.text.p_tiny.light}`} variant="tiny"
                            className="uppercase whitespace-nowrap"
                            style={{
                                fontWeight: 700,
                                letterSpacing: "1.2",
                            }}>
                            {obj?.p}
                        </PautinaText>
                    </div>
                )}
            </Container>
        </section>
    )
}