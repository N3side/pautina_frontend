"use client"

import HeaderWidget from "@/widgets/header/ui/HeaderWidget";
import ProfileWidget from "@/widgets/profile/ui/profile/ui/ProfileWidget";
import BioWidget from "@/widgets/profile/ui/bio/ui/BioWidget";
import PortfolioWidget from "@/widgets/profile/ui/portfolio/ui/PortfolioWidget";
import {Container} from "@/shared/ui/wrappers/Container";
import {CheckUser} from "@/entities/user/lib/guards/CheckUser";

export default function ProfilePage() {

    return (
        <CheckUser>
            <HeaderWidget />
            <Container className="mt-[clamp(20px,1.250vw_+_16.000px,40px)]">

                <div className={`flex gap-[15px] max-[1000px]:flex-col`}>
                    <ProfileWidget />
                    <BioWidget />
                </div>

                <PortfolioWidget />
            </Container>
        </CheckUser>
    )
}