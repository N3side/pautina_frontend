"use client"

import Layout from "@/widgets/user/layout-h-s-f/Layout";
import {$fetch} from "@/shared/api/fetch";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import EventWidget from "@/widgets/user/event-widget/EventWidget";

export default function Page() {

    const id = usePathname().split("/").pop()

    const [event, setEvent] = useState<Record<string, any> | null>(null)

    async function getEvent(event_id) {
        const response = await $fetch(`events/${event_id}`)

        const event_ = response?.json?.event

        if (event_) {
            setEvent(event_)
        }
    }

    useEffect(() => {
        if (id) getEvent(id)
    }, []);

    return (
        <Layout>
            <div className="glass-effect p-6 w-full h-full rounded-2xl">
                <EventWidget event={event} />
            </div>
        </Layout>
    )
}