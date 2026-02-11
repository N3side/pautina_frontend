import {Button} from "@mui/material";
import {Elem} from "@/widgets/profile/ui/bio/ui/Elem";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';

import {Elems, getActivityElems, getContactElems} from "@/widgets/profile/ui/bio/model";
import useEditProfile from "@/features/edit-profile/ui/EditProfile";

export default function BioWidget({isMyProfile, trueUser}: {isMyProfile: boolean, trueUser: Record<string, any>}) {

    const activityList = getActivityElems(trueUser);
    const contactList = getContactElems(trueUser);

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

                    <h6 className="text-text-main font-bold tracking-tight">
                        Основная информация
                    </h6>
                </div>

                {isMyProfile && (
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
                )}

            </header>

            <main className="flex flex-col gap-8">

                {/* --- BIO BLOCK --- */}
                <div className="relative p-5 rounded-2xl bg-background border border-border-default">

                    <p className="text-tiny uppercase tracking-widest text-text-muted font-bold mb-2">
                        Обо мне (Bio)
                    </p>

                    <p className="text-secondary text-text-main leading-relaxed">
                        {trueUser?.bio || (
                            <span className="text-text-muted italic">Информация не указана...</span>
                        )}
                    </p>

                </div>

                {/* --- DETAILS GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Activity Column */}
                    <div className="flex flex-col gap-5">
                        <header className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand"></div>
                            <p className="text-small text-text-muted font-bold uppercase tracking-wider">
                                Деятельность
                            </p>
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
                            <p className="text-small text-text-muted font-bold uppercase tracking-wider">
                                Контакты
                            </p>
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