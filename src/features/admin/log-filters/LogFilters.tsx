"use client"

import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import Input from "@/shared/ui/Inputs/Input"
import Date from "@/shared/ui/Inputs/Date"
import ActionButton from "@/shared/ui/Buttons/ActionButton";
import BrandActionButton from "@/shared/ui/Buttons/BrandActionButton";

interface Props {
    getLogs: () => void;
    filters: Record<string, any>;
    handleReset: () => void;
    handleChange: (e: any) => void;
}

export default function LogFilters({ getLogs, filters, handleReset, handleChange }: Props) {
    return (
        <div className="glass-effect rounded-2xl p-6 mb-8 border-glass-border">
            <form className="flex flex-col gap-5" onSubmit={(e) => {
                e.preventDefault();
                getLogs();
            }}>
                <div className="flex items-center gap-2 mb-2 text-text-main">
                    <FilterAltRoundedIcon className="text-brand" />
                    <h5 className="font-bold">Фильтры логов</h5>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Target Identifier / Сущность (Общий текстовый поиск) */}

                    <Input placeholder="uuid или email, username, имя, фамилия, отчество..." name="user" label="Пользователь" value={filters?.user} onChange={handleChange} />

                    {/* Уровень лога (Level) */}
                    <div className="flex flex-col gap-2">
                        <label className="text-label">Уровень (Level)</label>
                        <div className="relative">
                            <select
                                value={filters?.level || ''}
                                onChange={handleChange}
                                name="level"
                                className="w-full h-11 px-4 pr-10 rounded-xl bg-input border border-border-default text-text-main text-secondary appearance-none focus:border-brand outline-none cursor-pointer"
                            >
                                <option value="">Все уровни</option>
                                <option value="info">Info</option>
                                <option value="warning">Warning</option>
                                <option value="error">Error</option>
                                <option value="user_security">User Security</option>
                                <option value="admin_security">Admin Security</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Метод запроса (Method) */}
                    <div className="flex flex-col gap-2">
                        <label className="text-label">HTTP Метод</label>
                        <div className="relative">
                            <select
                                value={filters?.method || ''}
                                onChange={handleChange}
                                name="method"
                                className="w-full h-11 px-4 pr-10 rounded-xl bg-input border border-border-default text-text-main text-secondary appearance-none focus:border-brand outline-none cursor-pointer"
                            >
                                <option value="">Любой метод</option>
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                                <option value="PATCH">PATCH</option>
                                <option value="PUT">PUT</option>
                                <option value="DELETE">DELETE</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <Input name="ip" placeholder="192.168.0.1" label="IP адрес" value={filters?.ip} onChange={handleChange} />
                    <Input name="device" placeholder="Windows, Android, Iphone, Macos, Chrome, Postman..." label="Устройство или браузер" value={filters?.device} onChange={handleChange} />
                    <Input name="entity" placeholder="Document, Subscription..." label="Сущность" value={filters?.entity} onChange={handleChange} />
                    <Input name="entity_id" placeholder="2" label="id сущности" value={filters?.entity_id} onChange={handleChange} />
                    <Date name="created_at_start" label="Дата (от)" value={filters?.created_at_start} onChange={handleChange} />
                    <Date name="created_at_end" label="Дата (до)" value={filters?.created_at_end} onChange={handleChange} />
                </div>

                {/* Кнопки действий */}
                <div className="flex items-center gap-3">
                    <ActionButton text="Сбросить" Icon={RestartAltRoundedIcon} onClick={handleReset} />

                    <BrandActionButton
                        type="submit"
                    >
                        Применить
                    </BrandActionButton>
                </div>
            </form>
        </div>
    );
}