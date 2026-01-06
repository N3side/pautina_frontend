import { Heading } from "@/shared/styles/typography/headings";
import { PautinaText } from "@/shared/styles/typography/text";
import { ShadowWrapper } from "@/shared/wrappers/Shadow";
import { Button } from "@mui/material";
import { COLORS, colorStyles } from "@/shared/styles/colors";
import { useEffect, useState } from "react";
import { $fetch } from "@/shared/api/fetch";

export default function Source() {
    const [sources, setSources] = useState(null);
    const [selectedSource, setSelectedSource] = useState(null);
    const [customText, setCustomText] = useState("");

    async function getSources() {
        const response = await $fetch("sources");
        const sources_ = response?.json?.sources;
        setSources(sources_);
    }

    useEffect(() => {
        getSources();
    }, []);

    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto p-4">
            {/* Заголовок и описание */}
            <div className="flex flex-col gap-4">
                <Heading variant="h4" className="text-gray-900">
                    Откуда вы узнали о Паутине? *
                </Heading>

                <PautinaText variant="secondary" className="text-gray-600">
                    Нам очень важно знать как развивается проект и понимать какие каналы продвижения являются эффективными. Поэтому, ответьте пожалуйста на эти вопросы
                </PautinaText>
            </div>

            {/* Обязательное поле */}
            <div className="mt-2">
                <PautinaText
                    variant="secondary"
                    className="text-gray-700 font-semibold"
                >
                    Ответ *
                </PautinaText>
            </div>

            {/* Список вариантов */}
            <div className="space-y-3">
                {sources?.map((source) => (
                    <div
                        key={source?.id}
                        onClick={() => setSelectedSource(source?.id)}
                        className={`
                            w-full p-4 border-2 rounded-xl cursor-pointer
                            transition-all duration-200 ease-in-out
                            hover:border-brand-light hover:bg-brand-light/5
                            active:scale-[0.98]
                            ${selectedSource === source?.id
                            ? 'border-brand-light bg-brand-light/10 shadow-sm'
                            : 'border-gray-200 bg-white'
                        }
                        `}
                    >
                        <PautinaText
                            variant="small"
                            className={`
                                ${selectedSource === source?.id
                                ? 'text-brand-dark font-medium'
                                : 'text-gray-800'
                            }
                            `}
                        >
                            {source?.variant}
                        </PautinaText>
                    </div>
                ))}
            </div>

            {/* Свой вариант */}
            <div>
                <div
                    onClick={() => setSelectedSource("custom")}
                    className={`
                        w-full
                        transition-all duration-200
                        ${selectedSource === "custom"
                        ? 'border-brand-light bg-brand-light/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }
                    `}
                >
                    <PautinaText
                        variant="body"
                        className={`
                            ${selectedSource === "custom"
                            ? 'text-brand-dark font-medium'
                            : 'text-gray-800'
                        }
                        `}
                    >
                        Свой вариант
                    </PautinaText>

                    <input
                        type="text"
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        placeholder="Введите свой вариант ответа..."
                        className={`
                            w-full px-4 py-3 rounded-lg border
                            transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-brand-light/30
                            ${selectedSource === "custom"
                            ? 'border-brand-light/50 bg-white'
                            : 'border-gray-300 bg-gray-50'
                        }
                        `}
                        disabled={selectedSource !== "custom"}
                    />
                </div>
            </div>

            {/* Кнопка Далее */}
            <ShadowWrapper className="w-full">
                <Button
                    type="submit"
                    className="w-full"
                    style={{
                        marginTop: "15px",
                        background: colorStyles.buttons.brand.light,
                        padding: "16px 0px",
                        borderRadius: "12px",
                        width: "100%"
                    }}
                >
                    <PautinaText variant="button2" color={COLORS.white}>
                        Далее
                    </PautinaText>
                </Button>
            </ShadowWrapper>
        </div>
    );
}