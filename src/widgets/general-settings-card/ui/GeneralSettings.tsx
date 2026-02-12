"use client"

import ToggleThemeSetting from "@/features/settings-toggle-theme/ToggleThemeSetting";
import LinkSetting from "@/shared/ui/Sections/LinkSetting";
import useEditProfile from "@/features/edit-profile/ui/EditProfile";
import UseChangePassword from "@/features/change-password/ui/useChangePassword";


export default function GeneralSettings() {

    const {modalEdit, openEdit} = useEditProfile({enabled: true})

    const {modalPassword, openPassword} = UseChangePassword()

    return (
        <div
            className="
            flex-1 glass-effect rounded-2xl p-6 sm:p-8 flex flex-col gap-4 w-full
            max-[1024px]:rounded-[0]
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
                    {/*<EditProfileLink />*/}

                    <LinkSetting
                        feature="Изменить информацию о себе"
                        onClick={openEdit}
                    />

                    {modalEdit}

                </div>

                <div className="flex flex-col gap-6">
                    <h5 className="text-text-main font-bold">Настройки безопасности</h5>

                    <LinkSetting
                        feature="Изменить пароль"
                        onClick={openPassword}
                    />

                    {modalPassword}

                </div>


            </section>

        </div>
    )
}