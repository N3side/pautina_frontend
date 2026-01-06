import { ReactNode, useRef, useState, useEffect } from "react";

interface DropDownProps {
    heading: ReactNode;
    content: ReactNode;
}

export default function useDropDown() {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const DropDownWrapper = ({ heading, content }: DropDownProps) => (
        <div className="relative w-full" ref={containerRef}>
            <div className="cursor-pointer">
                {heading}
            </div>

            <div
                className={`
            absolute left-0 w-full mt-2 p-5 z-[1000]
            bg-white rounded-xl shadow-2xl border border-gray-100
            transition-all duration-200 origin-top
            ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}
            >
                {content}
            </div>
        </div>
    );

    return { isOpen, setIsOpen, DropDownWrapper };
}