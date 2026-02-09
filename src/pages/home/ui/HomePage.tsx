import HeaderWidget from "@/widgets/header/ui/HeaderWidget";
import BannerWidget from "@/widgets/banner/ui/BannerWidget";
import MissionWidget from "@/widgets/mission/ui/MissionWidget";
import FunctionalWidget from "@/widgets/functional/ui/FunctionalWidget";
import FooterWidget from "@/widgets/footer/ui/FooterWidget";

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