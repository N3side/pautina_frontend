import { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

interface Props extends ComponentPropsWithoutRef<'div'> {
    Icon: any
    text: string
    link?: string
    className?: string
}

export default function IconText({Icon, text, className, link="", ...props}: Props) {
    const content = (
        <>
            <Icon className="text-text-muted !text-[16px]" />
            <p className="text-small text-text-muted font-medium max-w-[250px] w-full truncate group-hover:underline">{text}</p>
        </>
    );

    const classes = `cursor-pointer group flex gap-1 items-center select-none ${className}`;

    if (!link) {
        return (
            <div className={classes} {...props}>
                {content}
            </div>
        );
    }

    // Для Link нужно убрать onClick и другие обработчики из props
    // или преобразовать их в AnchorHTMLAttributes
    const { onClick, ...linkProps } = props;

    return (
        <Link href={link} target="_blank" className={classes} {...linkProps as any}>
            {content}
        </Link>
    );
}