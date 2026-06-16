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
        <div className="flex flex-col gap-4 h-full">
            <div
                className="glass-effect rounded-2xl p-6 sm:p-8 flex flex-col gap-4 w-full h-full">

                <p className="text-text-main font-bold">Общие настройки</p>

                <section className="flex flex-col gap-8">

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

                </section>

            </div>

            <div className="flex flex-col gap-6 glass-effect rounded-2xl p-6 sm:p-8 w-full h-full">
                <p className="text-text-main font-bold">Настройки безопасности</p>

                <LinkSetting
                    feature="Изменить пароль"
                    onClick={openChangePassword}
                />

                <Modal isOpen={isOpenChangePassword} close={closeChangePassword} modalClassName="max-w-none lg:max-w-[650px] max-h-none lg:max-h-[520px]">
                    <VerifyUser
                        additionalSteps={[<NewPassword key="new-password" />]}
                    />
                </Modal>

            </div>

            <div className="flex flex-col gap-6 glass-effect rounded-2xl p-6 sm:p-8 w-full h-full">
                <p className="text-text-main font-bold">Настройки приватности</p>

                <ToggleProfileVisibility />

                <Modal isOpen={isOpenChangePassword} close={closeChangePassword} modalClassName="max-w-none lg:max-w-[650px] max-h-none lg:max-h-[520px]">
                    <VerifyUser
                        additionalSteps={[<NewPassword key="new-password" />]}
                    />
                </Modal>

            </div>

        </div>
    )
}