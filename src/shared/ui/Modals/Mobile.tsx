import { Drawer } from "vaul";
import { ReactNode } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface UseModalProps {
    isOpen: boolean;
    children: ReactNode;
    modalClassName?: string;
    sheetClassName?: string;
    close: () => void;
}

export const overlay = `fixed inset-0 z-[1300] bg-black/40 backdrop-blur-[2px]`
export const bg = `fixed z-[1301] flex flex-col outline-none glass-effect`
export const content = `overflow-y-auto h-full custom-scrollbar p-6 md:p-8`

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function Mobile({
       isOpen,
       children,
       modalClassName = "",
       sheetClassName = "",
       close,
   }: UseModalProps) {
    return (
        <Drawer.Root
            open={isOpen}
            onClose={close}
            shouldScaleBackground={false}
            dismissible={true}
        >
            <Drawer.Portal>
                <Drawer.Overlay className={cn(overlay)} />

                <Drawer.Content
                    className={cn(
                        bg,
                        "bottom-0 left-0 right-0 max-h-[96%] rounded-t-[24px]",
                        sheetClassName
                    )}
                >
                    <div className="mx-auto mt-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />

                    <div className={cn(
                        content,
                        modalClassName
                    )}>
                        {children}
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}