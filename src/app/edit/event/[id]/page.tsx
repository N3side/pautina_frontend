"use client"

import {CheckCompany} from "@/entities/user/lib/guards/CheckCompany";
import Layout from "@/widgets/user/layout-h-s-f/Layout";
import React from "react";
import UpdateMainEventFeature from "@/features/update-main-event/UpdateMainEventFeature";
import {useStepNavigation} from "@/shared/lib/hooks/useStepNavigation";
import PartsSwitcher from "@/entities/parts-switcher/PartsSwitcher";
import ManageTasks from "@/features/manage-tasks/ManageTasks";

export default function Page() {

    const PARTS = [
        {
            name: "Главная информация",
            param: "main",
            children: <UpdateMainEventFeature />,
        },
        {
            name: "Таски",
            param: "tasks",
            children: <ManageTasks />,
        },
    ];

    const { activeStep, handleStepChange, currentStepParam } = useStepNavigation(PARTS);

    return (
        <CheckCompany>
            <Layout>
                <div className="flex gap-4 w-full flex-col-reverse lg:flex-row lg:justify-between">

                    {activeStep?.children}

                    <PartsSwitcher PARTS={PARTS} currentStepParam={currentStepParam} handleStepChange={handleStepChange} />

                </div>
            </Layout>
        </CheckCompany>
    );
}