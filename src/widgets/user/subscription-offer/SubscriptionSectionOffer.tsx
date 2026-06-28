"use client"

import {useModal} from "@/shared/lib/hooks/useModal";
import {Modal} from "@/shared/ui/Modals/Modal";
import SubscriptionOffer from "@/widgets/user/subscription-offer/SubscriptionOffer";
import {useContext} from "react";
import {UserContext} from "@/entities/user";
import BrandActionButton from "@/shared/ui/Buttons/BrandActionButton";

export default function SubscriptionSectionOffer() {

    const {isOpen, open, close} = useModal()
    const {user} = useContext(UserContext)

    return (
        <div className="glass-effect px-5 py-5 rounded-[20px] flex flex-col gap-2">
            <h6 className="text-text-main font-bold">Подпишитесь на Premium</h6>
            <p className="text-text-muted">Уберите рекламу, смотрите, кто смотрел ваш профиль, и более 7 функций.</p>
            <BrandActionButton className="!py-[10px] !mt-[10px]" onClick={open}>
                Подписаться
            </BrandActionButton>

            <Modal isOpen={isOpen} close={close}>
                <SubscriptionOffer user={user} />
            </Modal>
        </div>
    )
}