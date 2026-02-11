import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Link from "next/link";

export default function BackButton({link}) {
    return (
        <Link href={link}>
            <div className="flex gap-1 items-center w-fit">
                <ChevronLeftIcon className="text-text-main" />

                <p className="text-text-main w-fit">
                    Вернуться назад
                </p>
            </div>
        </Link>
    )
}