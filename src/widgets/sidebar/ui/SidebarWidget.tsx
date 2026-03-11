"use client";

import { usePathname } from "next/navigation";
import { useSidebarStore } from "../lib/useSidebarStore";
import { SidebarNav } from "./SidebarNav";
import { mainNavItems } from "../model/navigation";
import {SidebarLogo} from "./SidebarLogo"
import {SidebarHeader} from "./SidebarHeader"

export const SidebarWidget = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered, toggleMobileOpen, toggleExpanded } = useSidebarStore();
    const pathname = usePathname();

    const isSidebarOpen = isExpanded || isMobileOpen || isHovered;

    return (
        <aside
            className={`mt-16 hidden flex-col lg:mt-0 top-0 left-0 transition-all duration-300 ease-in-out z-50 min-h-screen glass-effect
            ${isSidebarOpen ? "w-[290px]" : "w-[90px]"}
            lg:translate-x-0 lg:flex
          `}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <SidebarLogo isSidebarOpen={isSidebarOpen} />

            <div className="flex flex-col flex-1 overflow-y-auto duration-300 ease-linear custom-scrollbar px-4 py-6">
                <nav className="mb-6">
                    <div className="flex flex-col gap-4">
                        <SidebarHeader isSidebarOpen={isSidebarOpen} />
                        <SidebarNav
                            items={mainNavItems}
                            menuType="main"
                            pathname={pathname || ""}
                            isSidebarOpen={isSidebarOpen}
                        />
                    </div>
                </nav>
            </div>

        </aside>
    );
};