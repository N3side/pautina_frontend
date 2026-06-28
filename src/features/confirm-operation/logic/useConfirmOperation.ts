interface Props {
    close: () => void
    callback: () => any
}

export default function UseConfirmOperation({close, callback}: Props) {

    const confirm = () => {
        callback()
        close()
    }

    const decline = () => {
        close()
    }

    return {confirm, decline}
}