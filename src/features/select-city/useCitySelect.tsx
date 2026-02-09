import { useState, useEffect, Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { safeLocalStorage } from "@/shared/lib/utils/safeLocalStorage";
import { $fetch } from "@/shared/api/fetch";
import toast from "react-hot-toast";
import {PautinaText} from "@/shared/styles/typography/text";

// Утилита для безопасного экранирования спецсимволов в Regex
function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Компонент для подсветки текста
const HighlightedText = ({ text = "", highlight = "" }) => {
    if (!highlight.trim()) return <span>{text}</span>;

    const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi');
    const parts = text.split(regex);

    return (
        <span>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <span key={i} className="text-brand font-extrabold">{part}</span>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </span>
    );
};

const MODERN_INPUT_CLASSES = `
  w-full pl-11 pr-10 py-3.5 rounded-xl outline-none
  border border-border-default glass-effect text-text-main text-sm font-medium
  placeholder:text-text-muted/70
  transition-all duration-200
  focus:border-brand focus:ring-4 focus:ring-brand/10
  hover:border-brand/50
`;

interface CityOption {
    id: string;
    name: string;
}

// Иконки
const SearchIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

const XMarkIcon = ({ className, onClick }: { className?: string, onClick?: () => void }) => (
    <svg onClick={onClick} className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const MapPinIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);

interface UseCitySelectProps {
    city_local?: string;
    city_id_local?: string;
    default_city?: string;
    default_city_id?: string | number;
}


// Вспомогательная функция для синхронизации
const syncLocalStorage = (key: string, value: string) => {
    if (!key) return;
    if (value && value.trim().length > 0) {
        safeLocalStorage.setItem(key, value);
    } else {
        // Если значение пустое — удаляем ключ, чтобы не хранить мусор
        safeLocalStorage.removeItem(key);
    }
};

interface UseCitySelectProps {
    city_local?: string;
    city_id_local?: string;
    default_city?: string;
    default_city_id?: string | number;
}

export default function useCitySelect({
      city_local = "",
      city_id_local = "",
      default_city = "",
      default_city_id = ""
  }: UseCitySelectProps = {}) {

    // 1. Инициализация: Пробуем default, затем LS, затем пустую строку
    const [city, setCity] = useState<string>(() => {
        if (default_city) return default_city;
        return safeLocalStorage.getItem(city_local) || "";
    });

    const [selectedCity, setSelectedCity] = useState<{ id: string | number, name: string } | null>(() => {
        if (default_city && default_city_id) {
            return { id: default_city_id, name: default_city };
        }
        // Можно также попробовать восстановить ID из LS, если нужно
        const savedId = safeLocalStorage.getItem(city_id_local);
        if (savedId && city) return { id: savedId, name: city }; // Упрощенно, т.к. имя уже в city
        return null;
    });

    const [cities, setCities] = useState<CityOption[]>([]);
    const [loading, setLoading] = useState(false);

    // 2. Обработка default значений (только если они реально пришли)
    useEffect(() => {
        // Применяем default только если они есть и отличаются от текущего
        if (default_city && default_city !== city) {
            setCity(default_city);
            syncLocalStorage(city_local, default_city);
        }
        if (default_city_id) {
            setSelectedCity({ id: default_city_id, name: default_city });
            if(city_id_local) safeLocalStorage.setItem(city_id_local, `${default_city_id}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [default_city, default_city_id]);

    // 3. Синхронизация названия города с LS
    useEffect(() => {
        // Используем хелпер, который удаляет ключ, если city пустое
        syncLocalStorage(city_local, city);
    }, [city, city_local]);

    // 4. Синхронизация ID города с LS
    useEffect(() => {
        if (city_id_local) {
            if (selectedCity?.id) {
                safeLocalStorage.setItem(city_id_local, `${selectedCity.id}`);
            } else {
                safeLocalStorage.removeItem(city_id_local);
            }
        }
    }, [selectedCity, city_id_local]);

    // 5. Поиск городов (Debounce)
    useEffect(() => {
        if (!city || city.length < 2) {
            setCities([]);
            return;
        }

        if (selectedCity && city === selectedCity.name) {
            return;
        }

        const timeout = setTimeout(async () => {
            setLoading(true);
            const response = await $fetch(`cities?city=${encodeURIComponent(city)}`);
            setCities((response?.json?.cities as CityOption[]) || []);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timeout);
    }, [city, selectedCity]);

    const handleClear = () => {
        setCity("");
        setSelectedCity(null);
        setCities([]);
        // LocalStorage очистится автоматически благодаря useEffect
    };

    const [customMode, setCustomMode] = useState(false)

    const input = (

        <div>
            <p className="text-label">Город</p>
            <Combobox
                as="div"
                className="flex flex-col gap-1.5 w-full"
                value={selectedCity}
                onChange={(item: CityOption | null) => {
                    // ВАЖНО: item может быть null при очистке через UI или Backspace в некоторых режимах
                    setSelectedCity(item);
                    // Если item есть - берем имя, если нет - оставляем текущее (или чистим, зависит от логики)
                    // Обычно при выборе из списка мы хотим жестко задать имя
                    if (item) {
                        setCity(item.name);
                    }
                }}
                nullable
            >
                {/* ... Label и Icon остаются без изменений ... */}

                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-focus-within:text-brand transition-colors duration-200">
                        <SearchIcon className="w-5 h-5" />
                    </div>

                    <Combobox.Input
                        className={MODERN_INPUT_CLASSES}
                        placeholder="Например: Москва"
                        // Добавляем проверку на null для displayValue
                        displayValue={(item: any) => {
                            if (!item) return city;
                            return typeof item === 'string' ? item : item.name;
                        }}
                        onChange={(event) => {
                            const val = event.target.value;
                            setCity(val);
                            if (selectedCity && val !== selectedCity.name) {
                                setSelectedCity(null);
                            }
                        }}
                        autoComplete="off"
                    />

                    {/* ... Индикаторы загрузки и очистки остаются без изменений ... */}
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center">
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-border-default border-t-brand rounded-full animate-spin"></div>
                        ) : city.length > 0 ? (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="text-gray-400 hover:text-text-main transition-colors p-1 rounded-full"
                            >
                                <XMarkIcon className="w-4 h-4" />
                            </button>
                        ) : null}
                    </div>

                    {/* ... Combobox.Options и Transition остаются без изменений ... */}
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setCities([])}
                    >
                        <Combobox.Options className={`absolute top-full left-0 z-50 w-full mt-2 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] focus:outline-none py-1.5 text-sm custom-scrollbar bg-surface`}>
                            {/* Логика рендера опций та же */}
                            {city.length > 1 && cities.length === 0 && !loading && !customMode ? (
                                <div className="relative cursor-default select-none py-6 px-4 text-text-muted text-center flex flex-col items-center gap-3">
                                    <div className="p-3 bg-gray-50 rounded-full">
                                        <MapPinIcon className="w-6 h-6 opacity-40" />
                                    </div>
                                    <span className="text-sm">Город <span className="font-medium text-text-main">{city}</span> не найден</span>
                                </div>
                            ) : (
                                cities.map((person) => (
                                    <Combobox.Option
                                        key={person.id}
                                        value={person}
                                        className={({ active, selected }) =>
                                            `relative cursor-pointer select-none py-2.5 pl-10 pr-4 mx-1.5 rounded-lg transition-all duration-150 ${
                                                active
                                                    ? 'bg-brand/10 text-brand font-medium'
                                                    : 'text-text-main hover:bg-gray-50'
                                            }`
                                        }
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span className={`block truncate ${selected ? 'font-bold' : 'font-normal'}`}>
                                                    <HighlightedText text={person.name} highlight={city} />
                                                </span>
                                                {selected && (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand">
                                                        <CheckIcon className="w-4 h-4" />
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>

    );

    return {
        input,
        city,
        city_id: selectedCity?.id || (city === default_city ? default_city_id : undefined)
    }
}