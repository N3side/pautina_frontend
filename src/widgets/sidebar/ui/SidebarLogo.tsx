import Link from "next/link";

interface SidebarLogoProps {
    isSidebarOpen: boolean;
}

export const SidebarLogo = ({ isSidebarOpen }: SidebarLogoProps) => {
    return (
        <div className={`py-6 flex px-6 border-b border-[var(--color-border-default)] 
            ${!isSidebarOpen ? "lg:justify-center" : "justify-start"}`}
        >
            <Link href="/">
                <p className="text-text-muted font-bold">Паутина</p>
            </Link>
        </div>
    );
};