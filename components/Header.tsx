"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Menu,
  X,
  ChevronDown,
  Heart,
  LogOut,
  Home,
  Calendar,
} from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : null;
  const isAdmin = user?.role === "admin";
  const pathname = usePathname();
  const router = useRouter();
  // Removed localStorage-based auth logic; now using AuthContext

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest("header")) {
        setIsMobileMenuOpen(false);
      }
      if (
        showUserMenu &&
        !(event.target as Element).closest(".user-menu-container")
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen, showUserMenu]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100"
          : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              KërSpace
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <NavItem href="/" label="Home" />
            <NavItem href="/listings" label="Listings" />
            <NavItem href="/about" label="About" />
            <NavItem href="/contact" label="Contact" />
            {isAdmin && <NavItem href="/dashboard" label="Dashboard" />}
          </nav>

          {/* Desktop User Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="user-menu-container relative">
                <button
                  className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-all duration-200 group"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUserMenu(!showUserMenu);
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
                    {userInitials}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      showUserMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in-0 zoom-in-95">
                    <Link
                      href="/appointments"
                      className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">Appointments</span>
                    </Link>
                    <Link
                      href="/favorites"
                      className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-sm font-medium">Favorites</span>
                    </Link>
                    <div className="h-px bg-gray-100 my-1" />
                    <button
                      className="flex items-center space-x-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                        router.push("/");
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth">
                <Button
                  size="sm"
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  Sign in
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-1 border-t border-gray-100">
            <MobileNavItem href="/" label="Home" />
            <MobileNavItem href="/listings" label="Listings" />
            <MobileNavItem href="/about" label="About" />
            <MobileNavItem href="/contact" label="Contact" />

            <div className="pt-4 border-t border-gray-100 mt-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
                      {userInitials}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      Account
                    </span>
                  </div>
                  <Link
                    href="/favorites"
                    className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg mx-2 transition-colors duration-150"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">Favorites</span>
                  </Link>

                  {typeof window !== "undefined" &&
                    (() => {
                      const token = localStorage.getItem("token");
                      if (token) {
                        try {
                          const payload = JSON.parse(atob(token.split(".")[1]));
                          if (payload && payload.role === "admin") {
                            return (
                              <button
                                className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-colors duration-200"
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  router.push("/dashboard");
                                }}
                              >
                                Go to Dashboard
                              </button>
                            );
                          }
                        } catch (e) {
                          // ignore
                        }
                      }
                      return null;
                    })()}
                  <button
                    className="flex items-center space-x-3 w-full px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg mx-2 transition-colors duration-150"
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                      router.push("/");
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Sign out</span>
                  </button>
                </div>
              ) : (
                <div className="px-2">
                  <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium">
                      Sign in
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive
          ? "text-blue-600 bg-blue-50"
          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
      }`}
    >
      {label}
      {isActive && (
        <div className="absolute inset-x-4 -bottom-px h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
      )}
    </Link>
  );
}

function MobileNavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`block px-4 py-3 rounded-lg mx-2 text-sm font-medium transition-all duration-200 ${
        isActive
          ? "text-blue-600 bg-blue-50"
          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
      }`}
    >
      {label}
    </Link>
  );
}
