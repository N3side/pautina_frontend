"use client"

import {Container} from "@/shared/ui/Container/Container";
import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import {UserContext} from "@/entities/user";
import Elem from "@/widgets/user/sidebar/ui/Elem";
import Profile from "@/widgets/user/edit-user-info/ui/parts/Profile";
import Contacts from "@/widgets//user/edit-user-info/ui/parts/Contacts"


export default function EditUserInfo() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const [errors, setErrors] = useState<Record<string, any> | null>(null)
    const {user, setUser} = useContext(UserContext)
    const form_ = useRef<HTMLFormElement>(null)


    const [currentStep, setCurrentStep] = useState<number>(0)

    const parts = [
        {
            name: "Профиль",
            children: <Profile heading="Редактировать профиль" />
        },
        {
            name: "Контакты",
            children: <Contacts heading="Контакты" />

        }
    ]

    const stepper = useMemo(() => {
        return parts && parts[currentStep] || null
    }, [currentStep, parts])

    if (!isClient) {
        return
    }

    return (
        <div className="flex justify-between w-full">
            <div className="flex flex-col-reverse gap-3 w-full lg:flex-row">
                <div className="flex-2">
                    {stepper?.children}
                </div>
                <div className="glass-effect rounded-[18px] p-4 flex-1">
                    <p className="text-text-main font-bold text-secondary">Редактирование</p>

                    <div className="flex flex-col mt-6 gap-0.5 lg:min-h-[50vh] h-full min-h-0 h-full">
                        {parts?.map((part, key) =>
                            <Elem
                                href=""
                                key={key}
                                text={part?.name}
                                onClick={() => setCurrentStep(key)}
                            />
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}