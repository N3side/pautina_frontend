import {useState} from "react";

interface Props {
    dictionary: string[]
}

export default function UseStepper({dictionary}: Props) {

    const totalSteps = dictionary?.length || 0
    const [position, setPosition] = useState<number>(0)

    const handlers = {
        next: (): void => setPosition((p: number) => p < totalSteps - 1 ? p + 1 : p),
        prev: (): void => setPosition((p: number) => p > 0 ? p - 1 : p)
    }

    const translateToNumber = (key: string): any => {
        return dictionary[key]
    }

    const progress = ((position) / totalSteps) * 100

    return {
        totalSteps,
        position,
        setPosition,
        handlers,
        translateToNumber,
        progress
    }

}