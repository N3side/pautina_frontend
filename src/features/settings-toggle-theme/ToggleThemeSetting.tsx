import {useTheme} from "@/shared/lib/providers/ThemeProvider";
import Setting from "@/shared/ui/Sections/Setting";
import {IOSSwitch} from "@/shared/ui/Inputs/IOSSwitch";

export default function ToggleThemeSetting() {

    const { theme, toggleTheme } = useTheme()

    return (
        <Setting
            Switch={<IOSSwitch checked={theme === "dark"} onClick={toggleTheme} />}
            // description="Переключить интерфейс в ночной режим"
            feature="Темная тема"
        />
    )
}