import { useState, useEffect, Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { safeLocalStorage } from "@/shared/utils/safeLocalStorage";
import { $fetch } from "@/shared/api/fetch";

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
  border border-border-default bg-input text-text-main text-sm font-medium
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

export default function useCitySelect({
      city_local = "",
      city_id_local = "",
      default_city = "",
      default_city_id = ""
  }: UseCitySelectProps = {}) {

    // 1. Инициализация значения инпута (строка)
    const [city, setCity] = useState<string>(() => {
        if (default_city) return default_city;
        return safeLocalStorage.getItem(city_local) || "";
    });

    // 2. Инициализация выбранного объекта (для Combobox)
    const [selectedCity, setSelectedCity] = useState(() => {
        if (default_city && default_city_id) {
            return { id: default_city_id, name: default_city };
        }
        return null;
    });

    const [cities, setCities] = useState<CityOption[]>([]);
    const [loading, setLoading] = useState(false);

    // 3. Эффект для обновления стейта, если пропсы default прилетели асинхронно
    useEffect(() => {
        if (default_city) {
            setCity(default_city);
            // Также обновляем LS, чтобы при перезагрузке осталось то, что пришло из пропсов
            safeLocalStorage.setItem(city_local, default_city);

            if (default_city_id) {
                setSelectedCity({ id: default_city_id, name: default_city });
                safeLocalStorage.setItem(city_id_local, `${default_city_id}`);
            }
        }
    }, [default_city, default_city_id, city_local, city_id_local]);

    useEffect(() => {
        if (!city || city.length < 2) {
            setCities([]);
            return;
        }

        // Не ищем, если то, что введено, совпадает с выбранным (избегаем лишних запросов при инициализации)
        if (selectedCity && city === selectedCity.name) {
            return;
        }

        const timeout = setTimeout(async () => {
            setLoading(true);
            try {
                const response = await $fetch(`cities?city=${encodeURIComponent(city)}`);
                setCities((response?.json?.cities as CityOption[]) || []);
            } catch (e) {
                console.error(e);
            }
            setLoading(false);
        }, 500);
        return () => clearTimeout(timeout);
    }, [city, selectedCity]); // Добавил selectedCity в зависимости

    // Обработчик очистки
    const handleClear = () => {
        setCity("");
        setSelectedCity(null);
        setCities([]);
        safeLocalStorage.removeItem(city_local);
        safeLocalStorage.removeItem(city_id_local); // Используем safeLocalStorage везде для консистентности
    };

    // Синхронизация выбора с LocalStorage
    useEffect(() => {
        if (selectedCity?.id) {
            safeLocalStorage.setItem(city_id_local, `${selectedCity.id}`);
        }
    }, [selectedCity, city_id_local]);

    useEffect(() => {
        if (city) {
            safeLocalStorage.setItem(city_local, `${city}`);
        }
    }, [city, city_local]);

    const input = (
        <Combobox
            as="div"
            className="flex flex-col gap-1.5 w-full"
            value={selectedCity}
            onChange={(item: CityOption) => {
                setSelectedCity(item);
                setCity(item.name);
                // Сохранение происходит в useEffect, но можно и тут явно, если нужно быстрее
            }}
            nullable
        >
            <Combobox.Label className="text-xs font-semibold uppercase tracking-wider text-text-muted ml-1 mb-1">
                Город
            </Combobox.Label>

            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-focus-within:text-brand transition-colors duration-200">
                    <SearchIcon className="w-5 h-5" />
                </div>

                <Combobox.Input
                    className={MODERN_INPUT_CLASSES}
                    placeholder="Например: Москва"
                    displayValue={(item: any) => (typeof item === 'string' ? item : item?.name || city)}
                    onChange={(event) => {
                        setCity(event.target.value);
                        // Если пользователь начал стирать, сбрасываем выбранный объект ID
                        if (selectedCity && event.target.value !== selectedCity.name) {
                            setSelectedCity(null);
                        }
                    }}
                    autoComplete="off"
                />

                {/* Блок индикаторов справа (Лоадер ИЛИ Крестик) */}
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

                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setCities([])}
                >
                    <Combobox.Options
                        className={`absolute top-full left-0 z-50 w-full mt-2 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] focus:outline-none py-1.5 text-sm custom-scrollbar bg-surface`}
                    >
                        {city.length > 1 && cities.length === 0 && !loading ? (
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
    );

    return {
        input,
        city,
        // Возвращаем ID либо из выбранного объекта, либо, если его нет (редкий кейс), пробуем из default (если не было изменений)
        cityId: selectedCity?.id || (city === default_city ? default_city_id : undefined)
    }
}