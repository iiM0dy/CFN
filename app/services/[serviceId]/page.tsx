"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { Computer, Gamepad2, Rocket, Zap } from "lucide-react";
import { useCurrency } from "@/context/currency-context";
import { motion } from "framer-motion";
import { toast } from "sonner";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ServiceOptionValue {
  id: string; label: string; value: string;
  priceModifier: number; isDefault: boolean; order: number;
}
interface ServiceOption {
  id: string; label: string; type: string; required: boolean; order: number;
  minValue?: number; maxValue?: number; step?: number; values: ServiceOptionValue[];
}
interface Service {
  id: string; name: string; description: string | null; basePrice: string;
  platforms: string[]; completionMethods: string[]; maxQuantity?: number;
  image?: string | null; options?: ServiceOption[];
  game: { name: string; slug: string };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ServiceDetailsPage() {
  const { serviceId } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { formatPrice } = useCurrency();

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [platform, setPlatform] = useState("");
  const [completionMethod, setCompletionMethod] = useState("");
  const [completionSpeed, setCompletionSpeed] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, any>>({});
  const [activeTab, setActiveTab] = useState("description");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [discord, setDiscord] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoCodeData, setPromoCodeData] = useState<any>(null);
  const [promoCodeError, setPromoCodeError] = useState("");
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [checkoutError, setCheckoutError] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        document.querySelectorAll('[id^="dropdown-"]').forEach(d => d.classList.add('hidden'));
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

          let bPrice = Number(data.basePrice);
          let minAddPrice = 0;
          data.options?.forEach((opt: any) => {
            if (opt.type === 'number' || opt.type === 'range') {
              if (opt.minValue && opt.minValue > 0) {
                if (data.name?.toLowerCase().includes('coin')) bPrice = (bPrice * opt.minValue) / 1000;
                else bPrice = bPrice * opt.minValue;
              }
            } else if (opt.required && opt.values?.length > 0) {
              const prices = opt.values.map((v: any) => Number(v.priceModifier || 0));
              minAddPrice += Math.min(...prices);
            }
          });
          setMinPrice(bPrice + minAddPrice);

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
              initialSelections[opt.id] = { current: Number(opt.minValue || 0), desired: Number(desiredValue) };
            } else if (opt.type === 'number') {
              initialSelections[opt.id] = opt.minValue || 0;
            } else if (defaultValues.length > 0) {
              if (opt.type === 'select' || opt.type === 'dropdown') initialSelections[opt.id] = defaultValues[0];
              else if (opt.type === 'checkbox' || opt.type === 'checkboxes') initialSelections[opt.id] = defaultValues;
            } else if (sortedValues.length > 0) {
              if (opt.type === 'select' || opt.type === 'dropdown' || opt.label === 'Stages' || opt.label === 'Boosting options') {
                const firstValue = sortedValues[0].value;
                if (opt.type === 'checkbox' || opt.type === 'checkboxes') initialSelections[opt.id] = [firstValue];
                else initialSelections[opt.id] = firstValue;
              } else if (opt.required) {
                const cheapestValue = [...opt.values].sort((a: any, b: any) => Number(a.priceModifier) - Number(b.priceModifier))[0];
                if (opt.type === 'checkbox' || opt.type === 'checkboxes') initialSelections[opt.id] = [cheapestValue.value];
                else initialSelections[opt.id] = cheapestValue.value;
              }
            }
          });
          setSelectedOptions(initialSelections);
          if (session?.user) checkFavorite();
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
        setIsFavorite(favorites.some((fav: any) => fav.serviceId === (service?.id || serviceId)));
      }
    } catch (error) { console.error('Error checking favorite:', error); }
  };

  const toggleFavorite = async () => {
    if (!session?.user) { router.push('/login?callbackUrl=' + encodeURIComponent(window.location.href)); return; }
    setFavoriteLoading(true);
    try {
      if (isFavorite) {
        const res = await fetch(`/api/favorites?serviceId=${service?.id || serviceId}`, { method: 'DELETE' });
        if (res.ok) setIsFavorite(false);
      } else {
        const res = await fetch('/api/favorites', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ serviceId: service?.id || serviceId }) });
        if (res.ok) setIsFavorite(true);
      }
    } catch (error) { console.error('Error toggling favorite:', error); }
    finally { setFavoriteLoading(false); }
  };

  const isOptionVisible = (option: ServiceOption) => {
    if (option.label.toLowerCase().includes("completion speed")) return false;
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

  const calculateBasePrice = () => {
    let price = 0;
    const isCoinsService = service?.name?.toLowerCase().includes('coin');
    if (isCoinsService) {
      service?.options?.forEach(option => {
        if (option.type === 'number') {
          const coinAmount = selectedOptions[option.id] || option.minValue || 0;
          price = (Number(service.basePrice) * coinAmount) / 1000;
        }
      });
    } else {
      price = Number(service?.basePrice || 0);
      service?.options?.forEach(option => {
        if (!isOptionVisible(option)) return;
        const selected = selectedOptions[option.id];
        if (selected !== undefined && selected !== null) {
          if (Array.isArray(selected)) {
            selected.forEach(val => {
              const ov = option.values.find(v => v.value === val);
              if (ov) price += Number(ov.priceModifier);
            });
          } else if (option.type === 'range') {
            const current = Number(selected.current ?? option.minValue ?? 0);
            const desired = Number(selected.desired ?? option.maxValue ?? 100);
            const levels = Math.max(0, desired - current);
            const pricePerLevelValue = option.values.find(v => v.value === 'price_per_level');
            let pricePerLevel = 0;
            if (pricePerLevelValue) pricePerLevel = Number(pricePerLevelValue.priceModifier);
            else if (service?.name === "Workshop Leveling") pricePerLevel = 3.0;
            price += levels * pricePerLevel;
          } else if (option.type !== 'number') {
            const ov = option.values.find(v => v.value === selected);
            if (ov) price += Number(ov.priceModifier);
          }
        }
      });
      price *= quantity;
    }
    return price;
  };

  const calculateTotalPrice = () => {
    let price = calculateBasePrice();
    if (completionSpeed === 'express') price *= 1.20;
    else if (completionSpeed === 'super_express') price *= 1.40;
    if (promoCodeData) {
      if (promoCodeData.discountType === 'percentage') price = price * (1 - promoCodeData.discount / 100);
      else price = Math.max(0, price - promoCodeData.discount);
    }
    return price;
  };

  const getSpeedBoostPrice = (speedType: string) => {
    const basePrice = calculateBasePrice();
    if (speedType === 'express') return basePrice * 0.20;
    if (speedType === 'super_express') return basePrice * 0.40;
    return 0;
  };

  const validatePromoCode = async () => {
    if (!promoCode.trim()) return;
    setIsValidatingPromo(true);
    setPromoCodeError("");
    try {
      const res = await fetch('/api/promo-codes/validate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: promoCode }) });
      const data = await res.json();
      if (res.ok) { setPromoCodeData(data); setPromoCodeError(""); }
      else { setPromoCodeError(data.error); setPromoCodeData(null); }
    } catch { setPromoCodeError("Failed to validate promo code"); setPromoCodeData(null); }
    finally { setIsValidatingPromo(false); }
  };

  const handleOrderClick = () => {
    setAuthError("");
    if (status === "unauthenticated") {
      setAuthError("Please enter your email and press Submit to proceed to checkout.");
      return;
    }
    setShowPaymentModal(true);
  };

  const handleGuestLogin = async () => {
    setAuthError("");
    if (!email) {
      setAuthError("Please enter your email to continue.");
      return;
    }
    setIsSubmitting(true);
    try {
      const loginRes = await signIn("guest_email_login", {
        email,
        redirect: false
      });
      if (loginRes?.error) {
        if (loginRes.error.toLowerCase().includes("configuration") || loginRes.error.toLowerCase().includes("credentialssignin") || loginRes.error.includes("account")) {
          setAuthError("This email already has an account. Please log in normally.");
        } else {
          setAuthError("Login failed: " + loginRes.error);
        }
      } else {
        window.location.reload();
      }
    } catch (e) {
      console.error("Auto login exception", e);
      setAuthError("An error occurred during sign in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePurchase = async () => {
    setCheckoutError("");
    if (!selectedPaymentMethod) { setCheckoutError('Please select a payment method'); return; }
    if (selectedPaymentMethod !== 'stripe') { setCheckoutError(`${selectedPaymentMethod.toUpperCase()} is currently unavailable.`); return; }

    const purchaseEmail = session?.user?.email || email;
    if (!purchaseEmail) { setCheckoutError("Session email is missing. Please refresh."); return; }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/checkout/session", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ id: service?.id || 'unknown', name: service?.name || 'Service', description: `${service?.name} - ${platform || 'Standard'} | ${completionMethod || 'Direct'}`, price: calculateTotalPrice() / quantity, image: service?.image || null, quantity }],
          customerEmail: purchaseEmail,
          metadata: { discord, orderNotes, selectedOptions: JSON.stringify(selectedOptions), platform: platform || 'Standard', completionMethod: completionMethod || 'Direct', userId: session?.user?.id || "guest" },
          successUrl: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}${window.location.pathname}`,
        })
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error || "Failed to create checkout session");
    } catch (e: any) { setCheckoutError(e.message || 'Failed to initiate checkout.'); }
    finally { setIsSubmitting(false); }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-white/5 border-t-primary animate-spin" />
        <p className="text-xs font-black text-slate-600 uppercase tracking-widest">Loading Service...</p>
      </div>
    </div>
  );

  if (!service) return notFound();

  const visibleOptions = service.options?.sort((a, b) => a.order - b.order).filter(isOptionVisible) || [];
  const totalSteps = (service.platforms?.length > 0 ? 1 : 0) + visibleOptions.length + (service.completionMethods?.length > 0 ? 1 : 0) + 1;
  let stepIndex = 1;

  // ── Section wrapper ──────────────────────────────────────────────────────────
  const Section = ({ step, title, optional = false, children }: { step: number; title: string; optional?: boolean; children: React.ReactNode }) => (
    <section className="relative">
      <div className="flex items-center gap-4 mb-5">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
          <span className="text-[14px] font-black text-primary">{step}</span>
        </div>
        <h3 className="text-sm font-black text-white uppercase tracking-[0.15em] font-cairo flex items-center gap-2">
          {title}
          {optional && <span className="text-[14px] font-medium text-slate-500 normal-case tracking-normal">(Optional)</span>}
        </h3>
      </div>
      {children}
    </section>
  );

  // ── Radio card ───────────────────────────────────────────────────────────────
  const RadioCard = ({ checked, children }: { checked: boolean; children: React.ReactNode }) => (
    <div className={`group relative flex items-center gap-4 p-4 rounded-xl border transition-colors duration-200 cursor-pointer overflow-hidden
      ${checked
        ? 'border-primary bg-primary/5'
        : 'border-white/5 bg-[#0a0a0a] hover:border-white/10 hover:bg-[#0f0f0f]'
      }`}>

      {/* Custom Checkmark Design */}
      <div className="relative flex items-center justify-center shrink-0">
        <div className={`size-5 rounded-full border-2 transition-colors duration-200 flex items-center justify-center
          ${checked ? 'border-primary' : 'border-slate-700 group-hover:border-slate-500'}`}>
          <div className={`size-2.5 rounded-full bg-primary transition-transform duration-200 transform
            ${checked ? 'scale-100' : 'scale-0'}`} />
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center w-full">
        {children}
      </div>
    </div>
  );

  return (
    <div className="relative flex min-h-screen flex-col bg-[#050505] text-white font-sans">
      <main className="grow w-full max-w-[1440px] mx-auto px-6 lg:px-10 pt-8 pb-16">

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[14px] font-black uppercase tracking-[0.2em] text-slate-600 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-slate-700">/</span>
          <Link href={`/${service.game.slug}/services`} className="hover:text-primary transition-colors">{service.game.name}</Link>
          <span className="text-slate-700">/</span>
          <span className="text-slate-400">{service.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-8 flex flex-col gap-8">

            {/* ── SERVICE HERO ── */}
            <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-[#050505] shadow-2xl">
              {/* bg image */}
              {service.image && (
                <div className="absolute inset-0">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                </div>
              )}
              {/* subtle red glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/8 blur-[80px] rounded-full pointer-events-none" />

              <div className="relative z-10 p-7 flex flex-col md:flex-row gap-7">
                {/* 16:9 Thumbnail Image */}
                {service.image && (
                  <div className="hidden md:block shrink-0">
                    <div className="w-64 h-36 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                      <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-4 flex-1">
                  {/* top row */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[14px] font-bold uppercase tracking-widest">
                      <span className="material-symbols-outlined text-xs">bolt</span>
                      Service Detail
                    </div>
                    <button
                      onClick={toggleFavorite}
                      disabled={favoriteLoading}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 text-[14px] font-black uppercase tracking-widest
                        ${isFavorite ? 'bg-primary border-primary text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:border-primary/50 hover:text-white'}`}
                    >
                      <span className={`material-symbols-outlined text-[16px] ${isFavorite ? 'fill-1' : ''}`}>favorite</span>
                      {isFavorite ? 'Saved' : 'Save Asset'}
                    </button>
                  </div>

                  {/* title + price */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter font-cairo drop-shadow-[0_0_30px_rgba(175,18,37,0.3)]">
                      {service.name}
                    </h1>
                    <div className="flex flex-col items-start md:items-end shrink-0">
                      <span className="text-[11px] font-black text-primary uppercase tracking-widest mb-0.5">Starting From</span>
                      <span className="text-3xl font-black text-white tracking-tighter font-cairo">{formatPrice(minPrice)}</span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed max-w-xl line-clamp-2">{service.description}</p>
                </div>
              </div>
            </div>

            {/* ── CONFIG SECTIONS ── */}
            <div className="flex flex-col gap-7">

              {/* Platform */}
              {service.platforms?.length > 0 && (
                <Section step={stepIndex++} title="Select Platform">
                  <div className="grid grid-cols-3 gap-3">
                    {service.platforms.map(p => (
                      <label key={p} className="cursor-pointer block">
                        <input type="radio" name="platform" value={p} checked={platform === p} onChange={e => setPlatform(e.target.value)} className="sr-only" />
                        <RadioCard checked={platform === p}>
                          {p.toLowerCase().includes('pc')
                            ? <Computer className={`size-6 transition-colors ${platform === p ? 'text-white' : 'text-slate-500'}`} />
                            : <Gamepad2 className={`size-6 transition-colors ${platform === p ? 'text-white' : 'text-slate-500'}`} />
                          }
                          <span className={`text-sm font-bold transition-colors ${platform === p ? 'text-white' : 'text-slate-400'}`}>{p}</span>
                        </RadioCard>
                      </label>
                    ))}
                  </div>
                </Section>
              )}

              {/* Dynamic Options */}
              {visibleOptions.map(option => (
                <Section key={option.id} step={stepIndex++} title={option.label}>

                  {/* Select */}
                  {option.type === 'select' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {option.values.sort((a, b) => a.order - b.order).map(value => (
                        <label key={value.id} className="cursor-pointer block">
                          <input type="radio" name={option.id} value={value.value} checked={selectedOptions[option.id] === value.value}
                            onChange={e => setSelectedOptions({ ...selectedOptions, [option.id]: e.target.value })}
                            className="sr-only" required={option.required} />
                          <RadioCard checked={selectedOptions[option.id] === value.value}>
                            <div className="flex-1 flex justify-between items-center">
                              <span className={`text-sm font-bold transition-colors ${selectedOptions[option.id] === value.value ? 'text-white' : 'text-slate-300'}`}>{value.label}</span>
                              {value.priceModifier > 0
                                ? <span className={`text-xs px-2 py-0.5 rounded font-bold ${selectedOptions[option.id] === value.value ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary border border-primary/20'}`}>+{formatPrice(value.priceModifier)}</span>
                                : <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-slate-500">Free</span>
                              }
                            </div>
                          </RadioCard>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Checkboxes */}
                  {option.type === 'checkboxes' && (
                    <div className="grid grid-cols-1 gap-2">
                      {option.values.sort((a, b) => a.order - b.order).map(value => {
                        const isChecked = (selectedOptions[option.id] || []).includes(value.value);
                        return (
                          <label key={value.id} className="cursor-pointer block">
                            <input type="checkbox" value={value.value} checked={isChecked}
                              onChange={e => {
                                const current = selectedOptions[option.id] || [];
                                setSelectedOptions({ ...selectedOptions, [option.id]: e.target.checked ? [...current, value.value] : current.filter((v: string) => v !== value.value) });
                              }} className="sr-only" />
                            <RadioCard checked={isChecked}>
                              <div className="flex-1 flex items-center justify-between">
                                <span className={`text-sm font-medium transition-colors ${isChecked ? 'text-white' : 'text-slate-400'}`}>{value.label}</span>
                                {value.priceModifier > 0 && <span className={`text-sm font-bold ${isChecked ? 'text-primary' : 'text-slate-500'}`}>+{formatPrice(value.priceModifier)}</span>}
                              </div>
                            </RadioCard>
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {/* Dropdown */}
                  {option.type === 'dropdown' && (
                    <div className="relative dropdown-container">
                      <button type="button" onClick={() => document.getElementById(`dropdown-${option.id}`)?.classList.toggle('hidden')}
                        className="w-full bg-[#050505] border border-white/5 rounded-xl p-4 flex items-center justify-between text-gray-300 hover:border-primary/30 transition-colors">
                        <span className="font-medium text-sm">
                          {selectedOptions[option.id] ? option.values.find(v => v.value === selectedOptions[option.id])?.label : `Choose ${option.label.toLowerCase()}...`}
                        </span>
                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      <div id={`dropdown-${option.id}`} className="hidden absolute z-10 w-full mt-2 bg-[#111] border border-white/10 rounded-xl shadow-2xl max-h-64 overflow-y-auto">
                        <div className="p-2">
                          {option.values.sort((a, b) => a.order - b.order).map(value => (
                            <button key={value.id} type="button"
                              onClick={() => { setSelectedOptions({ ...selectedOptions, [option.id]: value.value }); document.getElementById(`dropdown-${option.id}`)?.classList.add('hidden'); }}
                              className={`w-full flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors text-left text-sm ${selectedOptions[option.id] === value.value ? 'bg-primary/10 text-white' : 'text-slate-300 hover:bg-white/5'}`}>
                              <span>{value.label}</span>
                              {value.priceModifier > 0 && <span className="font-bold text-primary">+{formatPrice(value.priceModifier)}</span>}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Checkbox dropdown */}
                  {option.type === 'checkbox' && (
                    <div className="relative dropdown-container">
                      <button type="button" onClick={() => document.getElementById(`dropdown-${option.id}`)?.classList.toggle('hidden')}
                        className="w-full bg-[#050505] border border-white/5 rounded-xl p-4 flex items-center justify-between text-gray-300 hover:border-primary/30 transition-colors">
                        <span className="font-medium text-sm">
                          {(selectedOptions[option.id] || []).length > 0 ? `${(selectedOptions[option.id] || []).length} ${option.label.toLowerCase()} selected` : `Choose ${option.label.toLowerCase()}...`}
                        </span>
                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      <div id={`dropdown-${option.id}`} className="hidden absolute z-10 w-full mt-2 bg-[#111] border border-white/10 rounded-xl shadow-2xl max-h-64 overflow-y-auto">
                        <div className="p-2">
                          {option.values.sort((a, b) => a.order - b.order).map(value => (
                            <label key={value.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                              <div className="flex items-center gap-3">
                                <input type="checkbox" value={value.value} checked={(selectedOptions[option.id] || []).includes(value.value)}
                                  onChange={e => {
                                    const current = selectedOptions[option.id] || [];
                                    setSelectedOptions({ ...selectedOptions, [option.id]: e.target.checked ? [...current, value.value] : current.filter((v: string) => v !== value.value) });
                                  }}
                                  className="w-4 h-4 rounded border-slate-700 bg-[#141414] text-primary focus:ring-primary focus:ring-offset-0" />
                                <span className="text-sm text-slate-300">{value.label}</span>
                              </div>
                              {value.priceModifier > 0 && <span className="text-sm font-bold text-primary">+{formatPrice(value.priceModifier)}</span>}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Range */}
                  {option.type === 'range' && (
                    <div className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/5 space-y-8">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: 'Current Level', key: 'current', min: option.minValue || 0, max: (selectedOptions[option.id]?.desired ?? option.maxValue ?? 100) - 1 },
                          { label: 'Desired Level', key: 'desired', min: (selectedOptions[option.id]?.current ?? option.minValue ?? 0) + 1, max: option.maxValue || 100 },
                        ].map(field => (
                          <div key={field.key}>
                            <label className="text-[14px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 block">{field.label}</label>
                            <div className="bg-[#050505] border border-white/5 rounded-xl p-3 focus-within:border-primary/40 transition-colors">
                              <input type="number" min={field.min} max={field.max}
                                value={selectedOptions[option.id]?.[field.key] ?? (field.key === 'current' ? option.minValue : option.maxValue) ?? 0}
                                onChange={e => {
                                  let val = Number(e.target.value);
                                  val = Math.max(field.min, Math.min(val, field.max));
                                  setSelectedOptions({ ...selectedOptions, [option.id]: { ...selectedOptions[option.id], [field.key]: val } });
                                }}
                                className="bg-transparent border-none text-white font-bold w-full focus:outline-none text-center text-lg" />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="relative pt-4 px-2">
                        <div className="h-1.5 bg-white/5 rounded-full relative">
                          {['current', 'desired'].map((key, i) => (
                            <input key={key} type="range" min={option.minValue || 0} max={option.maxValue || 100}
                              value={selectedOptions[option.id]?.[key] ?? (key === 'current' ? option.minValue : option.maxValue) ?? 0}
                              onChange={e => {
                                let val = Number(e.target.value);
                                if (key === 'current') val = Math.min(val, (selectedOptions[option.id]?.desired ?? option.maxValue ?? 100) - 1);
                                else val = Math.max(val, (selectedOptions[option.id]?.current ?? option.minValue ?? 0) + 1);
                                setSelectedOptions({ ...selectedOptions, [option.id]: { ...selectedOptions[option.id], [key]: val } });
                              }}
                              className={`absolute inset-x-0 -top-1 w-full h-4 bg-transparent appearance-none pointer-events-none cursor-pointer ${i === 0 ? 'z-40' : 'z-30'} [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-transparent [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:pointer-events-auto`} />
                          ))}
                          <div className="absolute h-full bg-primary rounded-full transition-all duration-300 pointer-events-none"
                            style={{
                              left: `${(((selectedOptions[option.id]?.current ?? option.minValue ?? 0) - (option.minValue || 0)) / ((option.maxValue || 100) - (option.minValue || 0))) * 100}%`,
                              right: `${100 - (((selectedOptions[option.id]?.desired ?? option.maxValue ?? 100) - (option.minValue || 0)) / ((option.maxValue || 100) - (option.minValue || 0))) * 100}%`
                            }} />
                          {['current', 'desired'].map(key => (
                            <div key={key} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-4 bg-white rounded-full border-2 border-primary shadow-[0_0_14px_rgba(175,18,37,0.4)] pointer-events-none z-10 transition-all duration-300"
                              style={{ left: `${(((selectedOptions[option.id]?.[key] ?? (key === 'current' ? option.minValue : option.maxValue) ?? 0) - (option.minValue || 0)) / ((option.maxValue || 100) - (option.minValue || 0))) * 100}%` }} />
                          ))}
                        </div>
                        <div className="flex justify-between mt-5">
                          {(() => {
                            const min = option.minValue || 0, max = option.maxValue || 100, range = max - min;
                            const marks = range <= 10 ? Array.from({ length: range + 1 }, (_, i) => min + i) : [0, 1, 2, 3, 4].map(i => Math.round(min + (range * i) / 4));
                            return marks.map((level, idx) => {
                              const isActive = level >= (selectedOptions[option.id]?.current ?? min) && level <= (selectedOptions[option.id]?.desired ?? max);
                              return (
                                <div key={idx} className="absolute -translate-x-1/2" style={{ left: `${((level - min) / range) * 100}%` }}>
                                  <span className={`text-[14px] font-black tracking-tighter transition-colors ${isActive ? 'text-primary' : 'text-slate-700'}`}>{level}</span>
                                </div>
                              );
                            });
                          })()}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Number */}
                  {option.type === 'number' && (
                    <div className="space-y-3">
                      <input type="number" min={option.minValue || 0} max={option.maxValue || 999999999} step={option.step || 1}
                        value={selectedOptions[option.id] || option.minValue || 0}
                        onChange={e => setSelectedOptions({ ...selectedOptions, [option.id]: Number(e.target.value) })}
                        className="w-full bg-[#050505] border border-white/5 rounded-xl px-5 py-4 text-white text-lg font-bold focus:border-primary/50 focus:outline-none transition-colors" />
                      <div className="p-4 rounded-xl bg-[#050505] border border-white/5">
                        <input type="range" min={option.minValue || 0} max={option.maxValue || 100} step={option.step || 1}
                          value={selectedOptions[option.id] || option.minValue || 0}
                          onChange={e => setSelectedOptions({ ...selectedOptions, [option.id]: Number(e.target.value) })}
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary" />
                        <div className="flex justify-between mt-3 text-[14px] font-black text-slate-600 uppercase tracking-widest">
                          <span>{(option.minValue || 0) >= 1000 ? `${((option.minValue || 0) / 1000).toFixed(0)}K` : option.minValue}</span>
                          <span>{(option.maxValue || 0) >= 1000000 ? `${((option.maxValue || 0) / 1000000).toFixed(0)}M` : `${((option.maxValue || 0) / 1000).toFixed(0)}K`}</span>
                        </div>
                      </div>
                    </div>
                  )}

                </Section>
              ))}

              {/* Deployment Method */}
              {service.completionMethods?.length > 0 && (
                <Section step={stepIndex++} title="Deployment Method">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.completionMethods.map(method => (
                      <label key={method} className="cursor-pointer block group">
                        <input type="radio" name="completionMethod" value={method} checked={completionMethod === method} onChange={e => setCompletionMethod(e.target.value)} className="sr-only" />
                        <RadioCard checked={completionMethod === method}>
                          <div className="flex-1">
                            <h4 className={`font-black text-sm uppercase tracking-tight mb-1 transition-colors ${completionMethod === method ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>{method}</h4>
                            <p className={`text-[11px] leading-relaxed transition-colors ${completionMethod === method ? 'text-white/70' : 'text-slate-500 group-hover:text-slate-400'}`}>
                              {method.toLowerCase().includes('piloted') ? 'Our pro operative logs into your account. Encryption Active.' : 'You play on your own account alongside our squad. In-raid trading active.'}
                            </p>
                          </div>
                        </RadioCard>
                      </label>
                    ))}
                  </div>
                </Section>
              )}

              {/* Completion Speed */}
              <Section step={stepIndex++} title="Completion Speed" optional>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { value: 'express', label: 'Express', icon: Rocket, desc: 'Priority queue. Estimated start: 15-30 mins.' },
                    { value: 'super_express', label: 'Super Express', icon: Zap, desc: 'Immediate start. Dedicated booster assigned instantly.' },
                  ].map(speed => {
                    const isChecked = completionSpeed === speed.value;
                    const Icon = speed.icon;
                    return (
                      <label key={speed.value} className="cursor-pointer block group">
                        <input type="radio" name="completionSpeed" value={speed.value} checked={isChecked}
                          onClick={e => { if (isChecked) { e.preventDefault(); setCompletionSpeed(null); } else setCompletionSpeed(speed.value); }}
                          onChange={() => { }} className="sr-only" />
                        <RadioCard checked={isChecked}>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1.5">
                              <h4 className={`font-bold text-sm flex items-center gap-1.5 transition-colors ${isChecked ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                                {speed.label} <Icon className={`size-3.5 ${isChecked ? 'text-white' : 'text-primary'}`} />
                              </h4>
                              <span className={`text-xs px-2 py-0.5 rounded font-bold transition-colors ${isChecked ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary border border-primary/20 group-hover:border-primary/40'}`}>
                                +{formatPrice(getSpeedBoostPrice(speed.value))}
                              </span>
                            </div>
                            <p className={`text-[11px] transition-colors ${isChecked ? 'text-white/70' : 'text-slate-500 group-hover:text-slate-400'}`}>{speed.desc}</p>
                          </div>
                        </RadioCard>
                      </label>
                    );
                  })}
                </div>
              </Section>
            </div>

            {/* ── TABS ── */}
            <div className="mt-4 border border-white/5 rounded-2xl overflow-hidden">
              {/* tab bar */}
              <div className="flex border-b border-white/5 bg-[#0a0a0a]">
                {[
                  { id: 'description', label: 'Description' },
                  { id: 'requirements', label: 'Requirements' },
                  { id: 'reviews', label: 'Customer Reviews (24)' },
                ].map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 text-xs font-black uppercase tracking-wider transition-all relative
                      ${activeTab === tab.id ? 'text-white' : 'text-slate-600 hover:text-slate-400'}`}>
                    {tab.label}
                    {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                  </button>
                ))}
              </div>
              {/* tab content */}
              <div className="p-6 text-slate-400 leading-relaxed space-y-4 text-sm font-cairo">
                {activeTab === 'description' && (
                  <>
                    <p>{service.description}</p>
                    <h4 className="text-white font-bold mt-4 mb-2">Service Includes:</h4>
                    <ul className="space-y-2">
                      {['Professional service completion by verified players', 'Safe and secure delivery using VPN matching your location', '24/7 customer support throughout the process', 'Money-back guarantee if not satisfied'].map(item => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {activeTab === 'requirements' && (
                  <>
                    <p>To use this service, you will need:</p>
                    <ul className="space-y-2">
                      {['Active game account', 'Account credentials (for piloted services)', 'Stable internet connection'].map(item => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {activeTab === 'reviews' && <p className="text-slate-500">Customer reviews coming soon...</p>}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-4">

              {/* Quantity */}
              <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-1 h-5 bg-primary rounded-full" />
                  <h3 className="text-sm font-black text-white uppercase tracking-widest font-cairo">Quantity</h3>
                </div>
                <div className="flex items-end justify-between mb-4">
                  <span className="text-[14px] font-bold text-slate-500 uppercase tracking-widest">Units</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white font-cairo leading-none">{quantity}</span>
                    <span className="text-[14px] font-black text-primary uppercase tracking-widest">QTY</span>
                  </div>
                </div>
                <input type="range" min="1" max={service?.maxQuantity || 15} step="1" value={quantity}
                  onChange={e => setQuantity(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary mb-3" />
                <div className="flex justify-between text-[14px] font-black text-slate-600 uppercase tracking-widest">
                  <span>Min 01</span>
                  <span>Limit {service?.maxQuantity || 15}</span>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-[60px] rounded-full pointer-events-none" />

                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1 h-5 bg-primary rounded-full" />
                  <h3 className="text-sm font-black text-white uppercase tracking-widest font-cairo">Order Summary</h3>
                </div>

                {/* Promo code */}
                <div className="mb-6">
                  <label className="text-[14px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-2 block">Promo Code</label>
                  <div className="flex gap-2">
                    <input type="text" value={promoCode}
                      onChange={e => { setPromoCode(e.target.value.toUpperCase()); setPromoCodeError(""); setPromoCodeData(null); }}
                      placeholder="ENTER CODE..."
                      className="flex-1 bg-[#050505] border border-white/5 rounded-lg px-3 py-2.5 text-white text-xs font-bold uppercase tracking-widest placeholder:text-slate-700 focus:border-primary/40 focus:outline-none transition-all" />
                    <button type="button" onClick={validatePromoCode} disabled={!promoCode.trim() || isValidatingPromo}
                      className="px-4 py-2.5 bg-[#1a1a1a] hover:bg-primary text-white text-[14px] font-black uppercase tracking-widest rounded-lg transition-all disabled:opacity-40 border border-white/5">
                      {isValidatingPromo ? '...' : 'Apply'}
                    </button>
                  </div>
                  {promoCodeError && <p className="text-primary text-[14px] font-black uppercase tracking-widest mt-2 flex items-center gap-1"><span className="material-symbols-outlined text-xs">error</span>{promoCodeError}</p>}
                  {promoCodeData && <p className="text-emerald-500 text-[14px] font-black uppercase tracking-widest mt-2 flex items-center gap-1"><span className="material-symbols-outlined text-xs">check_circle</span>Discount Applied: {promoCodeData.discountType === 'percentage' ? `${promoCodeData.discount}%` : formatPrice(promoCodeData.discount)}</p>}
                </div>

                {/* Summary rows */}
                <div className="space-y-3 mb-6 pb-6 border-b border-white/5">
                  {[
                    { label: 'Service', value: service.name },
                    platform && { label: 'Platform', value: platform },
                    {
                      label: 'Amount', value: (() => {
                        if (service?.name === "Workshop Leveling") {
                          const whatToLevelOption = service.options?.find(o => o.label === "What should we level up?");
                          const mode = whatToLevelOption ? selectedOptions[whatToLevelOption.id] : null;
                          if (mode === "scrappy" || mode === "specific_bench") {
                            const rangeOpt = service.options?.find(o => o.label?.toLowerCase().includes("level range") && isOptionVisible(o));
                            if (rangeOpt) { const range = selectedOptions[rangeOpt.id]; if (range && typeof range === 'object') return Math.max(0, Number(range.desired ?? 0) - Number(range.current ?? 0)); }
                          }
                        }
                        return quantity;
                      })()
                    },
                    completionMethod && { label: 'Method', value: completionMethod },
                    completionSpeed && { label: 'Speed', value: completionSpeed === 'express' ? 'Express +20%' : 'Super Express +40%', highlight: true },
                  ].filter(Boolean).map((row: any) => (
                    <div key={row.label} className="flex justify-between items-center">
                      <span className="text-[14px] font-bold text-slate-500 uppercase tracking-widest">{row.label}</span>
                      <span className={`text-[14px] font-black uppercase tracking-tight text-right ${row.highlight ? 'text-primary' : 'text-white'}`}>{row.value}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-[14px] font-bold text-slate-500 uppercase tracking-[0.2em]">Total Price</div>
                    <div className="text-[11px] text-slate-700 mt-0.5 font-bold uppercase tracking-widest">Secure transaction</div>
                  </div>
                  <span className="text-4xl font-black text-white tracking-tighter font-cairo">{formatPrice(calculateTotalPrice())}</span>
                </div>

                {status === "unauthenticated" && (
                  <div className="mb-4 space-y-2 p-4 rounded-xl border border-white/10 bg-[#111]">
                    <label className="text-[14px] text-slate-400 font-bold uppercase tracking-[0.2em] block">
                      Enter Email to Checkout
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="flex-1 bg-[#050505] border border-white/5 rounded-lg px-3 py-2.5 text-white text-xs font-bold tracking-widest placeholder:text-slate-700 focus:border-primary/40 focus:outline-none transition-all"
                      />
                      <button
                        onClick={handleGuestLogin}
                        disabled={!email || isSubmitting}
                        className="px-4 py-2.5 bg-[#1a1a1a] hover:bg-primary text-white text-[14px] font-black uppercase tracking-widest rounded-lg transition-all disabled:opacity-40 border border-white/5"
                      >
                        {isSubmitting ? '...' : 'Submit'}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-600 font-black uppercase tracking-widest">
                      Submit your email to seamlessly create your account and track your order.
                    </p>
                    {authError && (
                      <div className="bg-primary/10 border border-primary/20 rounded-md p-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-xs">error</span>
                        <p className="text-primary text-[11px] font-black uppercase tracking-widest">{authError}</p>
                      </div>
                    )}
                  </div>
                )}

                <button onClick={handleOrderClick} className="w-full py-4 bg-primary hover:bg-[#8a0e1d] text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2">
                  Proceed to Checkout
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>

                <div className="flex items-center justify-center gap-2 mt-4 text-[14px] text-slate-600 font-black uppercase tracking-widest">
                  <span className="material-symbols-outlined text-sm">lock</span>256-Bit Secure Protocol
                </div>
              </div>

              {/* Trust badges */}
              <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5 grid grid-cols-2 gap-3">
                {[
                  { icon: 'verified_user', label: 'Secured' },
                  { icon: 'support_agent', label: 'Support' },
                  { icon: 'vpn_lock', label: 'Encrypted' },
                  { icon: 'payments', label: 'Verified' },
                ].map(badge => (
                  <div key={badge.label} className="flex items-center gap-2.5 group">
                    <div className="size-9 rounded-lg bg-white/[0.04] border border-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                      <span className="material-symbols-outlined text-base">{badge.icon}</span>
                    </div>
                    <span className="text-[14px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">{badge.label}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* ── PAYMENT MODAL ── */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => { setShowPaymentModal(false); setSelectedPaymentMethod(null); }} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
          <motion.div initial={{ opacity: 0, scale: 0.97, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="bg-[#0a0a0a] border border-white/10 rounded-3xl w-full max-w-lg shadow-2xl relative z-[101] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 overflow-y-auto custom-scrollbar">
              {/* header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tighter">Checkout</h2>
                  <p className="text-sm text-slate-500 mt-1">Review your service details</p>
                </div>
                <button onClick={() => { setShowPaymentModal(false); setSelectedPaymentMethod(null); }} className="p-2 rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="space-y-5">
                {/* order summary */}
                <div className="bg-[#050505] rounded-xl p-5 border border-white/5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white">{service?.name}</h3>
                      <p className="text-xs text-slate-400 mt-1">{platform} • {completionMethod}</p>
                    </div>
                    <div className="text-xl font-black text-white">{formatPrice(calculateTotalPrice())}</div>
                  </div>
                </div>

                {/* customer info */}
                <div className="space-y-1.5">
                  <label className="text-[14px] font-bold text-slate-500 uppercase tracking-wider">Order Notes (Optional)</label>
                  <textarea value={orderNotes} onChange={e => setOrderNotes(e.target.value)} placeholder="Any specific requirements..." rows={2}
                    className="w-full bg-[#050505] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-primary/50 transition-all outline-none resize-none hover:border-white/10" />
                </div>

                {/* payment methods */}
                <div className="space-y-3">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Select Payment Method</label>
                  <button onClick={() => setSelectedPaymentMethod('stripe')}
                    className={`w-full relative flex items-center gap-4 p-4 rounded-xl border transition-colors duration-200 cursor-pointer overflow-hidden text-sm font-bold
                      ${selectedPaymentMethod === 'stripe' ? 'border-primary bg-primary/5 text-white' : 'border-white/5 bg-[#0a0a0a] hover:border-white/10 hover:bg-[#0f0f0f] text-slate-400'}`}>
                    <div className="relative flex items-center justify-center shrink-0">
                      <div className={`size-5 rounded-full border-2 transition-colors duration-200 flex items-center justify-center
                        ${selectedPaymentMethod === 'stripe' ? 'border-primary' : 'border-slate-700'}`}>
                        <div className={`size-2.5 rounded-full bg-primary transition-transform duration-200 transform
                          ${selectedPaymentMethod === 'stripe' ? 'scale-100' : 'scale-0'}`} />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined">credit_card</span>
                      Credit / Debit Card
                    </div>
                  </button>
                  <div className="space-y-3">
                    {[{ icon: 'payments', label: 'PayPal' }, { icon: 'currency_bitcoin', label: 'Crypto' }].map(m => (
                      <div key={m.label} className="w-full relative flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-[#0a0a0a] transition-colors duration-200 cursor-not-allowed overflow-hidden text-sm font-bold text-slate-400 opacity-60">
                        <div className="relative flex items-center justify-center shrink-0">
                          <div className="size-5 rounded-full border-2 border-slate-700 flex items-center justify-center">
                            <div className="size-2.5 rounded-full bg-primary transform scale-0" />
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined">{m.icon}</span>
                          {m.label}
                        </div>
                        <div className="ml-auto flex shrink-0">
                          <span className="text-[11px] border border-white/20 px-2 py-0.5 rounded text-white bg-white/5 uppercase font-black tracking-widest">Soon</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* pay button */}
              <div className="pt-5 mt-2">
                {checkoutError && (
                  <div className="mb-4 bg-primary/10 border border-primary/20 text-primary text-xs font-bold p-3 rounded-lg flex items-center gap-2 uppercase tracking-widest">
                    <span className="material-symbols-outlined text-sm">error</span>
                    {checkoutError}
                  </div>
                )}
                <button onClick={handlePurchase} disabled={!selectedPaymentMethod || isSubmitting}
                  className="w-full py-4 bg-primary hover:bg-[#8a0e1d] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <><div className="size-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /><span>Processing...</span></>
                  ) : (
                    <><span>Pay Now</span><span className="material-symbols-outlined text-xl">arrow_forward</span></>
                  )}
                </button>
                <p className="text-center text-[14px] text-slate-600 mt-3 flex items-center justify-center gap-1.5 uppercase tracking-widest font-black">
                  <span className="material-symbols-outlined text-xs">lock</span>Secure SSL Encrypted Payment
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}