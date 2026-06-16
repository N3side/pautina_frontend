"use client"

import AdminLayout from "@/widgets/admin/admin-layout/ui/AdminLayout";
import ShowStacks from "@/features/manage-stacks/ui/ShowStacks";
import {useModal} from "@/shared/lib/hooks/useModal";
import {Modal} from "@/shared/ui/Modals/Modal";
import Input from "@/shared/ui/Inputs/Input";
import ActionButton from "@/shared/ui/Buttons/ActionButton";
import {$fetch} from "@/shared/api/fetch";
import {useEffect, useRef, useState} from "react";
import {CheckAdmin} from "@/entities/user/lib/guards/CheckAdmin";
import FileInput from "@/shared/ui/Inputs/FileInput";

export default function Page() {

    const {isOpen, close, open} = useModal()
    const {isOpen: isOpenUpdate, close: closeUpdate, open: openUpdate} = useModal()

    const form = useRef<HTMLFormElement>(null)

    async function createStack(e) {

        e.preventDefault()

        const formData = new FormData(form.current || undefined)

        const response = await $fetch("admin/stacks", {
            method: "POST",
            body: formData
        })
    }

    const [currentSelectedStack, setCurrentSelectedStack] = useState<Record<string, any> | null>(null)

    useEffect(() => {
        if (currentSelectedStack) {
            openUpdate()
        }
    }, [currentSelectedStack]);

    const formUpdate = useRef<HTMLFormElement>(null)

    async function updateStack(e, id) {

        e.preventDefault()

        const formData = new FormData(formUpdate.current || undefined)

        const response = await $fetch(`admin/stacks/${id}`, {
            method: "PATCH",
            body: formData
        })

        closeUpdate()
    }

    return (
        <CheckAdmin>
            <AdminLayout>
                <div className="gap-4 flex flex-col">

                    <div className="glass-effect p-6 rounded-xl flex flex-col gap-6">
                        <ShowStacks
                            showSelected={false}
                            showAll={true}
                            showSearch={true}
                            setCurrentSelectedStack={setCurrentSelectedStack}
                        />

                        <ActionButton onClick={open}>
                            <p className="text-text-main font-bold">
                                Добавить стек в в систему
                            </p>
                        </ActionButton>
                    </div>

                    <Modal
                        isOpen={isOpen}
                        close={close}
                    >

                        <form className="flex flex-col gap-6" ref={form} onSubmit={createStack}>
                            <h6 className="text-text-main font-bold">Добавить новый стек в систему</h6>
                            <Input name="name" label="название стека, которое будет отображаться" />
                            <FileInput
                                onChange={() => {}}
                                mimes="SVG, до 2МБ"
                                name="image"
                            />
                            <ActionButton
                                className="!w-full"
                                type="submit"
                            >
                                Создать
                            </ActionButton>
                        </form>

                    </Modal>

                    <Modal
                        isOpen={isOpenUpdate}
                        close={closeUpdate}
                    >

                        <form className="flex flex-col gap-6" ref={formUpdate} onSubmit={(e) => updateStack(e, currentSelectedStack?.id)}>
                            <h6 className="text-text-main font-bold">Изменить стек</h6>
                            <Input name="name" defaultValue={currentSelectedStack?.name} label="название стека, которое будет отображаться" />
                            <FileInput
                                onChange={() => {}}
                                mimes="SVG, до 2МБ"
                                name="image"
                            />
                            <ActionButton
                                className="!w-full"
                                type="submit"
                            >
                                Изменить
                            </ActionButton>
                        </form>

                    </Modal>

                </div>
            </AdminLayout>
        </CheckAdmin>
    )
}