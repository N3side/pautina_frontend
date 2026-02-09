import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { fetchSourcesList, Source, SourceDto } from "@/features/select-source";
import Input from "@/shared/ui/Inputs/Input";
import Option from "@/shared/ui/Inputs/Option";

interface SourceSelectionFormProps {
    initialSourceId?: string | null;
    initialCustomText?: string;
    onSubmit: (data: SourceDto) => void;
    isLoading?: boolean;
    serverErrors?: { source_id?: string; source?: string } | null;
    submitButtonText?: string;
}

export const SourceSelectionForm = ({
        initialSourceId = null,
        initialCustomText = "",
        onSubmit,
        serverErrors = null,
    }: SourceSelectionFormProps) => {
    const [sources, setSources] = useState<Source[]>([]);
    const [selectedSourceId, setSelectedSourceId] = useState<string | null>(initialSourceId);
    const [customText, setCustomText] = useState<string>(initialCustomText);

    // Загрузка списка источников (Entity logic)
    useEffect(() => {
        fetchSourcesList().then((data) => {
            setSources(data);
        });
    }, []);

    const handleCustomTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCustomText(e.target.value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const result: SourceDto = {
            source_id: selectedSourceId === "custom" ? "" : selectedSourceId,
            source: customText
        };

        onSubmit(result);
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

            <div className="space-y-3">
                {sources.map((source) => (
                    <Option
                        key={source.id}
                        selected={selectedSourceId == String(source.id)}
                        text={source.variant}
                        onClick={() => setSelectedSourceId(String(source.id))}
                    />
                ))}

                {/* Ошибка валидации списка */}
                {serverErrors?.source_id && (
                    <span className="text-red-500 text-sm ml-1">{serverErrors.source_id}</span>
                )}
            </div>

            <Input
                label="Свой вариант"
                error={serverErrors?.source}
                name="source"
                placeholder="Свой вариант ответа"
                selected={selectedSourceId === "custom"}
                onChange={handleCustomTextChange}
                onClick={() => setSelectedSourceId("custom")}
                value={customText}
            />

        </form>
    );
};