import {useState} from "react";

export default function UseSubmitAction() {

    const [submited, setSubmited] = useState<boolean>(false)
    const [expecting, setExpecting] = useState<boolean>(true)

    const submit = () => {
        setSubmited(true)
        setExpecting(false)
    }

    const reject = () => {
        setSubmited(false)
        setExpecting(false)
    }

    return {submited, submit, reject, expecting}
}