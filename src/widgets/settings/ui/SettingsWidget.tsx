"use client"

import { Container } from "@/shared/ui/wrappers/Container";
import { PautinaText } from "@/shared/styles/typography/text";
import { Heading } from "@/shared/styles/typography/headings";
import { NavItem } from "@/shared/ui/Sections/NavItem";

import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Switch } from "@mui/material";
import { useTheme } from "@/shared/lib/providers/ThemeProvider";
import LightModeIcon from '@mui/icons-material/LightMode';

export default function SettingsWidget() {

    const { theme, toggleTheme } = useTheme()

    return (
        <Container>
            {/* Основной Grid-контейнер */}
            <div className="flex flex-col md:flex-row gap-6 w-full mt-8 mb-12 relative items-start">

                {/* --- ЛЕВАЯ КОЛОНКА (Меню) --- */}
                <aside className="w-full md:w-72 shrink-0 md:sticky md:top-4 z-10 block max-[768px]:hidden">
                    {/* bg-white -> bg-surface, border-gray-100 -> border-border-default */}
                    <div className="bg-surface rounded-2xl border border-border-default shadow-sm overflow-hidden">

                        {/* Хедер меню */}
                        <div className="px-5 py-4 border-b border-border-default bg-surface/50">
                            {/* text-gray-500 -> text-text-muted */}
                            <p className="text-secondary font-semibold text-text-muted text-xs uppercase tracking-wider">
                                Настройки
                            </p>
                        </div>

                        <nav className="flex flex-col p-2 gap-1">
                            <NavItem
                                icon={<PersonIcon />}
                                label="Общее"
                            />
                            <NavItem
                                icon={<SecurityIcon />}
                                label="Безопасность"
                            />
                            <NavItem
                                icon={<NotificationsIcon  />}
                                label="Уведомления"
                                badge={2}
                            />
                        </nav>
                    </div>
                </aside>

                {/* --- ПРАВАЯ КОЛОНКА (Контент) --- */}
                <div className="flex-1 bg-surface rounded-2xl border border-border-default shadow-sm p-6 sm:p-8 flex flex-col gap-8 w-full">

                    {/* Заголовок секции */}
                    <div className="border-b border-border-default pb-5">
                        {/* text-gray-900 -> text-text-main */}
                        <Heading variant="h4" className="text-text-main mb-1 font-bold">Общие настройки</Heading>
                        {/* text-gray-500 -> text-text-muted */}
                        <p className="text-secondary text-text-muted">
                            Управляйте основными параметрами вашего аккаунта и интерфейса.
                        </p>
                    </div>

                    <section className="flex flex-col gap-6">

                        <div className="flex items-center gap-3 mb-2">
                            <Heading variant="h6" className="text-text-main font-semibold">Внешний вид</Heading>
                        </div>

                        {/* Карточка переключения темы */}
                        {/* bg-gray-50/50 убрал, оставил чистый bg-surface или прозрачный, чтобы в темной теме не было серых пятен */}
                        <div className="flex items-center justify-between p-4 rounded-xl border border-border-default hover:border-brand transition-colors group">
                            <div className="flex items-center gap-4">
                                {/* Кружок иконки: text-blue-500 -> text-brand */}
                                <div className="w-10 h-10 rounded-full bg-surface border border-border-default flex items-center justify-center text-brand shadow-sm group-hover:scale-110 transition-transform">
                                    {theme === "dark" ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium text-text-main">Темная тема</span>
                                    <p className="text-small text-text-muted text-sm">
                                        Переключить интерфейс в ночной режим
                                    </p>
                                </div>
                            </div>

                            <Switch checked={theme === "dark"} onClick={toggleTheme} />
                        </div>
                    </section>

                </div>

            </div>
        </Container>
    );
}