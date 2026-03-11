import Link from "next/link";
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'; // Добавил иконку для отклоненного статуса
import {$fetch} from "@/shared/api/fetch";
import ActionButton from "@/shared/ui/Buttons/ActionButton";

export default function DocumentCard({ document }) {

    async function approve() {
        const response = await $fetch(`admin/documents/${document?.id}/approve`, {method: "PATCH"})
    }

    async function reject() {
        const response = await $fetch(`admin/documents/${document?.id}/reject`, {method: "PATCH"})
    }

    return (
        <div className="glass-effect rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">

            {/* Индикатор статуса: Желтый для ожидания, Красный для отклоненного */}
            {document.status === "pending" && (
                <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"/>
            )}
            {document.status === "rejected" && (
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"/>
            )}

            {/* Шапка: Иконка, Название, Тип и Статус приватности */}
            <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                    {/* Заглушка для документа */}
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-brand/10 text-brand border border-brand/20 flex items-center justify-center">
                        <DescriptionRoundedIcon style={{ fontSize: 32 }} />
                    </div>
                    {/* Бейдж верификации (только если одобрен) */}
                    {document.status === "approved" && (
                        <div className="absolute -bottom-1 -right-1 bg-green-main w-6 h-6 rounded-full border-2 border-surface flex items-center justify-center text-white" title="Документ подтвержден">
                            <VerifiedRoundedIcon style={{ fontSize: 16 }} />
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0 pt-1">
                    <div className="flex justify-between items-start gap-2">
                        <div className="truncate">
                            <h4 className="text-default font-bold text-text-main truncate" title={document.name}>
                                {document.name}
                            </h4>
                            <p className="text-secondary text-text-muted truncate capitalize">
                                {document.type}
                            </p>
                        </div>

                        {/* Статус приватности */}
                        <span className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-tiny font-semibold border ${
                            document.is_public
                                ? 'bg-green-main/10 text-green-main border-green-main/20'
                                : 'bg-text-muted/10 text-text-muted border-glass-border'
                        }`}>
                            {document.is_public ? (
                                <><PublicRoundedIcon style={{ fontSize: 14 }} /> Публичный</>
                            ) : (
                                <><LockRoundedIcon style={{ fontSize: 14 }} /> Приватный</>
                            )}
                        </span>
                    </div>
                </div>
            </div>

            {/* Тело: Метаданные (Организация, Мероприятие, Дата) и Описание */}
            <div className="flex flex-col gap-2 flex-1 mt-1">
                {document.organization && (
                    <div className="flex items-center gap-2 text-text-muted text-secondary">
                        <BusinessRoundedIcon style={{ fontSize: 18 }} className="shrink-0 text-brand/70" />
                        <span className="truncate">{document.organization}</span>
                    </div>
                )}

                {document.event && (
                    <div className="flex items-center gap-2 text-text-muted text-secondary">
                        <EmojiEventsRoundedIcon style={{ fontSize: 18 }} className="shrink-0 text-brand/70" />
                        <span className="truncate">{document.event}</span>
                    </div>
                )}

                {document.date && (
                    <div className="flex items-center gap-2 text-text-muted text-secondary">
                        <CalendarTodayRoundedIcon style={{ fontSize: 18 }} className="shrink-0 text-brand/70" />
                        <span className="truncate">{document.date}</span>
                    </div>
                )}

                {document.description && (
                    <p className="text-small text-text-main line-clamp-2 mt-2 opacity-90 border-l-2 border-brand/40 pl-3">
                        {document.description}
                    </p>
                )}

                {/* Категории (Теги) */}
                {document.categories && document.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {document.categories.map((category) => (
                            <span
                                key={category.id}
                                className="px-2.5 py-1 rounded-lg bg-surface/50 border border-glass-border text-tiny text-text-main"
                            >
                                {category.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Подвал: Кнопки и статус */}
            <div className="mt-auto pt-4 border-t border-glass-border flex items-center justify-between">
                <div className="flex items-center">
                    {/* Отображение актуального статуса */}
                    {document.status === "pending" && (
                        <span className="text-label text-yellow-500 flex items-center gap-1.5 normal-case font-medium">
                            <PendingActionsRoundedIcon style={{ fontSize: 16 }} /> Ожидает проверки
                        </span>
                    )}
                    {document.status === "approved" && (
                        <span className="text-label text-green-main flex items-center gap-1.5 normal-case font-medium">
                            <VerifiedRoundedIcon style={{ fontSize: 16 }} /> Подтвержден
                        </span>
                    )}
                    {document.status === "rejected" && (
                        <span className="text-label text-red-500 flex items-center gap-1.5 normal-case font-medium">
                            <CancelRoundedIcon style={{ fontSize: 16 }} /> Отклонен
                        </span>
                    )}
                </div>

                <div className='flex gap-3 items-center'>
                    <p className="text-text-muted">id владельца: {document?.user_id}</p>

                    <Link
                        href={document.file_url}
                        target="_blank"
                        className="text-button-sm text-text-brand hover:text-brand-hover transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-brand/10 active:bg-brand/20"
                    >
                        Открыть файл <OpenInNewRoundedIcon style={{ fontSize: 16 }} />
                    </Link>
                </div>

            </div>

            <div className="flex gap-3">
                <ActionButton text="Принять" onClick={approve} />
                <ActionButton text="Отклонить" onClick={reject} />
            </div>

        </div>
    );
}