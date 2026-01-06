"use client"

import { WindowContext } from "@/shared/providers/WindowProvider"
import { COLORS, colorStyles } from "@/shared/styles/colors"
import {Container} from "@/shared/wrappers/Container"
import {useContext, useEffect, useRef, useState} from "react"
import {UserContext, CheckIsNotUser} from "@/shared/providers/UserProvider";
import Name from "@/app/register/ui/Name";
import Email from "@/app/register/ui/Email";
import OTP from "@/app/register/ui/OTP";
import City from "@/app/register/ui/City";
import Source from "@/app/register/ui/Source";
import Activity from "@/app/register/ui/Activity";
import Password from "@/app/register/ui/Password";

export default function RegisterWidget() {

    const {setToken, setUser} = useContext(UserContext)

    const {_window} = useContext(WindowContext)

    const [name, setName] = useState(localStorage.getItem("user_name"))
    const [email, setEmail] = useState(localStorage.getItem("user_email"))
    const [position, setPosition] = useState(Number(localStorage.getItem("register_position")) || 0)
    const [otp, setOtp] = useState(localStorage.getItem("email_otp") || null)

    const handlers = {
        next: () => setPosition(p => p + 1),
        prev: () => setPosition(p => p - 1),
    }

    const positions = [
        <Name name={name} setName={setName} {...handlers}/>,
        <Email name={name} email={email} setEmail={setEmail} {...handlers}/>,
        <OTP name={name} email={email} {...handlers} otp={otp} setOtp={setOtp}/>,
        <City {...handlers}/>,
        <Source />,
        <Activity />,
        <Password />
    ]

    useEffect(() => {
        localStorage.setItem("register_position", +position)
    }, [position]);

    return (
        // <CheckIsNotUser>

            <Container className={`min-h-[calc(100vh_-_80px)]
            ${_window?.innerWidth < 1024 ? "px-[0px]" : "mt-[20px] flex items-center"}`}>
                <section
                    className={`flex items-center flex-col w-full mx-auto my-0
                    px-[clamp(20px,1.250vw_+_16.000px,40px)] bg-white m-[auto 0]
                    ${_window?.innerWidth < 1024 ? "w-full h-[calc(100vh_-_80px)] px-[0px] bg-[red] py-[20px]" : "py-[50px] rounded-[24px] max-w-[580px] max-h-[875px]"}`}

                    style={ _window?.innerWidth >= 1024 ? {
                        border: `1px solid ${COLORS.gray[2]}`,
                        boxShadow: `0px 1px 16px rgba(0,0,0,.08)`,
                    } : {}}>

                    <div className="w-full">
                        {positions[position]}
                    </div>

                </section>
            </Container>
        // </CheckIsNotUser>
    )
}