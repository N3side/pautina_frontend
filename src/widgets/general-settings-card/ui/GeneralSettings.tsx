"use client"

import ToggleThemeSetting from "@/features/settings-toggle-theme/ToggleThemeSetting";
import LinkSetting from "@/shared/ui/Sections/LinkSetting";
import EditProfileForm from "@/features/edit-profile/ui/EditProfileForm";
import VerifyUser from "@/features/verify-user/ui/VerifyUser";
import ToggleProfileVisibility from "@/features/settings-toggle-profile-visibility/ToggleProfileVisibility";
import {useModal} from "@/shared/ui/Modals/useModal";
import {Modal} from "@/shared/ui/Modals/Modal";
import NewPassword from "@/features/verify-user/ui/components/NewPassword";

export default function GeneralSettings() {

    const {open: openEdit, close: closeEdit, isOpen: isOpenEdit} = useModal()
    const {open: openChangePassword, close: closeChangePassword, isOpen: isOpenChangePassword} = useModal()

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

                    <LinkSetting
                        feature="Изменить информацию о себе"
                        onClick={openEdit}
                    />

                    <Modal isOpen={isOpenEdit} close={closeEdit}>
                        <EditProfileForm close={closeEdit} />
                    </Modal>


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