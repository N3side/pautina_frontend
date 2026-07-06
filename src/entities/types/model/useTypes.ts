import {useEffect, useRef, useState} from "react";
import {$fetch} from "@/shared/api/fetch";

export function useTypes() {

    const [types, setTypes] = useState<Record<string, any>[]>([])
    const [activeType, setActiveType] = useState<Record<string, any> | null>(null)

    const updateTypeRef = useRef<HTMLFormElement>(null)
    const createTypeRef = useRef<HTMLFormElement>(null)


    async function getTypes() {
        const response = await $fetch("types")

        const types_ = response?.json?.types
        if (types_) {
            setTypes(types_)
        }
    }

    useEffect(() => {
        getTypes()
    }, []);



    async function createType(e) {
        e.preventDefault()

        if (!createTypeRef?.current) return

        const formData = new FormData(createTypeRef.current)

        const response = await $fetch(`admin/types`, {
            method: "POST",
            body: formData
        })

        const type = response?.json?.type

        if (type) {
            setTypes(prev => [...prev, type])
        }

        return response
    }

    async function updateType(e, type_id: string) {
        e.preventDefault()

        if (!updateTypeRef?.current) return

        const formData = new FormData(updateTypeRef.current)

        const response = await $fetch(`admin/types/${type_id}`, {
            method: "PATCH",
            body: formData
        })

        const types_ = response?.json?.types

        if (types_) {
            setTypes(types_)
        }

        return response
    }

    return {types, setTypes, getTypes, createType, updateType, createTypeRef, updateTypeRef, activeType, setActiveType}
}