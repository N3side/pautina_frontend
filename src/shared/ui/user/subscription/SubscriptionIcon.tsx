interface Props {
    [key: string]: any
}

export default function SubscriptionIcon({...props}: Props) {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C16 9.73198 9.73198 16 2 16C9.73198 16 16 22.268 16 30C16 22.268 22.268 16 30 16C22.268 16 16 9.73198 16 2Z" fill="url(#paint0_linear_154_39)"/>
            <path d="M16 8C16 12.4183 12.4183 16 8 16C12.4183 16 16 19.6183 16 24C16 19.6183 19.6183 16 24 16C19.6183 16 16 12.4183 16 8Z" fill="white" fill-opacity="0.5"/>
            <defs>
                <linearGradient id="paint0_linear_154_39" x1="16" y1="14" x2="25" y2="26" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#0EA5E9"/>
                    <stop offset="1" stop-color="#948BFA"/>
                </linearGradient>
            </defs>
        </svg>



    )
}