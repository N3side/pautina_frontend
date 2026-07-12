import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export interface StepItem {
    name: string;
    param: string;
    children: React.ReactNode;
}

export function useStepNavigation(parts: StepItem[]) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Получаем текущий параметр шага
    const rawStepParam = searchParams.get("step");

    // Находим активный индекс
    const activeIndex = useMemo(() => {
        // Если параметр не найден или некорректен, берем 0 (первый шаг)
        const index = parts.findIndex(part => part.param === rawStepParam);
        return index !== -1 ? index : 0;
    }, [rawStepParam, parts]);

    // Активный элемент (всегда существует, т.к. activeIndex >= 0)
    const activeStep = parts[activeIndex];

    // Функция переключения
    const handleStepChange = (param: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("step", param);
        router.push(`${pathname}?${params.toString()}`);
    };

    return {
        activeStep,
        activeIndex,
        handleStepChange,
        // Возвращаем всегда строку: либо найденный параметр, либо дефолтный из первого шага
        currentStepParam: rawStepParam ?? (parts[0]?.param || "")
    };
}