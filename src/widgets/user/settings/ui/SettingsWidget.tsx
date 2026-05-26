"use client"

import ToggleThemeSetting from "@/features/settings-toggle-theme/ToggleThemeSetting";
import LinkSetting from "@/shared/ui/Sections/LinkSetting";
import VerifyUser from "@/features/verify-user/ui/VerifyUser";
import ToggleProfileVisibility from "@/features/settings-toggle-profile-visibility/ToggleProfileVisibility";
import {useModal} from "@/shared/lib/hooks/useModal";
import {Modal} from "@/shared/ui/Modals/Modal";
import NewPassword from "@/features/verify-user/ui/components/NewPassword"
import Link from "next/link"
import {useContext} from "react";
import {UserContext} from "@/entities/user";
import {HasUserSubscription} from "@/shared/lib/utils/hasUserSubscription";

export default function SettingsWidget() {

    const {user} = useContext(UserContext)

    const {open: openChangePassword, close: closeChangePassword, isOpen: isOpenChangePassword} = useModal()

    return (
        <div
            className="
            flex-1 glass-effect rounded-2xl p-6 sm:p-8 flex flex-col gap-4 w-full
        ">

            <div className="pb-4">
                <h3 className="text-text-main mb-1 font-bold">Общие настройки</h3>
                <p className="text-secondary text-text-muted">
                    Управляйте основными параметрами вашего аккаунта и интерфейса.
                </p>
            </div>

            <section className="flex flex-col gap-12">

                <div className="flex flex-col gap-6">

                    <ToggleThemeSetting />


                    <Link href="/edit">
                        <LinkSetting
                            feature="Изменить информацию о себе"
                        />
                    </Link>

                    {HasUserSubscription({user}) &&
                    <Link href="/edit?step=subscription">
                        <LinkSetting
                            feature="Управление подпиской"
                        />
                    </Link>}

                </div>

                <div className="flex flex-col gap-6">
                    <h5 className="text-text-main font-bold">Настройки безопасности</h5>

                    <ToggleProfileVisibility />

                    <LinkSetting
                        feature="Изменить пароль"
                        onClick={openChangePassword}
                    />

                    <Modal isOpen={isOpenChangePassword} close={closeChangePassword}>
                        <VerifyUser
                            additionalSteps={[<NewPassword key="new-password" />]}
                        />
                    </Modal>

                </div>

            </section>

        </div>
    )
}