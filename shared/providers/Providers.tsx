"use client"

import {Toaster} from "react-hot-toast";

import { ReactNode } from "react"
import { WindowProvider } from "./WindowProvider"
import {BodyBlockProvider} from "@/shared/providers/BodyBlockProvider";
import UserProvider from "@/shared/providers/UserProvider";

interface Props {
    children: ReactNode
}

export default function Providers({ children }: Props) {
    return (
        <WindowProvider>
            <BodyBlockProvider>
                <UserProvider>
                    {children}
                </UserProvider>
            </BodyBlockProvider>
            <Toaster />
        </WindowProvider>
    )
}