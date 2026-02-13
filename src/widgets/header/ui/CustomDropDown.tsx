import {useContext} from "react";
import {UserContext} from "@/entities/user";
import DropDown from "@/shared/ui/DropDown/DropDown"
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import Link from "next/link"
import {useTheme} from "@/shared/lib/providers/ThemeProvider";
import {IOSSwitch} from "@/shared/ui/Inputs/IOSSwitch";

import {userLink} from "@/shared/lib/userLink";



export default function CustomDropDown() {

    const {user} = useContext(UserContext)

    const {theme, toggleTheme} = useTheme()

    return (
        <>
            {user && (
                <div className="lg:block z-50">
                    <DropDown
                        trigger={
                            <div className="h-[42px] w-[42px] p-[2px] rounded-full cursor-pointer border border-transparent hover:border-brand transition-all duration-300 group">
                                <div className="w-full h-full rounded-full overflow-hidden relative">
                                    <img
                                        className="w-full h-full object-cover transition-opacity group-hover:opacity-90"
                                        src={user?.avatar}
                                        alt="avatar"
                                    />
                                </div>
                            </div>
                        }
                    >
                        <div className="flex items-center justify-center pt-2" onClick={(e) => e.stopPropagation()}>
                            <div className="w-[280px] rounded-2xl overflow-hidden font-sans glass-effect">

                                <div className="p-4 flex gap-3 items-center">
                                    <img src={user?.avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover shrink-0 border border-border-default" />
                                    <div className="flex flex-col min-w-0">
                                        <p className="text-default text-text-main font-bold truncate">{user?.name}</p>
                                        {user?.username && <p className="text-small text-text-muted truncate">@{user?.username}</p>}
                                    </div>
                                </div>

                                <div className="px-4 pb-3">
                                    <Link href={userLink(user?.id)} className="block w-full text-center py-2 rounded-lg bg-brand/10 hover:bg-brand/20 text-text-brand text-sm font-medium transition-colors">
                                        Перейти в профиль
                                    </Link>
                                </div>

                                <div className="h-[1px] bg-border-default w-full opacity-50"></div>

                                <div className="py-2">
                                    <div className="px-2">
                                        <button className="w-full text-left px-3 py-2 rounded-lg flex items-center justify-between hover:bg-border-default/30 transition-colors group">
                                            <div className="flex items-center gap-3">
                                                <p className="text-small text-text-main font-medium">Темная тема</p>
                                            </div>
                                            <IOSSwitch scale={.7} size="small" checked={theme === "dark"} onClick={toggleTheme} />
                                        </button>

                                        <Link href="/settings">
                                            <button className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-border-default/30 transition-colors group mt-1">
                                                <SettingsIcon fontSize="small" className="text-text-muted group-hover:text-text-main transition-colors" />
                                                <p className="text-small text-text-muted group-hover:text-text-main transition-colors">Настройки</p>
                                            </button>
                                        </Link>
                                    </div>

                                    <div className="h-[1px] bg-border-default w-full my-2 opacity-50"></div>

                                    <div className="px-2">
                                        <Link href="/logout">
                                            <button className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-red-500/10 transition-colors group">
                                                <LogoutIcon fontSize="small" className="text-text-muted group-hover:text-red-500 transition-colors" />
                                                <p className="text-small text-text-muted group-hover:text-red-500 transition-colors">Выйти</p>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DropDown>
                </div>
            )}
        </>
    )

}
