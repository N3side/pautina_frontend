"use client"

import Option from "@/shared/ui/Inputs/Option";
import Input from "@/shared/ui/Inputs/Input";
import {safeLocalStorage} from "@/shared/lib/utils/safeLocalStorage";
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {useSources} from "@/entities/sources/api/useSources";
import {UserContext} from "@/entities/user";

export default function useSelectSource({ errors, localSourceId="", localSource=""}) {

    const {user} = useContext(UserContext)

    const { sources } = useSources();
    const [selectedSource, setSelectedSource] = useState<string | null>(user?.source_id || localSourceId && safeLocalStorage.getItem(`${localSourceId}`) || "");
    const [customText, setCustomText] = useState<string>(user?.source || localSource && safeLocalStorage.getItem(`${localSource}`) || "");

    function handleCustomTextChange(e: ChangeEvent<HTMLInputElement>): void {
        const val = e.target.value;
        setCustomText(val);
        safeLocalStorage.setItem("custom_text", val);
    }

    const result = {
        ...(selectedSource && selectedSource !== "custom" && { source_id: selectedSource }),
        source: customText
    };

    useEffect(() => {
        if (selectedSource) {
            safeLocalStorage.setItem("source", selectedSource);
        }
    }, [selectedSource]);

    useEffect(() => {
        console.log(sources)
    }, [sources]);

    const sourceTsx = (
        <div>
            <div className="space-y-3 mb-4">
                {sources?.map((source) => (
                    <Option
                        key={source.id}
                        selected={selectedSource == String(source.id)}
                        text={source.variant}
                        onClick={() => setSelectedSource(String(source.id))}
                    />
                ))}
                {errors?.source_id && <span className="text-red-500 text-sm ml-1">{errors.source_id}</span>}
            </div>

            <Input
                label="Свой вариант"
                error={errors?.source}
                name="source"
                placeholder="Свой вариант ответа"
                selected={selectedSource === "custom"}
                onChange={handleCustomTextChange}
                onClick={() => setSelectedSource("custom")}
                value={customText} // Используем стейт вместо defaultValue
            />
        </div>
    );

    return { result, sourceTsx, selectedSource, customText };
}