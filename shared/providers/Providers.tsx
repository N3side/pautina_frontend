"use client"

import {Toaster} from "react-hot-toast";

import { ReactNode } from "react"
import { WindowProvider } from "./WindowProvider"
import {BodyBlockProvider} from "@/shared/providers/BodyBlockProvider";
import UserProvider from "@/shared/providers/UserProvider";
import {ThemeProvider} from "@/shared/providers/ThemeProvider";

interface Props {
    children: ReactNode
}

export default function Providers({ children }: Props) {
    return (
        <WindowProvider>
            <BodyBlockProvider>
                <UserProvider>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </UserProvider>
            </BodyBlockProvider>
            <Toaster />
        </WindowProvider>
    )
}