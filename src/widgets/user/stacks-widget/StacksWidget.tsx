import IconWrapper from "@/shared/ui/Buttons/IconWrapper";
import EditIcon from "@mui/icons-material/Edit";
import ShowStacks from "@/features/manage-stacks/ui/ShowStacks";
import {useEffect, useState} from "react";
import {$fetch} from "@/shared/api/fetch";

interface Props {
    isMyProfile: boolean
    trueUser: Record<string, any> | null,
    setIsEmpty: (isEmpty: boolean) => void
}

export default function StacksWidget({isMyProfile, trueUser, setIsEmpty}: Props) {

    const [selectedStacks, setSelectedStacks] = useState<Record<string, any>[]>([]);
    const [readOnly, setReadOnly] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const handleUpdateStacks = async (newStacks: Record<string, any>[]) => {
        setSelectedStacks(newStacks);

        const stackIds = newStacks.map(stack => stack.id);

        await $fetch(`stacks`, {
            method: 'POST',
            headers: {"Content-Type": "application/json", "Accept": "application/json"},
            body: JSON.stringify({
                stacks: stackIds || []
            })
        });
    };

    async function getUserStacks(user_id) {
        const response = await $fetch(`stacks/${user_id}`, {
            onLoadingChange: setIsLoading
        })

        const stacks_ = response?.json?.stacks

        if (stacks_) {
            setSelectedStacks(stacks_)
        }
    }

    useEffect(() => {
        if (trueUser) {
            getUserStacks(trueUser?.main?.id)
        }
    }, [trueUser]);

    const [isVisible, setIsVisible] = useState<boolean>(true)

    useEffect(() => {
        const hasData = !!(selectedStacks && selectedStacks.length > 0);

        setIsVisible(isMyProfile || isLoading || hasData);
        setIsEmpty(isLoading || hasData);
    }, [isMyProfile, isLoading, selectedStacks]);

    return (
        isVisible &&
        <section className="glass-effect p-6 rounded-xl relative">

            <h6 className="text-text-main font-bold">
                Технологии
            </h6>

            {
                isMyProfile &&
                <IconWrapper
                    onClick={() => setReadOnly(!readOnly)}
                    className="!absolute !top-4 !right-6"
                >
                    <EditIcon className="!text-[20px]" />
                </IconWrapper>
            }

            {readOnly && isMyProfile ? (
                <div className="flex flex-col gap-3 mt-7">
                    <ShowStacks
                        showSearch={true}
                        showAll={true}
                        showSelected={true}
                        selectedStacks={selectedStacks}
                        baseUrl={`stacks`}
                        setSelectedStacks={(updater) => {
                            const nextState = typeof updater === 'function' ? updater(selectedStacks) : updater;
                            if (nextState) handleUpdateStacks(nextState);
                        }}
                    />
                </div>
            ) : (
                selectedStacks && Array.isArray(selectedStacks) && selectedStacks.length > 0 &&
                <div className="flex flex-col gap-4 mt-6">
                    <ShowStacks
                        baseUrl={"stacks"}
                        showSearch={false}
                        showAll={false}
                        showSelected={true}
                        selectedStacks={selectedStacks}
                        isReadOnly={true} // Передаем true, всё лишнее скроется и заблокируется автоматически
                    />
                </div>
            )}
        </section>
    )
}