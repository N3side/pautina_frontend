"use client"

import {Toaster} from "react-hot-toast";

import { ReactNode } from "react"
import { WindowProvider } from "./WindowProvider"
import {BodyBlockProvider} from "@/shared/lib/providers/BodyBlockProvider";
import {UserProvider} from "@/entities/user";
import {ThemeProvider} from "@/shared/lib/providers/ThemeProvider";

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