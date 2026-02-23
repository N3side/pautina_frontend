"use client"

import {ReactElement, useEffect, useState} from "react"
import {CheckIsNotUser} from "@/entities/user";
import Email from "@/widgets/otp_login/ui/Email"
import OTP from "@/widgets/otp_login/ui/OTP"
import Card1 from "@/shared/ui/Sections/Card1";
import {Button} from "@mui/material";
import {textSizes} from "@/shared/styles/typography/text";
import {safeLocalStorage} from "@/shared/lib/utils/safeLocalStorage";
import Stepper from "@/shared/ui/Stepper/Stepper";

export default function RegisterWidget() {
    const [email, setEmail] = useState<string | null>(safeLocalStorage.getItem("login_email"))
    const [position, setPosition] = useState<number>(0)

    const [timer, setTimer] = useState(null)

    useEffect(() => {
        setPosition(Number(safeLocalStorage.getItem("login_position")) || 0)
    }, [])

    const handlers = {
        next: (): void => setPosition((p: number) => p + 1),
        prev: (): void => setPosition((p: number) => p > 0 ? p - 1 : p),
    }

    const positions: ReactElement[] = [
        <Email key="email" email={email} setEmail={setEmail} {...handlers} timer={timer} setTimer={setTimer} />,
        <OTP key="otp" email={email} {...handlers} timer={timer} setTimer={setTimer} />,
    ]

    useEffect(() => {
        safeLocalStorage.setItem("login_position", position.toString())
    }, [position])

    return (
        <CheckIsNotUser>
            <Card1>

                <div className="relative overflow-hidden w-full">

                    <Stepper position={position}>
                        {positions[position]}
                    </Stepper>
                </div>

                {position > 0 && (
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
        </CheckIsNotUser>
    )
}