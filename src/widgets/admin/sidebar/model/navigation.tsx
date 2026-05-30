import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import StorageIcon from '@mui/icons-material/Storage';

export type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

export const mainNavItems: NavItem[] = [
    {
        icon: <DashboardIcon />,
        name: "Главная",
        path: "/admin",
    },
    {
        icon: <AccountCircleOutlinedIcon />,
        name: "Пользователи",
        path: "/admin/users"
    },
    {
        icon: <BookOutlinedIcon />,
        name: "Логи",
        path: "/admin/logs"
    },
    {
        icon: <FindInPageOutlinedIcon />,
        name: "Документы",
        path: "/admin/documents"
    },
    {
        icon: <StorageIcon />,
        name: "Стеки",
        path: "/admin/stacks"
    },

];
