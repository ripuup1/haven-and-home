import type { Metadata } from "next";
import { Playfair_Display, Lato, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ParallaxBackground from "@/components/ui/ParallaxBackground";

// TODO: Replace with your GA4 Measurement ID (e.g., "G-XXXXXXXXXX")
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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
  metadataBase: new URL("https://www.havenandhome.live"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Haven & Home",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 800,
        alt: "Haven & Home",
      },
    ],
  },
  twitter: {
    card: "summary",
    images: ["/images/logo.png"],
  },
  other: {
    "p:domain_verify": "92fdeb43605469943893ede491aaf740",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Google Analytics */}
      {GA_MEASUREMENT_ID && (
        <head>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </head>
      )}
      <body
        className={`${playfair.variable} ${lato.variable} ${cormorant.variable} antialiased`}
      >
        {/* Fixed texture background with parallax for floating content effect */}
        <ParallaxBackground />
        <Header />
        <main className="relative min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
