"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";

// Since we are in a client component, we'll fetch the service data via an API or just use a mock for now
// In a real scenario, we'd have a server action or an API route.
// For now, I'll use a mock but structured like the DB.

interface Service {
    id: string;
    name: string;
    description: string | null;
    basePrice: string;
    platforms: string[];
    completionMethods: string[];
    game: {
        name: string;
        slug: string;
    };
}

export default function ServiceDetailsPage() {
    const { serviceId } = useParams();
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [platform, setPlatform] = useState("");
    const [completionMethod, setCompletionMethod] = useState("");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // Fetch service data
        async function fetchService() {
            try {
                const res = await fetch(`/api/services/${serviceId}`);
                if (res.ok) {
                    const data = await res.json();
                    setService(data);
                    if (data.platforms.length > 0) setPlatform(data.platforms[0]);
                    if (data.completionMethods.length > 0) setCompletionMethod(data.completionMethods[0]);
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
    }, [serviceId]);

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

    const totalPrice = Number(service.basePrice) * quantity;

    return (
        <div className="relative flex min-h-screen flex-col bg-[#0B0B0B] text-white font-[family-name:var(--font-space-grotesk)]">
            <main className="flex-1 px-4 py-8 md:px-10 lg:px-20 max-w-[1440px] mx-auto w-full">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 mb-8 text-sm">
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
                    <span className="text-gray-600">/</span>
                    <Link href="/games" className="text-gray-400 hover:text-white transition-colors">Games</Link>
                    <span className="text-gray-600">/</span>
                    <Link href={`/games/${service.game.slug}/services`} className="text-gray-400 hover:text-white transition-colors">{service.game.name}</Link>
                    <span className="text-gray-600">/</span>
                    <span className="text-white font-medium">{service.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
                    {/* Left Column */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        {/* Hero */}
                        <div className="relative overflow-hidden rounded-2xl bg-[#1A1A1A] border border-white/5 p-8 md:p-10">
                            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-primary/10 to-transparent" />
                            <div className="relative z-10">
                                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">{service.name}</h1>
                                <p className="text-gray-400 max-w-xl text-lg">{service.description}</p>
                                <div className="flex flex-wrap gap-4 mt-8">
                                    <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 px-3 py-1.5 rounded-full border border-green-400/20">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                        <span>Verified Boosters</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-full border border-blue-400/20">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                        <span>VPN Protection</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-full border border-amber-400/20">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                        <span>Starts in 15m</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Configuration */}
                        <div className="rounded-xl border border-white/5 bg-[#1A1A1A] p-6 space-y-8">
                            {/* Platform Selection */}
                            {service.platforms.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">1</div>
                                        <h3 className="text-xl font-bold text-white">Choose Platform</h3>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {service.platforms.map((p) => (
                                            <button 
                                                key={p} 
                                                onClick={() => setPlatform(p)} 
                                                className={`flex items-center justify-center gap-2 rounded-lg border p-4 text-white transition-all ${platform === p ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(175,18,37,0.2)]' : 'border-white/10 bg-[#0B0B0B] hover:border-primary/50'}`}
                                            >
                                                <span className="font-bold">{p}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Completion Method Selection */}
                            {service.completionMethods.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
                                            {service.platforms.length > 0 ? "2" : "1"}
                                        </div>
                                        <h3 className="text-xl font-bold text-white">Completion Method</h3>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {service.completionMethods.map((m) => (
                                            <button 
                                                key={m} 
                                                onClick={() => setCompletionMethod(m)} 
                                                className={`flex items-center justify-center gap-2 rounded-lg border p-4 text-white transition-all ${completionMethod === m ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(175,18,37,0.2)]' : 'border-white/10 bg-[#0B0B0B] hover:border-primary/50'}`}
                                            >
                                                <span className="font-bold">{m}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-sm">
                                        {(service.platforms.length > 0 ? 1 : 0) + (service.completionMethods.length > 0 ? 1 : 0) + 1}
                                    </div>
                                    <h3 className="text-xl font-bold text-white">Quantity</h3>
                                </div>
                                <div className="flex items-center gap-4 bg-[#0B0B0B] border border-white/10 rounded-lg p-4 w-fit">
                                    <button 
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="h-10 w-10 flex items-center justify-center rounded-md bg-[#1A1A1A] border border-white/5 hover:bg-primary transition-colors font-bold text-xl"
                                    >
                                        -
                                    </button>
                                    <span className="text-2xl font-bold min-w-[3rem] text-center">{quantity}</span>
                                    <button 
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="h-10 w-10 flex items-center justify-center rounded-md bg-[#1A1A1A] border border-white/5 hover:bg-primary transition-colors font-bold text-xl"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Checkout Summary */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-[100px] rounded-xl border border-white/5 bg-[#1A1A1A] overflow-hidden shadow-2xl">
                            <div className="bg-primary/10 p-6 border-b border-primary/20">
                                <h3 className="text-xl font-bold text-white italic tracking-tighter">ORDER SUMMARY</h3>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Service</span>
                                        <span className="text-white font-medium">{service.name}</span>
                                    </div>
                                    {platform && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-400">Platform</span>
                                            <span className="text-white font-medium">{platform}</span>
                                        </div>
                                    )}
                                    {completionMethod && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-400">Method</span>
                                            <span className="text-white font-medium">{completionMethod}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">Quantity</span>
                                        <span className="text-white font-medium">{quantity}</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="flex justify-between items-end mb-8">
                                        <span className="text-gray-400 font-medium">Total Price</span>
                                        <div className="text-right">
                                            <span className="text-3xl font-black text-primary italic">${totalPrice.toFixed(2)}</span>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Instant Delivery</p>
                                        </div>
                                    </div>

                                    <button className="w-full bg-primary hover:bg-rose-700 text-white py-4 rounded-xl font-black italic tracking-tighter uppercase transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20">
                                        Purchase Now
                                    </button>
                                    
                                    <div className="mt-4 flex items-center justify-center gap-4 grayscale opacity-50">
                                        <span className="text-[10px] font-bold">VISA</span>
                                        <span className="text-[10px] font-bold">MASTERCARD</span>
                                        <span className="text-[10px] font-bold">PAYPAL</span>
                                        <span className="text-[10px] font-bold">CRYPTO</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
