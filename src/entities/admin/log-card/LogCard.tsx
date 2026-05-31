"use client"

import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import RouterRoundedIcon from '@mui/icons-material/RouterRounded';
import ComputerRoundedIcon from '@mui/icons-material/ComputerRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dracula} from "react-syntax-highlighter/dist/cjs/styles/prism";

interface LogProps {
    log: Record<string, any>
}

export default function LogCard({ log }: LogProps) {
    // Цветовое оформление и иконки в зависимости от уровня лога
    const getLevelBadge = (level: string) => {
        switch (level) {
            case 'error':
                return { class: "bg-red-500/10 text-red-500 border-red-500/20", icon: <ErrorRoundedIcon style={{ fontSize: 14 }} /> };
            case 'warning':
                return { class: "bg-orange-500/10 text-orange-500 border-orange-500/20", icon: <WarningRoundedIcon style={{ fontSize: 14 }} /> };
            case 'user_security':
            case 'admin_security':
                return { class: "bg-purple-500/10 text-purple-500 border-purple-500/20", icon: <SecurityRoundedIcon style={{ fontSize: 14 }} /> };
            case 'info':
            default:
                return { class: "bg-brand/10 text-text-brand border-brand/20", icon: <InfoRoundedIcon style={{ fontSize: 14 }} /> };
        }
    };

    const badge = getLevelBadge(log.level);
    const methodColors: Record<string, string> = {
        GET: "text-green-500",
        POST: "text-blue-500",
        PATCH: "text-orange-500",
        PUT: "text-orange-500",
        DELETE: "text-red-500"
    };

    const formattedDate = new Date(log.created_at).toLocaleString('ru-RU', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    return (
        <div className="glass-effect rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">

            {log.level === 'error' && (
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            )}

            <SyntaxHighlighter
                language="json"
                style={dracula}
                customStyle={{
                    width: "100%",
                    background: "transparent"
                }}
                wrapLines={true}
                lineProps={{
                    style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' }
                }}
            >
                {JSON.stringify(log, null, 2)}
            </SyntaxHighlighter>

            {
                log?.extended_info &&
                <SyntaxHighlighter
                    language="json"
                    style={dracula}
                    customStyle={{
                        width: "100%",
                        background: "transparent"
                    }}
                >
                    {JSON.stringify(JSON.parse(log?.extended_info), null, 2)}
                </SyntaxHighlighter>
            }

        </div>
    );
}