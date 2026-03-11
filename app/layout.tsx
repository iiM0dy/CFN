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
  description: "Professional Gaming Boosting Services",
  icons: {
    icon: "/assets/cfnboost-v2.png",
    shortcut: "/assets/cfnboost-v2.png",
    apple: "/assets/cfnboost-v2.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/assets/cfnboost-v2.png",
    },
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
