"use client"

import HeaderWidget from "@/widgets/header/ui/HeaderWidget";
import ProfileWidget from "@/widgets/profile/ui/profile/ui/ProfileWidget";
import BioWidget from "@/widgets/profile/ui/bio/ui/BioWidget";
import PortfolioWidget from "@/widgets/portfolio/ui/PortfolioWidget";
import {Container} from "@/shared/ui/Container/Container";
import {useParams} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "@/entities/user";
import {$fetch} from "@/shared/api/fetch";
import FooterWidget from "@/widgets/footer/ui/FooterWidget";

export default function ProfilePage() {

    const {user} = useContext(UserContext)

    const params = useParams()
    const url_base = params?.id

    const [isMyProfile, setIsMyProfile] = useState<boolean>(false)

    useEffect(() => {
        if (url_base && user?.publication?.public_url) {
            setIsMyProfile(user?.publication?.public_url?.toLowerCase() === url_base || user?.main?.username?.toLowerCase() === url_base)
        }
    }, [user, url_base]);

    const [trueUser, setTrueUser] = useState(user)

    useEffect(() => {
        if (user && user?.main?.id === trueUser?.main?.id) {
            setTrueUser(user)
        }
    }, [user]);

    async function getUser() {
        const response = await $fetch(`user/${url_base}`)
        const user_ = response?.json?.user
        if (user_) {
            setTrueUser(user_)
        }
    }

    useEffect(() => {
        !user || !isMyProfile && getUser()
    }, [user, isMyProfile]);

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
            <FooterWidget />
        </>
    )
}