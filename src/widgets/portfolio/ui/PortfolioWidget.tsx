"use client"

import Book from "@/shared/assets/images/vector/Book";
import {Button} from "@mui/material";
import {cards, categories, CategoriesProps} from "@/widgets/portfolio/model";
import Card from "@/widgets/portfolio/ui/Card";
import {WheelXScrollProvider} from "@/shared/ui/Wrappers/WheelScrollXWrapper";
import {DocumentWidget} from "@/widgets/portfolio/ui/DocumentWidget";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import useCreateDocument from "@/features/create-document/ui/CreateDocument";
import {$fetch} from "@/shared/api/fetch";
import {useEffect, useState} from "react";
import Pagination from "@/features/pagination/ui/Pagination";
import {Modal} from "@/shared/ui/Modals/Modal";
import {useModal} from "@/shared/ui/Modals/useModal";
import CreateDocumentForms from "@/features/create-document/ui/CreateDocument";

interface Props {
    isMyProfile: boolean,
    trueUser?: Record<string, any>
}

export default function PortfolioWidget({isMyProfile, trueUser}: Props) {

    const [documents, setDocuments] = useState<Record<string, any>[] | null>(null)
    const [currentDocument, setCurrentDocument] = useState<Record<string, any> | null>(null)
    const [page, setPage] = useState<number>(0)
    const [lastPage, setLastPage] = useState<number>(0)

    const {close: closeDocument, open: openDocument, isOpen: isOpenDocument} = useModal()
    const {close: closeCreateDocument, open: openCreateDocument, isOpen: isOpenCreateDocument} = useModal()


    async function getDocuments() {

        const response = await $fetch(`documents/user/${trueUser?.id}?page=${page}`)

        const documents_ = response?.json?.documents
        const page_ = response?.json?.current_page
        const lastPage_ = response?.json?.last_page

        setDocuments(documents_)
        setPage(page_)
        setLastPage(lastPage_)
    }

    useEffect(() => {
        if (trueUser) {
            getDocuments()
        }

    }, [trueUser, page]);

    if (!trueUser?.documents) {
        return
    }

    return (
        <section className="mt-[100px]">

            {/* --- HEADER --- */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col gap-1">
                    <h4 className="text-text-main font-bold tracking-tight">
                        Портфолио
                    </h4>

                    <p className="text-secondary text-text-muted">
                        Достижения, сертификаты и проекты
                    </p>
                </div>

                {isMyProfile && (
                    <Button
                        variant="contained"
                        disableElevation
                        className="
                            !bg-brand hover:!bg-brand-hover
                            !text-white !font-medium !rounded-xl
                            !py-2.5 !px-5 !shadow-lg !shadow-brand/25
                            hover:!shadow-brand/40 !transition-all !normal-case
                            w-full md:w-auto flex items-center gap-2
                        "
                        onClick={openCreateDocument}
                    >
                        <div className="w-5 h-5 flex items-center justify-center">
                            <Book />
                        </div>
                        <span>Добавить документ</span>
                    </Button>
                )}

            </header>

            <main className="flex flex-col gap-8">

                {/* --- CATEGORIES (Chips) --- */}
                {/* Добавил -mx-4 px-4, чтобы на мобилках скролл уходил за край экрана красиво */}
                <div className="-mx-4 px-4 md:mx-0 md:px-0">
                    <WheelXScrollProvider>
                        <ul className="flex items-center gap-3 py-2">
                            {categories?.map((category: CategoriesProps, i) => (
                                <li
                                    key={i}
                                    className="
                                        group flex items-center gap-2.5
                                        py-2 px-4 rounded-full
                                        glass-effect border border-border-default
                                        cursor-pointer select-none
                                        transition-all duration-300
                                        hover:border-brand/50 hover:shadow-md hover:-translate-y-0.5
                                        active:scale-95
                                    "
                                >
                                    <p
                                        className="text-small font-medium text-text-main group-hover:text-brand transition-colors whitespace-nowrap"
                                    >
                                        {category.text}
                                    </p>

                                    {/* Badge с количеством */}
                                    <div className="flex items-center justify-center px-2 py-0.5 rounded-full group-hover:bg-brand/10 transition-colors">
                                        <p
                                            className="text-tiny font-bold text-text-muted group-hover:text-brand transition-colors"
                                        >
                                            {category.count}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </WheelXScrollProvider>
                </div>

                {/* --- CARDS GRID --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                    <div className="group md:flex hidden h-full w-full min-h-[313px] flex-col justify-center items-center text-center cursor-pointer
                        rounded-xl border-2 border-dashed border-[var(--color-border-default)] bg-transparent
                        hover:border-[var(--color-brand)] hover:bg-[var(--color-brand)]/5
                        transition-all duration-300 ease-in-out"
                         onClick={openCreateDocument}
                    >

                        <div className="flex flex-col gap-3 justify-center items-center p-6">
                            {/* Иконка: используем text-muted по умолчанию и text-brand при ховере */}
                            <AddCircleIcon className="w-10 h-10 text-[var(--color-text-muted)]
                                transition-all duration-500 ease-out
                                group-hover:text-[var(--color-brand)] group-hover:scale-110 group-hover:rotate-90"
                            />

                            {/* Текст: используем твои классы типографики */}
                            <div className="flex flex-col gap-1">
                                <p className="text-button-lg text-[var(--color-text-muted)] transition-colors duration-300 group-hover:text-[var(--color-text-brand)]">
                                    Загрузить
                                </p>

                            </div>
                        </div>
                    </div>

                    {documents && documents?.map((document, i) => (
                        // Обертка для анимации появления (опционально)
                        <div key={i} className="h-full">
                            <Card
                                document={document}
                                onClick={() => {
                                    setCurrentDocument(document)
                                    openDocument()
                                }}
                            />
                        </div>
                    ))}

                    {/* Empty State (на случай если карт нет) */}
                    {(!cards || cards.length === 0) && (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border-default rounded-2xl bg-surface/50">
                            <p className="text-secondary text-text-muted mb-4">
                                Пока нет добавленных проектов
                            </p>
                            <Button
                                variant="text"
                                className="!text-brand !normal-case"
                            >
                                Добавить первый проект
                            </Button>
                        </div>
                    )}
                </div>

                {documents &&
					<Pagination currentPage={page} totalPages={lastPage} setCurrentPage={setPage} />
                }
            </main>

            <Modal isOpen={isOpenDocument} close={closeDocument}>
                <DocumentWidget
                    document={currentDocument}
                    close={closeDocument}
                    setDocuments={setDocuments}
                />
            </Modal>

            <Modal close={closeCreateDocument} isOpen={isOpenCreateDocument}>
                <CreateDocumentForms
                    setDocuments={setDocuments}
                    close={closeCreateDocument}
                />
            </Modal>

        </section>
    );
}