"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { Computer, Gamepad2, Rocket, Zap, Shield, Headphones, Truck, UserCheck, Heart, Lock, ArrowRight, X as XIcon } from "lucide-react";
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setOpenDropdown(null);
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

  const handleOrderClick = async () => {
    setAuthError("");
    if (status === "unauthenticated") {
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        setAuthError("Please enter a valid email address to proceed.");
        return;
      }
      await handleGuestLogin();
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
        setShowPaymentModal(true);
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
      if (data.url) {
        window.location.href = data.url;
      }
      else throw new Error(data.error || "Failed to create checkout session");
    } catch (e: any) { setCheckoutError(e.message || 'Failed to initiate checkout.'); }
    finally { setIsSubmitting(false); }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-white/[0.06] border-t-primary animate-spin" />
        <p className="text-xs text-slate-500">Loading service...</p>
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
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
          <span className="text-xs font-bold text-primary">{String(step).padStart(2, '0')}</span>
        </div>
        <h3 className="font-cairo text-sm font-bold text-white uppercase tracking-wide flex items-center gap-2">
          {title}
          {optional && <span className="text-[11px] font-normal text-slate-500 normal-case tracking-normal">(Optional)</span>}
        </h3>
      </div>
      {children}
    </section>
  );

  // ── Radio card ───────────────────────────────────────────────────────────────
  const RadioCard = ({ checked, children }: { checked: boolean; children: React.ReactNode }) => (
    <div className={`group relative flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 cursor-pointer
      ${checked
        ? 'border-primary/40 bg-primary/[0.06] shadow-[0_0_20px_-6px_rgba(175,18,37,0.15)]'
        : 'border-white/[0.06] bg-[#0c0c0c] hover:border-white/10 hover:bg-[#0f0f0f]'
      }`}>
      <div className="relative flex items-center justify-center shrink-0">
        <div className={`size-4 rounded-full border-2 transition-colors duration-200 flex items-center justify-center
          ${checked ? 'border-primary' : 'border-slate-700 group-hover:border-slate-500'}`}>
          <div className={`size-2 rounded-full bg-primary transition-transform duration-200 transform
            ${checked ? 'scale-100' : 'scale-0'}`} />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center w-full">
        {children}
      </div>
    </div>
  );

  return (
    <div className="relative flex min-h-screen flex-col bg-[#080808] text-white font-sans">
      <main className="grow w-full max-w-[1440px] mx-auto px-6 lg:px-10 pt-8 pb-16">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="text-slate-700">/</span>
          <Link href={`/${service.game.slug}/services`} className="hover:text-white transition-colors">{service.game.name}</Link>
          <span className="text-slate-700">/</span>
          <span className="text-slate-300 font-medium">{service.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* ── SERVICE HERO ── */}
            <div className="relative rounded-xl overflow-hidden border border-white/[0.06] bg-[#0c0c0c]">
              {service.image && (
                <div className="absolute inset-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={service.image} alt="" aria-hidden="true" className="w-full h-full object-cover opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0c] via-[#0c0c0c]/80 to-[#0c0c0c]/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent" />
                </div>
              )}

              <div className="relative z-10 p-5 sm:p-6 flex flex-col sm:flex-row gap-5">
                {/* Thumbnail */}
                <div className="shrink-0">
                  <div className="w-full sm:w-52 h-32 sm:h-32 rounded-xl overflow-hidden border border-white/[0.08] bg-[#111] shadow-xl">
                    {service.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a0a2e] to-[#0d0515]">
                        <span className="text-3xl font-bold text-white/[0.06] select-none">{service.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold text-primary/70 uppercase tracking-widest">
                      {service.game.name}
                    </span>
                    <button
                      onClick={toggleFavorite}
                      disabled={favoriteLoading}
                      aria-label={isFavorite ? "Remove from saved services" : "Save this service"}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0
                        ${isFavorite ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-white/[0.04] border-white/[0.06] text-slate-400 hover:border-primary/30 hover:text-primary'}`}
                    >
                      <Heart className={`size-3 ${isFavorite ? 'fill-primary' : ''}`} />
                      {isFavorite ? 'Saved' : 'Save'}
                    </button>
                  </div>

                  <h1 className="font-cairo text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-1.5">
                    {service.name}
                  </h1>

                  {service.description && (
                    <p className="text-slate-400 text-[13px] leading-relaxed line-clamp-2 mb-3">{service.description}</p>
                  )}

                  <div className="mt-auto flex items-baseline gap-1.5">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">From</span>
                    <span className="text-2xl font-bold text-white tracking-tight">{formatPrice(minPrice)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── CONFIG SECTIONS ── */}
            <div className="flex flex-col gap-7">

              {/* Platform */}
              {service.platforms?.length > 0 && (
                <Section step={stepIndex++} title="Select Platform">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(() => {
                      const platformList = [];
                      for (const p of service.platforms) {
                        if (p.toLowerCase() === 'console') {
                          platformList.push('PlayStation', 'Xbox');
                        } else {
                          platformList.push(p);
                        }
                      }
                      
                      // Remove duplicates in case both Console and Xbox were present
                      const uniquePlatforms = Array.from(new Set(platformList));
                      
                      return uniquePlatforms.map(p => (
                        <label key={p} className="cursor-pointer block">
                          <input type="radio" name="platform" value={p} checked={platform === p} onChange={e => setPlatform(e.target.value)} className="sr-only" />
                          <RadioCard checked={platform === p}>
                            <div className="flex items-center gap-2.5 flex-1">
                              {p.toLowerCase().includes('pc') ? <Computer className={`size-4 shrink-0 transition-colors ${platform === p ? 'text-white' : 'text-slate-500'}`} /> : <Gamepad2 className={`size-4 shrink-0 transition-colors ${platform === p ? 'text-white' : 'text-slate-500'}`} />}
                              <span className={`text-sm font-medium transition-colors ${platform === p ? 'text-white' : 'text-slate-300'}`}>{p}</span>
                            </div>
                          </RadioCard>
                        </label>
                      ));
                    })()}
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
                                : value.priceModifier < 0
                                  ? <span className={`text-xs px-2 py-0.5 rounded font-bold ${selectedOptions[option.id] === value.value ? 'bg-white/20 text-white' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>-{formatPrice(Math.abs(value.priceModifier))}</span>
                                  : null
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
                    <div className="relative dropdown-container focus-within:z-40" onClick={e => e.stopPropagation()}>
                      <button type="button" onClick={() => setOpenDropdown(openDropdown === option.id ? null : option.id)}
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg p-3.5 flex items-center justify-between text-slate-300 hover:border-white/10 transition-colors">
                        <span className="font-medium text-sm">
                          {selectedOptions[option.id] ? option.values.find(v => v.value === selectedOptions[option.id])?.label : `Choose ${option.label.toLowerCase()}...`}
                        </span>
                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      {openDropdown === option.id && (
                        <div className="absolute z-50 w-full mt-2 bg-[#111] border border-white/10 rounded-xl shadow-2xl max-h-64 overflow-y-auto">
                          <div className="p-2">
                            {option.values.sort((a, b) => a.order - b.order).map(value => (
                              <button key={value.id} type="button"
                                onClick={() => { setSelectedOptions({ ...selectedOptions, [option.id]: value.value }); }}
                                className={`w-full flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors text-left text-sm ${selectedOptions[option.id] === value.value ? 'bg-primary/10 text-white' : 'text-slate-300 hover:bg-white/5'}`}>
                                <span>{value.label}</span>
                                {value.priceModifier > 0 && <span className="font-bold text-primary">+{formatPrice(value.priceModifier)}</span>}
                                {value.priceModifier < 0 && <span className="font-bold text-emerald-400">-{formatPrice(Math.abs(value.priceModifier))}</span>}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Checkbox dropdown */}
                  {option.type === 'checkbox' && (
                    <div className="relative dropdown-container focus-within:z-40" onClick={e => e.stopPropagation()}>
                      <button type="button" onClick={() => setOpenDropdown(openDropdown === option.id ? null : option.id)}
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg p-3.5 flex items-center justify-between text-slate-300 hover:border-white/10 transition-colors">
                        <span className="font-medium text-sm truncate pr-4">
                          {(() => {
                            const selected = selectedOptions[option.id] || [];
                            if (selected.length === 0) return `Choose ${option.label.toLowerCase()}...`;
                            const names = selected.map((val: string) => option.values.find(v => v.value === val)?.label).filter(Boolean);
                            return names.length > 3 ? `${names.slice(0, 3).join(", ")} +${names.length - 3}` : names.join(", ");
                          })()}
                        </span>
                        <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      {openDropdown === option.id && (
                        <div className="absolute z-50 w-full mt-2 bg-[#111] border border-white/10 rounded-xl shadow-2xl max-h-64 overflow-y-auto">
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
                      )}
                    </div>
                  )}

                  {/* Range */}
                  {option.type === 'range' && (() => {
                    const min = option.minValue || 0;
                    const max = option.maxValue || 100;
                    const range = max - min;
                    const currentVal = selectedOptions[option.id]?.current ?? min;
                    const desiredVal = selectedOptions[option.id]?.desired ?? max;
                    const pct = (v: number) => ((v - min) / range) * 100;
                    const updateRange = (key: string, raw: number) => {
                      let val = Math.round(Math.max(min, Math.min(raw, max)));
                      if (key === 'current') val = Math.min(val, desiredVal - 1);
                      else val = Math.max(val, currentVal + 1);
                      setSelectedOptions({ ...selectedOptions, [option.id]: { ...selectedOptions[option.id], [key]: val } });
                    };
                    const startDrag = (key: string, trackEl: HTMLElement) => {
                      const rect = trackEl.getBoundingClientRect();
                      const move = (clientX: number) => {
                        const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
                        const raw = min + ratio * range;
                        const val = Math.round(Math.max(min, Math.min(raw, max)));
                        setSelectedOptions(prev => {
                          const cur = prev[option.id] || {};
                          const c = cur.current ?? min;
                          const d = cur.desired ?? max;
                          const clamped = key === 'current' ? Math.min(Math.max(val, min), d - 1) : Math.max(Math.min(val, max), c + 1);
                          return { ...prev, [option.id]: { ...cur, [key]: clamped } };
                        });
                      };
                      const onMouseMove = (ev: MouseEvent) => { ev.preventDefault(); move(ev.clientX); };
                      const onTouchMove = (ev: TouchEvent) => { move(ev.touches[0].clientX); };
                      const onUp = () => {
                        document.removeEventListener('mousemove', onMouseMove);
                        document.removeEventListener('touchmove', onTouchMove);
                        document.removeEventListener('mouseup', onUp);
                        document.removeEventListener('touchend', onUp);
                      };
                      document.addEventListener('mousemove', onMouseMove);
                      document.addEventListener('touchmove', onTouchMove);
                      document.addEventListener('mouseup', onUp);
                      document.addEventListener('touchend', onUp);
                    };
                    const marks = range <= 10
                      ? Array.from({ length: range + 1 }, (_, i) => min + i)
                      : range <= 30
                        ? [...new Set(Array.from({ length: Math.floor(range / 5) + 1 }, (_, i) => min + i * 5).concat(max))]
                        : [min, ...Array.from({ length: 3 }, (_, i) => Math.round(min + (range * (i + 1)) / 4)), max];
                    return (
                      <div className="p-5 rounded-xl bg-[#0c0c0c] border border-white/[0.06] space-y-5">
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: 'Current Level', key: 'current', val: currentVal },
                            { label: 'Desired Level', key: 'desired', val: desiredVal },
                          ].map(field => (
                            <div key={field.key}>
                              <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1.5 block">{field.label}</label>
                              <div className="relative bg-white/[0.04] border border-white/[0.08] rounded-lg overflow-hidden focus-within:border-primary/40 transition-colors">
                                <input type="number" min={min} max={max}
                                  value={field.val}
                                  onChange={e => updateRange(field.key, Number(e.target.value))}
                                  onBlur={e => updateRange(field.key, Number(e.target.value))}
                                  className="bg-transparent text-white font-bold w-full focus:outline-none text-center text-xl py-3 px-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="px-1 pt-2 pb-1">
                          <div className="relative h-[6px] rounded-full bg-white/[0.06] cursor-pointer"
                            onClick={e => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const val = Math.round(min + ((e.clientX - rect.left) / rect.width) * range);
                              updateRange(Math.abs(val - currentVal) <= Math.abs(val - desiredVal) ? 'current' : 'desired', val);
                            }}>
                            <div className="absolute h-full rounded-full bg-gradient-to-r from-primary to-primary/80 pointer-events-none"
                              style={{ left: `${pct(currentVal)}%`, right: `${100 - pct(desiredVal)}%` }} />
                            {[
                              { key: 'current', val: currentVal },
                              { key: 'desired', val: desiredVal },
                            ].map(({ key, val }) => (
                              <div key={key}
                                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-5 rounded-full bg-white border-[3px] border-primary shadow-[0_0_0_3px_rgba(175,18,37,0.15),0_2px_6px_rgba(0,0,0,0.3)] cursor-grab active:cursor-grabbing hover:scale-[1.15] active:scale-[1.25] transition-transform z-10 select-none touch-none"
                                style={{ left: `${pct(val)}%` }}
                                onMouseDown={e => { e.preventDefault(); e.stopPropagation(); startDrag(key, e.currentTarget.parentElement!); }}
                                onTouchStart={e => { e.stopPropagation(); startDrag(key, e.currentTarget.parentElement!); }}
                              />
                            ))}
                          </div>
                          <div className="relative mt-3 h-4">
                            {marks.map(level => {
                              const isActive = level >= currentVal && level <= desiredVal;
                              return (
                                <span key={level} className={`absolute -translate-x-1/2 text-[10px] font-medium transition-colors duration-200 ${isActive ? 'text-slate-300' : 'text-slate-700'}`}
                                  style={{ left: `${pct(level)}%` }}>{level}</span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Number */}
                  {option.type === 'number' && (
                    <div className="space-y-3">
                      <input type="number" min={option.minValue || 0} max={option.maxValue || 999999999} step={option.step || 1}
                        value={selectedOptions[option.id] || option.minValue || 0}
                        onChange={e => setSelectedOptions({ ...selectedOptions, [option.id]: Number(e.target.value) })}
                        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3 text-white text-base font-medium focus:border-primary/30 focus:outline-none transition-colors" />
                      <div>
                        <input type="range" min={option.minValue || 0} max={option.maxValue || 100} step={option.step || 1}
                          value={selectedOptions[option.id] || option.minValue || 0}
                          onChange={e => setSelectedOptions({ ...selectedOptions, [option.id]: Number(e.target.value) })}
                          className="w-full h-1.5 bg-white/[0.06] rounded-full appearance-none cursor-pointer accent-primary" />
                        <div className="flex justify-between mt-2 text-[10px] text-slate-600">
                          <span>{(option.minValue || 0) >= 1000 ? `${((option.minValue || 0) / 1000).toFixed(0)}K` : option.minValue}</span>
                          <span>{(option.maxValue || 0) >= 1000000 ? `${((option.maxValue || 0) / 1000000).toFixed(0)}M` : `${((option.maxValue || 0) / 1000).toFixed(0)}K`}</span>
                        </div>
                      </div>
                    </div>
                  )}

                </Section>
              ))}

              {/* Play Method */}
              {service.completionMethods?.length > 0 && (
                <Section step={stepIndex++} title="Choose Play Method">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.completionMethods.map(method => (
                      <label key={method} className="cursor-pointer block group">
                        <input type="radio" name="completionMethod" value={method} checked={completionMethod === method} onChange={e => setCompletionMethod(e.target.value)} className="sr-only" />
                        <RadioCard checked={completionMethod === method}>
                          <div className="flex-1">
                            <h4 className={`font-semibold text-sm capitalize mb-0.5 transition-colors ${completionMethod === method ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{method}</h4>
                            <p className={`text-[11px] leading-relaxed transition-colors ${completionMethod === method ? 'text-white/60' : 'text-slate-500 group-hover:text-slate-400'}`}>
                              {method.toLowerCase().includes('piloted') ? 'A pro player completes the service on your account.' : 'You play alongside our booster on your own account.'}
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
                <p className="text-[11px] text-slate-500 -mt-2 mb-3">Select a faster option or leave unselected for standard delivery.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { value: 'express', label: 'Express', icon: Rocket, desc: 'Faster processing with priority queue.' },
                    { value: 'super_express', label: 'Super Express', icon: Zap, desc: 'Starts as soon as a booster is available.' },
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
                            <div className="flex justify-between items-start mb-1">
                              <h4 className={`font-medium text-sm flex items-center gap-1.5 transition-colors ${isChecked ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                                <Icon className={`size-3.5 ${isChecked ? 'text-white' : 'text-primary'}`} />
                                {speed.label}
                              </h4>
                              <span className={`text-[11px] px-2 py-0.5 rounded font-semibold transition-colors shrink-0 ${isChecked ? 'bg-white/15 text-white' : 'bg-primary/10 text-primary border border-primary/20'}`}>
                                +{formatPrice(getSpeedBoostPrice(speed.value))}
                              </span>
                            </div>
                            <p className={`text-[11px] transition-colors ${isChecked ? 'text-white/60' : 'text-slate-500'}`}>{speed.desc}</p>
                          </div>
                        </RadioCard>
                      </label>
                    );
                  })}
                </div>
              </Section>
            </div>

            {/* ── TABS ── */}
            <div className="border border-white/[0.06] rounded-xl overflow-hidden">
              <div role="tablist" className="flex border-b border-white/[0.06] bg-[#0c0c0c]">
                {[
                  { id: 'description', label: 'Description' },
                  { id: 'requirements', label: 'Requirements' },
                  { id: 'reviews', label: 'Reviews' },
                ].map(tab => (
                  <button key={tab.id} role="tab" aria-selected={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`px-4 sm:px-5 py-3 text-xs font-medium transition-all relative focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary
                      ${activeTab === tab.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                    {tab.label}
                    {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                  </button>
                ))}
              </div>
              <div role="tabpanel" className="p-5">
                {activeTab === 'description' && (
                  <div className="space-y-4 text-sm text-slate-400 leading-relaxed">
                    {service.description && <p>{service.description}</p>}
                    <div>
                      <h4 className="text-white font-medium text-[13px] mb-2.5">What&apos;s included</h4>
                      <ul className="space-y-1.5">
                        {['Professional completion by verified players', 'Secure account handling with VPN protection', '24/7 support throughout the process', 'Satisfaction guarantee'].map(item => (
                          <li key={item} className="flex items-center gap-2 text-[13px]">
                            <span className="size-1 rounded-full bg-primary shrink-0" />
                            <span className="text-slate-400">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                {activeTab === 'requirements' && (
                  <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
                    <p>To use this service, you&apos;ll need:</p>
                    <ul className="space-y-1.5">
                      {['An active game account in good standing', 'Account credentials (for piloted services only)', 'A stable internet connection'].map(item => (
                        <li key={item} className="flex items-center gap-2 text-[13px]">
                          <span className="size-1 rounded-full bg-primary shrink-0" />
                          <span className="text-slate-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === 'reviews' && (
                  <div className="py-8 text-center">
                    <p className="text-sm text-slate-500">No reviews yet for this service.</p>
                    <p className="text-xs text-slate-600 mt-1">Reviews will appear here after customers complete their orders.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-3">

              {/* Quantity */}
              {(service?.maxQuantity ?? 15) > 1 && (
              <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-xl p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-cairo text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="w-0.5 h-3.5 bg-primary rounded-full" />
                    Quantity
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">{quantity} of {service?.maxQuantity || 15}</span>
                </div>
                <p className="text-[11px] text-slate-600 mb-3">Choose how many units you want to order.</p>
                <div className="flex items-center gap-2 mb-3">
                  <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="size-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] disabled:opacity-30 transition-colors cursor-pointer text-base">
                    −
                  </button>
                  <div className="flex-1">
                    <input type="range" min="1" max={service?.maxQuantity || 15} step="1" value={quantity}
                      onChange={e => setQuantity(Number(e.target.value))}
                      aria-label="Quantity slider"
                      className="w-full h-1.5 bg-white/[0.06] rounded-full appearance-none cursor-pointer accent-primary" />
                  </div>
                  <button type="button" onClick={() => setQuantity(Math.min(service?.maxQuantity || 15, quantity + 1))} disabled={quantity >= (service?.maxQuantity || 15)}
                    aria-label="Increase quantity"
                    className="size-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] disabled:opacity-30 transition-colors cursor-pointer text-base">
                    +
                  </button>
                </div>
              </div>
              )}

              {/* Order Summary */}
              <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-xl p-5">
                <h3 className="font-cairo text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
                  <span className="w-0.5 h-3.5 bg-primary rounded-full" />
                  Order Summary
                </h3>

                {/* Promo code */}
                <div className="mb-5">
                  <label className="text-[11px] text-slate-500 font-medium mb-1.5 block">Promo Code</label>
                  <div className="flex gap-2">
                    <input type="text" value={promoCode}
                      onChange={e => { setPromoCode(e.target.value.toUpperCase()); setPromoCodeError(""); setPromoCodeData(null); }}
                      placeholder="Enter code"
                      className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-white text-xs placeholder:text-slate-700 focus:border-white/10 focus:outline-none transition-all" />
                    <button type="button" onClick={validatePromoCode} disabled={!promoCode.trim() || isValidatingPromo}
                      className="px-3 py-2 bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-40 border border-white/[0.06] cursor-pointer">
                      {isValidatingPromo ? '...' : 'Apply'}
                    </button>
                  </div>
                  {promoCodeError && <p className="text-red-400 text-[11px] mt-1.5">{promoCodeError}</p>}
                  {promoCodeData && <p className="text-emerald-400 text-[11px] mt-1.5">Discount applied: {promoCodeData.discountType === 'percentage' ? `${promoCodeData.discount}%` : formatPrice(promoCodeData.discount)}</p>}
                </div>

                {/* Summary rows */}
                <div className="space-y-2 mb-4 pb-4 border-b border-white/[0.04]">
                  {[
                    { label: 'Service', value: service.name },
                    platform && { label: 'Platform', value: platform },
                    {
                      label: 'Quantity', value: (() => {
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
                    completionSpeed && { label: 'Speed', value: completionSpeed === 'express' ? 'Express (+20%)' : 'Super Express (+40%)', highlight: true },
                  ].filter(Boolean).map((row: any) => (
                    <div key={row.label} className="flex justify-between items-center">
                      <span className="text-[11px] text-slate-500">{row.label}</span>
                      <span className={`text-[11px] font-medium text-right truncate max-w-[160px] ${row.highlight ? 'text-primary' : 'text-slate-300'}`}>{row.value}</span>
                    </div>
                  ))}
                </div>

                {/* Price breakdown */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-slate-500">Subtotal</span>
                    <span className="text-[11px] font-medium text-slate-300">{formatPrice(calculateBasePrice() * (completionSpeed === 'express' ? 1.20 : completionSpeed === 'super_express' ? 1.40 : 1))}</span>
                  </div>
                  {promoCodeData && (
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] text-emerald-400">Discount</span>
                      <span className="text-[11px] font-medium text-emerald-400">
                        −{formatPrice(calculateBasePrice() * (completionSpeed === 'express' ? 1.20 : completionSpeed === 'super_express' ? 1.40 : 1) - calculateTotalPrice())}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-white/[0.04]">
                    <span className="text-xs font-medium text-white">Total</span>
                    <span className="text-xl font-bold text-white tracking-tight">{formatPrice(calculateTotalPrice())}</span>
                  </div>
                </div>

                {status === "unauthenticated" && (
                  <div className="mb-4 space-y-1.5 p-3.5 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                    <label className="text-[11px] text-slate-400 font-medium block">
                      Email to continue
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2.5 text-white text-xs placeholder:text-slate-700 focus:border-white/10 focus:outline-none transition-all"
                    />
                    {authError && (
                      <p className="text-red-400 text-[11px] mt-1">{authError}</p>
                    )}
                  </div>
                )}

                <button
                  onClick={handleOrderClick}
                  disabled={isSubmitting || (status === "unauthenticated" && !email)}
                  className="w-full min-h-[48px] bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all hover:shadow-[0_4px_20px_-4px_rgba(175,18,37,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? "Processing..." : "Proceed to Checkout"}
                  <ArrowRight className="size-4" />
                </button>

                <p className="text-center text-[11px] text-slate-600 mt-3 flex items-center justify-center gap-1.5">
                  <Lock className="size-3" />
                  Secure Stripe Checkout
                </p>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: Shield, label: 'Secure Checkout' },
                  { icon: Headphones, label: '24/7 Support' },
                  { icon: Truck, label: 'Order Tracking' },
                  { icon: UserCheck, label: 'Verified Boosters' },
                ].map(badge => (
                  <div key={badge.label} className="flex items-center gap-2 py-3 px-3 rounded-xl bg-[#0c0c0c] border border-white/[0.06] group hover:border-primary/20 transition-colors">
                    <badge.icon className="size-3.5 text-primary/50 group-hover:text-primary transition-colors shrink-0" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{badge.label}</span>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => { setShowPaymentModal(false); setSelectedPaymentMethod(null); }} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.97, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="bg-[#0A0A0A] border border-white/[0.08] rounded-xl w-full max-w-lg shadow-2xl relative z-[101] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">Checkout</h2>
                  <p className="text-sm text-slate-500 mt-0.5">Review your order and select payment</p>
                </div>
                <button onClick={() => { setShowPaymentModal(false); setSelectedPaymentMethod(null); }} className="p-1.5 rounded-md hover:bg-white/5 text-slate-500 hover:text-white transition-colors" aria-label="Close checkout">
                  <XIcon className="size-4" />
                </button>
              </div>

              <div className="space-y-4">
                {(status === "unauthenticated" || (session?.user as any)?.hasPassword === false) && (
                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 flex items-center gap-3">
                    <div className="size-8 rounded-md bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                      <UserCheck className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-emerald-400">Guest checkout</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">{email || session?.user?.email}</p>
                    </div>
                  </div>
                )}

                <div className="bg-white/[0.02] rounded-lg p-4 border border-white/[0.06]">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-white">{service?.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{platform}{completionMethod ? ` · ${completionMethod}` : ''}</p>
                    </div>
                    <div className="text-lg font-bold text-white">{formatPrice(calculateTotalPrice())}</div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-slate-400">Order Notes (Optional)</label>
                  <textarea value={orderNotes} onChange={e => setOrderNotes(e.target.value)} placeholder="Any specific requirements..." rows={2}
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-white focus:border-white/10 transition-all outline-none resize-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-medium text-slate-400">Payment method</label>
                  <button onClick={() => setSelectedPaymentMethod('stripe')}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-lg border transition-colors duration-200 cursor-pointer text-sm font-medium
                      ${selectedPaymentMethod === 'stripe' ? 'border-primary/40 bg-primary/5 text-white' : 'border-white/[0.06] bg-[#0c0c0c] hover:border-white/10 text-slate-400'}`}>
                    <div className={`size-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedPaymentMethod === 'stripe' ? 'border-primary' : 'border-slate-700'}`}>
                      <div className={`size-2 rounded-full bg-primary transition-transform ${selectedPaymentMethod === 'stripe' ? 'scale-100' : 'scale-0'}`} />
                    </div>
                    Credit / Debit Card
                  </button>
                  {['PayPal', 'Crypto'].map(m => (
                    <div key={m} className="w-full flex items-center gap-3 p-3.5 rounded-lg border border-white/[0.04] bg-white/[0.01] text-sm text-slate-600 cursor-not-allowed">
                      <div className="size-4 rounded-full border-2 border-slate-800 shrink-0" />
                      {m}
                      <span className="ml-auto text-[9px] font-medium uppercase tracking-wider text-slate-700 bg-white/[0.03] px-1.5 py-0.5 rounded">Soon</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-2">
                {checkoutError && (
                  <p className="mb-3 text-red-400 text-xs bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg">{checkoutError}</p>
                )}
                <button onClick={handlePurchase} disabled={!selectedPaymentMethod || isSubmitting}
                  className="w-full min-h-[44px] bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer">
                  {isSubmitting ? (
                    <><div className="size-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /><span>Processing...</span></>
                  ) : (
                    <><span>Pay Now</span><ArrowRight className="size-4" /></>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-600 mt-3 flex items-center justify-center gap-1.5">
                  <Lock className="size-3" />
                  Secure Stripe Checkout
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}