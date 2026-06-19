import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "@/entities/user";
import {HasUserSubscription} from "@/shared/lib/utils/hasUserSubscription";
import {useRouter} from "next/navigation";
import {$fetch} from "@/shared/api/fetch";
import UsePaginate from "@/shared/lib/hooks/usePaginate";
import SubscriptionCard from "@/entities/subscription/SubscriptionCard";

export default function Subscription({heading}) {

    const form_ = useRef(null)

    const {user, isLoading} = useContext(UserContext)

    const router = useRouter()

    if (!HasUserSubscription({user})) {
        router.replace("/edit?step=profile")
    }

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
    }, []);

    return (
        HasUserSubscription({user}) &&
        <form className="flex flex-col gap-5 relative" ref={form_}>
            <div className="w-full flex flex-col">
                <div className='glass-effect py-8 px-6 rounded-[18px]'>
                    <p className="text-text-main text-secondary font-bold">{heading}</p>

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
                        </div>
                    </div>



                </div>
            </div>
        </form>
    )
}