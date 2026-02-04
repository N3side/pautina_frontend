import { useContext } from "react";
import Link from "next/link";
import { UserContext } from "@/shared/providers/UserProvider";

// UI Components
import { Button } from "@mui/material";
import { Heading } from "@/shared/styles/typography/headings";
import { PautinaText } from "@/shared/styles/typography/text";
import { Elem } from "@/app/profile/widgets/bio/ui/Elem";

// Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';

// Logic
import { Elems, getActivityElems, getContactElems } from "@/app/profile/widgets/bio/model";
import useEditProfile from "@/app/profile/widgets/profile/ui/EditProfile";

export default function BioWidget() {
    const { user } = useContext(UserContext);

    const activityList = getActivityElems(user);
    const contactList = getContactElems(user);

    const {modalEdit, openEdit} = useEditProfile()

    return (
        <section className="w-full h-full glass-effect border-border-default rounded-[24px] p-6 md:p-8  duration-300">

            {/* --- HEADER --- */}
            <header className="flex items-center justify-between mb-8 pb-4 border-b border-border-default/60">
                <div className="flex items-center gap-4">
                    {/* Icon Box */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand/10 text-brand">
                        <AccountCircleIcon />
                    </div>

                    <Heading variant="h6" className="text-text-main font-bold tracking-tight">
                        Основная информация
                    </Heading>
                </div>

                <Button
                    className="
                       !min-w-[40px] !w-10 !h-10 !rounded-xl
                       !bg-transparent hover:!bg-brand/10
                       !text-text-muted hover:!text-brand
                       !transition-all
                    "

                    onClick={openEdit}

                >
                    <EditIcon fontSize="small" />
                </Button>
            </header>

            <main className="flex flex-col gap-8">

                {/* --- BIO BLOCK --- */}
                <div className="relative p-5 rounded-2xl bg-background border border-border-default">

                    <PautinaText variant="tiny" className="uppercase tracking-widest text-text-muted font-bold mb-2">
                        Обо мне (Bio)
                    </PautinaText>

                    <PautinaText variant="secondary" className="text-text-main leading-relaxed">
                        {user?.bio || (
                            <span className="text-text-muted italic">Информация не указана...</span>
                        )}
                    </PautinaText>

                </div>

                {/* --- DETAILS GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Activity Column */}
                    <div className="flex flex-col gap-5">
                        <header className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand"></div>
                            <PautinaText variant="small" className="text-text-muted font-bold uppercase tracking-wider">
                                Деятельность
                            </PautinaText>
                        </header>

                        <ul className="flex flex-col gap-4">
                            {activityList?.map((elem: Elems, i: number) => (
                                // Добавляем обертку для стилизации Elem, если сам компонент простой
                                <div key={i} className="group transition-transform hover:translate-x-1 duration-200">
                                    <Elem Icon={elem?.Icon} k={elem?.k} value={elem?.value} />
                                </div>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="flex flex-col gap-5 lg:pl-8 lg:border-l lg:border-border-default/60">
                        <header className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-main"></div>
                            <PautinaText variant="small" className="text-text-muted font-bold uppercase tracking-wider">
                                Контакты
                            </PautinaText>
                        </header>

                        <ul className="flex flex-col gap-4">
                            {contactList?.map((elem: Elems, i: number) => (
                                <li key={i} className="group transition-transform hover:translate-x-1 duration-200">
                                    <Elem Icon={elem?.Icon} k={elem?.k} value={elem?.value} />
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </main>

            {modalEdit}

        </section>
    )
}