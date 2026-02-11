"use client"

import HeaderWidget from "@/widgets/header/ui/HeaderWidget";
import ProfileWidget from "@/widgets/profile/ui/profile/ui/ProfileWidget";
import BioWidget from "@/widgets/profile/ui/bio/ui/BioWidget";
import PortfolioWidget from "@/widgets/profile/ui/portfolio/ui/PortfolioWidget";
import {Container} from "@/shared/ui/Wrappers/Container";
import {CheckUser} from "@/entities/user/lib/guards/CheckUser";
import {useParams} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "@/entities/user";
import {$fetch} from "@/shared/api/fetch";

export default function ProfilePage() {

    const {user} = useContext(UserContext)

    const params = useParams()
    const id = params?.id

    const [isMyProfile, setIsMyProfile] = useState<boolean>(false)

    useEffect(() => {
        setIsMyProfile(user?.id === id)
    }, [user]);

    const [trueUser, setTrueUser] = useState(user)

    useEffect(() => {
        setTrueUser(user)
    }, [user]);

    useEffect(() => {

        async function getUser() {
            const response = await $fetch(`user/${user?.id}`)

            const user_ = response?.json?.user

            if (user_) {
                setTrueUser(user_)
            }

        }

        isMyProfile && getUser()

    }, [isMyProfile]);

    return (
        <CheckUser>
            <HeaderWidget />
            <Container className="mt-[clamp(20px,1.250vw_+_16.000px,40px)]">

                <div className={`flex gap-[15px] max-[1000px]:flex-col`}>
                    <ProfileWidget isMyProfile={isMyProfile} trueUser={trueUser} />
                    <BioWidget isMyProfile={isMyProfile} trueUser={trueUser} />
                </div>

                <PortfolioWidget />
            </Container>
        </CheckUser>
    )
}