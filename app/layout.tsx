import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/header";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "block",
});

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cfnboost.com"),
  title: "CFNboost",
  description: "Ascend your gaming performance with CFNboost. Professional boosting, coaching, and progression services delivered by top-tier players.",
  icons: {
    icon: "/assets/cfn_no_background.png",
    shortcut: "/assets/cfn_no_background.png",
    apple: "/assets/cfn_no_background.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/assets/cfn_no_background.png",
    },
  },
  openGraph: {
    title: "CFNboost",
    description: "Professional gaming boosting and progression services.",
    url: "https://www.cfnboost.com",
    siteName: "CFNboost",
    images: [
      {
        url: "/assets/cfn_no_background.png",
        width: 1200,
        height: 630,
        alt: "CFNboost Logo",
      },
      {
        url: "/assets/cfn_no_background.png",
        width: 800,
        height: 800,
        alt: "CFNboost Square Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CFNboost",
    description: "Professional gaming boosting and progression services.",
    images: ["/assets/cfn_no_background.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} dark`} suppressHydrationWarning>
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
        </Providers>
      </body>
    </html>
  );
}
