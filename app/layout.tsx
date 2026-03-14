import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Cairo } from "next/font/google";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "block",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});



export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cfnboost.com"),
  title: "CFNboost",
  description: "The world's most advanced marketplace for competitive gaming services. Elevate your potential today with CFNboost.",
  icons: {
    icon: "/assets/cfnboost-official-logo.png",
    shortcut: "/assets/cfnboost-official-logo.png",
    apple: "/assets/cfnboost-official-logo.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/assets/cfnboost-official-logo.png",
    },
  },
  openGraph: {
    title: "CFNboost | Elite Gaming Services",
    description: "Secure, anonymous, and elite gaming boosting. Dominate the lobby today.",
    url: "https://www.cfnboost.com",
    siteName: "CFNboost",
    images: [
      {
        url: "/assets/cfn_og.png",
        width: 1200,
        height: 630,
        alt: "CFNboost Elite Gaming Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CFNboost | Elite Gaming Services",
    description: "Secure, anonymous, and elite gaming boosting.",
    images: ["/assets/cfn_og.png"],
  },
};

import { LiveChat } from "@/components/layout/live-chat";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${cairo.variable} dark`} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body
        className={`antialiased font-sans`}
        suppressHydrationWarning
      >
        <Providers attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Header />
          {children}
          <LiveChat />
        </Providers>
      </body>
    </html>
  );
}
