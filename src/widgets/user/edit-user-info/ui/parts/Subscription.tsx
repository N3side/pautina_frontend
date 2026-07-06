import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "@/entities/user";
import {HasUserSubscription} from "@/shared/lib/utils/hasUserSubscription";
import {useRouter} from "next/navigation";
import {$fetch} from "@/shared/api/fetch";
import UsePaginate from "@/shared/lib/hooks/usePaginate";
import SubscriptionCard from "@/entities/subscription/SubscriptionCard";
import Pagination from "@/features/pagination/ui/Pagination";
import SmartMedia from "@/shared/ui/smart-media/SmartMedia";
import BigAvatar from "@/shared/ui/user/avatar/BigAvatar";
import Avatar from "@/shared/ui/Avatar/Avatar";
import UserHeader from "@/entities/user/ui/UserHeader";
import toast from "react-hot-toast";

export default function Subscription({heading}) {

    const form_ = useRef(null)

    const {user, isLoading} = useContext(UserContext)

    const router = useRouter()

    const {page, setPage, lastPage, setLastPage} = UsePaginate()
    const [subscriptions, setSubscriptions] = useState<Record<string, any> | null>(null)


    async function getSubscriptions() {
        const response = await $fetch("subscriptions")

        const subscriptions_ = response?.json?.subscriptions
        console.log(subscriptions_)

        if (subscriptions_) {
            setSubscriptions(subscriptions_)
        }

        const per_page = response?.json?.per_page
        const last_page = response?.json?.last_page

        setLastPage(last_page)
    }

    useEffect(() => {
        if (!isLoading && user && HasUserSubscription({user}))
            getSubscriptions()
    }, [page]);

    const [guests, setGuests] = useState<Record<string, any> | null>(null)
    const [guestsCount, setGuestsCount] = useState<number>(0)

    async function my_guests() {
        const response = await $fetch("subscriptions/my_guests")

        const guests_ = response?.json?.guests
        const guests_count_ = response?.json?.guests_count

        if (guests_) {
            setGuests(guests_)
        }
        if (guests_count_) {
            setGuestsCount(guests_count_)
        }
    }

    useEffect(() => {
        if (user)
            my_guests()
    }, []);

    return (
        <form className="flex flex-col gap-5 relative" ref={form_}>
            <div className="w-full flex flex-col gap-4">
                <div className='glass-effect py-8 px-6 rounded-[18px]'>
                    <p className="text-text-main text-secondary font-bold">{heading}</p>

                    {subscriptions && Array.isArray(subscriptions) && subscriptions.length > 0 &&
                        <div className="flex flex-col gap-4 mt-8">
                            <h6 className="text-text-main text-small font-bold">История подписок:</h6>

                            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px, 1fr)] gap-4">
                                {subscriptions?.map((sub, i) =>
                                    sub?.subscription?.id > 1 &&
                                    <SubscriptionCard
                                        key={i}
                                        tariff={sub.subscription}
                                        startAt={sub.start_at}
                                        endAt={sub.end_at}
                                        canceled={sub.canceled}
                                        autopay={sub.autopay}
                                    />

                                )}

                                <Pagination currentPage={page} totalPages={lastPage} setCurrentPage={setPage} />
                            </div>
                        </div>
                    }

                </div>

                {guests && Array.isArray(guests) && guests.length > 0 &&
                    <div className="glass-effect p-6 rounded-2xl flex flex-col gap-4">
                        <p className="text-text-main text-secondary font-bold">Кто заходил на мой профиль</p>
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                            {guests.map((guest, i) =>
                                <div
                                    onClick={(e) => {
                                        if (user?.access?.subscription?.id < 2) {
                                            e.stopPropagation()
                                            e.preventDefault()
                                            toast.success("Оформите подписку, чтобы смотреть полную информацию о ваших гостях")
                                        }
                                    }}
                                    key={i}
                                >
                                    <UserHeader
                                        user={guest}
                                        portal={
                                            <p className="text-text-muted text-small font-bold">
                                                {guest?.role || "unauthorized"}
                                            </p>
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                }
            </div>
        </form>
    )
}