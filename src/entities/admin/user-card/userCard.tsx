import Link from "next/link";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import {userLink} from "@/shared/lib/utils/userLink";
import ActionButton from "@/shared/ui/Buttons/ActionButton";
import {$fetch} from "@/shared/api/fetch";
import {useModal} from "@/shared/lib/hooks/useModal";
import {Modal} from "@/shared/ui/Modals/Modal";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import Input from "@/shared/ui/Inputs/Input"
import {useRef} from "react";

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dracula} from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Props {
    user: Record<string, any>
}

export default function UserCard({ user }: Props) {


    async function ban() {
        await $fetch(`admin/users/${user?.main?.id}/ban`, {method: "PATCH"})
    }

    async function unban() {
        await $fetch(`admin/users/${user?.main?.id}/unban`, {method: "PATCH"})
    }

    const {isOpen, open, close} = useModal()

    const form = useRef<HTMLFormElement>(null)

    async function giveSubscription(e) {

        e.preventDefault()

        if (!form?.current) return

        const formData = new FormData(form?.current)

        await $fetch(`admin/users/${user?.main?.id}/give_sub`, {method: "PATCH", body: formData})
    }


    return (
        <div
            className="glass-effect rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">

            <div className="relative shrink-0">
                <img
                    src={user?.main?.avatar}
                    alt={user.username}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-glass-border"
                />
            </div>

            <SyntaxHighlighter
                language="json"
                style={dracula}
                customStyle={{
                    width: "100%",
                    background: "transparent"
                }}
                wrapLines={true}
                lineProps={{
                    style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' }
                }}
            >
                {JSON.stringify(user, null, 2)}
            </SyntaxHighlighter>

            <div className="flex gap-3">
                <Link href={userLink(user?.main?.short_id)}
                      target="_blank">
                    <ActionButton>
                        Профиль
                    </ActionButton>
                </Link>
                <ActionButton text="Выдать подписку" onClick={open} />
                {user?.main?.is_banned ?
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