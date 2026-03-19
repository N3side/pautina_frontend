"use client"

import React, {useEffect} from "react";
import {useModal} from "@/shared/lib/hooks/useModal";
import {Modal} from "@/shared/ui/Modals/Modal";
import SubscriptionOffer from "@/widgets/user/SubscriptionOffer/SubscriptionOffer";

export default function SubscriptionResponseListener() {

    const {isOpen, open, close} = useModal()

    useEffect(() => {
        const handler = () => {
            open()
        }
        window.addEventListener("subscription-required", handler)
        return () => window.removeEventListener("subscription-required", handler)
    }, [])

    return (
        <Modal isOpen={isOpen} close={close} modalClassName="max-w-[700px]">
            <SubscriptionOffer />
        </Modal>
    )
}