import {Button} from "@mui/material";

interface Props {
    confirm: () => void;
    decline: () => void;
    title?: string;
    description?: string;
    submitText?: string
    declineText?: string
}

export default function ConfirmationForm({
        confirm,
        decline,
        title = "Подтверждение действия",
        description = "Вы уверены? Это действие нельзя отменить.",
        submitText = "Выполнить",
        declineText = "Отмена",
    }: Props) {
    return (
        <div
            className="w-full"
        >
            <div className="flex flex-col gap-6">
                {/* Иконка предупреждения */}
                <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Заголовок и описание */}
                <div className="flex flex-col gap-2 text-center">
                    <h4 className="text-text-main font-black">
                        {title}
                    </h4>
                    <p className="text-secondary text-text-muted">
                        {description}
                    </p>
                </div>

                {/* Кнопки действий */}
                <div className="flex gap-3 w-full">
                    <Button
                        onClick={decline}
                        className="!flex-1 !rounded-xl !px-6 !py-3 !normal-case !text-text-muted !border-border-default hover:!bg-input/80 transition-all"
                        variant="outlined"
                    >
                        <p className="text-button-sm font-semibold">{declineText}</p>
                    </Button>

                    <Button
                        onClick={confirm}
                        className="!flex-1 !rounded-xl !px-6 !py-3 !normal-case !bg-red-500 hover:!bg-red-600 !text-white transition-all"
                        variant="contained"
                    >
                        <p className="text-button-sm font-bold">{submitText}</p>
                    </Button>
                </div>

            </div>
        </div>
    );
}