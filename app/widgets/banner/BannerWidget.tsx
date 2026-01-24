"use client"

import { Container } from "@/shared/wrappers/Container"
import { Heading } from "@/shared/cat/typography/headings"
import { colorStyles, COLORS } from "@/shared/cat/colors"
import { PautinaText } from "@/shared/cat/typography/text"
import { Button } from "@mui/material"
import { ShadowWrapper } from "@/shared/wrappers/Shadow"
import Image from "next/image"

import Hero from "@/shared/raster/hero.jpg"
import { useContext } from "react"
import { WindowContext } from "@/shared/providers/WindowProvider"

export default function BannerWidget() {

    const { _window } = useContext(WindowContext)

    return (
        <>
            <Container>
                <div className="flex gap-2 items-center px-5 py-2.5 rounded-[9999]"
                    style={{
                        background: COLORS.white, width: "fit-content",
                        marginTop: "clamp(20px, 5.000vw + 4.000px, 100px)"
                    }}
                >
                    <div className="w-2 aspect-[1/1] rounded-[50%]" style={{ background: COLORS.green[9] }}></div>
                    <PautinaText variant="tiny" style={{ textTransform: "uppercase", fontWeight: "700", width: "fit-content" }}>
                        Официальная платформа
                    </PautinaText>
                </div>
                <main
                    className="flex items-center items-start mt-5 justify-between"
                    style={_window?.innerWidth && _window?.innerWidth < 900 ? {
                        flexDirection: "column-reverse"
                    } : {}}
                >
                    <div className="_1" style={_window?.innerWidth && _window?.innerWidth < 900 ? { marginTop: "30px" } : {}}>
                        <Heading variant="h1" color={colorStyles.text.primary.light} style={{
                            fontWeight: 900,
                            width: "100%"
                        }}>
                            Создай портфолио, {_window?.innerWidth && _window?.innerWidth >= 900 && <br />}
                            которое {_window?.innerWidth >= 900 && <br />}
                            <span className="
                                bg-clip-text
                                text-transparent
                                bg-[linear-gradient(90deg,var(--from),var(--to))]
                            "
                                style={{
                                    "--from": COLORS.brand[9],
                                    "--to": COLORS.purple[9],
                                } as React.CSSProperties}>вдохновляет</span>
                        </Heading>

                        <PautinaText variant="large" className="mt-[30px]" style={_window?.innerWidth && _window?.innerWidth >= 900 ?
                            { maxWidth: "440px", lineHeight: "1.4" } :
                            { width: "100%" }
                        }>
                            Единая система хранения сертификатов, проектов и достижений для студентов <PautinaText variant="large" component="span" style={{ color: colorStyles.text.primary.light, fontWeight: 600, lineHeight: "1.4" }}>ГАПОУ «МЦК-КТИТС».</PautinaText>
                        </PautinaText>

                        <ShadowWrapper className="mt-10">
                            <Button style={{ background: colorStyles.buttons.brand.light, padding: "16px 25px", borderRadius: "16px", textTransform: "none" }}>
                                <PautinaText variant="button" style={{ color: COLORS.white }}>
                                    Создать портфолио
                                </PautinaText>
                            </Button>
                        </ShadowWrapper>
                    </div>

                    <Image
                        src={Hero}
                        alt="Hero"
                        style={{
                            borderRadius: "6px"
                        }}
                    />
                </main>
            </Container>
        </>
    )
}