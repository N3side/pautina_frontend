"use client"

import { Container } from "@/shared/ui/wrappers/Container"
import { Heading } from "@/shared/styles/typography/headings"
import { PautinaText } from "@/shared/styles/typography/text"
import { ShadowWrapper } from "@/shared/ui/wrappers/Shadow"
import Image from "next/image"
import Hero from "@/shared/assets/images/raster/hero.jpg"
import { useTheme } from "@/shared/lib/providers/ThemeProvider"
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge"

// Простая CSS анимация для "парения" изображения
const floatKeyframes = `
@keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
}
.animate-float {
    animation: float 6s ease-in-out infinite;
}
`

export default function BannerWidget() {
    const { theme } = useTheme()

    return (
        <section className="relative w-full overflow-hidden py-[clamp(20px,5vw,80px)]">
            {/* Вставка стилей анимации */}
            <style>{floatKeyframes}</style>

            {/* --- Декоративный фон (Ambient Light) --- */}
            {/* Левое пятно (Brand Color) */}
            <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-brand/20 blur-[100px] rounded-full -z-10 pointer-events-none opacity-60 mix-blend-multiply dark:mix-blend-screen" />
            {/* Правое пятно (Purple/Secondary) */}
            <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-purple-500/10 blur-[100px] rounded-full -z-10 pointer-events-none opacity-60" />

            <Container>
                <main className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-16 items-center">

                    {/* --- Левая часть: Текст --- */}
                    <div className="flex flex-col items-start mt-10 lg:mt-0 relative z-10">

                        {/* Бейдж */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-effect transition-colors cursor-default group">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-main"></span>
                            </span>
                            <p
                                className="text-tiny uppercase font-bold tracking-wider text-text-muted group-hover:text-text-main transition-colors"
                            >
                                Официальная платформа
                            </p>
                        </div>

                        {/* Заголовок H1 */}
                        <Heading
                            variant="h1"
                            className="font-black text-text-main leading-[1.1] tracking-tight mt-4"
                        >
                            Создай портфолио,
                            <br className="hidden lg:block"/>
                            которое
                            <span className="relative inline-block">
                                <span
                                    className="bg-clip-text text-transparent bg-gradient-to-r from-brand via-blue-500 to-purple-600 animate-gradient-x"
                                    style={{ backgroundSize: "200% 200%" }}
                                >
                                    вдохновляет
                                </span>
                                {/* Подчеркивание под градиентным текстом */}
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand opacity-40" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.7509 9.36164 124.846 11.2393 199.5 2.50001" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
                            </span>
                        </Heading>

                        {/* Подзаголовок */}
                        <p
                            className="text-large mt-6 text-text-muted max-w-[500px] leading-relaxed"
                        >
                            Единая экосистема для хранения сертификатов, проектов и достижений.
                            Специально для студентов
                            <span className="font-semibold text-text-main border-b border-brand/30 pb-0.5">
                                ГАПОУ «МЦК-КТИТС»
                            </span>.
                        </p>

                        {/* Кнопка */}
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <ShadowWrapper className="w-full sm:w-auto">
                                <ButtonLarge className="!w-full sm:!w-fit !px-10 !py-4 !rounded-2xl transition-transform hover:-translate-y-1">
                                    <span
                                        className="text-button text-white font-bold text-lg"
                                    >
                                        Создать портфолио
                                    </span>
                                </ButtonLarge>
                            </ShadowWrapper>
                        </div>

                        {/* Social Proof / Stats (Опционально, для красоты низа) */}
                        <div className="mt-8 flex items-center gap-4 opacity-70">
                            <p className="text-tiny text-text-muted">
                                🚀 Уже более 1000 студентов с нами
                            </p>
                        </div>
                    </div>

                    {/* --- Правая часть: Изображение --- */}
                    <div className="relative w-full max-w-[600px] mx-auto lg:mr-0 animate-float">
                        {/* Декоративная подложка под картинку (рамка) */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand to-purple-500 rounded-[20px] blur-xl opacity-30 -z-10 transform translate-y-4 scale-95" />

                        <div className="relative rounded-[20px] overflow-hidden border border-white/20 shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
                            <Image
                                src={Hero}
                                alt="Hero Platform Preview"
                                className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105"
                                priority
                            />

                            {/* Стеклянный оверлей поверх картинки (блик) */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                        </div>

                        {/* Плавающие элементы декора (Floating Cards) - для "вау" эффекта */}
                        <div className={`absolute -bottom-6 -left-6 p-4 rounded-xl glass-effect hidden sm:block animate-bounce`} style={{ animationDuration: '3s' }}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-2xl">🏆</div>
                                <div>
                                    <p className="text-small font-bold text-text-main">Топ 10</p>
                                    <p className="text-small text-text-muted">Рейтинг студентов</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
            </Container>
        </section>
    )
}