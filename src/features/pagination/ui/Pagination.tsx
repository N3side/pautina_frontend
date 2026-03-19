"use client"

import React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button } from "@mui/material";

export default function Pagination({ currentPage = 1, totalPages = 0, setCurrentPage = (page: number) => { } }) {

    if (totalPages < 2) {
        return null;
    }

    // Логика расчета видимых страниц (максимум 4)
    const getVisiblePages = () => {
        const half = Math.floor(4 / 2);
        let start = Math.max(currentPage - half, 1);
        let end = start + 3; // 4 кнопки всего

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(end - 3, 1);
        }

        const pages: number[] = [];
        for (let i = start; i <= end; i++) {
            pages.push(i)
        }
        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <nav className="flex items-center justify-center gap-2">
            {/* Кнопка "Назад" */}
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="
                    glass-effect w-10 h-10 flex items-center justify-center rounded-xl
                    text-text-main disabled:opacity-30 disabled:cursor-not-allowed
                    hover:border-brand/50 hover:text-brand transition-all duration-300
                    active:scale-90
                "
            >
                <ChevronLeftIcon />
            </button>

            <div className="flex items-center gap-2">
                {visiblePages.map((page) => (
                    <Button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`
                            !relative !min-w-[40px] !h-[40px] !px-2 !flex !items-center !justify-center !rounded-xl
                            !text-button-sm !transition-all !duration-300
                            ${currentPage === page
                                                ? '!bg-brand !text-white !shadow-lg !shadow-brand/30 !scale-110 z-10'
                                                : '!glass-effect !text-text-main !hover:border-brand/50 !hover:text-brand'}
                        `}
                    >
                        {page.toString()} {/* Преобразуем число в строку */}
                    </Button>
                ))}
            </div>

            {/* Кнопка "Вперед" */}
            <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="
                    glass-effect w-10 h-10 flex items-center justify-center rounded-xl
                    text-text-main disabled:opacity-30 disabled:cursor-not-allowed
                    hover:border-brand/50 hover:text-brand transition-all duration-300
                    active:scale-90
                "
            >
                <ChevronRightIcon />
            </button>
        </nav>
    );
}