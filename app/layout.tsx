import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { Toaster } from "@/components/ui/sonner";
import { HeaderWrapper } from "@/components/HeaderWrapper";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KërSpace - Modern Real Estate Platform",
  description:
    "Find your perfect property with our comprehensive real estate platform",
  keywords: [
    "real estate",
    "property",
    "homes for sale",
    "apartments for rent",
    "real estate listings",
    "buy a house",
    "sell a house",
    "real estate agent",
    "property management",
    "mortgage calculator",
    "real estate investment",
    "commercial real estate",
    "residential real estate",
    "real estate market",
    "real estate news",
    "real estate trends",
    "real estate tips",
    "real estate advice",
    "real estate services",
    "real estate platform",
    "real estate search",
    "property search",
    "real estate website",
    "Gambia real estate",
    "Gambia property",
    "Gambia homes for sale",
    "Gambia apartments for rent",
    "Gambia real estate listings",
    "The Gambia real estate",
    "The Gambia property",
    "The Gambia homes for sale",
    "The Gambia apartments for rent",
    "The Gambia real estate listings",
    "Gambia real estate market",
    "Gambia real estate news",
    "Gambia real estate trends",
    "Gambia real estate tips",
    "Gambia real estate advice",
    "Gambia real estate services",
    "Gambia real estate platform",
    "Gambia property search",
    "Gambia real estate search",
    "Gambia real estate website",
    "The Gambia real estate market",
  ],
  authors: [
    {
      name: "KërSpace",
      url: "https://KërSpace.com",
    },
  ],
  creator: "KërSpace",
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
            <HeaderWrapper />
            {children}
            <Toaster />
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
