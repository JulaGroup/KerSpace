"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, User, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Search, label: "Listings", href: "/listings" },
  { icon: Heart, label: "Favorites", href: "/favorites", requiresAuth: true },
  {
    icon: Building,
    label: "Dashboard",
    href: "/dashboard",
    requiresAuth: true,
  },
  { icon: User, label: "Account", href: "/auth" },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  // Don't show on dashboard pages
  if (pathname?.startsWith("/dashboard")) return null;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg safe-area-bottom">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          // Hide auth-required items if not authenticated
          if (
            item.requiresAuth &&
            !isAuthenticated &&
            item.label !== "Account"
          ) {
            return null;
          }

          // Change Account to Dashboard if authenticated
          const href =
            item.label === "Account" && isAuthenticated
              ? "/dashboard"
              : item.href;
          const label =
            item.label === "Account" && isAuthenticated
              ? "Dashboard"
              : item.label;

          return (
            <Link
              key={item.href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200",
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              )}
            >
              <Icon
                className={cn(
                  "h-6 w-6 mb-1 transition-all duration-200",
                  isActive && "scale-110"
                )}
              />
              <span className="text-xs font-medium">{label}</span>
              {isActive && (
                <div className="absolute bottom-0 w-12 h-1 bg-blue-600 rounded-t-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
