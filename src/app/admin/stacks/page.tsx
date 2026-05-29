"use client"

import AdminLayout from "@/widgets/admin/admin-layout/ui/AdminLayout";
import GetStacks from "../../../features/get-stacks/ui/GetStacks";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import {useModal} from "@/shared/lib/hooks/useModal";
import {Modal} from "@/shared/ui/Modals/Modal";
import {useThemes} from "@/entities/themes/model/getThemes";
import Input from "@/shared/ui/Inputs/Input";
import ActionButton from "@/shared/ui/Buttons/ActionButton";
import toast from "react-hot-toast";
import {$fetch} from "@/shared/api/fetch";
import {useEffect, useRef, useState} from "react";
import Select from "@/shared/ui/Inputs/Select";
import {CheckAdmin} from "@/entities/user/lib/guards/CheckAdmin";

export default function Page() {

    const {isOpen, open, close} = useModal()

    const {themes} = useThemes()

    const formRef = useRef<HTMLFormElement | null>(null)

    async function createStack(e) {

        e.preventDefault()

        const formData = new FormData(formRef?.current || undefined)

         await $fetch("admin/stacks", {
            method: "POST",
            body: formData
        })
    }

    const formRefWithImage = useRef<HTMLFormElement | null>(null)

    async function addImageForStack(e, stack_id, theme_id) {

        e.preventDefault()

        if (!stack_id && !theme_id) {
            toast.error("Выбери стек и тему")
            return
        }

        const formData = new FormData(formRefWithImage.current || undefined)

        await $fetch(`admin/stacks/${stack_id}/${theme_id}`, {
            method: "POST",
            body: formData
        })
    }

    const [stacks, setStacks] = useState<any>(null)

    async function getStacks() {
        const response = await $fetch("stacks")
        const stacks_ = await response?.json?.stacks
        if (stacks_) {
            const convertedStacks =  stacks_.map(stack => {
                return {
                    label: stack?.name,
                    value: stack?.id
                }
            })
            setStacks(convertedStacks)
        }
    }

    useEffect(() => {
        getStacks()
    }, []);

    const [selectedStackId, setSelectedStackId] = useState<string | number>('')
    const [selectedThemeId, setSelectedThemeId] = useState<string | number>('')

    return (
        <CheckAdmin>
            <AdminLayout>
                <div className="gap-4 flex flex-col">

                    <form className="glass-effect flex flex-col p-4 gap-4 rounded-xl" ref={formRef} onSubmit={createStack}>
                        <h6 className="text-text-main font-bold">Добавить стек в систему</h6>
                        <Input name="name" />
                        <ActionButton type="submit">
                            Добавить
                        </ActionButton>
                    </form>

                    <ActionButton onClick={open}>
                        <p className="font-bold text-text-main">
                            Добавить изображение стеку
                        </p>
                    </ActionButton>

                    <div className="glass-effect p-6 rounded-xl">
                        <GetStacks selectedStacks={[]} setSelectedStacks={() => {}} />
                    </div>

                    <Modal
                        isOpen={isOpen}
                        close={close}
                    >
                        <form className="flex flex-col gap-4" ref={formRefWithImage} onSubmit={(e) => addImageForStack(e, selectedStackId, selectedThemeId)}>
                            <h5 className="font-bold text-text-main">Добавить новый стек в систему</h5>

                            {/*<select*/}
                            {/*    name="selected_stack"*/}
                            {/*    className="w-full h-11 pl-10 pr-10 rounded-xl bg-input border border-border-default text-text-main text-secondary appearance-none focus:border-brand outline-none cursor-pointer"*/}
                            {/*>*/}
                            {/*    {themes && Array.isArray(themes) && themes.map((theme, i) =>*/}
                            {/*        <option*/}
                            {/*            value={theme?.id}*/}
                            {/*            key={i}*/}
                            {/*        >{theme?.name}</option>*/}
                            {/*    )}*/}
                            {/*</select>*/}

                            <Select label="Выберете тему" options={themes && themes.map(theme => {
                                return {
                                    label: theme?.name,
                                    value: theme?.id
                                }
                            })} onChange={setSelectedThemeId} value={selectedThemeId} />

                            <Select label="Выберете стек, к которому хотите загрузить изображение" options={stacks} value={selectedStackId} onChange={setSelectedStackId} />

                            <input type="file" name="image" className="text-text-muted" />

                            <ActionButton type="submit">
                                <p className="text-text-muted font-bold">
                                    Добавить
                                </p>
                            </ActionButton>
                        </form>
                    </Modal>
                </div>
            </AdminLayout>
        </CheckAdmin>
    )
}