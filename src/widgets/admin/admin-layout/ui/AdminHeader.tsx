"use client"

import MenuIcon from '@mui/icons-material/Menu';
import IconWrapper from "@/shared/ui/Buttons/IconWrapper";
import CustomDropDown from "@/widgets/user/header/ui/CustomDropDown";
import {useSidebarStore} from "@/widgets/admin/sidebar/lib/useSidebarStore";

export default function AdminHeader() {

    const {toggleExpanded} = useSidebarStore()

    return (
        <div className="flex justify-between items-center w-full mt-3">
            <IconWrapper onClick={toggleExpanded} className="z-1000">
                <MenuIcon className="color-text-accent" />
            </IconWrapper>
            <CustomDropDown />
        </div>
    )
}