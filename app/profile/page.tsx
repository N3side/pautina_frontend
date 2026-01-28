"use client"

import HeaderWidget from "@/app/widgets/header/ui/HeaderWidget";
import ProfileWidget from "./widgets/profile/ui/ProfileWidget";
import BioWidget from "./widgets/bio/ui/BioWidget";
import PortfolioWidget from "./widgets/portfolio/ui/PortfolioWidget";
import {Container} from "@/shared/wrappers/Container";
import {useContext} from "react";
import {WindowContext} from "@/shared/providers/WindowProvider";
import {CheckUser} from "@/shared/providers/UserProvider";

export default function page() {

    // const {_window} = useContext(WindowContext)

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