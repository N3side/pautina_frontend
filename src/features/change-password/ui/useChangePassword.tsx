import {useModal} from "@/shared/ui/Modals/Modal";
import React, {useRef} from "react";
import Input from "@/shared/ui/Inputs/Input"
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import AnimationSlider from "@/shared/ui/Wrappers/AnimationSlider";

export default function UseChangePassword() {

    async function handleSubmit() {

    }

    const form_ = useRef(null)

    const form =
    <form className="flex flex-col gap-5" onSubmit={handleSubmit} ref={form_}>

        <AnimationSlider>

            <h5 className="font-bold text-text-main">
                Изменить пароль
            </h5>

            <div className="mt-4 flex flex-col gap-5">
                <Input
                    label="Ваш текущий пароль"
                    name="password"
                />
            </div>

            <div className="mt-3">
                <ButtonLarge>
                    Дальше
                </ButtonLarge>
            </div>


        </AnimationSlider>

    </form>

    const {modal,open,close} = useModal({
        children:
            <>{form}</>
    })

    return {
        modalPassword: modal, openPassword: open, closePassword: close
    }
}