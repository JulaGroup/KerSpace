import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { Toaster } from "@/components/ui/sonner";
import { HeaderWrapper } from "@/components/HeaderWrapper";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KërSpace | The Property Hub of The Gambia – Buy, Rent & Invest",
  description:
    "KërSpace is The Gambia’s trusted property hub to buy, rent, sell, and invest in homes, apartments, offices, and land. Verified listings, local expertise, and diaspora-friendly real estate solutions.",
  keywords: [
    // Brand
    "KërSpace",
    "Kerspace Gambia",

    // Core intent
    "property hub Gambia",
    "real estate Gambia",
    "buy property in Gambia",
    "rent property in Gambia",
    "sell property in Gambia",
    "invest in property Gambia",

    // Property types
    "houses for sale Gambia",
    "apartments for rent Gambia",
    "land for sale Gambia",
    "commercial property Gambia",
    "office space Gambia",
    "luxury apartments Gambia",
    "beachfront property Gambia",

    // Audience targeting
    "Gambians in diaspora real estate",
    "expat housing Gambia",
    "moving to Gambia housing",
    "tourist accommodation Gambia",

    // Trust & value
    "verified properties Gambia",
    "trusted real estate platform Gambia",
    "secure property transactions Gambia",

    // Location variations
    "The Gambia real estate",
    "Serrekunda property",
    "Senegambia apartments",
    "Brusubi property",
    "Bijilo real estate",
    "Brufut land for sale",

    // Platform & search
    "property listings Gambia",
    "real estate listings Gambia",
    "property search Gambia",
    "real estate website Gambia",
  ],

  authors: [
    {
      name: "KërSpace",
      url: "https://kerspace.gm",
    },
  ],

  creator: "KërSpace",

  openGraph: {
    title: "KërSpace | The Property Hub of The Gambia",
    description:
      "Discover verified homes, apartments, offices, and land across The Gambia. Buy, rent, sell, and invest with confidence on KërSpace.",
    url: "https://kerspace.gm",
    siteName: "KërSpace",
    // images: [
    //   {
    //     url: "https://kerspace.gm/og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "KërSpace – The Property Hub of The Gambia",
    //   },
    // ],
    locale: "en_GM",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "KërSpace | The Property Hub of The Gambia",
    description:
      "Buy, rent, sell, and invest in verified properties across The Gambia. Trusted by locals, diaspora, and expats.",
    // images: ["https://kerspace.gm/og-image.jpg"],
    creator: "@kerspacegm",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <FavoritesProvider>
            <div className="mb-16">
              <HeaderWrapper />
            </div>
            <div className="pb-20 lg:pb-0">{children}</div>
            <MobileBottomNav />
            <Toaster />
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
