"use client"

import { Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';

// Утилита для подсветки текста
function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const HighlightedText = ({ text = "", highlight = "" }) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi');
    const parts = text.split(regex);
    return (
        <span>
            {parts.map((part, i) =>
                regex.test(part) ? <span key={i} className="text-brand font-extrabold">{part}</span> : <span key={i}>{part}</span>
            )}
        </span>
    );
};

// Иконки
const SearchIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

const XMarkIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const MODERN_INPUT_CLASSES = `
  w-full pl-11 pr-10 py-3.5 rounded-xl outline-none
  border border-border-default glass-effect text-text-main text-sm font-medium
  placeholder:text-text-muted/70 transition-all duration-200
  focus:border-brand focus:ring-4 focus:ring-brand/10 hover:border-brand/50
`;

export interface ComboboxOption {
    id: string | number;
    name: string;
}

export interface AsyncComboboxProps<T extends ComboboxOption> {
    label?: string;
    placeholder?: string;
    inputValue: string;
    selectedOption: T | null;
    options: T[];
    isLoading: boolean;
    onInputChange: (value: string) => void;
    onChange: (option: T | null) => void;
    onClear: () => void;
    emptyState?: React.ReactNode;
    showDropdown?: boolean;
}

export function AsyncCombobox<T extends ComboboxOption>({
                                                            label,
                                                            placeholder,
                                                            inputValue,
                                                            selectedOption,
                                                            options = [],
                                                            isLoading,
                                                            onInputChange,
                                                            onChange,
                                                            onClear,
                                                            emptyState,
                                                            showDropdown = true
                                                        }: AsyncComboboxProps<T>) {

    // Флаг, открывать ли список вообще (когда идет загрузка — скрываем, чтобы не дергать старые данные)
    const isDropdownVisible = showDropdown && !isLoading && inputValue.trim().length >= 2;

    return (
        <div>
            {label && <p className="text-label mb-1.5">{label}</p>}

            <Combobox
                as="div"
                className="flex flex-col gap-1.5 w-full relative group"
                value={selectedOption}
                onChange={onChange}
                nullable
            >
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-focus-within:text-brand transition-colors duration-200 z-10">
                    <SearchIcon className="w-5 h-5" />
                </div>

                <Combobox.Input
                    className={MODERN_INPUT_CLASSES}
                    placeholder={placeholder}
                    displayValue={(item: T | null) => item ? item.name : inputValue}
                    onChange={(event) => onInputChange(event.target.value)}
                    autoComplete="off"
                />

                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center z-10">
                    {isLoading ? (
                        <div className="w-4 h-4 border-2 border-border-default border-t-brand rounded-full animate-spin"></div>
                    ) : inputValue.length > 0 ? (
                        <button
                            type="button"
                            onClick={onClear}
                            className="text-gray-400 hover:text-text-main transition-colors p-1 rounded-full"
                        >
                            <XMarkIcon className="w-4 h-4" />
                        </button>
                    ) : null}
                </div>

                {isDropdownVisible && (
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Combobox.Options className="absolute top-full left-0 z-50 w-full mt-2 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] focus:outline-none py-1.5 text-sm custom-scrollbar bg-surface max-h-60 overflow-y-auto border border-border-default/50 backdrop-blur-md">
                            {options.length > 0 ? (
                                options.map((option) => (
                                    <Combobox.Option
                                        key={option.id}
                                        value={option}
                                        className={({ active }) =>
                                            `relative cursor-pointer select-none py-2.5 pl-10 pr-4 transition-colors duration-150
                                            ${active ? 'bg-brand/10 text-brand' : 'text-text-main hover:bg-white/[0.02]'}`
                                        }
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span className={`block truncate ${selected ? 'font-semibold text-brand' : 'font-normal'}`}>
                                                    <HighlightedText text={option.name} highlight={inputValue} />
                                                </span>

                                                {selected && (
                                                    <span className="absolute inset-y-0 left-3 flex items-center text-brand">
                                                        <CheckIcon className="w-4 h-4" />
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            ) : (
                                // Если массив пустой — выводим кастомный emptyState, переданный из хука города
                                emptyState || (
                                    <div className="relative cursor-default select-none py-4 px-4 text-text-muted text-center">
                                        Ничего не найдено
                                    </div>
                                )
                            )}
                        </Combobox.Options>
                    </Transition>
                )}
            </Combobox>
        </div>
    );
}