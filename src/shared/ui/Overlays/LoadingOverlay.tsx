import { CircularProgress } from "@mui/material";

export default function LoadingOverlay({ text = "ИИ анализирует документ...", subText="Пожалуйста, подождите, магия в процессе..." }) {
    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-xl overflow-hidden">
            <div className="absolute inset-0 glass-effect" />

            <div className="relative flex flex-col items-center">
                <div className="relative mb-6">
                    <div className="absolute -inset-4 bg-brand/20 rounded-full blur-xl animate-pulse" />

                    <div className="absolute inset-0 rounded-full animate-ping bg-brand/10" />

                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-brand to-brand-hover flex items-center justify-center shadow-2xl border border-white/20">
                        <CircularProgress
                            size={40}
                            thickness={4}
                            sx={{ color: 'white' }}
                        />
                    </div>
                </div>

                <div className="relative text-center px-4">
                    <h3 className="text-lg font-semibold text-text-main tracking-tight animate-pulse">
                        {text}
                    </h3>
                    <p className="mt-1.5 text-sm text-text-muted/80 font-light italic">
                        {subText}
                    </p>
                </div>
            </div>

        </div>
    );
}