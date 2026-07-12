import {useEffect, useRef, useState} from "react";
import {useGalleryLogic} from "@/features/use-gallery-logic/UseGalleryLogic";
import {usePathname} from "next/navigation";
import {$fetch} from "@/shared/api/fetch";
import {combineDateTime, parseDateTime} from "@/shared/lib/utils/time";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import EditGallery from "@/features/edit-gallery/EditGallery";
import {dots} from "@/shared/styles/patterns/dots";
import Input from "@/shared/ui/Inputs/Input";
import Textarea from "@/shared/ui/Inputs/Textarea";
import DateInput from "@/shared/ui/Inputs/Date";
import TimeInput from "@/shared/ui/Inputs/TimeInput";
import Select from "@/shared/ui/Inputs/Select";
import ButtonLarge from "@/shared/ui/Buttons/ButtonLarge";
import RoundedIconWrapper from "@/shared/ui/IconWrapper/RoundedIconWrapper";

export default function UpdateMainEventFeature() {

    const [event, setEvent] = useState<Record<string, any> | null>(null);
    const [errors, setErrors] = useState<Record<string, any> | null>(null);

    const [dateTimeFields, setDateTimeFields] = useState({
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: ""
    });

    const {
        fileInputRef,
        handleTriggerSelect,
        handleFileChange,
        handleDelete,
        uploadAllPendingFiles,
        gallery,
        setGallery,
        flushTrash
    } = useGalleryLogic({
        galleryInit: event?.images,
        entity: "event",
        isClientOnly: true
    });

    const pathname = usePathname();
    const id = pathname.split('/').pop();
    const form = useRef<HTMLFormElement>(null);

    async function getEvent(id: string) {
        const response = await $fetch(`events/${id}`);
        const eventData = response?.json?.event;

        if (eventData) {
            setEvent(eventData);

            // Парсим даты сразу после получения данных
            const startParsed = parseDateTime(eventData.start);
            const endParsed = parseDateTime(eventData.end);

            setDateTimeFields({
                start_date: startParsed.date,
                start_time: startParsed.time,
                end_date: endParsed.date,
                end_time: endParsed.time,
            });
        }
    }

    useEffect(() => {
        if (id) getEvent(id);
    }, [id]);

    const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDateTimeFields(prev => ({
            ...prev,
            [name]: value
        }));
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form.current || !id) return;

        setErrors(null);

        const formData = new FormData(form.current);

        const { start_date, start_time, end_date, end_time } = dateTimeFields;

        const combineStart = start_date && start_time ? combineDateTime(start_date, start_time) : null;
        const combineEnd = end_date && end_time ? combineDateTime(end_date, end_time) : null;

        if (combineStart) {
            formData.set("start", combineStart);
        } else {
            formData.delete("start");
        }

        if (combineEnd) {
            formData.set("end", combineEnd);
        } else {
            formData.delete("end");
        }

        formData.delete("start_date");
        formData.delete("start_time");
        formData.delete("end_date");
        formData.delete("end_time");

        const response = await $fetch(`events/${id}`, {
            method: "PUT",
            body: formData
        });

        const errors_ = response?.json?.errors;

        if (errors_) {
            setErrors(errors_);
            return;
        }

        uploadAllPendingFiles(id);
        flushTrash()

    }

    return (
        <div className="glass-effect w-full p-6 rounded-2xl flex flex-col gap-6">

            <div className="flex items-center gap-2">
                <h6 className="text-text-main font-bold">Название, описание</h6>
                <RoundedIconWrapper Icon={PhotoLibraryOutlinedIcon} onClick={handleTriggerSelect} btnHeight={40} btnWidth={40} />
            </div>

            {gallery && gallery.length > 0 ? (
                <EditGallery
                    className="grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"
                    cards={gallery}
                    setCards={setGallery}
                    isClientOnly={true}
                    onDelete={handleDelete}
                />
            ) : (
                <div onClick={handleTriggerSelect}>
                    <div className="min-h-[200px] max-w-[400px] h-full w-full flex justify-center items-center cursor-pointer" style={{
                        backgroundImage: `url("${dots}")`
                    }}>
                        <h6 className="text-text-main font-bold">Загрузить изображения</h6>
                    </div>
                </div>
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*, video/*"
                className="hidden"
            />

            <form onSubmit={handleSubmit} ref={form} className="flex flex-col gap-4">
                <Input
                    name="title"
                    label="Заголовок *"
                    placeholder="новое событие"
                    error={errors?.title}
                    defaultValue={event?.title}
                />
                <Textarea
                    name="description"
                    placeholder=""
                    label="Описание"
                    error={errors?.description}
                    defaultValue={event?.description}
                />
                <Input
                    name="type"
                    label="Тип события *"
                    placeholder="Турнир, конференция..."
                    error={errors?.type}
                    defaultValue={event?.type}
                />

                {/* Блок дат и времени */}
                <div className="flex flex-col gap-3">
                    <h6 className="text-label">Начало — окончание</h6>
                    <div className="flex items-center gap-6">
                        <div className="flex gap-2">
                            <DateInput
                                name="start_date"
                                value={dateTimeFields.start_date}
                                onChange={handleDateTimeChange}
                                error={errors?.start_date}
                            />
                            <TimeInput
                                name="start_time"
                                value={dateTimeFields.start_time}
                                onChange={handleDateTimeChange}
                                error={errors?.start_time}
                            />
                        </div>

                        <span className="text-text-muted">—</span>

                        <div className="flex gap-2">
                            <DateInput
                                name="end_date"
                                value={dateTimeFields.end_date}
                                onChange={handleDateTimeChange}
                                error={errors?.end_date}
                            />
                            <TimeInput
                                name="end_time"
                                value={dateTimeFields.end_time}
                                onChange={handleDateTimeChange}
                                error={errors?.end_time}
                            />
                        </div>
                    </div>
                </div>

                <Input
                    name="max_members"
                    label="Максимальное кол-во участников"
                    placeholder="не обязательно"
                    defaultValue={event?.max_members || ""}
                />

                <Select
                    name="status"
                    label="Статус события *"
                    error={errors?.status}
                    defaultValue={event?.status}
                    options={[
                        {label: "Анонс (пользователи видят, но не могут записаться)", value: "announce"},
                        {label: "Регистрация (пользователи видят, могут зарегестрироваться)", value: "register"},
                        {label: "В процессе", value: "process"},
                        {label: "Закончено (никто не может записаться)", value: "completed"},
                    ]}
                    onChange={() => {}}
                />


                <Select
                    name="allow_sign_in_process"
                    label="Разрешать регистрироваться пользователем когда событие в процессе *"
                    error={errors?.allow_sign_in_process}
                    defaultValue={+event?.config?.allow_sign_in_process}
                    options={[
                        {label: "Да", value: 1},
                        {label: "Нет (пользователь не сможет зарегистрироваться, если событие в процессе)", value: 0},
                    ]}
                    placeholder="Выберите вариант"
                    onChange={() => {}}
                />

                <Select
                    name="entrance"
                    label="Доступ к событию *"
                    error={errors?.entrance}
                    defaultValue={event?.entrance}
                    options={[
                        {label: "Публичное событие", value: "public"},
                        {label: "Доступно только по ссылке", value: "link"},
                    ]}
                    placeholder="Выберите вариант"
                    onChange={() => {}}
                />

                <ButtonLarge type="submit">
                    Сохранить изменения
                </ButtonLarge>
            </form>
        </div>
    )
}