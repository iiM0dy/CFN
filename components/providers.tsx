"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"

import { Toaster } from "sonner"
import { CurrencyProvider } from "@/context/currency-context"

export function Providers({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <SessionProvider>
            <CurrencyProvider>
                <NextThemesProvider {...props}>
                    {children}
                    <Toaster />
                </NextThemesProvider>
            </CurrencyProvider>
        </SessionProvider>
    )
}
