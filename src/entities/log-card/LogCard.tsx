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

            {/* Заголовок: Событие и Уровень */}
            <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                    <h4 className="text-default font-bold text-text-main truncate" title={log.event}>
                        {log.event || "Неизвестное событие"}
                    </h4>
                    {log.url && (
                        <div className="flex items-center gap-1.5 mt-1 text-text-muted text-small truncate">
                            <LanguageRoundedIcon style={{ fontSize: 14 }} className="shrink-0" />
                            <span className={`font-bold shrink-0 ${methodColors[log.method?.toUpperCase()] || 'text-text-muted'}`}>
                                {log.method?.toUpperCase()}
                            </span>
                            <span className="truncate">{log.url}</span>
                        </div>
                    )}
                </div>

                <span className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-tiny font-semibold border ${badge.class} capitalize`}>
                    {badge.icon}
                    {log.level?.replace('_', ' ')}
                </span>
            </div>

            {/* Тело: Метаданные (IP, Устройство, Сущность) */}
            <div className="flex flex-col gap-2 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Сеть и устройство */}
                    <div className="flex flex-col gap-2 p-3 rounded-xl bg-input/50 border border-border-default/50 text-secondary text-text-muted">
                        <div className="flex items-center gap-2 truncate" title={log.ip}>
                            <RouterRoundedIcon style={{ fontSize: 16 }} className="shrink-0 text-brand" />
                            <span className="truncate">{log.ip || "IP не указан"}</span>
                        </div>
                        <div className="flex items-center gap-2 truncate" title={log.device}>
                            <ComputerRoundedIcon style={{ fontSize: 16 }} className="shrink-0 text-brand" />
                            <span className="truncate">{log.device || "Устройство не определено"}</span>
                        </div>
                    </div>

                    {/* Сущность (если есть) */}
                    {(log.entity || log.target_type || log.user_id) && (
                        <div className="flex flex-col gap-2 p-3 rounded-xl bg-input/50 border border-border-default/50 text-secondary text-text-muted">
                            {log.entity && (
                                <div className="flex items-center gap-2 truncate">
                                    <StorageRoundedIcon style={{ fontSize: 16 }} className="shrink-0 text-brand" />
                                    <span className="truncate">
                                        <span className="font-semibold text-text-main">{log.entity}</span>
                                        {log.entity_id && ` (ID: ${log.entity_id})`}
                                    </span>
                                </div>
                            )}
                            {log.user_id && (
                                <div className="flex items-center gap-2 truncate">
                                    <span className="text-tiny px-1.5 py-0.5 rounded bg-border-default text-text-main font-semibold">id инициатора (user_id)</span>
                                    <span className="truncate text-small">{log.user_id}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {log.extended_info && (
                    <div className="relative w-full custom-scrollbar max-w-[1500px]">
                        <SyntaxHighlighter
                            language="json"
                            style={dracula}
                            customStyle={{
                                width: "100%",
                                background: "transparent"
                            }}
                        >
                            {JSON.stringify(JSON.parse(log.extended_info), null, 2)}
                        </SyntaxHighlighter>
                    </div>
                )}
            </div>

            {/* Подвал: Дата и время */}
            <div className="mt-auto pt-3 border-t border-glass-border flex items-center justify-between">
                <span className="text-label text-text-muted">
                    {formattedDate}
                </span>
            </div>
        </div>
    );
}