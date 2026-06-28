import {useState} from "react";

interface Props {
    pageI?: number
    lastPageI?: number
    perPageI?: number
}

export default function UsePaginate(props?: Props) {
    const pageI = props?.pageI ?? 1;
    const lastPageI = props?.lastPageI ?? 1;
    const perPageI = props?.perPageI ?? 1;

    const [page, setPage] = useState<number>(pageI)
    const [lastPage, setLastPage] = useState<number>(lastPageI)
    const [perPage, setPerPage] = useState<number>(perPageI)

    return {page, setPage, lastPage, setLastPage, perPage, setPerPage}
}