import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/shared/lib/providers/Providers"

import {Toaster} from "react-hot-toast";
import ClientOnly from "@/shared/ui/ClientOnly/ClientOnly";

export const metadata: Metadata = {
    title: "Паутина",
    description: "Единая система хранения сертификатов, проектов и достижений",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    // function clampGenerator(minScreenWidth: number, maxScreenWidth: number, minValue: number, maxValue: number) {
    //     const slope = (maxValue - minValue) / (maxScreenWidth - minScreenWidth)
    //     const vw = slope * 100
    //     const intercept = minValue - slope * minScreenWidth
    //     console.log(`clamp(${minValue}px, ${vw.toFixed(3)}vw + ${intercept.toFixed(3)}px, ${maxValue}px);`)
    // }

    // clampGenerator(320, 1920, 30, 40)

    return (
        <html lang="en">
            <body>
                <Providers>
                    {children}
                </Providers>
                <ClientOnly>
                    <Toaster />
                </ClientOnly>
            </body>
        </html>
    );
}
