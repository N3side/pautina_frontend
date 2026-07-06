"use client";

import { useTheme } from "@/shared/lib/providers/ThemeProvider";
import { IOSSwitch } from "@/shared/ui/Inputs/IOSSwitch";
import { playSound } from "@/shared/lib/utils/playSound";
import { ReactNode } from "react";

interface ToggleThemeSettingProps {
    switchScale?: number;
    flashBang?: boolean;
    renderSwitch?: (props: {
        checked: boolean;
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
        scale?: number;
    }) => ReactNode; // <-- добавляем
}

export default function ToggleThemeSetting({
       switchScale = 1,
       flashBang = false,
       renderSwitch
   }: ToggleThemeSettingProps) {
    const { theme, setTheme } = useTheme();

    const handleThemeToggle = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        const root = document.documentElement;

        const rect = event.currentTarget.getBoundingClientRect();

        root.style.setProperty(
            "--theme-x",
            `${rect.left + rect.width / 2}px`
        );
        root.style.setProperty(
            "--theme-y",
            `${rect.top + rect.height / 2}px`
        );

        if (theme === "dark" && flashBang) {
            playSound("/sounds/flashbang.mp3", 0.1);
            await new Promise<void>((resolve) => {
                setTimeout(resolve, 1000);
            });
        }

        const changeTheme = () => setTheme(nextTheme);

        if (!document.startViewTransition) {
            changeTheme();
            return;
        }

        document.startViewTransition(changeTheme);
    };

    const switchProps = {
        checked: theme === "dark",
        onClick: handleThemeToggle,
        scale: switchScale
    };

    return (
        <>
            {renderSwitch ? (
                renderSwitch(switchProps)
            ) : (
                <IOSSwitch {...switchProps} />
            )}
        </>
    );
}