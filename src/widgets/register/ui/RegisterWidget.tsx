"use client"

import {useEffect, useState} from "react"
import Name from "@/widgets/register/ui/Name"
import Email from "@/widgets/register/ui/Email"
import OTP from "@/widgets/register/ui/OTP"
import City from "@/widgets/register/ui/City"
import Source from "@/widgets/register/ui/Source"
import Activity from "@/widgets/register/ui/Activity"
import Password from "@/widgets/register/ui/Password"
import Card1 from "@/shared/ui/Sections/Card1";
import {Button} from "@mui/material";
import {textSizes} from "@/shared/styles/typography/text";
import {safeLocalStorage} from "@/shared/lib/utils/safeLocalStorage";
import Stepper from "@/shared/ui/Stepper/Stepper";
import SkipButton from "@/shared/ui/Buttons/SkipButton";
import ProgressBar from "@/shared/ui/ProgressBar/ProgressBar";
import UseStepper from "@/shared/lib/hooks/UseStepper";

export default function RegisterWidget() {
    const [name, setName] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [otp, setOtp] = useState<string | null>(null)
    const [timer, setTimer] = useState(null)

    useEffect(() => {
        setName(safeLocalStorage.getItem("user_name"))
        setEmail(safeLocalStorage.getItem("user_email"))
        setPosition(Number(safeLocalStorage.getItem("register_position")) || 0)
        setOtp(safeLocalStorage.getItem("email_otp"))
    }, [])

    const dictionary = ["name", "email", "otp", "city", "source", "activity", "password"]
    const {handlers, position, setPosition, progress} = UseStepper({dictionary})

    const steps = [
        { component: <Name key="name" name={name} setName={setName} {...handlers} />, required: true },
        { component: <Email key="email" name={name} email={email} setEmail={setEmail} {...handlers} setTimer={setTimer} position={position} />, required: true },
        { component: <OTP key="otp" name={name} email={email} {...handlers} otp={otp} setOtp={setOtp} position={position} timer={timer} setTimer={setTimer} />, required: true },
        { component: <City key="city" {...handlers} />, required: false, can_come_back: false },
        { component: <Source key="source" {...handlers} />, required: true },
        { component: <Activity key="activity" {...handlers} />, required: false },
        { component: <Password key="password" />, required: true },
    ];

    useEffect(() => {
        safeLocalStorage.setItem("register_position", position.toString())
    }, [position])

    const currentStep = steps[position]
    const isRequired = currentStep?.required

    return (

        <div>
            <Card1>
                {/* Прогресс-бар тоже можно сделать через motion для плавности */}
                <ProgressBar progress={progress} />

                <div className="relative w-full">

                    <Stepper position={position}>
                        {currentStep?.component}
                    </Stepper>

                </div>

                {currentStep?.can_come_back && position > 0 && (
                    <Button
                        style={{
                            fontSize: textSizes.tiny,
                        }}
                        onClick={handlers.prev}
                        className="!text-text-muted !rounded-xl !w-full"
                    >
                        Назад
                    </Button>
                )}

            </Card1>

            {!isRequired && (
                <SkipButton handlers={handlers} />
            )}
        </div>

    )
}