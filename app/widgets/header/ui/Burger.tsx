import { useState } from "react";

interface Props {
    isActive?: boolean
    setIsActive?: (value: boolean) => void
}

function Burger({isActive, setIsActive}: Props) {

    function handleClick() {
        setIsActive(!isActive);
    }

    return (
        <button onClick={handleClick} className="cursor-pointer aspect-square w-[30px]" style={{zIndex: 21}}>
            <div className="h-full w-full relative flex">
                <div 
                    className="absolute w-full transition-[0.3s] duration-[all] h-0.5 origin-[left_top] top-[calc(30px_/_6)] bg-black"
                    style={{ transform: `${isActive ? "rotate(45deg)" : ""}`, transition: ".3s ease-in-out all" }}
                ></div>
                <div
                    className="absolute w-full transition-[0.3s] duration-[all] h-0.5 top-[calc(30px_/_2)] bg-black"
                    style={{ opacity: `${isActive ? "0" : "1"}`, transition: ".3s ease-in-out all" }}
                ></div>
                <div 
                    className="absolute w-full transition-[0.3s] duration-[all] h-0.5 origin-[left_bottom] top-[calc(5_*_30px_/_6)] bg-black"
                    style={{ transform: `${isActive ? "rotate(-45deg)" : ""}`, transition: ".3s ease-in-out all" }}
                ></div>
            </div>
        </button>
    )
}

export {Burger}