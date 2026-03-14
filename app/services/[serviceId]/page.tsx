"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { useSession } from "next-auth/react";
import {
    Shield, Clock, Lock, Zap, ChevronRight, Computer,
    Gamepad2, ArrowRight, CheckCircle2, Rocket, TrendingUp, Heart
} from "lucide-react";
import { useCurrency } from "@/context/currency-context";
import { motion } from "framer-motion";

interface ServiceOptionValue {
    id: string;
    label: string;
    value: string;
    priceModifier: number;
    isDefault: boolean;
    order: number;
}

interface ServiceOption {
    id: string;
    label: string;
    type: string;
    required: boolean;
    order: number;
    minValue?: number;
    maxValue?: number;
    step?: number;
    values: ServiceOptionValue[];
}

interface Service {
    id: string;
    name: string;
    description: string | null;
    basePrice: string;
    platforms: string[];
    completionMethods: string[];
    maxQuantity?: number;
    image?: string | null;
    options?: ServiceOption[];
    game: {
        name: string;
        slug: string;
    };
}

export default function ServiceDetailsPage() {
    const { serviceId } = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const { formatPrice } = useCurrency();
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [minPrice, setMinPrice] = useState<number>(0);

    // Form state
    const [platform, setPlatform] = useState("");
    const [completionMethod, setCompletionMethod] = useState("");
    const [completionSpeed, setCompletionSpeed] = useState<string | null>(null);
    const [promoCode, setPromoCode] = useState("");
    const [quantity, setQuantity] = useState(1); // Default to 1
    const [selectedOptions, setSelectedOptions] = useState<Record<string, any>>({});
    const [activeTab, setActiveTab] = useState("description");

    // Promo code state
    const [promoCodeData, setPromoCodeData] = useState<any>(null);
    const [promoCodeError, setPromoCodeError] = useState("");
    const [isValidatingPromo, setIsValidatingPromo] = useState(false);

    // Payment modal state
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

    // Favorite state
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.dropdown-container')) {
                document.querySelectorAll('[id^="dropdown-"]').forEach(dropdown => {
                    dropdown.classList.add('hidden');
                });
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        async function fetchService() {
            try {
                const res = await fetch(`/api/services/${serviceId}`);
                if (res.ok) {
                    const data = await res.json();
                    setService(data);
                    if (data.platforms?.length > 0) setPlatform(data.platforms[0]);
                    if (data.completionMethods?.length > 0) setCompletionMethod(data.completionMethods[0]);

                    // Calculate minimum starting price
                    let bPrice = Number(data.basePrice);
                    let minAddPrice = 0;
                    data.options?.forEach((opt: any) => {
                        if (opt.type === 'number' || opt.type === 'range') {
                            if (opt.minValue && opt.minValue > 0) {
                                if (data.name?.toLowerCase().includes('coin')) {
                                    bPrice = (bPrice * opt.minValue) / 1000;
                                } else {
                                    bPrice = bPrice * opt.minValue;
                                }
                            }
                        } else if (opt.required && opt.values && opt.values.length > 0) {
                            const prices = opt.values.map((v: any) => Number(v.priceModifier || 0));
                            minAddPrice += Math.min(...prices);
                        }
                    });
                    setMinPrice(bPrice + minAddPrice);

                    // Set initial selections based on isDefault, cheapest for required, or first option
                    const initialSelections: Record<string, any> = {};
                    data.options?.forEach((opt: any) => {
                        const sortedValues = [...(opt.values || [])].sort((a: any, b: any) => Number(a.order) - Number(b.order));
                        const defaultValues = sortedValues.filter((v: any) => v.isDefault).map((v: any) => v.value);

                        if (opt.type === 'range') {
                            const isWorkshop = data.name === "Workshop Leveling";
                            let desiredValue = opt.maxValue || opt.minValue || 0;

                            if (isWorkshop) {
                                if (opt.label === "Level range (Scrappy)") desiredValue = 2;
                                else if (opt.label === "Level range (Specific bench)") desiredValue = 1;
                            }

                            initialSelections[opt.id] = {
                                current: Number(opt.minValue || 0),
                                desired: Number(desiredValue)
                            };
                        } else if (opt.type === 'number') {
                            initialSelections[opt.id] = opt.minValue || 0;
                        } else if (defaultValues.length > 0) {
                            // Respect isDefault if present
                            if (opt.type === 'select' || opt.type === 'dropdown') {
                                initialSelections[opt.id] = defaultValues[0];
                            } else if (opt.type === 'checkbox' || opt.type === 'checkboxes') {
                                initialSelections[opt.id] = defaultValues;
                            }
                        } else if (sortedValues.length > 0) {
                            // Fallback: For select/dropdown or if it's the "Stages" option, pick the first one
                            if (opt.type === 'select' || opt.type === 'dropdown' || opt.label === 'Stages' || opt.label === 'Boosting options') {
                                const firstValue = sortedValues[0].value;
                                if (opt.type === 'checkbox' || opt.type === 'checkboxes') {
                                    initialSelections[opt.id] = [firstValue];
                                } else {
                                    initialSelections[opt.id] = firstValue;
                                }
                            } else if (opt.required) {
                                // Fallback for other required options: cheapest
                                const cheapestValue = [...opt.values].sort((a: any, b: any) => Number(a.priceModifier) - Number(b.priceModifier))[0];
                                if (opt.type === 'checkbox' || opt.type === 'checkboxes') {
                                    initialSelections[opt.id] = [cheapestValue.value];
                                } else {
                                    initialSelections[opt.id] = cheapestValue.value;
                                }
                            }
                        }
                    });
                    setSelectedOptions(initialSelections);

                    // Check if service is favorited
                    if (session?.user) {
                        checkFavorite();
                    }
                } else {
                    console.error("Failed to fetch service");
                }
            } catch (error) {
                console.error("Error fetching service:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchService();
    }, [serviceId, session]);

    const checkFavorite = async () => {
        try {
            const res = await fetch('/api/favorites');
            if (res.ok) {
                const favorites = await res.json();
                setIsFavorite(favorites.some((fav: any) => fav.serviceId === serviceId));
            }
        } catch (error) {
            console.error('Error checking favorite:', error);
        }
    };

    const toggleFavorite = async () => {
        if (!session?.user) {
            router.push('/login?callbackUrl=' + encodeURIComponent(window.location.href));
            return;
        }

        setFavoriteLoading(true);
        try {
            if (isFavorite) {
                const res = await fetch(`/api/favorites?serviceId=${serviceId}`, {
                    method: 'DELETE'
                });
                if (res.ok) {
                    setIsFavorite(false);
                }
            } else {
                const res = await fetch('/api/favorites', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ serviceId })
                });
                if (res.ok) {
                    setIsFavorite(true);
                }
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        } finally {
            setFavoriteLoading(false);
        }
    };

    const isOptionVisible = (option: ServiceOption) => {
        if (service?.name === "Workshop Leveling") {
            const whatToLevelOption = service.options?.find(o => o.label === "What should we level up?");
            const whatToLevelValue = whatToLevelOption ? selectedOptions[whatToLevelOption.id] : null;

            if (option.label === "Level range (Scrappy)") return whatToLevelValue === "scrappy";
            if (option.label === "Level range (Specific bench)") return whatToLevelValue === "specific_bench";
            if (option.label === "Bench") return whatToLevelValue === "specific_bench";
            if (option.label === "Multiple choice (0 to max)" || option.label === "Options") return whatToLevelValue === "zero_to_max";
        }
        return true;
    };

    // Calculate total price
    const calculateTotalPrice = () => {
        let price = 0;

        // Check if this is a Coins service (price per unit)
        const isCoinsService = service?.name?.toLowerCase().includes('coin');

        if (isCoinsService) {
            // For coins service, calculate based on quantity selected (no base price)
            service?.options?.forEach(option => {
                if (option.type === 'number') {
                    const coinAmount = selectedOptions[option.id] || option.minValue || 0;
                    price = (Number(service.basePrice) * coinAmount) / 1000; // Price per 1K coins
                }
            });
        } else {
            // For other services (like Custom Loadout), start with base price
            price = Number(service?.basePrice || 0);

            // Add price modifiers from selected options
            service?.options?.forEach(option => {
                const isVisible = isOptionVisible(option);
                if (!isVisible) return;

                const selected = selectedOptions[option.id];
                if (selected !== undefined && selected !== null) {
                    if (Array.isArray(selected)) {
                        // Multiple selections (checkbox)
                        selected.forEach(val => {
                            const optionValue = option.values.find(v => v.value === val);
                            if (optionValue) price += Number(optionValue.priceModifier);
                        });
                    } else if (option.type === 'range') {
                        // Range selection (current to desired)
                        const current = Number(selected.current ?? option.minValue ?? 0);
                        const desired = Number(selected.desired ?? option.maxValue ?? 100);
                        const levels = Math.max(0, desired - current);

                        const pricePerLevelValue = option.values.find(v => v.value === 'price_per_level');
                        let pricePerLevel = 0;
                        if (pricePerLevelValue) {
                            pricePerLevel = Number(pricePerLevelValue.priceModifier);
                        } else if (service?.name === "Workshop Leveling") {
                            if (option.label.includes("Scrappy")) pricePerLevel = 3.0;
                            else if (option.label.includes("Specific bench")) pricePerLevel = 3.0;
                        }

                        price += levels * pricePerLevel;
                    } else if (option.type !== 'number') {
                        // Single selection
                        const optionValue = option.values.find(v => v.value === selected);
                        if (optionValue) price += Number(optionValue.priceModifier);
                    }
                }
            });

            // Multiply by quantity for non-coins services
            price *= quantity;
        }

        // Add completion speed modifier (percentage of current price)
        if (completionSpeed === 'express') {
            price *= 1.20; // +20%
        } else if (completionSpeed === 'super_express') {
            price *= 1.40; // +40%
        }

        // Apply promo code discount
        if (promoCodeData) {
            if (promoCodeData.discountType === 'percentage') {
                price = price * (1 - promoCodeData.discount / 100);
            } else {
                price = Math.max(0, price - promoCodeData.discount);
            }
        }

        return price;
    };

    // Validate promo code
    const validatePromoCode = async () => {
        if (!promoCode.trim()) return;

        setIsValidatingPromo(true);
        setPromoCodeError("");

        try {
            const res = await fetch('/api/promo-codes/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: promoCode })
            });

            const data = await res.json();

            if (res.ok) {
                setPromoCodeData(data);
                setPromoCodeError("");
            } else {
                setPromoCodeError(data.error);
                setPromoCodeData(null);
            }
        } catch (error) {
            setPromoCodeError("Failed to validate promo code");
            setPromoCodeData(null);
        } finally {
            setIsValidatingPromo(false);
        }
    };

    // Handle order click
    const handleOrderClick = () => {
        // Show payment modal (Guest Checkout Enabled)
        setShowPaymentModal(true);
    };

    // Handle payment method selection and purchase
    const handlePurchase = async () => {
        if (!selectedPaymentMethod) {
            alert('Please select a payment method');
            return;
        }

        try {
            // Create order in database
            const orderData = {
                serviceId: service?.id,
                totalPrice: calculateTotalPrice(),
                quantity,
                platform,
                completionMethod,
                completionSpeed,
                promoCode: promoCodeData ? promoCode : null,
                discount: promoCodeData ? (promoCodeData.discountType === 'percentage'
                    ? (Number(calculateTotalPrice()) * promoCodeData.discount / 100)
                    : promoCodeData.discount) : 0,
                selectedOptions
            };

            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (res.ok) {
                const order = await res.json();
                // Process payment (to be implemented with actual payment gateway)
                alert(`Order created successfully! Order ID: ${order.id.slice(0, 8)}\nPayment via ${selectedPaymentMethod} will be processed.`);
                setShowPaymentModal(false);
                router.push('/orders');
            } else {
                alert('Failed to create order. Please try again.');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('An error occurred. Please try again.');
        }
    };

    // Calculate speed boost price for display
    const getSpeedBoostPrice = (speedType: string) => {
        let basePrice = 0;

        const isCoinsService = service?.name?.toLowerCase().includes('coin');

        if (isCoinsService) {
            // For coins service, calculate from coin amount only
            service?.options?.forEach(option => {
                if (option.type === 'number') {
                    const coinAmount = selectedOptions[option.id] || option.minValue || 0;
                    basePrice = (Number(service.basePrice) * coinAmount) / 1000;
                }
            });
        } else {
            // For other services, start with base price
            basePrice = Number(service?.basePrice || 0);

            // Add price from selected options
            service?.options?.forEach(option => {
                const selected = selectedOptions[option.id];
                if (selected) {
                    if (Array.isArray(selected)) {
                        selected.forEach(val => {
                            const optionValue = option.values.find(v => v.value === val);
                            if (optionValue) basePrice += Number(optionValue.priceModifier);
                        });
                    } else if (option.type !== 'number' && option.type !== 'range') {
                        const optionValue = option.values.find(v => v.value === selected);
                        if (optionValue) basePrice += Number(optionValue.priceModifier);
                    }
                }
            });
            basePrice *= quantity;
        }

        if (speedType === 'express') {
            return basePrice * 0.20; // 20% of base
        } else if (speedType === 'super_express') {
            return basePrice * 0.40; // 40% of base
        }
        return 0;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
            </div>
        );
    }

    if (!service) {
        return notFound();
    }

    return (
        <div className="relative flex min-h screen flex-col bg-[#0B0B0B] text-white font-sans">
            <main className="grow w-full max-w-[1440px] mx-auto px-6 lg:px-10 pt-9 pb-8">
                {/* Tactical Breadcrumbs */}
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-9">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                    <Link href="/games" className="hover:text-primary transition-colors">Games</Link>
                    <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                    <Link href={`/games/${service.game.slug}/services`} className="hover:text-primary transition-colors">{service.game.name}</Link>
                    <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                    <span className="text-white">{service.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative">
                    {/* Left Column */}
                    <div className="lg:col-span-8 flex flex-col gap-10">
                        {/* Hero Section */}
                        <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-[#141414] shadow-2xl">
                            {/* Background Image (if available) */}
                            {service.image && (
                                <div className="absolute inset-0 opacity-20 pointer-events-none">
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-r from-[#141414] via-[#141414]/95 to-transparent"></div>
                                </div>
                            )}

                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none"></div>

                            <div className="relative z-10 p-8 flex flex-col md:flex-row gap-8">
                                {/* Service Image Thumbnail */}
                                {service.image && (
                                    <div className="hidden md:block shrink-0">
                                        <div className="w-44 h-[234px] rounded-xl overflow-hidden border border-white/10 shadow-2xl relative">
                                            <img
                                                src={service.image}
                                                alt={service.name}
                                                className="w-full h-full object-cover opacity-100"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col gap-4 flex-1">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest italic">
                                            <span className="material-symbols-outlined text-xs">bolt</span>
                                            Service Detail
                                        </div>
                                        <button
                                            onClick={toggleFavorite}
                                            disabled={favoriteLoading}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${isFavorite
                                                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                                                : 'bg-white/5 border-white/10 text-slate-400 hover:border-primary/50 hover:text-white'
                                                }`}
                                        >
                                            <span className={`material-symbols-outlined text-[18px] ${isFavorite ? 'fill-1' : ''}`}>favorite</span>
                                            <span className="text-[11px] font-black uppercase tracking-widest">{isFavorite ? 'Saved' : 'Save Asset'}</span>
                                        </button>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter font-cairo">
                                            {service.name}
                                        </h1>
                                        <div className="flex flex-col items-start md:items-end bg-primary/5 px-4 py-2 rounded-xl border border-primary/20 backdrop-blur-sm">
                                            <span className="text-[9px] font-black text-primary uppercase tracking-widest mb-1 leading-none">Starting From</span>
                                            <span className="text-3xl font-black text-white tracking-tighter font-cairo leading-none">
                                                {formatPrice(minPrice)}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-2xl italic">
                                        {service.description}
                                    </p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                                            <span className="material-symbols-outlined text-primary text-sm">verified</span>
                                            Field Experts
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                                            <span className="material-symbols-outlined text-primary text-sm">schedule</span>
                                            Rapid Deployment
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                                            <span className="material-symbols-outlined text-primary text-sm">shield_locked</span>
                                            Encrypted Protocol
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Configuration Sections */}
                        <div className="flex flex-col gap-8">

                            {/* Platform Selection */}
                            {service.platforms && service.platforms.length > 0 && (
                                <section>
                                    <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2">
                                        <span className="w-1 h-5 bg-primary rounded-full"></span>
                                        1. Select Platform
                                    </h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {service.platforms.map((p) => (
                                            <label key={p} className="cursor-pointer relative group">
                                                <input
                                                    type="radio"
                                                    name="platform"
                                                    value={p}
                                                    checked={platform === p}
                                                    onChange={(e) => setPlatform(e.target.value)}
                                                    className="peer sr-only"
                                                />
                                                <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-[#2a1a1c] bg-[#141414] hover:bg-[#1c1c1c] transition-all h-24 peer-checked:border-primary peer-checked:bg-primary/10">
                                                    {p.toLowerCase().includes('pc') ? (
                                                        <Computer className="size-8 text-gray-400 peer-checked:text-white group-hover:text-white transition-colors" />
                                                    ) : (
                                                        <Gamepad2 className="size-8 text-gray-400 peer-checked:text-white group-hover:text-white transition-colors" />
                                                    )}
                                                    <span className="text-sm font-bold text-gray-400 peer-checked:text-white group-hover:text-white">{p}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Dynamic Options from Database */}
                            {(() => {
                                const filteredOptions = service.options?.sort((a, b) => a.order - b.order).filter(isOptionVisible) || [];
                                return filteredOptions.map((option, index) => (
                                    <section key={option.id}>
                                        <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2">
                                            <span className="w-1 h-5 bg-primary rounded-full"></span>
                                            {index + (service.platforms?.length > 0 ? 2 : 1)}. {option.label}
                                        </h3>

                                        {/* Select Type */}
                                        {option.type === 'select' && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {option.values.sort((a, b) => a.order - b.order).map((value) => (
                                                    <label key={value.id} className="cursor-pointer relative">
                                                        <input
                                                            type="radio"
                                                            name={option.id}
                                                            value={value.value}
                                                            checked={selectedOptions[option.id] === value.value}
                                                            onChange={(e) => setSelectedOptions({
                                                                ...selectedOptions,
                                                                [option.id]: e.target.value
                                                            })}
                                                            className="peer sr-only"
                                                            required={option.required}
                                                        />
                                                        <div className="p-5 rounded-xl border border-[#2a1a1c] bg-[#141414] hover:bg-[#1c1c1c] transition-all h-full flex flex-col justify-between peer-checked:border-primary peer-checked:bg-primary/10">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <h4 className="font-bold text-white text-base">{value.label}</h4>
                                                                {value.priceModifier > 0 ? (
                                                                    <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded">
                                                                        +{formatPrice(value.priceModifier)}
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">Free</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        )}

                                        {/* Checkboxes Type - Inline checkbox list */}
                                        {option.type === 'checkboxes' && (
                                            <div className="grid grid-cols-1 gap-3">
                                                {option.values.sort((a, b) => a.order - b.order).map((value) => (
                                                    <label
                                                        key={value.id}
                                                        className="flex items-center justify-between p-4 rounded-xl border border-[#2a1a1c] bg-[#141414] hover:bg-[#1c1c1c] cursor-pointer transition-all has-checked:border-primary has-checked:bg-primary/10"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <input
                                                                type="checkbox"
                                                                value={value.value}
                                                                checked={(selectedOptions[option.id] || []).includes(value.value)}
                                                                onChange={(e) => {
                                                                    const current = selectedOptions[option.id] || [];
                                                                    setSelectedOptions({
                                                                        ...selectedOptions,
                                                                        [option.id]: e.target.checked
                                                                            ? [...current, value.value]
                                                                            : current.filter((v: string) => v !== value.value)
                                                                    });
                                                                }}
                                                                className="w-5 h-5 rounded border-[#2a1a1c] bg-[#0B0B0B] text-primary focus:ring-primary focus:ring-offset-0"
                                                            />
                                                            <span className="text-sm text-gray-300 font-medium">{value.label}</span>
                                                        </div>
                                                        {value.priceModifier > 0 && (
                                                            <span className="text-sm font-bold text-primary">+{formatPrice(value.priceModifier)}</span>
                                                        )}
                                                    </label>
                                                ))}
                                            </div>
                                        )}

                                        {/* Dropdown Type - Single-select Dropdown */}
                                        {option.type === 'dropdown' && (
                                            <div className="relative dropdown-container">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const dropdown = document.getElementById(`dropdown-${option.id}`);
                                                        if (dropdown) {
                                                            dropdown.classList.toggle('hidden');
                                                        }
                                                    }}
                                                    className="w-full bg-[#1c1c1c] border border-[#2a1a1c] rounded-lg p-4 flex items-center justify-between text-gray-300 hover:border-primary/50 transition-colors"
                                                >
                                                    <span className="font-medium">
                                                        {selectedOptions[option.id]
                                                            ? option.values.find(v => v.value === selectedOptions[option.id])?.label
                                                            : `Choose ${option.label.toLowerCase()}...`}
                                                    </span>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>

                                                {/* Dropdown Menu */}
                                                <div
                                                    id={`dropdown-${option.id}`}
                                                    className="hidden absolute z-10 w-full mt-2 bg-[#1c1c1c] border border-[#2a1a1c] rounded-lg shadow-2xl max-h-64 overflow-y-auto"
                                                >
                                                    <div className="p-2">
                                                        {option.values.sort((a, b) => a.order - b.order).map((value) => (
                                                            <button
                                                                key={value.id}
                                                                type="button"
                                                                onClick={() => {
                                                                    setSelectedOptions({
                                                                        ...selectedOptions,
                                                                        [option.id]: value.value
                                                                    });
                                                                    const dropdown = document.getElementById(`dropdown-${option.id}`);
                                                                    if (dropdown) {
                                                                        dropdown.classList.add('hidden');
                                                                    }
                                                                }}
                                                                className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#252525] cursor-pointer transition-colors text-left ${selectedOptions[option.id] === value.value ? 'bg-primary/10 border border-primary/20' : ''
                                                                    }`}
                                                            >
                                                                <span className="text-sm text-gray-300 font-medium">{value.label}</span>
                                                                {value.priceModifier > 0 && (
                                                                    <span className="text-sm font-bold text-primary">+{formatPrice(value.priceModifier)}</span>
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Checkbox Type - Multi-select Dropdown */}
                                        {option.type === 'checkbox' && (
                                            <div className="relative dropdown-container">
                                                {/* Dropdown Button */}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const dropdown = document.getElementById(`dropdown-${option.id}`);
                                                        if (dropdown) {
                                                            dropdown.classList.toggle('hidden');
                                                        }
                                                    }}
                                                    className="w-full bg-[#1c1c1c] border border-[#2a1a1c] rounded-lg p-4 flex items-center justify-between text-gray-300 hover:border-primary/50 transition-colors"
                                                >
                                                    <span className="font-medium">
                                                        {(selectedOptions[option.id] || []).length > 0
                                                            ? `${(selectedOptions[option.id] || []).length} ${option.label.toLowerCase()} selected`
                                                            : `Choose ${option.label.toLowerCase()}...`}
                                                    </span>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>

                                                {/* Dropdown Menu */}
                                                <div
                                                    id={`dropdown-${option.id}`}
                                                    className="hidden absolute z-10 w-full mt-2 bg-[#1c1c1c] border border-[#2a1a1c] rounded-lg shadow-2xl max-h-64 overflow-y-auto"
                                                >
                                                    <div className="p-2">
                                                        {option.values.sort((a, b) => a.order - b.order).map((value) => (
                                                            <label
                                                                key={value.id}
                                                                className="flex items-center justify-between p-3 rounded-lg hover:bg-[#252525] cursor-pointer transition-colors"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <input
                                                                        type="checkbox"
                                                                        value={value.value}
                                                                        checked={(selectedOptions[option.id] || []).includes(value.value)}
                                                                        onChange={(e) => {
                                                                            const current = selectedOptions[option.id] || [];
                                                                            setSelectedOptions({
                                                                                ...selectedOptions,
                                                                                [option.id]: e.target.checked
                                                                                    ? [...current, value.value]
                                                                                    : current.filter((v: string) => v !== value.value)
                                                                            });
                                                                        }}
                                                                        className="w-5 h-5 rounded border-[#2a1a1c] bg-[#141414] text-primary focus:ring-primary focus:ring-offset-0"
                                                                    />
                                                                    <span className="text-sm text-gray-300 font-medium">{value.label}</span>
                                                                </div>
                                                                {value.priceModifier > 0 && (
                                                                    <span className="text-sm font-bold text-primary">+{formatPrice(value.priceModifier)}</span>
                                                                )}
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Range Type */}
                                        {option.type === 'range' && (
                                            <div className="space-y-8 p-6 rounded-2xl bg-white/2 border border-white/5">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex-1">
                                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block">Current Level</label>
                                                        <div className="bg-[#0B0B0B] border border-white/10 rounded-xl p-3 focus-within:border-primary/50 transition-colors">
                                                            <input
                                                                type="number"
                                                                min={option.minValue || 0}
                                                                max={(selectedOptions[option.id]?.desired ?? option.maxValue ?? 100) - 1}
                                                                value={selectedOptions[option.id]?.current ?? option.minValue ?? 0}
                                                                onChange={(e) => {
                                                                    const rawVal = Number(e.target.value);
                                                                    const min = option.minValue || 0;
                                                                    const max = option.maxValue || 100;
                                                                    const boundedDesired = selectedOptions[option.id]?.desired ?? max;

                                                                    // Global clamp then relation clamp
                                                                    let val = Math.max(min, Math.min(rawVal, max));
                                                                    val = Math.min(val, boundedDesired - 1);

                                                                    setSelectedOptions({
                                                                        ...selectedOptions,
                                                                        [option.id]: { ...selectedOptions[option.id], current: val }
                                                                    });
                                                                }}
                                                                className="bg-transparent border-none text-white font-bold w-full focus:outline-none text-center"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="pt-8 shrink-0">
                                                        <span className="text-white/20 font-black">-</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block">Desired Level</label>
                                                        <div className="bg-[#0B0B0B] border border-white/10 rounded-xl p-3 focus-within:border-primary/50 transition-colors">
                                                            <input
                                                                type="number"
                                                                min={(selectedOptions[option.id]?.current ?? option.minValue ?? 0) + 1}
                                                                max={option.maxValue || 100}
                                                                value={selectedOptions[option.id]?.desired ?? option.maxValue ?? 100}
                                                                onChange={(e) => {
                                                                    const rawVal = Number(e.target.value);
                                                                    const min = option.minValue || 0;
                                                                    const max = option.maxValue || 100;
                                                                    const boundedCurrent = selectedOptions[option.id]?.current ?? min;

                                                                    // Global clamp then relation clamp
                                                                    let val = Math.max(min, Math.min(rawVal, max));
                                                                    val = Math.max(val, boundedCurrent + 1);

                                                                    setSelectedOptions({
                                                                        ...selectedOptions,
                                                                        [option.id]: { ...selectedOptions[option.id], desired: val }
                                                                    });
                                                                }}
                                                                className="bg-transparent border-none text-white font-bold w-full focus:outline-none text-center"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="relative pt-6 px-2">
                                                    <div className="h-1.5 bg-white/5 rounded-full relative group">
                                                        {/* Native Range Inputs for Draggability (Invisible but functional) */}
                                                        <input
                                                            type="range"
                                                            min={option.minValue || 0}
                                                            max={option.maxValue || 100}
                                                            value={selectedOptions[option.id]?.current ?? option.minValue ?? 0}
                                                            onChange={(e) => {
                                                                const val = Math.min(Number(e.target.value), (selectedOptions[option.id]?.desired ?? option.maxValue ?? 100) - 1);
                                                                setSelectedOptions({
                                                                    ...selectedOptions,
                                                                    [option.id]: { ...selectedOptions[option.id], current: val }
                                                                });
                                                            }}
                                                            className="absolute inset-x-0 -top-1 w-full h-4 bg-transparent appearance-none pointer-events-none cursor-pointer z-40 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-transparent [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
                                                        />
                                                        <input
                                                            type="range"
                                                            min={option.minValue || 0}
                                                            max={option.maxValue || 100}
                                                            value={selectedOptions[option.id]?.desired ?? option.maxValue ?? 100}
                                                            onChange={(e) => {
                                                                const val = Math.max(Number(e.target.value), (selectedOptions[option.id]?.current ?? option.minValue ?? 0) + 1);
                                                                setSelectedOptions({
                                                                    ...selectedOptions,
                                                                    [option.id]: { ...selectedOptions[option.id], desired: val }
                                                                });
                                                            }}
                                                            className="absolute inset-x-0 -top-1 w-full h-4 bg-transparent appearance-none pointer-events-none cursor-pointer z-30 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-transparent [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
                                                        />

                                                        {/* Custom Visual Track and Knobs (Stay synced with state) */}
                                                        <div
                                                            className="absolute h-full bg-primary rounded-full transition-all duration-300 pointer-events-none"
                                                            style={{
                                                                left: `${(((selectedOptions[option.id]?.current ?? option.minValue ?? 0) - (option.minValue || 0)) / ((option.maxValue || 100) - (option.minValue || 0))) * 100}%`,
                                                                right: `${100 - (((selectedOptions[option.id]?.desired ?? option.maxValue ?? 100) - (option.minValue || 0)) / ((option.maxValue || 100) - (option.minValue || 0))) * 100}%`
                                                            }}
                                                        />

                                                        {/* Current Level Knob */}
                                                        <div
                                                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-4 bg-white rounded-full border-2 border-primary shadow-[0_0_10px_rgba(175,18,37,0.4)] pointer-events-none z-10 transition-all duration-300"
                                                            style={{
                                                                left: `${(((selectedOptions[option.id]?.current ?? option.minValue ?? 0) - (option.minValue || 0)) / ((option.maxValue || 100) - (option.minValue || 0))) * 100}%`
                                                            }}
                                                        />

                                                        {/* Desired Level Knob */}
                                                        <div
                                                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-4 bg-white rounded-full border-2 border-primary shadow-[0_0_10px_rgba(175,18,37,0.4)] pointer-events-none z-10 transition-all duration-300"
                                                            style={{
                                                                left: `${(((selectedOptions[option.id]?.desired ?? option.maxValue ?? 100) - (option.minValue || 0)) / ((option.maxValue || 100) - (option.minValue || 0))) * 100}%`
                                                            }}
                                                        />
                                                    </div>

                                                    {/* Scale */}
                                                    <div className="flex justify-between mt-6 relative h-4 mx-2">
                                                        {(() => {
                                                            const min = option.minValue || 0;
                                                            const max = option.maxValue || 100;
                                                            const range = max - min;
                                                            const marks = [];

                                                            if (range <= 10) {
                                                                // For small ranges, show every integer mark
                                                                for (let i = min; i <= max; i++) {
                                                                    marks.push(i);
                                                                }
                                                            } else {
                                                                // For large ranges, show 5 evenly spaced marks
                                                                for (let i = 0; i <= 4; i++) {
                                                                    marks.push(Math.round(min + (range * i) / 4));
                                                                }
                                                            }

                                                            return marks.map((level, idx) => {
                                                                const isActive = level >= (selectedOptions[option.id]?.current ?? min) && level <= (selectedOptions[option.id]?.desired ?? max);
                                                                return (
                                                                    <div
                                                                        key={idx}
                                                                        className="absolute -translate-x-1/2 flex flex-col items-center gap-1"
                                                                        style={{ left: `${((level - min) / range) * 100}%` }}
                                                                    >
                                                                        <span className={`text-[10px] font-black tracking-tighter transition-colors ${isActive ? 'text-primary' : 'text-slate-600'}`}>
                                                                            {level}
                                                                        </span>
                                                                    </div>
                                                                );
                                                            });
                                                        })()}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Number Type - Input with Range Slider */}
                                        {option.type === 'number' && (
                                            <div className="space-y-4">
                                                {/* Number Input */}
                                                <div>
                                                    <label className="text-sm text-gray-400 font-medium mb-2 block">{option.label}</label>
                                                    <input
                                                        type="number"
                                                        min={option.minValue || 0}
                                                        max={option.maxValue || 999999999}
                                                        step={option.step || 1}
                                                        value={selectedOptions[option.id] || option.minValue || 0}
                                                        onChange={(e) => setSelectedOptions({
                                                            ...selectedOptions,
                                                            [option.id]: Number(e.target.value)
                                                        })}
                                                        className="w-full bg-[#1c1c1c] border border-[#2a1a1c] rounded-lg px-4 py-3 text-white text-lg font-bold focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                                    />
                                                </div>

                                                {/* Range Slider */}
                                                <div className="p-4 rounded-lg bg-[#1c1c1c] border border-[#2a1a1c]">
                                                    <input
                                                        type="range"
                                                        min={option.minValue || 0}
                                                        max={option.maxValue || 100}
                                                        step={option.step || 1}
                                                        value={selectedOptions[option.id] || option.minValue || 0}
                                                        onChange={(e) => setSelectedOptions({
                                                            ...selectedOptions,
                                                            [option.id]: Number(e.target.value)
                                                        })}
                                                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                                    />
                                                    <div className="flex justify-between mt-3 text-[10px] text-gray-500 font-bold">
                                                        <span>{(option.minValue || 0) >= 1000 ? `${((option.minValue || 0) / 1000).toFixed(0)}K` : option.minValue}</span>
                                                        <span>{((option.minValue || 0) + ((option.maxValue || 0) - (option.minValue || 0)) * 0.2) >= 1000000 ? `${(((option.minValue || 0) + ((option.maxValue || 0) - (option.minValue || 0)) * 0.2) / 1000000).toFixed(2)}M` : `${(((option.minValue || 0) + ((option.maxValue || 0) - (option.minValue || 0)) * 0.2) / 1000).toFixed(0)}K`}</span>
                                                        <span>{((option.minValue || 0) + ((option.maxValue || 0) - (option.minValue || 0)) * 0.4) >= 1000000 ? `${(((option.minValue || 0) + ((option.maxValue || 0) - (option.minValue || 0)) * 0.4) / 1000000).toFixed(2)}M` : `${(((option.minValue || 0) + ((option.maxValue || 0) - (option.minValue || 0)) * 0.4) / 1000).toFixed(0)}K`}</span>
                                                        <span>{((option.minValue || 0) + ((option.maxValue || 0) - (option.minValue || 0)) * 0.6) >= 1000000 ? `${(((option.minValue || 0) + ((option.maxValue || 0) - (option.minValue || 0)) * 0.6) / 1000000).toFixed(2)}M` : `${(((option.minValue || 0) + ((option.maxValue || 0) - (option.minValue || 0)) * 0.6) / 1000).toFixed(0)}K`}</span>
                                                        <span>{((option.minValue || 0) + ((option.maxValue || 0) - (option.minValue || 0)) * 0.8) >= 1000000 ? `${(((option.minValue || 0) + ((option.maxValue || 0) - (option.minValue || 0)) * 0.8) / 1000000).toFixed(2)}M` : `${(((option.minValue || 0) + ((option.maxValue || 0) - (option.minValue || 0)) * 0.8) / 1000).toFixed(0)}K`}</span>
                                                        <span>{(option.maxValue || 0) >= 1000000 ? `${((option.maxValue || 0) / 1000000).toFixed(0)}M` : `${((option.maxValue || 0) / 1000).toFixed(0)}K`}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </section>
                                ));
                            })()}

                            {/* Completion Method */}
                            {service.completionMethods && service.completionMethods.length > 0 && (
                                <section>
                                    <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3 font-cairo">
                                        <span className="w-1 h-6 bg-primary rounded-full"></span>
                                        {(service.options?.filter(isOptionVisible).length || 0) + (service.platforms?.length > 0 ? 2 : 1)}. Deployment Method
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {service.completionMethods.map((method) => (
                                            <label key={method} className="cursor-pointer relative">
                                                <input
                                                    type="radio"
                                                    name="completionMethod"
                                                    value={method}
                                                    checked={completionMethod === method}
                                                    onChange={(e) => setCompletionMethod(e.target.value)}
                                                    className="peer sr-only"
                                                />
                                                <div className="flex items-start gap-4 p-5 rounded-xl border-2 border-white/5 bg-[#141414] hover:border-primary/30 transition-all peer-checked:border-primary peer-checked:bg-primary/5">
                                                    <div className="size-5 rounded-full border-2 border-slate-700 flex items-center justify-center mt-0.5 shrink-0 peer-checked:border-primary">
                                                        <div className="size-2.5 bg-primary rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-white text-sm uppercase tracking-tight mb-1">{method}</h4>
                                                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">
                                                            {method.toLowerCase().includes('piloted')
                                                                ? 'Our pro operative logs into your account. Encryption Active.'
                                                                : 'You play on your own account alongside our squad. In-raid trading active.'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Completion Speed */}
                            <section>
                                <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-primary rounded-full"></span>
                                    {(service.options?.filter(isOptionVisible).length || 0) + (service.platforms?.length > 0 ? 2 : 1) + (service.completionMethods?.length > 0 ? 1 : 0)}. Completion Speed <span className="text-sm text-gray-500 font-normal normal-case">(Optional)</span>
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Express */}
                                    <label className="cursor-pointer relative">
                                        <input
                                            type="radio"
                                            name="completionSpeed"
                                            value="express"
                                            checked={completionSpeed === 'express'}
                                            onChange={(e) => setCompletionSpeed(e.target.value)}
                                            className="peer sr-only"
                                        />
                                        <div className="p-5 rounded-xl border border-[#2a1a1c] bg-[#141414] hover:bg-[#1c1c1c] transition-all h-full flex flex-col justify-between peer-checked:border-primary peer-checked:bg-primary/10">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-white text-base flex items-center gap-1">
                                                    Express <Rocket className="size-4 text-primary" />
                                                </h4>
                                                <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded">
                                                    +${getSpeedBoostPrice('express')}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-400 font-cairo">Priority queue. Estimated start: 15-30 mins.</p>
                                        </div>
                                    </label>

                                    {/* Super Express */}
                                    <label className="cursor-pointer relative">
                                        <input
                                            type="radio"
                                            name="completionSpeed"
                                            value="super_express"
                                            checked={completionSpeed === 'super_express'}
                                            onChange={(e) => setCompletionSpeed(e.target.value)}
                                            className="peer sr-only"
                                        />
                                        <div className="p-5 rounded-xl border border-[#2a1a1c] bg-[#141414] hover:bg-[#1c1c1c] transition-all h-full flex flex-col justify-between peer-checked:border-primary peer-checked:bg-primary/10">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-white text-base flex items-center gap-1">
                                                    Super Express <Zap className="size-4 text-primary" />
                                                </h4>
                                                <span className="text-xs bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded">
                                                    +${getSpeedBoostPrice('super_express')}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-400 font-cairo">Immediate start. Dedicated booster assigned instantly.</p>
                                        </div>
                                    </label>
                                </div>
                                {completionSpeed && (
                                    <button
                                        type="button"
                                        onClick={() => setCompletionSpeed(null)}
                                        className="mt-3 text-sm text-gray-400 hover:text-primary transition-colors underline"
                                    >
                                        Remove speed boost
                                    </button>
                                )}
                            </section>
                        </div>

                        {/* Tabs Section */}
                        <div className="mt-12">
                            <div className="border-b border-[#2a1a1c] mb-6">
                                <div className="flex gap-8 overflow-x-auto">
                                    <button
                                        onClick={() => setActiveTab("description")}
                                        className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === "description"
                                            ? "text-primary border-b-2 border-primary"
                                            : "text-gray-500 hover:text-gray-300"
                                            }`}
                                    >
                                        Description
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("requirements")}
                                        className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === "requirements"
                                            ? "text-primary border-b-2 border-primary"
                                            : "text-gray-500 hover:text-gray-300"
                                            }`}
                                    >
                                        Requirements
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("reviews")}
                                        className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === "reviews"
                                            ? "text-primary border-b-2 border-primary"
                                            : "text-gray-500 hover:text-gray-300"
                                            }`}
                                    >
                                        Customer Reviews (24)
                                    </button>
                                </div>
                            </div>
                            <div className="text-gray-400 font-cairo leading-relaxed space-y-4">
                                {activeTab === "description" && (
                                    <>
                                        <p>{service.description}</p>
                                        <h4 className="text-white font-bold mt-4 mb-2 font-cairo">Service Includes:</h4>
                                        <ul className="list-disc pl-5 space-y-1 text-gray-400">
                                            <li>Professional service completion by verified players</li>
                                            <li>Safe and secure delivery using VPN matching your location</li>
                                            <li>24/7 customer support throughout the process</li>
                                            <li>Money-back guarantee if not satisfied</li>
                                        </ul>
                                    </>
                                )}
                                {activeTab === "requirements" && (
                                    <>
                                        <p>To use this service, you will need:</p>
                                        <ul className="list-disc pl-5 space-y-1 text-gray-400">
                                            <li>Active game account</li>
                                            <li>Account credentials (for piloted services)</li>
                                            <li>Stable internet connection</li>
                                        </ul>
                                    </>
                                )}
                                {activeTab === "reviews" && (
                                    <p>Customer reviews coming soon...</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-6">
                            {/* Quantity Selector */}
                            <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 shadow-2xl">
                                <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3 font-cairo">
                                    <span className="w-1 h-6 bg-primary rounded-full"></span>
                                    Operational Scale
                                </h3>
                                <div className="p-6 rounded-xl bg-white/5 border border-white/5 shadow-inner">
                                    <div className="flex justify-between items-end mb-6">
                                        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Quantity Units</label>
                                        <div className="text-3xl font-black text-white font-cairo">
                                            {quantity} <span className="text-[10px] text-primary font-bold tracking-widest uppercase">QTY</span>
                                        </div>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max={service?.maxQuantity || 15}
                                        step="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="flex justify-between mt-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                        <span>Min 01</span>
                                        <span>Limit {service?.maxQuantity || 15}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-colors"></div>
                                <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6 font-cairo">Mission Summary</h3>

                                {/* Promo Code */}
                                <div className="mb-8">
                                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-3 block italic">Access Key (Promo)</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={promoCode}
                                            onChange={(e) => {
                                                setPromoCode(e.target.value.toUpperCase());
                                                setPromoCodeError("");
                                                setPromoCodeData(null);
                                            }}
                                            placeholder="ENTER KEY..."
                                            className="flex-1 bg-white/5 border border-white/5 rounded-lg px-4 py-3 text-white text-xs font-bold uppercase tracking-widest placeholder:text-slate-600 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={validatePromoCode}
                                            disabled={!promoCode.trim() || isValidatingPromo}
                                            className="px-6 py-3 bg-[#222] hover:bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-white/5"
                                        >
                                            {isValidatingPromo ? 'AUTH...' : 'DECODER'}
                                        </button>
                                    </div>
                                    {promoCodeError && (
                                        <p className="text-primary text-[10px] font-black uppercase tracking-widest mt-3 flex items-center gap-1 leading-none">
                                            <span className="material-symbols-outlined text-xs">error</span> {promoCodeError}
                                        </p>
                                    )}
                                    {promoCodeData && (
                                        <p className="text-green-500 text-[10px] font-black uppercase tracking-widest mt-3 flex items-center gap-1 leading-none">
                                            <span className="material-symbols-outlined text-xs">check_circle</span>
                                            Access Granted: {promoCodeData.discountType === 'percentage' ? `${promoCodeData.discount}%` : formatPrice(promoCodeData.discount)}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-4 mb-8 border-b border-white/5 pb-8">
                                    <div className="flex justify-between items-center text-[10px]">
                                        <span className="text-slate-500 font-bold uppercase tracking-widest italic">Operational Data</span>
                                        <span className="text-white font-black uppercase tracking-tight text-right">{service.name}</span>
                                    </div>
                                    {platform && (
                                        <div className="flex justify-between items-center text-[10px]">
                                            <span className="text-slate-500 font-bold uppercase tracking-widest italic">Sector (Platform)</span>
                                            <span className="text-white font-black uppercase tracking-tight">{platform}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center text-[10px]">
                                        <span className="text-slate-500 font-bold uppercase tracking-widest italic">Resource Units</span>
                                        <span className="text-white font-black uppercase tracking-tight">
                                            {(() => {
                                                // If Workshop Leveling, show level count as resource units
                                                if (service?.name === "Workshop Leveling") {
                                                    const whatToLevelOption = service.options?.find(o => o.label === "What should we level up?");
                                                    const mode = whatToLevelOption ? selectedOptions[whatToLevelOption.id] : null;

                                                    if (mode === "scrappy" || mode === "specific_bench") {
                                                        const rangeOpt = service.options?.find(o =>
                                                            o.label?.toLowerCase().includes("level range") &&
                                                            isOptionVisible(o)
                                                        );
                                                        if (rangeOpt) {
                                                            const range = selectedOptions[rangeOpt.id];
                                                            if (range && typeof range === 'object') {
                                                                const current = Number(range.current ?? rangeOpt.minValue ?? 0);
                                                                const desired = Number(range.desired ?? rangeOpt.maxValue ?? 0);
                                                                return Math.max(0, desired - current);
                                                            }
                                                        }
                                                    }
                                                }
                                                return quantity;
                                            })()}
                                        </span>
                                    </div>
                                    {completionMethod && (
                                        <div className="flex justify-between items-center text-[10px]">
                                            <span className="text-slate-500 font-bold uppercase tracking-widest italic">Protocol (Method)</span>
                                            <span className="text-white font-black uppercase tracking-tight">{completionMethod}</span>
                                        </div>
                                    )}
                                    {completionSpeed && (
                                        <div className="flex justify-between items-center text-[10px]">
                                            <span className="text-slate-500 font-bold uppercase tracking-widest italic">Urgency Status</span>
                                            <span className="text-primary font-black uppercase tracking-tight">
                                                {completionSpeed === 'express' ? 'EXPRESS +20%' : 'SUPER EXPRESS +40%'}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-end justify-between mb-8">
                                    <div className="flex flex-col">
                                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">Total Allocation</span>
                                        <span className="text-slate-600 text-[10px] italic">Finalized secure transaction</span>
                                    </div>
                                    <span className="text-4xl font-black text-white tracking-tighter font-cairo">{formatPrice(calculateTotalPrice())}</span>
                                </div>

                                <button
                                    onClick={handleOrderClick}
                                    className="w-full py-5 bg-primary hover:bg-[#8a0e1d] text-white font-black text-sm uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 group transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-y-1"
                                >
                                    BUY NOW
                                    <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">shopping_cart</span>
                                </button>
                                <div className="flex items-center justify-center gap-2 mt-6 text-[10px] text-slate-500 font-black uppercase tracking-widest">
                                    <span className="material-symbols-outlined text-sm">lock</span> 256-bit Secure Protocol
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="bg-[#111111] border border-white/5 rounded-xl p-6 grid grid-cols-2 gap-4 shadow-2xl">
                                {[
                                    { icon: 'verified_user', label: 'Secured' },
                                    { icon: 'support_agent', label: 'HQ Link' },
                                    { icon: 'vpn_lock', label: 'Encrypted' },
                                    { icon: 'payments', label: 'Verified' }
                                ].map((badge) => (
                                    <div key={badge.label} className="flex flex-col items-center text-center gap-2 group">
                                        <div className="size-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <span className="material-symbols-outlined text-xl">{badge.icon}</span>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">{badge.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Payment Method Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-100 flex items-center justify-center p-4">
                    <div className="bg-[#0B0B0B] border border-white/5 rounded-2xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(0,0,0,1)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full pointer-events-none"></div>

                        {/* Close button */}
                        <button
                            onClick={() => {
                                setShowPaymentModal(false);
                                setSelectedPaymentMethod(null);
                            }}
                            className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-2 font-cairo">DEPLOYMENT GATEWAY</h2>
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mb-8 italic">Choose your secure financial protocol</p>

                        {/* Payment Methods */}
                        <div className="space-y-4 mb-10">
                            {/* PayPal */}
                            <label className="cursor-pointer block group">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="paypal"
                                    checked={selectedPaymentMethod === 'paypal'}
                                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                    className="peer sr-only"
                                />
                                <div className="flex items-center gap-4 p-5 rounded-2xl border-2 border-white/5 bg-white/5 hover:border-primary/50 transition-all peer-checked:border-primary peer-checked:bg-primary/5">
                                    <div className="size-14 rounded-xl bg-[#0070ba] flex items-center justify-center shadow-lg">
                                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
                                            <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.68l-.04.22-.63 3.993-.028.15a.805.805 0 01-.794.68H7.72a.483.483 0 01-.477-.558L8.926 13.7a.805.805 0 01.794-.68h2.344c4.323 0 7.255-2.203 8.003-6.542z" />
                                            <path d="M6.124 3.65A.805.805 0 016.916 3h6.553c1.587 0 2.726.33 3.49 1.053.732.692 1.131 1.728 1.218 3.13-1.084 4.83-4.504 7.29-9.616 7.29H6.916a.805.805 0 00-.794.68l-.952 6.035a.483.483 0 01-.477.558H2.175a.483.483 0 01-.477-.558z" opacity=".7" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-black text-white text-sm uppercase tracking-tight">PAYPAL SECURE</h3>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">Instant Verification</p>
                                    </div>
                                    <div className="size-6 rounded-full border-2 border-slate-700 flex items-center justify-center peer-checked:border-primary transition-colors">
                                        <div className="size-3 bg-primary rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                    </div>
                                </div>
                            </label>

                            {/* Crypto */}
                            <label className="cursor-pointer block group">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="crypto"
                                    checked={selectedPaymentMethod === 'crypto'}
                                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                    className="peer sr-only"
                                />
                                <div className="flex items-center gap-4 p-5 rounded-2xl border-2 border-white/5 bg-white/5 hover:border-primary/50 transition-all peer-checked:border-primary peer-checked:bg-primary/5">
                                    <div className="size-14 rounded-xl bg-linear-to-br from-orange-500 to-yellow-600 flex items-center justify-center shadow-lg">
                                        <span className="material-symbols-outlined text-white text-3xl">currency_bitcoin</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-black text-white text-sm uppercase tracking-tight">CRYPTO ANONYMOUS</h3>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">BTC / ETH / USDT / LTC</p>
                                    </div>
                                    <div className="size-6 rounded-full border-2 border-slate-700 flex items-center justify-center peer-checked:border-primary transition-colors">
                                        <div className="size-3 bg-primary rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                                    </div>
                                </div>
                            </label>
                        </div>

                        {/* Buy Button */}
                        <button
                            onClick={handlePurchase}
                            disabled={!selectedPaymentMethod}
                            className="w-full py-5 bg-primary hover:bg-[#8a0e1d] text-white font-black text-sm uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
                        >
                            CONFIRM DEPLOYMENT - {formatPrice(calculateTotalPrice())}
                        </button>

                        {/* Security Notice */}
                        <div className="flex items-center justify-center gap-2 pt-6 border-t border-white/5 text-[10px] text-slate-600 font-black uppercase tracking-widest">
                            <span className="material-symbols-outlined text-sm text-primary">verified</span>
                            End-to-End Encrypted Financial Protocol
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
