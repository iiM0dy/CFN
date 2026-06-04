"use client";

import { useCurrency } from "@/context/currency-context";

export function CurrencySwitcher() {
    const { currency, setCurrency } = useCurrency();

    const handleSwitch = (newCurrency: "USD" | "EUR") => {
        if (currency !== newCurrency) {
            setCurrency(newCurrency);
        }
    };

    return (
        <div className="flex items-center bg-white/[0.03] border border-white/[0.06] rounded-lg p-0.5 h-9" role="radiogroup" aria-label="Currency selection">
            <button
                onClick={() => handleSwitch("USD")}
                role="radio"
                aria-checked={currency === "USD"}
                className={`flex items-center justify-center px-2.5 h-full rounded-md text-[12px] font-bold uppercase tracking-wider transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary ${
                    currency === "USD"
                        ? "bg-primary text-white"
                        : "text-gray-500 hover:text-gray-300"
                }`}
            >
                USD
            </button>
            <button
                onClick={() => handleSwitch("EUR")}
                role="radio"
                aria-checked={currency === "EUR"}
                className={`flex items-center justify-center px-2.5 h-full rounded-md text-[12px] font-bold uppercase tracking-wider transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary ${
                    currency === "EUR"
                        ? "bg-primary text-white"
                        : "text-gray-500 hover:text-gray-300"
                }`}
            >
                EUR
            </button>
        </div>
    );
}
