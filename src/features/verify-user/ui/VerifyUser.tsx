import React, {ReactNode, useContext, useEffect, useMemo, useState} from "react";
import Stepper from "@/shared/ui/Stepper/Stepper";
import PasswordForm from "@/features/verify-user/ui/components/PasswordForm";
import CheckOtp from "@/features/verify-user/ui/components/CheckOTP";
import {UserContext} from "@/entities/user";
import UseStepper from "@/shared/lib/hooks/useStepper/UseStepper";
import {IsVerifiedUser} from "@/features/verify-user/api/is-verified-user";

interface Props {
    additionalSteps?: ReactNode[]
}

export default function VerifyUser({additionalSteps}: Props) {

    const additionalKeys = additionalSteps
        ? additionalSteps
            .filter((step): step is ReactNode & { key: string } => {
                // Проверка: существует ли шаг и есть ли у него валидный ключ (строка)
                return step != null && typeof (step as any).key === 'string';
            })
            .map(step => (step as any).key)
        : [];

    const dictionary = [
        "check-password",
        "check-otp",
        ...additionalKeys
    ]

    const [responseVerified, setResponseVerified] = useState<boolean>(false)

    useEffect(() => {
        IsVerifiedUser(setResponseVerified)
    }, [])

    const {user, setUser} = useContext(UserContext)
    const [verified, setVerified] = useState<boolean>(responseVerified ? responseVerified : user?.is_verified)

    const [timer, setTimer] = useState(null)
    const {position, setPosition, handlers} = UseStepper({dictionary})

    useEffect(() => {
        if (verified) setPosition(2)
    }, [verified]);

    const steps = [
        !verified && <PasswordForm
            key="check-password"
            timer={timer}
            setTimer={setTimer}
            {...handlers}
            skipNext={() => setPosition(position + 1)}
        />,
        !verified && <CheckOtp
            key="check-otp"
            timer={timer}
            setTimer={setTimer}
            {...handlers}
        />,
        ...(additionalSteps || [])
    ]

    const form = useMemo(() => {

        return (
            <Stepper position={position}>
                {steps[position] || null}
            </Stepper>
        )

    }, [position])

    return form
}