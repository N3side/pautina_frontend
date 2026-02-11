"use client"

import {Container} from "@/shared/ui/Wrappers/Container";
import Sidebar from "@/widgets/settings-sidebar/ui/Sidebar";
import GeneralSettings from "@/widgets/general-settings-card/ui/GeneralSettings";

export default function SettingsWidget() {

    return (
        <Container className="max-[1024px]:p-0">
            {/* Основной Grid-контейнер */}
            <div className="
                flex flex-col gap-6 w-full mt-8 mb-12 relative items-start
                lg:flex-row max-[1024px]:!h-[100vh] max-[1024px]:mt-0
            ">

                <Sidebar />
                <GeneralSettings />

            </div>
        </Container>
    );
}