"use client"

import {useEffect, useState} from "react";
import {$fetch} from "@/shared/api/fetch";
import StatCard from "@/shared/ui/StatCard/StatCard";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import {Container} from "@/shared/ui/Container/Container";

export default function ShowDashBoard() {

    const [info, setInfo] = useState<Record<string, any> | null>(null);

    async function getDashboard() {
        const response = await $fetch("admin/dashboard");
        setInfo(response?.json);
    }

    useEffect(() => {
        getDashboard();
    }, []);

    return (
        <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Пользователи"
                    count={info?.users_count}
                    icon={PeopleAltOutlinedIcon}
                    colorClass="text-sky-500 bg-sky-500"
                />
                <StatCard
                    title="Проекты"
                    count={info?.projects_count}
                    icon={FolderOpenOutlinedIcon}
                    colorClass="text-emerald-500 bg-emerald-500"
                />
                <StatCard
                    title="Документы"
                    count={info?.documents_count}
                    icon={DescriptionOutlinedIcon}
                    colorClass="text-indigo-500 bg-indigo-500"
                />
            </div>
        </Container>
    )
}