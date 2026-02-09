import {useContext} from "react";
import {UserContext} from "@/entities/user";
import {PautinaText} from "@/shared/styles/typography/text";
import {Heading} from "@/shared/styles/typography/headings";
import {Button} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import UploadPhoto from "@/widgets/profile/ui/profile/ui/UploadPhoto";

export default function ProfileWidget() {
    const { user } = useContext(UserContext);

    return (
        <section
            className={`
                relative flex flex-col w-full
                glass-effect rounded-[24px] overflow-hidden
                transition-all duration-300
                max-w-none lg:max-w-[386px]
            `}
        >
            {/* --- Main Content --- */}
            <main className="flex flex-col flex-grow p-6 h-full">

                {/* --- Avatar Wrapper --- */}
                <div className="relative flex justify-center  mb-4">
                    <div className="relative w-[160px] h-[160px] rounded-full p-[6px] shadow-sm ring-1 ring-border-default/50">

                        <img
                            src={user?.avatar}
                            alt="avatar"
                            className="!w-full !h-full rounded-full object-cover"
                            referrerPolicy="no-referrer"
                        />

                        <UploadPhoto />

                    </div>
                </div>

                {/* --- User Info --- */}
                <div className="flex flex-col items-center text-center space-y-2">
                    <Heading variant="h5" className="text-text-main font-bold tracking-tight">
                        {user?.username}
                    </Heading>

                    <p className="text-secondary text-text-muted line-clamp-2 px-2">
                        {user?.surname} {user?.name} {user?.patronymic}
                    </p>
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
                <div className="mt-auto ">
                    <div className="w-full grid grid-cols-2 divide-x divide-border-default border-t border-border-default py-4">

                        {/* Documents */}
                        <div className="flex flex-col items-center justify-center px-4 hover:bg-text-main/5 transition-colors  cursor-default group">
                            <p className="text-large font-bold text-text-main group-hover:text-brand transition-colors">
                                {user?.documents_count || 0}
                            </p>
                            <span className="text-[11px] uppercase tracking-wider font-semibold text-text-muted mt-1">
                                Документов
                            </span>
                        </div>

                        {/* Projects */}
                        <div className="flex flex-col items-center justify-center px-4 hover:bg-text-main/5 transition-colors cursor-default group">
                            <p className="text-large font-bold text-text-main group-hover:text-brand transition-colors">
                                {user?.projects_count || 0}
                            </p>
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