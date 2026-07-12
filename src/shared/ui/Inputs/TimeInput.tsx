import React, { InputHTMLAttributes, useRef } from 'react';
import { smooth } from "@/shared/styles/animations";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const BASE_INPUT_CLASSES = `
  w-full py-4 rounded-xl ${smooth} outline-none
  border glass-effect text-text-main text-sm font-medium
  placeholder:text-text-muted/60
  focus:ring-4 focus:ring-brand/10 focus:bg-surface
  disabled:opacity-50 disabled:cursor-not-allowed
`;

interface TimeInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string | null;
    error?: string | null;
    selected?: boolean;
}

export default function TimeInput({
                                      label,
                                      error,
                                      selected,
                                      className,
                                      style,
                                      value,
                                      defaultValue,
                                      onChange,
                                      ...props
                                  }: TimeInputProps) {

    const inputRef = useRef<HTMLInputElement>(null);

    const handleIconClick = () => {
        inputRef.current?.showPicker();
    };

    const dynamicInputStyle = {
        borderColor: error
            ? '#ef4444'
            : (selected ? 'var(--color-brand)' : 'var(--color-border-default)'),
        paddingLeft: "1.25rem",
        paddingRight: "3rem",
        ...style,
    };

    return (
        <div className={`flex flex-col gap-1.5 w-full ${className || ''}`}>
            {label && (
                <p className="text-label">
                    {label}
                </p>
            )}

            <div className="relative group">
                <input
                    ref={inputRef}
                    type="time"
                    className={`
                        ${BASE_INPUT_CLASSES} 
                        ${error ? 'border-red-500' : 'border-border-default hover:border-brand/50'}
                        [color-scheme:dark]
                        [&::-webkit-calendar-picker-indicator]:hidden
                        [&::-webkit-calendar-picker-indicator]:opacity-0
                        [&::-webkit-calendar-picker-indicator]:absolute
                        [&::-webkit-calendar-picker-indicator]:w-0
                    `}
                    style={dynamicInputStyle}
                    onChange={onChange}
                    value={value}
                    defaultValue={defaultValue}
                    {...props}
                />

                <button
                    type="button"
                    onClick={handleIconClick}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-brand transition-colors duration-200 focus:outline-none"
                    aria-label="Выбрать время"
                >
                    <AccessTimeIcon
                        sx={{
                            fontSize: 20,
                            color: error ? '#ef4444' : 'currentColor'
                        }}
                    />
                </button>

                {error && (
                    <div className="absolute right-12 top-1/2 -translate-y-1/2 text-red-500 animate-pulse">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                )}
            </div>

            {error && (
                <div className="min-h-[20px] ml-1">
                    <span className="text-red-500 text-[12px] font-medium leading-none transition-all">
                        {error}
                    </span>
                </div>
            )}
        </div>
    );
}
