"use client";

import { useCurrency } from "@/context/currency-context";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function CurrencySwitcher() {
    const { currency, setCurrency } = useCurrency();

    const handleSwitch = (newCurrency: "USD" | "EUR") => {
        if (currency !== newCurrency) {
            setCurrency(newCurrency);
        }
    };

    return (
        <div className="flex items-center bg-white/3 border border-white/5 rounded-full p-1 h-9 shadow-inner">
            <button
                onClick={() => handleSwitch("USD")}
                className={`flex items-center justify-center px-3 h-full rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${currency === "USD"
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-slate-500 hover:text-slate-300"
                    }`}
            >
                USD
            </button>
            <button
                onClick={() => handleSwitch("EUR")}
                className={`flex items-center justify-center px-3 h-full rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${currency === "EUR"
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-slate-500 hover:text-slate-300"
                    }`}
            >
                EUR
            </button>
        </div>
    );
}
