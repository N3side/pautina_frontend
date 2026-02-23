import UseSubmitAction from "@/features/submit-action/logic/useSubmitAction";
import Stepper from "@/shared/ui/Stepper/Stepper";
import {useMemo, useState} from "react";

interface Props {
    usePassword?: boolean
    text?: string
}

export default function SubmitForm({usePassword=false, text="Вы уверены?"}: Props) {

    const {submited, expecting, submit, reject} = UseSubmitAction()
    const [position, setPosition] = useState<number>(0)

    const form = useMemo(() => {

        const steps = [

        ]

        return (
            <Stepper position={position}>
                {steps[position] || null}
            </Stepper>
        )
    }, [position])

    return (
        {form}
    )
}