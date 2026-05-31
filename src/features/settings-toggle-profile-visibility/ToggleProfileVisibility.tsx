import {IOSSwitch} from "@/shared/ui/Inputs/IOSSwitch";
import Setting from "@/shared/ui/Sections/Setting";
import {$fetch} from "@/shared/api/fetch";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../entities/user-entity";

export default function ToggleProfileVisibility() {
    const { user, setUser } = useContext(UserContext);
    const [isNotVisible, setIsNotVisible] = useState<boolean>(!user?.publication?.is_uploaded);

    useEffect(() => {
        setIsNotVisible(!!!user?.publication?.is_uploaded);
    }, [user?.publication?.is_uploaded]);

    async function toggleVisibility() {
        const newValue = !isNotVisible;

        // Оптимистичное обновление (опционально, для скорости интерфейса)
        setIsNotVisible(newValue);
        const formData = new FormData();
        formData.append("is_uploaded", String(!newValue));

        const response = await $fetch(`settings/visibility`, {
            body: formData,
            method: "PATCH"
        });

        if (response?.json?.publication?.is_uploaded) {
            setUser(response?.json?.user);
        }
    }

    return (
        <Setting
            Switch={<IOSSwitch checked={isNotVisible} onChange={toggleVisibility} />}
            feature="Скрытый профиль"
        />
    );
}