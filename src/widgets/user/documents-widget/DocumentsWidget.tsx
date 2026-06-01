"use client"


import {DocumentWidget} from "@/widgets/user/modal-document-widget/DocumentWidget";
import {$fetch} from "@/shared/api/fetch";
import {useEffect, useState} from "react";
import Pagination from "@/features/pagination/ui/Pagination";
import {Modal} from "@/shared/ui/Modals/Modal";
import {useModal} from "@/shared/lib/hooks/useModal";
import usePaginate from "@/shared/lib/hooks/usePaginate"
import BrandActionButton from "@/shared/ui/Buttons/BrandActionButton";
import CardSkeleton from "../../../entities/document-card/CardSkeleton";
import UploadFile from "@/features/create-document/ui/UploadFile";
import Category from "@/shared/ui/Category/Category";
import {WheelXScrollProvider} from "@/shared/ui/WheelScrollXWrapper/WheelScrollXWrapper";
import Card from "@/entities/document-card/Card";

interface Props {
    isMyProfile: boolean,
    trueUser?: Record<string, any> | null
    setIsEmpty: (isEmpty: boolean) => void
}

export default function DocumentsWidget({isMyProfile, trueUser, setIsEmpty}: Props) {

    const [documents, setDocuments] = useState<Record<string, any>[] | null>(null)
    const [currentDocument, setCurrentDocument] = useState<Record<string, any> | null>(null)

    const {page, setPage, lastPage, setLastPage} = usePaginate()

    const {close: closeDocument, open: openDocument, isOpen: isOpenDocument} = useModal()
    const {close: closeCreateDocument, open: openCreateDocument, isOpen: isOpenCreateDocument} = useModal()

    const [categories, setCategories] = useState<Record<string, any>[] | null>(null)
    const [filters, setFilters] = useState({})

    const [isLoading, setIsLoading] = useState<boolean>(true)

    async function getDocuments() {

        setIsLoading(true)

        const params = new URLSearchParams(filters).toString()
        const response = await $fetch(`documents/user/${trueUser?.main?.id}?page=${page}&${params}`,
            {onLoadingChange: setIsLoading}
        )
        const documents_ = response?.json?.documents
        const page_ = response?.json?.current_page
        const lastPage_ = response?.json?.last_page
        const categories_ = response?.json?.categories
        setCategories(categories_)

        if (documents_.length > 0) {
            setDocuments(documents_)
        }

        setPage(page_)
        setLastPage(lastPage_)
    }


    useEffect(() => {
        if (trueUser) {
            getDocuments()
        }
    }, [trueUser, page, filters]);

    const [isVisible, setIsVisible] = useState<boolean>(true)

    useEffect(() => {
        const hasData = !!(documents && Array.isArray(documents) && documents.length > 0);

        // Виджет ВИДЕН, если: это мой профиль ИЛИ идет загрузка (нужно для скелетонов) ИЛИ есть данные
        setIsVisible(isMyProfile || isLoading || hasData);

        // Сообщаем странице: "Мы не пустые, если идет загрузка ИЛИ есть данные"
        setIsEmpty(isLoading || hasData);
    }, [isMyProfile, isLoading, documents]);

    return (
        isVisible &&
        <section className="glass-effect rounded-[18px] p-6 flex flex-col gap-4">

            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col gap-1">
                    <h4 className="text-text-main font-bold tracking-tight">
                        Портфолио
                    </h4>
                </div>
                {isMyProfile && (
                    <BrandActionButton onClick={openCreateDocument}>
                        Добавить документ
                    </BrandActionButton>
                )}
            </header>

            <main className="flex flex-col gap-4">

                {
                    categories && categories?.length > 0 &&
                    <div className="mt-4">
                        <WheelXScrollProvider>
                            <ul className="flex items-center gap-3 py-2 max-w-[800px] w-full">
                                <Category category={{name: "Все"}} onClick={() => setFilters(prev => ({...prev, name: "all"}))} />
                                {categories?.map((category, i) => (
                                    <Category
                                        key={i}
                                        category={category}
                                        onClick={() => {
                                            setFilters(prev => ({ ...prev, name: category?.name }))
                                        }}
                                    />
                                ))}
                            </ul>
                        </WheelXScrollProvider>
                    </div>
                }

                {documents && Array.isArray(documents) && documents?.length > 0 &&
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        {!isLoading ? documents?.map((document, i) => (
                                <Card
                                    key={i}
                                    document={document}
                                    isMyProfile={isMyProfile}
                                    onClick={() => {
                                        setCurrentDocument(document)
                                        openDocument()
                                    }}
                                />
                            )) :
                            [...Array(6)].map((e, key) =>
                                <CardSkeleton key={key} />
                            )
                        }
                    </div>
                }

                {
                    !isLoading && (!documents || (documents && Array.isArray(documents) && documents?.length < 1)) &&
                    <p className="text-text-main font-semibold">
                        Вы не загрузили ни одного документа :(
                    </p>
                }

                <Pagination currentPage={page} totalPages={lastPage} setCurrentPage={setPage} />
            </main>

            <Modal isOpen={isOpenDocument} close={closeDocument}>
                <DocumentWidget
                    isMyProfile={isMyProfile}
                    document={currentDocument}
                    close={closeDocument}
                    setDocuments={setDocuments}
                />
            </Modal>

            <Modal close={closeCreateDocument} isOpen={isOpenCreateDocument}>
                <UploadFile setDocuments={setDocuments} />
            </Modal>

        </section>
    )
}