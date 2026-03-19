import HeaderWidget from "@/widgets/user/header/ui/HeaderWidget";
import BannerWidget from "@/widgets/user/landing/banner/ui/BannerWidget";
import MissionWidget from "@/widgets/user/landing/mission/ui/MissionWidget";
import FunctionalWidget from "@/widgets/user/landing/functional/ui/FunctionalWidget";
import FooterWidget from "@/widgets/user/footer/ui/FooterWidget";

export default function HomePage() {
    return (
        <>
            <HeaderWidget />
            <BannerWidget />
            <MissionWidget />
            <FunctionalWidget />
            <FooterWidget />
        </>
    )
}