"use client"

import AdminLayout from "@/widgets/admin/admin-layout/ui/AdminLayout";
import GetStacks from "../../../features/get-stacks/GetStacks";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import {useModal} from "@/shared/lib/hooks/useModal";
import {Modal} from "@/shared/ui/Modals/Modal";
import {useThemes} from "@/entities/themes/model/getThemes";
import Input from "@/shared/ui/Inputs/Input";
import ActionButton from "@/shared/ui/Buttons/ActionButton";
import toast from "react-hot-toast";

export default function Page() {

    const {isOpen, open, close} = useModal()

    const {themes} = useThemes()

    return (
        <AdminLayout>
            <div className="gap-4 flex flex-col">

                <form className="glass-effect flex flex-col p-4 gap-4 rounded-xl">
                    <h6 className="text-text-main font-bold">Добавить стек в систему</h6>
                    <Input name="name" />
                    <ActionButton onClick={() => toast.success("Потом добавлю этот функционал")}>
                        Добавить
                    </ActionButton>
                </form>

                <div className="glass-effect p-6 rounded-xl">
                    <GetStacks selectedStacks={[]} setSelectedStacks={() => {}} />
                </div>

                <Modal
                    isOpen={isOpen}
                    close={close}
                >
                    <form className="flex flex-col gap-4">
                        <h5 className="font-bold text-text-main">Добавить новый стек в систему</h5>

                        <p>Выберете тему </p>
                        <select
                            value={'pypypy'}
                            name="theme_name"
                            className="w-full h-11 pl-10 pr-10 rounded-xl bg-input border border-border-default text-text-main text-secondary appearance-none focus:border-brand outline-none cursor-pointer"
                        >
                            {themes && Array.isArray(themes) && themes.map((theme, i) =>
                                <option
                                    value={theme?.id}
                                    key={i}
                                >{theme?.name}</option>
                            )}
                        </select>
                    </form>
                </Modal>
            </div>
        </AdminLayout>
    )
}