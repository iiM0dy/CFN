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

interface ServiceOptionValue {
    id: string;
    label: string;
    value: string;
    priceModifier: number;
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
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    
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
                const selected = selectedOptions[option.id];
                if (selected) {
                    if (Array.isArray(selected)) {
                        // Multiple selections (checkbox)
                        selected.forEach(val => {
                            const optionValue = option.values.find(v => v.value === val);
                            if (optionValue) price += Number(optionValue.priceModifier);
                        });
                    } else if (option.type !== 'number' && option.type !== 'range') {
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
        
        return price.toFixed(2);
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
        if (!session) {
            router.push('/login?callbackUrl=' + encodeURIComponent(window.location.href));
            return;
        }
        // Show payment modal
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
            return (basePrice * 0.20).toFixed(2); // 20% of base
        } else if (speedType === 'super_express') {
            return (basePrice * 0.40).toFixed(2); // 40% of base
        }
        return '0.00';
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
        <div className="relative flex min-h-screen flex-col bg-[#0B0B0B] text-white font-[family-name:var(--font-space-grotesk)]">
            <main className="flex-grow w-full px-6 py-8 max-w-7xl mx-auto">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-[family-name:var(--font-noto-sans)]">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="size-3" />
                    <Link href="/games" className="hover:text-primary transition-colors">Games</Link>
                    <ChevronRight className="size-3" />
                    <Link href={`/games/${service.game.slug}/services`} className="hover:text-primary transition-colors">{service.game.name}</Link>
                    <ChevronRight className="size-3" />
                    <span className="text-gray-300">{service.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative">
                    {/* Left Column */}
                    <div className="lg:col-span-8 flex flex-col gap-10">
                        {/* Hero Section */}
                        <div className="relative rounded-2xl overflow-hidden border border-[#1c1c1c] bg-[#141414]">
                            {/* Background Image (if available) */}
                            {service.image && (
                                <div className="absolute inset-0 opacity-20">
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/95 to-[#141414]/80"></div>
                                </div>
                            )}
                            
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none"></div>
                            
                            <div className="relative z-10 p-8 flex gap-6">
                                {/* Service Image Thumbnail */}
                                {service.image && (
                                    <div className="hidden md:block shrink-0">
                                        <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-primary/30 shadow-lg shadow-primary/20">
                                            <img
                                                src={service.image}
                                                alt={service.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                )}
                                
                                <div className="flex flex-col gap-4 flex-1">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                                            <Zap className="size-3" />
                                            Hot Service
                                        </div>
                                        <button
                                            onClick={toggleFavorite}
                                            disabled={favoriteLoading}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                                                isFavorite
                                                    ? 'bg-primary/10 border-primary text-primary'
                                                    : 'bg-[#1c1c1c] border-[#2a1a1c] text-gray-400 hover:border-primary/50 hover:text-primary'
                                            }`}
                                        >
                                            <Heart className={`size-4 ${isFavorite ? 'fill-current' : ''}`} />
                                            <span className="text-sm font-bold">{isFavorite ? 'Saved' : 'Save'}</span>
                                        </button>
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight">{service.name}</h1>
                                    <p className="text-gray-400 font-[family-name:var(--font-noto-sans)] leading-relaxed max-w-2xl">
                                        {service.description}
                                    </p>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        <div className="flex items-center gap-1.5 text-sm text-gray-300 bg-[#1c1c1c] px-3 py-1.5 rounded border border-[#2a1a1c]">
                                            <CheckCircle2 className="size-4 text-primary" />
                                            Verified Pros
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm text-gray-300 bg-[#1c1c1c] px-3 py-1.5 rounded border border-[#2a1a1c]">
                                            <Clock className="size-4 text-primary" />
                                            Start within 15m
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm text-gray-300 bg-[#1c1c1c] px-3 py-1.5 rounded border border-[#2a1a1c]">
                                            <Lock className="size-4 text-primary" />
                                            VPN Protection
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
                            {service.options?.sort((a, b) => a.order - b.order).map((option, index) => (
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
                                                                    +${value.priceModifier}
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
                                                    className="flex items-center justify-between p-4 rounded-xl border border-[#2a1a1c] bg-[#141414] hover:bg-[#1c1c1c] cursor-pointer transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/10"
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
                                                        <span className="text-sm font-bold text-primary">+${Number(value.priceModifier).toFixed(2)}</span>
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
                                                            className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#252525] cursor-pointer transition-colors text-left ${
                                                                selectedOptions[option.id] === value.value ? 'bg-primary/10 border border-primary/20' : ''
                                                            }`}
                                                        >
                                                            <span className="text-sm text-gray-300 font-medium">{value.label}</span>
                                                            {value.priceModifier > 0 && (
                                                                <span className="text-sm font-bold text-primary">+${value.priceModifier}</span>
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
                                                                <span className="text-sm font-bold text-primary">+${Number(value.priceModifier).toFixed(2)}</span>
                                                            )}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Range Type */}
                                    {option.type === 'range' && (
                                        <div className="p-4 rounded-lg bg-[#1c1c1c] border border-[#2a1a1c]">
                                            <div className="flex justify-between items-end mb-6">
                                                <label className="text-xs text-gray-400 font-bold uppercase tracking-tight">{option.label}</label>
                                                <div className="text-2xl font-bold text-primary">
                                                    {selectedOptions[option.id] || option.minValue || 0}
                                                </div>
                                            </div>
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
                                            <div className="flex justify-between mt-3 text-[10px] text-gray-500">
                                                <span>{option.minValue}</span>
                                                <span>{option.maxValue}</span>
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
                            ))}

                            {/* Completion Method */}
                            {service.completionMethods && service.completionMethods.length > 0 && (
                                <section>
                                    <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2">
                                        <span className="w-1 h-5 bg-primary rounded-full"></span>
                                        {(service.options?.length || 0) + (service.platforms?.length > 0 ? 2 : 1)}. Completion Method
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
                                                <div className="flex items-start gap-4 p-5 rounded-xl border border-[#2a1a1c] bg-[#141414] hover:bg-[#1c1c1c] transition-all peer-checked:border-primary peer-checked:bg-primary/10">
                                                    <div className="size-5 rounded-full border border-gray-600 flex items-center justify-center mt-0.5 shrink-0 peer-checked:border-primary">
                                                        <div className="size-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100"></div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-white text-base mb-1">{method}</h4>
                                                        <p className="text-xs text-gray-400 font-[family-name:var(--font-noto-sans)]">
                                                            {method.toLowerCase().includes('piloted')
                                                                ? 'Our pro logs into your account to complete the service. Requires account details.'
                                                                : 'You play on your own account. Our booster will trade materials to you in-raid.'}
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
                                    {(service.options?.length || 0) + (service.platforms?.length > 0 ? 2 : 1) + (service.completionMethods?.length > 0 ? 1 : 0)}. Completion Speed <span className="text-sm text-gray-500 font-normal normal-case">(Optional)</span>
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
                                            <p className="text-xs text-gray-400 font-[family-name:var(--font-noto-sans)]">Priority queue. Estimated start: 15-30 mins.</p>
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
                                            <p className="text-xs text-gray-400 font-[family-name:var(--font-noto-sans)]">Immediate start. Dedicated booster assigned instantly.</p>
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
                                        className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                                            activeTab === "description"
                                                ? "text-primary border-b-2 border-primary"
                                                : "text-gray-500 hover:text-gray-300"
                                        }`}
                                    >
                                        Description
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("requirements")}
                                        className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                                            activeTab === "requirements"
                                                ? "text-primary border-b-2 border-primary"
                                                : "text-gray-500 hover:text-gray-300"
                                        }`}
                                    >
                                        Requirements
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("reviews")}
                                        className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors ${
                                            activeTab === "reviews"
                                                ? "text-primary border-b-2 border-primary"
                                                : "text-gray-500 hover:text-gray-300"
                                        }`}
                                    >
                                        Customer Reviews (24)
                                    </button>
                                </div>
                            </div>
                            <div className="text-gray-400 font-[family-name:var(--font-noto-sans)] leading-relaxed space-y-4">
                                {activeTab === "description" && (
                                    <>
                                        <p>{service.description}</p>
                                        <h4 className="text-white font-bold mt-4 mb-2 font-[family-name:var(--font-space-grotesk)]">Service Includes:</h4>
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
                            <div className="bg-[#141414] border border-[#1c1c1c] rounded-2xl p-6 shadow-2xl">
                                <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-4 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-primary rounded-full"></span>
                                    Order Quantity
                                </h3>
                                <div className="p-4 rounded-lg bg-[#1c1c1c] border border-[#2a1a1c]">
                                    <div className="flex justify-between items-end mb-6">
                                        <label className="text-xs text-gray-400 font-bold uppercase tracking-tight">Quantity</label>
                                        <div className="text-2xl font-bold text-primary">
                                            {quantity} <span className="text-sm text-gray-500 font-normal tracking-normal uppercase">Units</span>
                                        </div>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max={service?.maxQuantity || 15}
                                        step="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex justify-between mt-3 text-[10px] text-gray-500">
                                        <span>1</span>
                                        {(service?.maxQuantity || 15) >= 5 && <span>5</span>}
                                        {(service?.maxQuantity || 15) >= 10 && <span>10</span>}
                                        <span>{service?.maxQuantity || 15}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-[#141414] border border-[#1c1c1c] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full pointer-events-none"></div>
                                <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-6">Order Summary</h3>
                                
                                {/* Promo Code */}
                                <div className="mb-6">
                                    <label className="text-xs text-gray-400 font-bold uppercase tracking-tight mb-2 block">Promo Code</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={promoCode}
                                            onChange={(e) => {
                                                setPromoCode(e.target.value.toUpperCase());
                                                setPromoCodeError("");
                                                setPromoCodeData(null);
                                            }}
                                            placeholder="Enter code"
                                            className="flex-1 bg-[#1c1c1c] border border-[#2a1a1c] rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                        />
                                        <button
                                            type="button"
                                            onClick={validatePromoCode}
                                            disabled={!promoCode.trim() || isValidatingPromo}
                                            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold uppercase rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isValidatingPromo ? 'Checking...' : 'Apply'}
                                        </button>
                                    </div>
                                    {promoCodeError && (
                                        <p className="text-red-500 text-xs mt-2">{promoCodeError}</p>
                                    )}
                                    {promoCodeData && (
                                        <p className="text-green-500 text-xs mt-2">
                                            ✓ {promoCodeData.name} applied! 
                                            {promoCodeData.discountType === 'percentage' 
                                                ? ` ${promoCodeData.discount}% off` 
                                                : ` $${promoCodeData.discount} off`}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-4 mb-6 border-b border-[#2a1a1c] pb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Service</span>
                                        <span className="text-white font-medium text-right">{service.name}</span>
                                    </div>
                                    {platform && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Platform</span>
                                            <span className="text-white font-medium">{platform}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Quantity</span>
                                        <span className="text-white font-medium">{quantity}</span>
                                    </div>
                                    {completionMethod && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Method</span>
                                            <span className="text-white font-medium">{completionMethod}</span>
                                        </div>
                                    )}
                                    {completionSpeed && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Speed</span>
                                            <span className="text-white font-medium">
                                                {completionSpeed === 'express' 
                                                    ? `Express (+$${getSpeedBoostPrice('express')})` 
                                                    : `Super Express (+$${getSpeedBoostPrice('super_express')})`}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-end justify-between mb-6">
                                    <span className="text-gray-400 text-sm font-medium">Total Price</span>
                                    <span className="text-3xl font-bold text-white">${calculateTotalPrice()}</span>
                                </div>
                                <button 
                                    onClick={handleOrderClick}
                                    className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 group transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
                                >
                                    Order Now
                                    <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-gray-500 uppercase tracking-widest">
                                    <Lock className="size-3" /> Secure 256-bit SSL Payment
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="bg-[#141414] border border-[#1c1c1c] rounded-xl p-6 grid grid-cols-2 gap-4">
                                <div className="flex flex-col items-center text-center gap-2">
                                    <div className="size-10 rounded-full bg-[#1c1c1c] flex items-center justify-center text-primary">
                                        <Shield className="size-5" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-300">100% Safe</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <div className="size-10 rounded-full bg-[#1c1c1c] flex items-center justify-center text-primary">
                                        <Clock className="size-5" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-300">24/7 Support</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <div className="size-10 rounded-full bg-[#1c1c1c] flex items-center justify-center text-primary">
                                        <Lock className="size-5" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-300">VPN Protected</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <div className="size-10 rounded-full bg-[#1c1c1c] flex items-center justify-center text-primary">
                                        <TrendingUp className="size-5" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-300">Money Back</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            {/* Payment Method Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#141414] border border-[#1c1c1c] rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
                        {/* Close button */}
                        <button
                            onClick={() => {
                                setShowPaymentModal(false);
                                setSelectedPaymentMethod(null);
                            }}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-2">Choose Payment Method</h2>
                        <p className="text-sm text-gray-400 mb-6">Select your preferred payment method to complete your order</p>

                        {/* Payment Methods */}
                        <div className="space-y-3 mb-6">
                            {/* PayPal */}
                            <label className="cursor-pointer block">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="paypal"
                                    checked={selectedPaymentMethod === 'paypal'}
                                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                    className="peer sr-only"
                                />
                                <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-[#2a1a1c] bg-[#1c1c1c] hover:border-primary/50 transition-all peer-checked:border-primary peer-checked:bg-primary/10">
                                    <div className="size-12 rounded-lg bg-[#0070ba] flex items-center justify-center">
                                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
                                            <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.68l-.04.22-.63 3.993-.028.15a.805.805 0 01-.794.68H7.72a.483.483 0 01-.477-.558L8.926 13.7a.805.805 0 01.794-.68h2.344c4.323 0 7.255-2.203 8.003-6.542z"/>
                                            <path d="M6.124 3.65A.805.805 0 016.916 3h6.553c1.587 0 2.726.33 3.49 1.053.732.692 1.131 1.728 1.218 3.13-1.084 4.83-4.504 7.29-9.616 7.29H6.916a.805.805 0 00-.794.68l-.952 6.035a.483.483 0 01-.477.558H2.175a.483.483 0 01-.477-.558z" opacity=".7"/>
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-white">PayPal</h3>
                                        <p className="text-xs text-gray-400">Fast and secure payment</p>
                                    </div>
                                    <div className="size-5 rounded-full border-2 border-gray-600 flex items-center justify-center peer-checked:border-primary">
                                        <div className="size-2.5 bg-primary rounded-full opacity-0 peer-checked:opacity-100"></div>
                                    </div>
                                </div>
                            </label>

                            {/* Crypto */}
                            <label className="cursor-pointer block">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="crypto"
                                    checked={selectedPaymentMethod === 'crypto'}
                                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                    className="peer sr-only"
                                />
                                <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-[#2a1a1c] bg-[#1c1c1c] hover:border-primary/50 transition-all peer-checked:border-primary peer-checked:bg-primary/10">
                                    <div className="size-12 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
                                            <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z"/>
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-white">Cryptocurrency</h3>
                                        <p className="text-xs text-gray-400">Bitcoin, Ethereum & more</p>
                                    </div>
                                    <div className="size-5 rounded-full border-2 border-gray-600 flex items-center justify-center peer-checked:border-primary">
                                        <div className="size-2.5 bg-primary rounded-full opacity-0 peer-checked:opacity-100"></div>
                                    </div>
                                </div>
                            </label>
                        </div>

                        {/* Buy Button */}
                        <button
                            onClick={handlePurchase}
                            disabled={!selectedPaymentMethod}
                            className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                        >
                            Buy Now - ${calculateTotalPrice()}
                        </button>

                        {/* Security Notice */}
                        <div className="flex items-center justify-center gap-2 pt-4 border-t border-[#2a1a1c]">
                            <Lock className="size-4 text-gray-400" />
                            <span className="text-xs text-gray-400">We protect your privacy with advanced encryption</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
