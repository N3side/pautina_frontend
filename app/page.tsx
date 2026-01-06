import HeaderWidget from "@/app/widgets/header/ui/HeaderWidget"
import BannerWidget from "@/app/widgets/banner/BannerWidget"
import MissionWidget from "@/app/widgets/mission/MissionWidget"
import StatisticsWidget from "@/app/widgets/statistics/StatisticsWidget"
import FunctionalWidget from "@/app/widgets/functional/FunctionalWidget"
import FooterWidget from "@/app/widgets/footer/FooterWidget"


export default function Home() {
    return (
        <>
            <HeaderWidget />
            <BannerWidget />
            <MissionWidget />
            <StatisticsWidget />
            <FunctionalWidget />
            <FooterWidget />
        </>
    )
}