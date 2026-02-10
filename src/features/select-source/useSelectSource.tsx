import Option from "@/shared/ui/Inputs/Option";
import Input from "@/shared/ui/Inputs/Input";
import {safeLocalStorage} from "@/shared/lib/utils/safeLocalStorage";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useSources} from "@/entities/sources/api/useSources";

export default function useSelectSource({errors}) {

    const {sources} = useSources()
    const [selectedSource, setSelectedSource] = useState<string | null>(safeLocalStorage.getItem("source"));
    const [customText, setCustomText] = useState<string | null>(safeLocalStorage.getItem("custom_text"));

    function handleCustomTextChange(e: ChangeEvent<HTMLInputElement>): void {
        setCustomText(e.target?.value);
        safeLocalStorage.setItem("custom_text", e.target?.value)
    }

    const result = {
        source_id: selectedSource === "custom" ? "" : selectedSource,
        source: customText
    }

    useEffect(() => {
        safeLocalStorage.setItem("source", `${selectedSource}`)
    }, [selectedSource]);

    const sourceTsx =
        <div>
            <div className="space-y-3">
                {sources?.map((source) => (
                    <Option
                        key={source?.id}
                        selected={selectedSource == source?.id}
                        text={source?.variant}
                        onClick={() => setSelectedSource(`${source?.id}` )}
                    />
                ))}

                <span className="text-red-500 text-sm ml-1">{errors?.source_id}</span>

            </div>


            <Input
                label={"Свой вариант"}
                error={errors?.source}
                name={"source"}
                placeholder={"Свой вариант ответа"}
                selected={selectedSource==="custom"}
                onChange={handleCustomTextChange}
                onClick={() => setSelectedSource("custom")}
                defaultValue={safeLocalStorage.getItem("custom_text") ?? undefined}
            />
        </div>



    return {
        result,
        sourceTsx,
        selectedSource,
        customText
    }

}