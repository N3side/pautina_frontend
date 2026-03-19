import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';

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
    }

];
