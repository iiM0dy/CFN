"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Currency = "USD" | "EUR";

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    convertPrice: (priceInUSD: number) => number;
    formatPrice: (priceInUSD: number) => string;
    exchangeRate: number;
    isRateLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currency, setCurrencyState] = useState<Currency>("USD");
    const [exchangeRate, setExchangeRate] = useState(0.92); // Default fallback
    const [isRateLoading, setIsRateLoading] = useState(true);

    useEffect(() => {
        // Load saved currency preference
        const savedCurrency = localStorage.getItem("currency") as Currency;
        if (savedCurrency && (savedCurrency === "USD" || savedCurrency === "EUR")) {
            setCurrencyState(savedCurrency);
        }

        // Fetch live exchange rate
        async function fetchExchangeRate() {
            try {
                const response = await fetch("https://api.frankfurter.app/latest?from=USD&to=EUR");
                if (response.ok) {
                    const data = await response.json();
                    if (data.rates && data.rates.EUR) {
                        setExchangeRate(data.rates.EUR);
                        console.log(`Live exchange rate updated: 1 USD = ${data.rates.EUR} EUR`);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch live exchange rate, using fallback:", error);
            } finally {
                setIsRateLoading(false);
            }
        }

        fetchExchangeRate();
    }, []);

    const setCurrency = (c: Currency) => {
        setCurrencyState(c);
        localStorage.setItem("currency", c);
    };

    const convertPrice = (priceInUSD: number) => {
        if (currency === "USD") return priceInUSD;
        return priceInUSD * exchangeRate;
    };

    const formatPrice = (priceInUSD: number) => {
        const converted = convertPrice(priceInUSD);
        if (currency === "USD") {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(converted);
        } else {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "EUR",
            }).format(converted);
        }
    };

    return (
        <CurrencyContext.Provider value={{
            currency,
            setCurrency,
            convertPrice,
            formatPrice,
            exchangeRate,
            isRateLoading
        }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
};
