"use client"

import "@/app/globals.css";
import {ReactNode} from "react"
import {WindowProvider} from "./WindowProvider"
import {BodyBlockProvider} from "@/shared/lib/providers/BodyBlockProvider";
import {UserProvider} from "../../../entities/user-entity";
import {ThemeProvider} from "@/shared/lib/providers/ThemeProvider";
import {ToastListener} from "@/shared/lib/providers/ToastListener";
// Импортируем ToastBar
import toast, {Toaster, ToastBar} from "react-hot-toast";

interface Props {
    children: ReactNode
}

export default function Providers({children}: Props) {
    return (
        <ThemeProvider>
            <WindowProvider>
                <BodyBlockProvider>
                    <UserProvider>
                        <ToastListener>
                            {children}
                        </ToastListener>

                        <Toaster
                            position="top-right"
                            toastOptions={{
                                duration: 5000,
                                // Эти стили теперь будут применяться корректно к ToastBar
                                className: 'custom-hot-toast',
                                style: {
                                    // Если вы хотите прозрачный фон, оставьте это здесь
                                    // Но обычно стили задают в CSS через .custom-hot-toast
                                    background: 'transparent',
                                    boxShadow: 'none',
                                    border: 'none',
                                },
                            }}
                        >
                            {(t) => (
                                <div
                                    onClick={() => toast.dismiss(t.id)}
                                    style={{
                                        cursor: 'pointer',
                                        opacity: t.visible ? 1 : 0, // Базовая анимация появления
                                        transition: 'opacity 0.2s ease-in-out'
                                    }}
                                >
                                    {/* ToastBar вернет стандартный вид (иконки, стили, текст) */}
                                    <ToastBar toast={t}/>
                                </div>
                            )}
                        </Toaster>
                    </UserProvider>
                </BodyBlockProvider>
            </WindowProvider>
        </ThemeProvider>
    )
}