"use client"

import React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Button} from "@mui/material";



// <div key={i} className="flex items-end justify-center w-8 text-text-muted">
//     <MoreHorizIcon fontSize="small" />
// </div>

export default function Pagination({ currentPage = 0, totalPages = 0, setCurrentPage=(page: number)=> {} }) {

    if (totalPages < 2) {
        return
    }

    return (
        <nav className="flex items-center justify-center gap-2 py-8">
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
                {Array(totalPages).keys().map(e =>
                    <Button
                        key={e + 1}
                        onClick={() => setCurrentPage(e + 1)}
                        className={`
                            !relative !min-w-[40px] !h-[40px] !px-2 !flex !items-center !justify-center !rounded-xl
                            !text-button-sm !transition-all !duration-300
                            ${currentPage === e + 1
                            ? '!bg-brand !text-white !shadow-lg !shadow-brand/30 !scale-110 z-10'
                            : '!glass-effect !text-text-main !hover:border-brand/50 !hover:text-brand'}
                        `}
                    >
                        {e + 1}
                    </Button>
                )}
            </div>

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