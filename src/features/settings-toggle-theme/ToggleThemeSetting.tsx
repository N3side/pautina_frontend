import { useTheme } from "@/shared/lib/providers/ThemeProvider";
import Setting from "@/shared/ui/Sections/Setting";
import { IOSSwitch } from "@/shared/ui/Inputs/IOSSwitch";
import { playSound } from "@/shared/lib/utils/playSound";

export default function ToggleThemeSetting() {
    const { theme, setTheme } = useTheme();

    const handleThemeToggle = () => {
        if (theme === "dark") {
            playSound("/sounds/flashbang.mp3", 0.1)
        }
        setTimeout(() => setTheme(theme === 'dark' ? 'light' : 'dark'), theme === "dark" ? 1000 : 0)
    };

    return (
        <Setting
            feature="Темная тема"
            Switch={
                <IOSSwitch
                    checked={theme === "dark"}
                    onClick={handleThemeToggle}
                />
            }
        />
    );
}