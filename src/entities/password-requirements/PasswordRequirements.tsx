"use client"

function Requirement({text, confirmed}) {
    return (
        <span className={`text-small font-medium ${confirmed ? "text-green-500" : "text-red-500"}`}>
            • {text}
        </span>
    )
}

export default function PasswordRequirements({checkRequirements=true, password}) {
    const requirements = [
        {text: "6 символов", pattern: "/.{6,}/"},
        {text: "одна заглавная буква", pattern: "/[A-Z]/"},
        {text: "одна строчная буква", pattern: "/[a-z]/"},
        {text: "одна цифра", pattern: "/[0-9]/"},
        {text: "один спецсимвол", pattern: "/[^A-Za-z0-9]/"},
        {text: "Латинские буквы", pattern: "/^[\x00-\x7F]+$/"}
    ]

    const validateRequirement = (pattern, password) => {
        // Убираем слеши из строки с регуляркой
        const cleanPattern = pattern.replace(/^\/|\/$/g, '')
        const regex = new RegExp(cleanPattern)
        return regex.test(password)
    }

    return (
        <div className="flex flex-col gap-1">
            <p className="text-text-muted text-small font-bold">
                Минимальные требования к паролю:
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
                {requirements.map((r, i) => (
                    <Requirement text={r?.text} key={i} confirmed={validateRequirement(r?.pattern, password)} />
                ))}
            </div>
        </div>
    )
}