import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useState } from "react";

const BASE_INPUT_CLASSES = `
  !w-full !rounded-xl outline-none
  !border border-border-default !glass-effect !text-text-muted
  !focus:ring-4 !focus:ring-brand/10 !focus:bg-surface
`;

// --- ИЗМЕНЕНИЯ ЗДЕСЬ ---
// Оборачиваем в div и прокидываем className + props
const Header = ({ children, className = "", ...props }) => (
    // w-full нужен, чтобы занять всё место внутри AccordionSummary
    <div className={`flex items-center ${className}`} {...props}>
        {children}
    </div>
);

const Content = ({ children, className = "", ...props }) => (
    <div className={className} {...props}>
        {children}
    </div>
);
// -----------------------

export default function AccordionLayout({ children }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const childrenArray = React.Children.toArray(children)

    const header = childrenArray.find(
        (child): child is React.ReactElement => React.isValidElement(child) && child.type === Header
    )

    const content = childrenArray.find(
        (child): child is React.ReactElement => React.isValidElement(child) && child.type === Content
    )

    return (
        <Accordion
            disableGutters
            elevation={0}
            expanded={isExpanded}
            onChange={(_, expanded) => setIsExpanded(expanded)}
            sx={{
                background: 'transparent !important',
                boxShadow: 'none',
                '&:before': { display: 'none' }
            }}
            className={BASE_INPUT_CLASSES}
        >
            <AccordionSummary
                expandIcon={
                    <KeyboardArrowDownIcon
                        className={`w-5 transition-colors ${isExpanded ? "text-brand" : "text-text-muted"}`}
                    />
                }
                sx={{
                    '& .MuiAccordionSummary-content': { margin: '0px' }, // Важно для выравнивания
                    borderBottom: isExpanded ? '1px solid var(--border-default)' : '0px solid transparent',
                    transition: 'border-bottom 0.2s ease-in-out',
                    minHeight: '48px',
                }}
            >
                {/* React отрендерит Header с переданными пропсами */}
                {header}
            </AccordionSummary>

            <AccordionDetails sx={{ padding: 0 }}> {/* Советую убрать дефолтный паддинг тут */}
                {content}
            </AccordionDetails>
        </Accordion>
    );
}

AccordionLayout.Header = Header;
AccordionLayout.Content = Content;