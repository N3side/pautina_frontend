import React, {Dispatch, InputHTMLAttributes, ReactNode, SetStateAction, useState} from 'react';
import {IMaskInput} from 'react-imask';
import {smooth} from "@/shared/styles/animations";
import Eye from "@/shared/ui/Buttons/Eye";


const BASE_INPUT_CLASSES = `
  w-full py-4 rounded-xl ${smooth} outline-none
  border glass-effect text-text-main text-sm font-medium
  placeholder:text-text-muted/60
  focus:ring-4 focus:ring-brand/10 focus:bg-surface
  disabled:opacity-50 disabled:cursor-not-allowed
`;

// Исправляем интерфейс: явно указываем, что value — это строка
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    isOpen?: boolean
    setIsOpen?: Dispatch<SetStateAction<any>>
    type_?: string
    value?: string;
    label?: string | null;
    error?: string | null;
    selected?: boolean;
    mask?: any;
    onAccept?: (value: string, maskRef: any) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isUsername?: boolean;
    Button?: ReactNode
    ref?: React.Ref<HTMLInputElement>;
}

const Input = ({
       isOpen,
       setIsOpen,
       type_,
       label,
       error,
       selected,
       className,
       style,
       mask,
       onAccept,
       onChange,
       isUsername,
       value,        // Выносим отдельно
       defaultValue, // Выносим отдельно
       Button,
       ...props
   }: InputProps) => {

    const dynamicInputStyle = {
        borderColor: error
            ? '#ef4444'
            : (selected ? 'var(--color-brand)' : 'var(--color-border-default)'),
        paddingLeft: isUsername ? "2.75rem" : "1.25rem",
        paddingRight: "1.25rem",
        ...style,
    };

    const toggle = () => setIsOpen && setIsOpen(prev => !prev)

    if (type_ == "password") {
        Button = <Eye isOpen={isOpen} className="cursor-pointer text-text-muted" onClick={toggle} />
    }

    return (
        <div className={`flex flex-col gap-1.5 w-full ${className || ''}`}>
            {label && (
                <p className="text-label">
                    {label}
                </p>
                // <PautinaText variant="Status" className="font-semibold uppercase tracking-wider text-text-muted ml-1 mb-0.5">
                //     {label}
                // </PautinaText>
            )}

            <div className="relative group">
                {isUsername && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10">
                        <span className={`text-base transition-colors duration-200 ${error ? 'text-red-400' : 'text-text-muted group-focus-within:text-brand'}`}>
                            @
                        </span>
                    </div>
                )}

                {mask ? (
                    <IMaskInput
                        mask={mask}
                        unmask={false}
                        onAccept={onAccept}
                        inputOptions={{
                            type: type_ === "password" ? (isOpen ? "text" : "password") : props.type
                        }}
                        // ВАЖНО: для IMask используем отдельную логику
                        type={props.type === "password" ? (isOpen ? "text" : "password") : props.type}
                        value={(value as string) ?? (defaultValue as string)}
                        className={`${BASE_INPUT_CLASSES} ${error ? 'border-red-500' : 'border-border-default hover:border-brand/50'}`}
                        style={dynamicInputStyle}
                        {...(props as any)}
                    />
                ) : (
                    <input
                        className={`${BASE_INPUT_CLASSES} ${error ? 'border-red-500' : 'border-border-default hover:border-brand/50'}`}
                        style={dynamicInputStyle}
                        onChange={onChange}
                        // Для обычного input работает как раньше
                        type={type_ === "password" ? (isOpen ? "text" : "password") : props.type}
                        value={value}
                        defaultValue={defaultValue}
                        {...props}
                        placeholder={props?.placeholder || "Введите данные..."}
                    />
                )}

                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {Button}
                </div>

                {!Button && (
                    error && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 animate-pulse">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    )
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
};

export default Input;