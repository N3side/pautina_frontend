"use client"

import useEditProfile from "@/features/edit-profile/ui/EditProfile";
import HeaderWidget from "@/widgets/header/ui/HeaderWidget";
import {Container} from "@/shared/ui/Wrappers/Container";
import BackButton from "@/shared/ui/Buttons/BackButton";

export default function EditProfilePage() {

    const {form} = useEditProfile()

    return (

        <div>
            <HeaderWidget />

            <Container className="mt-8 glass-effect !p-6 rounded-xl">

                <BackButton link="/settings"/>

                <div className="mt-8">
                    {form}
                </div>

            </Container>


        </div>

    )
}