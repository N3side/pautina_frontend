import BurgerMenu from "@/shared/ui/BurgerMenu";
import {SidebarLogo} from "@/widgets/admin/sidebar/ui/SidebarLogo";
import {SidebarHeader} from "@/widgets/admin/sidebar/ui/SidebarHeader";
import {SidebarNav} from "@/widgets/admin/sidebar/ui/SidebarNav";
import {mainNavItems} from "@/widgets/admin/sidebar/model/navigation";
import {usePathname} from "next/navigation";

interface Props {
    isOpen?: boolean
}

export default function BurgerWidget({isOpen=false}: Props) {

    const pathname = usePathname();

    return (
        <BurgerMenu isOpen={isOpen}>
            <SidebarLogo isSidebarOpen={false} />

            <div className="flex flex-col flex-1 overflow-y-auto duration-300 ease-linear custom-scrollbar px-4 py-6">
                <nav className="mb-6">
                    <div className="flex flex-col gap-4">
                        <SidebarHeader isSidebarOpen={false} />
                        <SidebarNav
                            items={mainNavItems}
                            menuType="main"
                            pathname={pathname || ""}
                            isSidebarOpen={true}
                        />
                    </div>
                </nav>
            </div>
        </BurgerMenu>
    )
}