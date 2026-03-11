import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "CFNboost",
  description: "Ascend your gaming performance with CFNboost. Professional boosting, coaching, and progression services delivered by top-tier players.",
  icons: {
    icon: "/assets/cfn_no_background.png",
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
