"use client"

import LogoLight from "@/shared/vector/logo/LogoLight"
import { Container } from "@/shared/wrappers/Container"
import { useContext, useEffect, useRef, useState } from "react"
import { WindowContext } from "@/shared/providers/WindowProvider"
import Navigation from "./Navigation"
import { Burger } from "./Burger"
import {BodyBlockContext} from "@/shared/providers/BodyBlockProvider";
import {UserContext} from "@/shared/providers/UserProvider";

export default function HeaderWidget() {

    const { _window } = useContext(WindowContext)

    const {setIsBlocked} = useContext(BodyBlockContext)
    const [isActive, setIsActive] = useState(false)

    const {user} = useContext(UserContext)

    useEffect(() => {
        setIsBlocked(isActive)
    }, [isActive])

    return (
        <header className="bg-white w-full">
            <Container className="flex items-center w-full justify-between py-5">
                <div className="logo">
                    <LogoLight className="
                        aspect-[130_/_40] w-[clamp(91px,2.438vw_+_83.200px,130px)]
                    "/>
                </div>

                <Navigation isActive={isActive} />

                {_window?.innerWidth && _window?.innerWidth < 900 &&
                    <div className="flex gap-[20px] items-center">
                        {_window?.innerWidth && _window?.innerWidth < 900 && (
                            <>
                                <Burger isActive={isActive} setIsActive={setIsActive} />
                            </>
                        )}

                        {user && typeof window !== 'undefined' && localStorage.getItem("token") && (
                            <div className="h-[40px] w-[40px] aspect-[1/1] rounded-[50%]" style={{
                                zIndex: "1"
                            }}>

                                <img className="w-full h-full rounded-[50%]"
                                    style={{
                                        objectFit: "cover"
                                    }}
                                 src={user?.avatar ? user?.avatar : "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/dff0/live/61c92860-24ce-11ee-941e-23d1e9ab75fa.jpg.webp"}
                                 alt="avatar"
                                />
                            </div>
                        )}
                    </div>
                }



            </Container>
        </header>
    )
}