import {useEffect, useState} from "react";

export function useHeaderHeight() {

    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const header = document.querySelector('header');
        if (header) {
            setHeaderHeight(header.offsetHeight);
        }
    }, []);

    return {headerHeight, setHeaderHeight}
}