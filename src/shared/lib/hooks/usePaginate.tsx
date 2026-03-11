import {useState} from "react";

export default function UsePaginate() {

    const [page, setPage] = useState<number>(1)
    const [lastPage, setLastPage] = useState<number>(1)


    return {page, setPage, lastPage, setLastPage}
}