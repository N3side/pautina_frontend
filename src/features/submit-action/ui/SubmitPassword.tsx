import Input from "@/shared/ui/Inputs/Input"
import {$fetch} from "@/shared/api/fetch";

export default function SubmitPassword() {

    async function handleSubmit() {
        const response = await $fetch("")
    }

    return (
        <form>
            <Input
                name="password"
                type="password"
            />
        </form>
    )
}