import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface SectionHeaderProps {
    isSidebarOpen: boolean;
}

export const SidebarHeader = ({ isSidebarOpen }: SectionHeaderProps) => {
    return (
        <div className={`mb-4 flex items-center ${!isSidebarOpen ? "lg:justify-center" : "justify-start"}`}>
            {isSidebarOpen ? (
                <h2 className="text-label text-text-muted">Меню</h2>
            ) : (
                <MoreHorizIcon className="text-text-muted" />
            )}
        </div>
    );
};