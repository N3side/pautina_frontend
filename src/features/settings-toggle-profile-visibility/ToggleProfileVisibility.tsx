import {IOSSwitch} from "@/shared/ui/Inputs/IOSSwitch";
import Setting from "@/shared/ui/Sections/Setting";
import {$fetch} from "@/shared/api/fetch";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "@/entities/user";

export default function ToggleProfileVisibility() {
    const { user, setUser } = useContext(UserContext);

    // Используем состояние напрямую из user, чтобы не плодить лишние стейты,
    // либо синхронизируем их строго.
    const [isNotVisible, setIsNotVisible] = useState<boolean>(!user?.is_uploaded);

    // Синхронизируем стейт с данными пользователя (если они прилетели позже)
    useEffect(() => {
        setIsNotVisible(!!!user?.is_uploaded);
    }, [user?.is_uploaded]);

    async function toggleVisibility() {
        // Вычисляем новое состояние ПЕРЕД отправкой
        const newValue = !isNotVisible;

        // Оптимистичное обновление (опционально, для скорости интерфейса)
        setIsNotVisible(newValue);

        const formData = new FormData();

        formData.append("is_uploaded", String(!newValue));

        const response = await $fetch(`settings/visibility`, {
            body: formData,
            method: "PATCH"
        });

        if (response?.json?.is_uploaded) {
            setUser({ ...user, is_uploaded: response.json.is_uploaded });
        }
    }

    return (
        <Setting
            Switch={<IOSSwitch checked={isNotVisible} onChange={toggleVisibility} />}
            feature="Скрытый профиль"
        />
    );
}