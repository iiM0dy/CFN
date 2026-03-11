import Link from "next/link"
import { CFNLogo } from "@/components/layout/cfnboost-logo"

const footerLinks = {
    services: [
        { label: "Valorant Boosting", href: "/games/valorant/services" },
        { label: "LoL Boosting", href: "/games/lol/services" },
        { label: "WoW Powerleveling", href: "/games/wow/services" },
        { label: "Throne & Liberty", href: "/games/throne-and-liberty/services" },
        { label: "View All Games", href: "/games" },
    ],
    support: [
        { label: "Help Center", href: "/contact" },
        { label: "Track Order", href: "/dashboard" },
        { label: "Live Chat", href: "/contact" },
        { label: "Reviews", href: "/wall-of-fame" },
        { label: "FAQ", href: "/faq" },
    ],
    company: [
        { label: "About Us", href: "/story" },
        { label: "Work With Us", href: "/contact" },
        { label: "Terms of Service", href: "#" },
        { label: "Privacy Policy", href: "#" },
    ],
}

export function Footer() {
    return (
        <footer className="bg-[#080808] pt-20 pb-10 border-t border-[#1A1A1A]">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="text-primary">
                                <CFNLogo className="size-6" />
                            </div>
                            <span className="text-lg font-black tracking-tight font-[family-name:var(--font-space-grotesk)]">
                                <span className="text-primary">CFN</span>
                                <span className="text-white">BOOST</span>
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            The world&apos;s most advanced marketplace for competitive gaming services. Elevate your potential today.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </Link>
                            <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            </Link>
                            <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                            </Link>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Services</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            {footerLinks.services.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="hover:text-primary transition-colors">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            {footerLinks.support.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="hover:text-primary transition-colors">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="hover:text-primary transition-colors">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-[#1A1A1A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600 text-xs">
                        © 2024{" "}
                        <span className="font-semibold tracking-wide font-[family-name:var(--font-space-grotesk)]">
                            <span className="text-primary">CFN</span>
                            <span className="text-white">BOOST</span>
                        </span>
                        . All rights reserved.
                    </p>
                    <div className="flex gap-6 items-center">
                        <div className="h-6 w-10 bg-gray-800 rounded opacity-50" />
                        <div className="h-6 w-10 bg-gray-800 rounded opacity-50" />
                        <div className="h-6 w-10 bg-gray-800 rounded opacity-50" />
                    </div>
                </div>
            </div>
        </footer>
    )
}
