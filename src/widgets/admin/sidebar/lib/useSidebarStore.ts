import { create } from "zustand";

interface SidebarState {
    isExpanded: boolean;
    isMobileOpen: boolean;
    isHovered: boolean;
    setIsHovered: (value: boolean) => void;
    toggleMobileOpen: () => void;
    toggleExpanded: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
    isExpanded: true,
    isMobileOpen: false,
    isHovered: false,
    setIsHovered: (value) => set({ isHovered: value }),
    toggleMobileOpen: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
    toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
}));