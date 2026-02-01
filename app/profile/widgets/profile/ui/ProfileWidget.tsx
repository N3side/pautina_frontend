import {useContext, useRef} from "react";
import { WindowContext } from "@/shared/providers/WindowProvider";
import { UserContext } from "@/shared/providers/UserProvider";
import { PautinaText } from "@/shared/styles/typography/text";
import { Heading } from "@/shared/styles/typography/headings";
import { Button } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {$fetch} from "@/shared/api/fetch";
import {useModal} from "@/shared/components/Modals/Modal";
import UploadPhoto from "@/app/profile/widgets/profile/ui/UploadPhoto";

export default function ProfileWidget() {
    const { _window } = useContext(WindowContext);
    const { user } = useContext(UserContext);

    // Логика ширины (перевел на CSS классы, но оставил твою логику как fallback)
    const isMobile = _window?.innerWidth && _window.innerWidth < 1170;

    return (
        <section
            className={`
                relative flex flex-col w-full h-full 
                bg-surface border border-border-default rounded-[24px] shadow-xl overflow-hidden
                transition-all duration-300 hover:shadow-2xl
                ${isMobile ? "max-w-none" : "max-w-[386px]"}
            `}
        >
            {/* --- Header Banner --- */}
            {/* Добавил градиент для "дороговизны" */}
            <header className="h-[140px] w-full bg-gradient-to-r from-brand to-brand-hover relative">
                <div className="absolute inset-0 bg-black/5"></div>
            </header>

            {/* --- Main Content --- */}
            <main className="flex flex-col flex-grow px-6 pb-6">

                {/* --- Avatar Wrapper --- */}
                <div className="relative flex justify-center -mt-[64px] mb-4">
                    <div className="relative w-[128px] h-[128px] rounded-full p-[6px] bg-surface shadow-sm ring-1 ring-border-default/50">

                        <img
                            src={user?.avatar}
                            alt="avatar"
                            className="w-full h-full rounded-full object-cover"
                            referrerPolicy="no-referrer"
                        />

                        <UploadPhoto />

                    </div>
                </div>

                {/* --- User Info --- */}
                <div className="flex flex-col items-center text-center space-y-2">
                    <Heading variant="h5" className="text-text-main font-bold tracking-tight">
                        {user?.name}
                    </Heading>

                    <PautinaText variant="secondary" className="text-text-muted line-clamp-2 px-2">
                        {user?.bio || "Нет описания профиля"}
                    </PautinaText>
                </div>

                {/* --- Action Button --- */}
                <div className="mt-6 w-full">
                    <Button
                        variant="text"
                        className="!w-full !rounded-xl !py-3 !normal-case !bg-brand/10 hover:!bg-brand/20 active:!scale-[0.98] transition-all"
                        disableElevation
                    >
                        <div className="flex items-center gap-2 text-text-brand">
                            <DownloadIcon fontSize="small" />
                            <span className="font-semibold text-[15px]">Скачать портфолио</span>
                        </div>
                    </Button>
                </div>

                {/* --- Footer Stats --- */}
                <div className="mt-auto pt-8">
                    <div className="w-full grid grid-cols-2 divide-x divide-border-default border-t border-border-default py-4">

                        {/* Documents */}
                        <div className="flex flex-col items-center justify-center px-4 hover:bg-text-main/5 transition-colors rounded-lg cursor-default group">
                            <PautinaText variant="large" className="font-bold text-text-main group-hover:text-brand transition-colors">
                                {user?.documents_count || 0}
                            </PautinaText>
                            <span className="text-[11px] uppercase tracking-wider font-semibold text-text-muted mt-1">
                                Документов
                            </span>
                        </div>

                        {/* Projects */}
                        <div className="flex flex-col items-center justify-center px-4 hover:bg-text-main/5 transition-colors rounded-lg cursor-default group">
                            <PautinaText variant="large" className="font-bold text-text-main group-hover:text-brand transition-colors">
                                {user?.projects_count || 0}
                            </PautinaText>
                            <span className="text-[11px] uppercase tracking-wider font-semibold text-text-muted mt-1">
                                Проектов
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    );
}