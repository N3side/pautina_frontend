import {useCallback, useRef, useState} from "react";

interface Props {
    params: Record<string, any>
}

export default function UseFilters({params}: Props) {
    const [filters, setFilters] = useState<Record<string, any>>({params})
    const [isReset, setIsReset] = useState<boolean>(false)

    const initialParams = useRef(params)

    const handleReset = () => {
        setFilters(initialParams.current)
        setIsReset(prev => !prev)
    }

    function handleChange(e) {
        const {name, value} = e.target
        setFilters(prev => ({...prev, [name]: value}))
    }

    return {filters, setFilters, handleReset, handleChange, isReset}
}