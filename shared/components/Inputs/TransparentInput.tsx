import React from "react";

export default function TransparentInput({error, name, className}) {
    return (
        <div>
            <input type="text" name={name} id="" className={className}/>

            {error && (
                <span className="text-red-500 text-sm mt-1">{error}</span>
            )}
        </div>
    )
}