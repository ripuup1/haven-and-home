import type { Metadata } from "next";
import { Playfair_Display, Lato, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Haven & Home — Spaces Worth Coming Home To",
    template: "%s | Haven & Home",
  },
  description:
    "Curated home decor ideas, organization tips, and product recommendations to help you create spaces worth coming home to.",
  metadataBase: new URL("https://havenandhome.co"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Haven & Home",
  },
  twitter: {
    card: "summary_large_image",
  },
  other: {
    "p:domain_verify": "PINTEREST_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${lato.variable} ${cormorant.variable} antialiased`}
      >
        {/* Fixed texture background for floating content effect */}
        <div className="texture-bg" aria-hidden="true" />
        <Header />
        <main className="relative min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
