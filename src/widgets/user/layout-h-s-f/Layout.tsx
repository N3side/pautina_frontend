import HeaderWidget from "@/widgets/user/header/ui/HeaderWidget";
import {ReactNode} from "react";
import Sidebar from "@/widgets/user/sidebar/ui/Sidebar";
import FooterWidget from "@/widgets/user/footer/ui/FooterWidget";
import {Container} from "@/shared/ui/Container/Container";

interface Props {
    children: ReactNode
    className?: string
}

export default function Layout({children, className}: Props) {
    return (
        <div>
            <HeaderWidget />
            <Container className={`flex gap-4 items-start mt-6 flex-row h-full min-h-[40vh] ${className}`}>
                <Sidebar className="hidden lg:flex" />
                {children}
            </Container>
            <FooterWidget />
        </div>
    )
}