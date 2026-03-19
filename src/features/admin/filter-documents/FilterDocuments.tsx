"use client"

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import BrandActionButton from "@/shared/ui/Buttons/BrandActionButton";

interface Props {
    getDocuments: any
    filters: Record<string, any>
    handleReset: () => void
    handleChange: any
}

export default function FilterDocuments({getDocuments, filters, handleReset, handleChange}: Props) {

    return (
        <div className="glass-effect rounded-2xl p-6 mb-8 border-glass-border">

            <form className="flex flex-wrap lg:flex-nowrap items-end gap-4" onSubmit={(e) => {
                e.preventDefault()
                getDocuments()
            }}>

                {/* Фильтр по Подписке */}
                <div className="flex flex-col gap-2 w-full lg:w-64">
                    <label className="text-label">Статус документа</label>
                    <select
                        value={filters?.status}
                        onChange={handleChange}
                        name="status"
                        className="w-full h-11 pl-10 pr-10 rounded-xl bg-input border border-border-default text-text-main text-secondary appearance-none focus:border-brand outline-none cursor-pointer"
                    >
                        <option value="">Все документы</option>
                        <option value="pending">ожидают проверки</option>
                        <option value="rejected">отклоненные</option>
                        <option value="approved">принятые</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex items-center gap-2">
                    <BrandActionButton
                        type="submit"
                    >
                        Применить
                    </BrandActionButton>

                    <button
                        onClick={handleReset}
                        type="button"
                        title="Сбросить фильтры"
                        className="h-11 w-11 flex items-center justify-center rounded-xl border border-border-default text-text-muted hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all"
                    >
                        <RestartAltRoundedIcon />
                    </button>
                </div>

            </form>

        </div>
    );
}