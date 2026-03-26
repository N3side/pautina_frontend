import type {Metadata} from "next";
import Providers from "@/shared/lib/providers/Providers"

import SubscriptionResponseListener from "@/features/subscription-response-listener/subscriptionResponseListener";
import {ThemeScript} from "@/shared/lib/providers/ThemeProvider";

export const metadata: Metadata = {
    title: "Паутина",
    description: "Единая система хранения сертификатов, проектов и достижений",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    function clampGenerator(minScreenWidth: number, maxScreenWidth: number, minValue: number, maxValue: number) {
        const slope = (maxValue - minValue) / (maxScreenWidth - minScreenWidth)
        const vw = slope * 100
        const intercept = minValue - slope * minScreenWidth
        console.log(`clamp(${minValue}px,${vw.toFixed(3)}vw+${intercept.toFixed(3)}px,${maxValue}px)`)
    }
    clampGenerator(320, 1920, 16, 40)

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <ThemeScript />
            </head>
            <body>
                <Providers>
                    {children}
                </Providers>
                <SubscriptionResponseListener />
            </body>
        </html>
    );
}
