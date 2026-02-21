"use client"

import HeaderWidget from "@/widgets/header/ui/HeaderWidget";
import ProfileWidget from "@/widgets/profile/ui/profile/ui/ProfileWidget";
import BioWidget from "@/widgets/profile/ui/bio/ui/BioWidget";
import PortfolioWidget from "@/widgets/portfolio/ui/PortfolioWidget";
import {Container} from "@/shared/ui/Wrappers/Container";
import {useParams} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "@/entities/user";
import {$fetch} from "@/shared/api/fetch";

export default function ProfilePage() {

    const {user} = useContext(UserContext)

    const params = useParams()
    const public_url = params?.id

    const [isMyProfile, setIsMyProfile] = useState<boolean>(false)

    useEffect(() => {

        if (public_url && user?.public_url) {
            setIsMyProfile(user?.public_url?.toLowerCase() === public_url)
        }

    }, [user]);

    const [trueUser, setTrueUser] = useState(user)

    useEffect(() => {

        if (user?.id === trueUser?.id) {
            setTrueUser(user)
        }

    }, [user]);

    useEffect(() => {

        async function getUser() {
            const response = await $fetch(`user/${public_url}`)

            const user_ = response?.json?.user

            if (user_) {
                setTrueUser(user_)
            }

        }

        !isMyProfile && getUser()

    }, [isMyProfile]);

    return (
        <>
            <HeaderWidget />
            <Container className="mt-[clamp(20px,1.250vw_+_16.000px,40px)]">

                <div className={`flex gap-[15px] max-[1000px]:flex-col`}>
                    <ProfileWidget isMyProfile={isMyProfile} trueUser={trueUser} />
                    <BioWidget isMyProfile={isMyProfile} trueUser={trueUser} />
                </div>

                <PortfolioWidget
                    isMyProfile={isMyProfile}
                    trueUser={trueUser}
                />
            </Container>
        </>
    )
}