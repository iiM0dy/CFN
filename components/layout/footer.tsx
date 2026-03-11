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
                            <span className="text-xl font-black tracking-tight uppercase font-cairo">
                                <span className="text-primary">CFN</span>
                                <span className="text-white">BOOST</span>
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            The world&apos;s most advanced marketplace for competitive gaming services. Elevate your potential today.
                        </p>
                        <div className="flex gap-4">
                            <Link href="mailto:support@cfnboost.com" className="text-gray-500 hover:text-white transition-all transform hover:scale-110">
                                <img src="/assets/cfn_no_background.png" alt="Email" className="size-6 transition-all grayscale hover:grayscale-0" />
                            </Link>
                            <Link href="#" className="text-gray-500 hover:text-white transition-all transform hover:scale-110">
                                <img src="/assets/cfn_no_background.png" alt="Discord" className="size-6 transition-all grayscale hover:grayscale-0" />
                            </Link>
                            <Link href="#" className="text-gray-500 hover:text-white transition-all transform hover:scale-110">
                                <img src="/assets/cfn_no_background.png" alt="WhatsApp" className="size-6 transition-all grayscale hover:grayscale-0" />
                            </Link>
                            <Link href="#" className="text-gray-500 hover:text-white transition-all transform hover:scale-110">
                                <img src="/assets/cfn_no_background.png" alt="Twitter" className="size-6 transition-all grayscale hover:grayscale-0" />
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
                        <span className="font-black tracking-wide font-cairo">
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
