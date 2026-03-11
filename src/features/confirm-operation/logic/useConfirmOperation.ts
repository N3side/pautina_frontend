import {useEffect, useState} from "react";

interface Props {
    close: () => void
    callback: () => any
}

export default function UseConfirmOperation({close, callback}) {

    const [isChosed, setIsChosed] = useState<boolean>(false)
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false)

    const confirm = () => {
        setIsChosed(true)
        setIsConfirmed(true)
        close()
    }

    const decline = () => {
        setIsChosed(true)
        setIsConfirmed(false)
        close()
    }

    useEffect(() => {
        if (isChosed && isConfirmed) {
            callback()
        }
    }, [isChosed])

    return {isChosed, isConfirmed, confirm, decline}
}