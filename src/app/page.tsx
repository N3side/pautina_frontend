import HeaderWidget from "@/widgets/user/header/ui/HeaderWidget";
import BannerWidget from "@/widgets/user/landing/banner/ui/BannerWidget";
import MissionWidget from "@/widgets/user/landing/mission/ui/MissionWidget";
import FunctionalWidget from "@/widgets/user/landing/functional/ui/FunctionalWidget";
import FooterWidget from "@/widgets/user/footer/ui/FooterWidget";
import ShowDashBoard from "../widgets/user/show-dashboard/ShowDashBoard";

export default function Page() {
    return (
        <>
            <HeaderWidget />
            <BannerWidget />
            <ShowDashBoard />
            <MissionWidget />
            <FunctionalWidget />
            <FooterWidget />
        </>
    )
}