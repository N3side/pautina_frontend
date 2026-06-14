"use client"

import React, {useContext, useEffect} from "react";
import {useModal} from "@/shared/lib/hooks/useModal";
import {Modal} from "@/shared/ui/Modals/Modal";
import SubscriptionOffer from "@/widgets/user/subscription-offer/SubscriptionOffer";
import {UserContext} from "@/entities/user-entity";

export default function SubscriptionResponseListener() {

    const {isOpen, open, close} = useModal()

    const {user} = useContext(UserContext)

    useEffect(() => {
        const handler = () => {
            open()
        }
        window.addEventListener("subscription-required", handler)
        return () => window.removeEventListener("subscription-required", handler)
    }, [])

    return (
        <Modal isOpen={isOpen} close={close} modalClassName="max-w-[1000px]">
            <SubscriptionOffer user={user} />
        </Modal>
    )
}