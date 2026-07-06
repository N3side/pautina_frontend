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
import UseFilters from "@/shared/lib/hooks/useFilters";
import Select from "@/shared/ui/Inputs/Select";
import {useTypes} from "@/entities/types/model/useTypes";

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

    const {filters, setFilters, handleChange, handleReset, isReset} = UseFilters({params: {status: ""}})

    const {isOpen: isOpenType, open: openTypes, close: closeTypes} = useModal()

    const {types, setTypes, getTypes, createType, createTypeRef, updateType, updateTypeRef, activeType, setActiveType} = useTypes()

    const {isOpen: isOpenCreateType, open: openCreateType, close: closeCreateType} = useModal()

    return (
        <CheckAdmin>
            <AdminLayout>
                <div className="flex flex-col gap-4">
                    <div className="glass-effect p-6 rounded-xl flex flex-col gap-6">
                        <ShowStacks
                            baseUrl={"stacks"}
                            showSelected={false}
                            showAll={true}
                            showSearch={true}
                            setCurrentSelectedStack={setCurrentSelectedStack}
                        />

                        <ActionButton onClick={open}>
                            <p className="text-text-main font-bold">
                                Добавить стек в систему
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
                            <Input name="type" label="Тип стэка" placeholder="backend" />
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

                            <Select
                                name="type_id"
                                options={types?.map(type => ({
                                    label: type.name,
                                    value: type.id
                                }))}
                                defaultValue={
                                    types?.find(type => type.id === currentSelectedStack?.type_id)?.id
                                }
                                placeholder="Выберите тип стека"
                                label="Тип стэка"
                            />

                            <ActionButton
                                className="!w-full"
                                type="submit"
                            >
                                Изменить
                            </ActionButton>
                        </form>
                    </Modal>

                    <h6 className="text-text-main font-bold">Типы (для стеков)</h6>

                    <ActionButton className="w-fit" onClick={openCreateType}>
                        Добавить
                    </ActionButton>

                    {types && Array.isArray(types) && types.length > 0 &&
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))]">
                            {types?.map(type =>
                                <div key={type?.id} className="px-4 py-2 glass-effect" onClick={() => {
                                    setActiveType(type)
                                    openTypes()
                                }}>
                                    <p className="text-text-main cursor-pointer">
                                        {type?.name}
                                    </p>
                                </div>
                            )}
                        </div>
                    }

                    <Modal isOpen={isOpenCreateType} close={closeCreateType}>
                        <form
                            ref={createTypeRef}
                            className="flex flex-col gap-2"
                        >
                            <h6 className="text-text-main font-bold">Создать тип</h6>
                            <Input name="name" defaultValue={activeType?.name} placeholder="Back-End" />
                            <ActionButton
                                onClick={(e) => createType(e)}
                                type={"submit"}
                            >
                                Создать
                            </ActionButton>
                        </form>
                    </Modal>

                    <Modal isOpen={isOpenType} close={closeTypes}>
                        <form
                            ref={updateTypeRef}
                            className="flex flex-col gap-2"
                        >
                            <h6 className="text-text-main font-bold">Изменить тип</h6>
                            <Input name="name" defaultValue={activeType?.name} />
                            <ActionButton
                                onClick={(e) => updateType(e, activeType?.id)}
                                type={"submit"}
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