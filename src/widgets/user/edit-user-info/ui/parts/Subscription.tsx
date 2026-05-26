import {useContext, useRef} from "react";
import {UserContext} from "@/entities/user";
import {HasUserSubscription} from "@/shared/lib/utils/hasUserSubscription";
import {useRouter} from "next/navigation";

export default function Subscription({heading}) {

    const form_ = useRef(null)

    const {user} = useContext(UserContext)

    const router = useRouter()

    if (!HasUserSubscription({user})) {
        router.replace("/edit?step=profile")
    }

    return (
        HasUserSubscription({user}) &&
        <form className="flex flex-col gap-5 relative" ref={form_}>
            <div className="w-full flex flex-col">
                <div className='glass-effect py-8 px-6 rounded-[18px]'>
                    <p className="text-text-main text-secondary font-bold">{heading}</p>



                </div>
            </div>
        </form>
    )
}