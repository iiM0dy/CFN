import Link from "next/link"
import { CFNLogo } from "@/components/layout/cfnboost-logo"

const footerLinks = {
    services: [
        { label: "Valorant Boosting", href: "/valorant/services" },
        { label: "LoL Boosting", href: "/lol/services" },
        { label: "WoW Powerleveling", href: "/wow/services" },
        { label: "Throne & Liberty", href: "/throne-and-liberty/services" },
        { label: "View All Games", href: "/#games" },
    ],
    support: [
        { label: "Help Center", href: "/contact" },
        { label: "Track Order", href: "/track-order" },
        { label: "Live Chat", href: "/contact" },
        { label: "Reviews", href: "/wall-of-fame" },
        { label: "FAQ", href: "/faq" },
    ],
    company: [
        { label: "About Us", href: "/story" },
        { label: "Journal", href: "/blog" },
        { label: "Work With Us", href: "/become-pro" },
        { label: "Terms of Service", href: "#" },
        { label: "Privacy Policy", href: "#" },
    ],
}

export function Footer() {
    return (
        <footer className="bg-[#060606] pt-12 sm:pt-20 pb-8 sm:pb-10 border-t border-white/5">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-14">

                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-3 mb-3 sm:mb-5">
                            <div className="text-primary">
                                <CFNLogo className="size-6" />
                            </div>
                            <span className="text-lg font-black tracking-tight uppercase font-(family-name:--font-brand)">
                                <span className="text-primary">CFN</span>
                                <span className="text-white">BOOST</span>
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4 sm:mb-6 max-w-xs">
                            Professional gaming services for competitive players. Secure, fast, and backed by real support.
                        </p>
                        <div className="flex gap-3">
                            <Link href="mailto:support@cfnboost.com" className="size-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all" aria-label="Email">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                            </Link>
                            <Link href="#" className="size-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all" aria-label="Discord">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" /></svg>
                            </Link>
                            <Link href="#" className="size-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all" aria-label="Twitter">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </Link>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white text-sm font-semibold mb-3 sm:mb-5">Services</h4>
                        <ul className="space-y-2 sm:space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-gray-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors duration-200">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white text-sm font-semibold mb-3 sm:mb-5">Support</h4>
                        <ul className="space-y-2 sm:space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-gray-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors duration-200">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white text-sm font-semibold mb-3 sm:mb-5">Company</h4>
                        <ul className="space-y-2 sm:space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-gray-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors duration-200">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
                    <p className="text-gray-600 text-xs">
                        &copy; {new Date().getFullYear()}{" "}
                        <span className="font-semibold font-(family-name:--font-brand) tracking-wide">
                            <span className="text-primary">CFN</span>
                            <span className="text-white">BOOST</span>
                        </span>
                        . All rights reserved.
                    </p>
                    <div className="flex gap-4 text-xs text-gray-600">
                        <Link href="#" className="hover:text-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
