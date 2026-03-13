import Link from "next/link";
import GppBadRoundedIcon from '@mui/icons-material/GppBadRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import {userLink} from "@/shared/lib/utils/userLink";
import ActionButton from "@/shared/ui/Buttons/ActionButton";
import {$fetch} from "@/shared/api/fetch";
import {useModal} from "@/shared/lib/hooks/useModal";
import {Modal} from "@/shared/ui/Modals/Modal";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import Input from "@/shared/ui/Inputs/Input"
import {useRef} from "react";


interface Props {
    user: Record<string, any>
}

export default function UserCard({ user }: Props) {
    const fullName = [user.surname, user.name, user.patronymic]
        .filter(Boolean)
        .join(" ") || user.username;

    async function ban() {
        await $fetch(`admin/users/${user?.id}/ban`, {method: "PATCH"})
    }

    async function unban() {
        await $fetch(`admin/users/${user?.id}/unban`, {method: "PATCH"})
    }

    const {isOpen, open, close} = useModal()

    const form = useRef<HTMLFormElement>(null)

    async function giveSubscription(e) {

        e.preventDefault()

        if (!form?.current) return

        const formData = new FormData(form?.current)

        const response = await $fetch(`admin/users/${user?.id}/give_sub`, {method: "PATCH", body: formData})
    }


    return (
        <div
            className="glass-effect rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">

            {user.is_banned && (
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"/>
            )}

            <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                    <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-glass-border"
                    />
                    {user.premium_subscriptions_count > 0 && (
                        <div
                            className="absolute -bottom-1 -right-1 bg-green-main w-6 h-6 rounded-full border-2 border-surface flex items-center justify-center text-white">
                            <VerifiedRoundedIcon style={{ fontSize: 16 }} />
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0 pt-1">
                    <div className="flex justify-between items-start gap-2">
                        <div className="truncate">
                            <h4 className="text-default font-bold text-text-main truncate" title={fullName}>
                                {fullName}
                            </h4>
                            <p className="text-secondary text-text-muted truncate">
                                @{user.username}
                            </p>
                        </div>

                        {user.has_subscription && (
                            <span
                                className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand/10 text-text-brand text-tiny font-semibold border border-brand/20">
                                <StarRoundedIcon style={{ fontSize: 14 }} />
                                {user.subscription}
                             </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Тело: Контакты, Био, Статус Бана */}
            <div className="flex flex-col gap-2 flex-1">
                {user.email && (
                    <div className="flex items-center gap-2 text-text-muted text-secondary">
                        <MailRoundedIcon style={{ fontSize: 18 }} className="shrink-0" />
                        <span className="truncate">{user.email}</span>
                    </div>
                )}

                {user.bio && (
                    <p className="text-small text-text-main line-clamp-2 mt-1 opacity-90">
                        {user.bio}
                    </p>
                )}

                {/* Причина бана */}
                {user.is_banned && user.ban_reason && (
                    <div
                        className="mt-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-small flex items-start gap-2">
                        <GppBadRoundedIcon style={{ fontSize: 18 }} className="shrink-0 mt-0.5" />
                        <span><strong>Заблокирован:</strong> {user.ban_reason}</span>
                    </div>
                )}
            </div>

            {/* Подвал: Статистика и действия */}
            <div className="mt-auto pt-4 border-t border-glass-border flex items-center justify-between">
                <div className="flex gap-4 items-center">
                    <span className="text-label">Кол-во купленных подписок</span>
                    <span className="text-default font-bold text-text-main">
                        {user.premium_subscriptions_count} <span className="text-small font-normal text-text-muted">шт.</span>
                    </span>
                </div>

                <Link
                    href={userLink(user?.public_url)}
                    target="_blank"
                    className="text-button-sm text-text-brand hover:text-brand-hover transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-brand/5"
                >
                    Профиль <OpenInNewRoundedIcon style={{ fontSize: 16 }} />
                </Link>
            </div>

            <div className="flex gap-3">
                <ActionButton text="Выдать подписку" onClick={open} />
                {user?.is_banned ?
                    <ActionButton text="Разбанить" onClick={unban} />
                    :
                    <ActionButton text="Забанить" onClick={ban} />
                }
            </div>

            <Modal isOpen={isOpen} close={close}>
                <h5 className="text-text-muted font-bold">Выдать подписку пользователю</h5>
                <form className="flex flex-col gap-4 mt-5" ref={form} onSubmit={giveSubscription}>

                    <div className="flex flex-col gap-2 w-full lg:w-64">
                        <label className="text-label">Тип подписки</label>
                        <div className="relative">
                            <StarRoundedIcon
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                                style={{ fontSize: 18 }}
                            />
                            <select
                                name="subscription_name"
                                className="w-full h-11 pl-10 pr-10 rounded-xl bg-input border border-border-default text-text-main text-secondary appearance-none focus:border-brand outline-none cursor-pointer"
                            >
                                <option value="premium">Premium</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <Input name="duration_month" type="number" placeholder="1" label="Кол-во месяцев" defaultValue="1" />

                    <div className="mt-5">
                        <ButtonLarge>
                            <p className="text-text-main">Выдать</p>
                        </ButtonLarge>
                    </div>

                </form>
            </Modal>

        </div>
    );
}