// widgets/sidebar/ui/Submenu.tsx
import {useEffect, useRef, useState} from "react";
import Link from "next/link";

interface SubmenuProps {
    items: any;
    isOpen: boolean;
    menuType: string;
    index: string;
    pathname?: string;
}

export const Submenu = ({items, isOpen, menuType, index, pathname}: SubmenuProps) => {
    const [height, setHeight] = useState(0);
    const submenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (submenuRef.current) {
            setHeight(isOpen ? submenuRef.current.scrollHeight : 0);
        }
    }, [isOpen, items]);

    return (
        <div
            ref={submenuRef}
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{height, opacity: isOpen ? 1 : 0}}
        >
            <ul className="mt-2 space-y-1 ml-9 border-l border-[var(--color-border-default)] pl-2">
                {items.map((subItem) => {
                    const isActive = subItem.path === pathname;

                    return (
                        <li key={subItem.name}>
                            <Link
                                href={subItem.path}
                                className={`flex items-center rounded-md px-3 py-2 transition-colors duration-200
                                ${
                                    isActive
                                        ? "text-[var(--color-brand)] font-medium"
                                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
                                }
                                `}
                            >
                                {subItem.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};