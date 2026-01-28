import { Heading } from "@/shared/cat/typography/headings";
import { PautinaText } from "@/shared/cat/typography/text";
import { ShadowWrapper } from "@/shared/wrappers/Shadow";
import { Button } from "@mui/material";
import { COLORS, colorStyles } from "@/shared/cat/colors";
import React, { useEffect, useState, ChangeEvent } from "react";
import { $fetch } from "@/shared/api/fetch";
import ButtonLarge from "@/shared/components/Buttons/ButtonLarge";
import Input from "@/shared/components/Inputs/Input";
import Option from "@/shared/components/Inputs/Option";

interface Source {
    id: string | number;
    variant: string;
}

interface SourcesResponse {
    json?: {
        sources?: Source[];
    };
}

interface SourceResult {
    source_id: string | number | null | undefined,
    source: string | null
}

export default function Source({next}) {
    const [sources, setSources] = useState<Source[] | null>(null);
    const [selectedSource, setSelectedSource] = useState<string | null>(localStorage.getItem("source"));
    const [customText, setCustomText] = useState<string>(localStorage.getItem("custom_text"));

    const [errors, setErrors] = useState(null)

    async function getSources(): Promise<void> {
        const response = await $fetch("sources") as SourcesResponse;
        const sources_ = response?.json?.sources;
        setSources(sources_ || null);
    }

    useEffect(() => {
        getSources()
    }, []);

    function handleCustomTextChange(e: ChangeEvent<HTMLInputElement>): void {

        setCustomText(e.target?.value);

        localStorage.setItem("custom_text", e.target?.value)

    }

    async function handleSubmit(e) {

        e.preventDefault()

        setErrors(null)

        console.log(customText)

        const result: SourceResult = {
            source_id: selectedSource === "custom" ? "" : selectedSource,
            source: customText
        }

        const response = await $fetch("onboarding/source", {
            method: "PATCH",
            body: JSON.stringify(result),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const errors_ = response?.json?.errors

        if (errors_) {
            setErrors(errors_)
            return
        }

        next()
    }

    useEffect(() => {
        console.log(selectedSource)
        localStorage.setItem("source", selectedSource)
    }, [selectedSource]);

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Заголовок и описание */}
            <div className="flex flex-col gap-4">
                <Heading variant="h4">
                    Откуда вы узнали о Паутине? *
                </Heading>

                <PautinaText variant="secondary">
                    Нам очень важно знать как развивается проект и понимать какие каналы продвижения являются эффективными. Поэтому, ответьте пожалуйста на эти вопросы
                </PautinaText>
            </div>

            <div className="font-bold text-[14px] ml-1">
                <PautinaText variant="secondary" style={{ fontWeight: 700 }}>
                    Ответ
                </PautinaText>
            </div>

            {/* Список вариантов */}

            <div className="space-y-3">
                {sources?.map((source: Source) => (
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
                defaultValue={localStorage.getItem("custom_text")}
            />

            {/* Кнопка Далее */}
            <ButtonLarge text={"Далее"}>
                <></>
            </ButtonLarge>
        </form>
    );
}