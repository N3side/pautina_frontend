"use client"

import ProfileWidget from "@/widgets/user/profile/ui/profile/ui/ProfileWidget";
import PortfolioWidget from "@/widgets/user/portfolio/ui/PortfolioWidget";
import {Container} from "@/shared/ui/Container/Container";
import {useParams} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "@/entities/user";
import {$fetch} from "@/shared/api/fetch";
import Layout from "@/widgets/user/layout-h-s-f/Layout";
import {PrivateProfileWidget} from "@/widgets/user/profile/ui/profile/ui/PrivateProfileWidget";


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

    const [trueUser, setTrueUser] = useState(user) // 1111

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
        !user && getUser()
    }, [user, isMyProfile]);

    // ХИРУРГИЧЕСКОЕ ИСПРАВЛЕНИЕ: защита от undefined перед проверкой is_uploaded
    const isPrivate = !isMyProfile && trueUser?.publication?.is_uploaded === false;

    return (
        <>
            <Layout>
                <div className="flex flex-col w-full">

                    <ProfileWidget isMyProfile={isMyProfile} isPrivate={isPrivate} trueUser={trueUser} />

                    {!isPrivate &&
						<PortfolioWidget
							isMyProfile={isMyProfile}
							trueUser={trueUser}
						/>
                    }

                    {isPrivate &&
						<div className="mt-4">
							<PrivateProfileWidget />
						</div>
                    }

                </div>
            </Layout>
        </>
    )
}