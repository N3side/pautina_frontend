"use client"

import {CheckCompany} from "@/entities/user/lib/guards/CheckCompany";
import Layout from "@/widgets/user/layout-h-s-f/Layout";
import BrandActionButton from "@/shared/ui/Buttons/BrandActionButton";
import {$fetch} from "@/shared/api/fetch";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import EventWidget from "@/widgets/user/event-widget/EventWidget";
import ActionButton from "@/shared/ui/Buttons/ActionButton";
import AddIcon from "@mui/icons-material/Add";

export default function Page() {

    const router = useRouter()

    const id = usePathname().split("/").pop()

    async function createEvent(e) {

        e.preventDefault()

        const response = await $fetch("events", {
            method: "POST"
        })

        const event_id =  response?.json?.event_id

        if (event_id) {
            router.replace(`/edit/event/${event_id}`)
        }
    }

    const [events, setEvents] = useState<Record<string, any>[] | null>(null)

    async function getEvent(user_id) {
        const response = await $fetch(`events/user/${user_id}`)

        const events_ = response?.json?.events

        if (events_) {
            setEvents(events_)
        }
    }

    useEffect(() => {
        if (id) getEvent(id)
    }, []);

    return (
        <CheckCompany>
            <Layout>
                <div className="flex flex-col gap-6 w-full h-full">
                    <div className="flex flex-col gap-3 h-full">
                        <div className="flex justify-between items-start">
                            <h6 className="text-text-main font-semibold text-default">Мои мероприятия</h6>
                            <ActionButton text="Создать событие" Icon={AddIcon} onClick={createEvent} />
                        </div>
                        <div className="glass-effect w-full h-fit rounded-2xl p-6 mt-4">
                            {events && Array.isArray(events) && events?.length > 0 ?
                                <div className="w-full min-h-[285px] h-full flex flex-col gap-4">
                                    {
                                        events?.map(event =>
                                            <EventWidget
                                                key={event?.id}
                                                event={event}
                                                redirectOnClick={true}
                                                showComments={false}
                                                setEvents={setEvents}
                                                show_description={false}
                                            />
                                        )
                                    }
                                </div>
                                :
                                <div className="flex items-center justify-center mt-[30px] w-full h-full">
                                    <div className="flex flex-col gap-3">
                                        <p className="text-text-muted font-medium text-default">У вас нет мероприятий. Исправим?</p>
                                        <BrandActionButton onClick={createEvent} className="w-full">
                                            Создать событие
                                        </BrandActionButton>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </Layout>
        </CheckCompany>
    )
}