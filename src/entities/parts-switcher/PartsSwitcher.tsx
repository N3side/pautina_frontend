import Chip from "@/shared/ui/Chip/Chip";
import {useHeaderHeight} from "@/shared/lib/hooks/useHeaderHeight";
import {useEffect, useState} from "react";

export interface StepItem {
    name: string;
    param: string;
    children: React.ReactNode;
}

interface Props {
    PARTS: StepItem[]
    currentStepParam: string
    handleStepChange: (any) => void
}

export default function PartsSwitcher({PARTS, currentStepParam, handleStepChange}: Props) {

    const {headerHeight} = useHeaderHeight();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div
            className="glass-effect rounded-[18px] p-4 h-fit self-start lg:sticky w-full w-[300px] lg:max-w-[300px] max-w-none"
            style={{ top: `${headerHeight + 16}px` }}
        >
            <p className="text-text-main font-bold text-secondary pl-2">Редактирование</p>

            <div className="flex flex-col mt-3 gap-2 h-full min-h-0">
                {PARTS && Array.isArray(PARTS) && PARTS.length > 0 && PARTS.map((part, key) => (
                    <Chip
                        key={key}
                        isActive={currentStepParam === part.param}
                        href=""
                        text={part.name}
                        className="pr-6 pl-3 py-2"
                        onClick={(e) => {
                            e.preventDefault();
                            handleStepChange(part.param);
                        }}
                    />
                ))}
            </div>
        </div>
    )
}