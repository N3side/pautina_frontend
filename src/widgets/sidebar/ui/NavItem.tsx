// widgets/sidebar/ui/NavItem.tsx
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavItem as NavItemType } from "../model/navigation";
import { Submenu } from "./Submenu";

interface NavItemProps {
    item: NavItemType;
    isOpen: boolean;
    isActive: boolean;
    isSidebarOpen: boolean;
    menuType: "main" | "others";
    onSubmenuToggle: () => void;
    pathname?: string;
}

export const NavItemComponent = ({
        item,
        isOpen,
        isActive,
        isSidebarOpen,
        menuType,
        onSubmenuToggle,
        pathname,
    }: NavItemProps) => {
    const hasSubItems = Boolean(item.subItems?.length);
    const isAnyChildActive = item.subItems?.some((sub) => sub.path === pathname) || isActive;

    const buttonClasses = `group flex items-center w-full rounded-lg px-3 py-2 transition-colors duration-200 cursor-pointer
    ${isOpen || isAnyChildActive
        ? "bg-[var(--color-brand)]/10 text-[var(--color-brand)]"
        : "text-[var(--color-text-muted)] hover:bg-[var(--color-border-default)] hover:text-[var(--color-text-main)]"
    }
    ${!isSidebarOpen ? "lg:justify-center" : "lg:justify-start"}
  `;

    const iconClasses = `flex items-center justify-center 
    ${isOpen || isAnyChildActive ? "text-[var(--color-brand)]" : "text-[var(--color-text-muted)]"}`;

    if (hasSubItems) {
        return (
            <li>
                <button onClick={onSubmenuToggle} className={buttonClasses}>
                    <span className={iconClasses}>{item.icon}</span>

                    {isSidebarOpen && (
                        <>
                            <span className="ml-3 font-medium">{item.name}</span>
                            <ExpandMoreIcon
                                className={`ml-auto w-5 h-5 transition-transform duration-300 ${
                                    isOpen ? "rotate-180" : ""
                                }`}
                            />
                        </>
                    )}
                </button>

                {isSidebarOpen && (
                    <Submenu
                        items={item.subItems!}
                        isOpen={isOpen}
                        menuType={menuType}
                        index={item.name}
                        pathname={pathname}
                    />
                )}
            </li>
        );
    }

    return (
        <li>
            <Link href={item.path!} className={buttonClasses}>
                <span className={iconClasses}>{item.icon}</span>
                {isSidebarOpen && <span className="ml-3 font-bold text-small">{item.name}</span>}
            </Link>
        </li>
    );
};