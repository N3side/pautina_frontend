import {NavItem} from "@/shared/ui/Sections/NavItem";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Sidebar() {
    return (
        <aside className="w-full lg:w-72 shrink-0 md:sticky md:top-4 z-10 block max-[1024px]:hidden">
            {/* bg-white -> bg-surface, border-gray-100 -> border-border-default */}
            <div className="glass-effect rounded-2xl border border-border-default shadow-sm overflow-hidden">

                {/* Хедер меню */}
                <div className="px-5 py-4 border-b border-border-default">
                    {/* text-gray-500 -> text-text-muted */}
                    <p className="text-secondary font-semibold text-text-muted text-xs uppercase tracking-wider">
                        Настройки
                    </p>
                </div>

                <nav className="flex flex-col p-2 gap-1">
                    <NavItem
                        icon={<PersonIcon />}
                        label="Общее"
                    />
                    <NavItem
                        icon={<SecurityIcon />}
                        label="Безопасность"
                    />
                    <NavItem
                        icon={<NotificationsIcon  />}
                        label="Уведомления"
                        badge={2}
                    />
                </nav>
            </div>
        </aside>
    )
}