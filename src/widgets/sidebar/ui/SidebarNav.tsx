"use client"

// widgets/sidebar/ui/SidebarNav.tsx
import { useState, useEffect } from "react";
import { NavItem } from "../model/navigation";
import { NavItemComponent } from "./NavItem";

interface SidebarNavProps {
    items: NavItem[];
    menuType: "main" | "others";
    pathname?: string;
    isSidebarOpen: boolean;
}

export const SidebarNav = ({ items, menuType, pathname, isSidebarOpen }: SidebarNavProps) => {
    const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);

    // Автоматическое открытие подменю при активном дочернем элементе
    useEffect(() => {
        const activeSubmenuIndex = items.findIndex((item) =>
            item.subItems?.some((subItem) => subItem.path === pathname)
        );

        setOpenSubmenuIndex(activeSubmenuIndex !== -1 ? activeSubmenuIndex : null);
    }, [pathname, items]);

    const handleSubmenuToggle = (index: number) => {
        setOpenSubmenuIndex((prev) => (prev === index ? null : index));
    };

    return (
        <ul className="flex flex-col gap-2">
            {items.map((item, index) => (
                <NavItemComponent
                    key={item.name}
                    item={item}
                    isOpen={openSubmenuIndex === index}
                    isActive={item.path ? item.path === pathname : false}
                    isSidebarOpen={isSidebarOpen}
                    menuType={menuType}
                    onSubmenuToggle={() => handleSubmenuToggle(index)}
                    pathname={pathname}
                />
            ))}
        </ul>
    );
};