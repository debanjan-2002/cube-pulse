import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import { SessionProvider } from "./contexts/SessionContext";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Cube Timer",
    description: "CS Timer alternative"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${roboto.className} h-screen flex`}>
                <SessionProvider>{children}</SessionProvider>
            </body>
        </html>
    );
}
