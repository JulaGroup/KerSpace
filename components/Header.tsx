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
  User,
  Bell,
  Settings,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const [userInitials, setUserInitials] = useState<string | null>(null);
  const isAdmin = user?.role === "admin";
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (user?.name) {
      setUserInitials(
        user.name
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .toUpperCase()
      );
    } else {
      setUserInitials(null);
    }
  }, [user]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      if (isMobileMenuOpen && !target.closest("header")) {
        setIsMobileMenuOpen(false);
      }
      if (showUserMenu && !target.closest(".user-menu-container")) {
        setShowUserMenu(false);
      }
      if (showNotifications && !target.closest(".notifications-container")) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen, showUserMenu, showNotifications]);

  const handleSignOut = () => {
    setShowSignOutDialog(true);
  };

  const confirmSignOut = () => {
    logout();
    setShowSignOutDialog(false);
    setShowUserMenu(false);
    setIsMobileMenuOpen(false);
    router.push("/");
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${
        scrolled
          ? "bg-white/90 backdrop-blur-2xl shadow-2xl border-b border-gray-200/50"
          : "bg-white/70 backdrop-blur-xl"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse">
                <Sparkles className="w-2 h-2 text-white m-0.5" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                KërSpace
              </span>
              <span className="text-xs text-gray-500 -mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Find your perfect space
              </span>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <NavItem href="/" label="Home" icon={Home} />
            <NavItem href="/listings" label="Listings" />
            <NavItem href="/about" label="About" />
            <NavItem href="/contact" label="Contact" />
            {isAdmin && (
              <NavItem
                href="/dashboard"
                label="Dashboard"
                className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200/50"
              />
            )}
          </nav>

          {/* Enhanced Desktop User Section */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                {/* Notifications - Admin Only */}
                {isAdmin && (
                  <div className="notifications-container relative">
                    <button
                      className="p-2.5 rounded-xl bg-gray-50/80 hover:bg-gray-100 transition-all duration-200 group relative"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowNotifications(!showNotifications);
                      }}
                    >
                      <Bell className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">3</span>
                      </div>
                    </button>

                    {showNotifications && (
                      <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-4 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
                        <div className="px-4 pb-3 border-b border-gray-100">
                          <h3 className="font-semibold text-gray-900">
                            Admin Notifications
                          </h3>
                        </div>
                        <div className="py-2 max-h-64 overflow-y-auto">
                          <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  New listing pending approval
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  2 minutes ago
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  User reported an issue
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  1 hour ago
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* User Menu */}
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
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
                      <div className="px-4 pb-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">
                          {user?.name}
                        </p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>

                      <div className="py-2">
                        <MenuLink
                          href="/appointments"
                          icon={Calendar}
                          label="Appointments"
                          onClick={() => setShowUserMenu(false)}
                        />
                        <MenuLink
                          href="/favorites"
                          icon={Heart}
                          label="Favorites"
                          onClick={() => setShowUserMenu(false)}
                        />
                        {/* <MenuLink
                          href="/profile"
                          icon={User}
                          label="Profile"
                          onClick={() => setShowUserMenu(false)}
                        />
                        <MenuLink
                          href="/settings"
                          icon={Settings}
                          label="Settings"
                          onClick={() => setShowUserMenu(false)}
                        /> */}
                      </div>

                      <div className="border-t border-gray-100 pt-2">
                        <button
                          className="flex items-center space-x-3 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 transition-all duration-200 group"
                          onClick={handleSignOut}
                        >
                          <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-medium">Sign out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/auth">
                  <Button
                    size="sm"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Sign in
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute w-5 h-5 text-gray-700 transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "opacity-0 rotate-45"
                    : "opacity-100 rotate-0"
                }`}
              />
              <X
                className={`absolute w-5 h-5 text-gray-700 transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "opacity-100 rotate-0"
                    : "opacity-0 -rotate-45"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMobileMenuOpen
              ? "max-h-[500px] opacity-100 transform translate-y-0"
              : "max-h-0 opacity-0 transform -translate-y-4"
          }`}
        >
          <div className="py-6 space-y-2 border-t border-gray-100/50 backdrop-blur-xl">
            <MobileNavItem
              href="/"
              label="Home"
              icon={Home}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavItem
              href="/listings"
              label="Listings"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavItem
              href="/about"
              label="About"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileNavItem
              href="/contact"
              label="Contact"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {isAuthenticated && (
              <>
                <MobileNavItem
                  href="/appointments"
                  label="Appointments"
                  icon={Calendar}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <MobileNavItem
                  href="/favorites"
                  label="Favorites"
                  icon={Heart}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </>
            )}

            {isAdmin && (
              <MobileNavItem
                href="/dashboard"
                label="Dashboard"
                className="bg-purple-50 border border-purple-200"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            )}

            <div className="pt-6 border-t border-gray-100 mt-4">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-4 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl mx-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                      {userInitials}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      {user?.role === "admin" && (
                        <p className="text-xs text-purple-600 capitalize font-medium">
                          {user?.role}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl mx-2 transition-all duration-200"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Sign out</span>
                  </button>
                </div>
              ) : (
                <div className="px-2 space-y-3">
                  <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold py-3">
                      Sign in
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sign Out Confirmation Dialog */}
      <AlertDialog open={showSignOutDialog} onOpenChange={setShowSignOutDialog}>
        <AlertDialogContent className="w-[92vw] max-w-[425px] bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-2xl">
          <AlertDialogHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut className="h-8 w-8 text-red-600" />
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-gray-900 mb-2">
              Sign Out
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 text-base leading-relaxed">
              Are you sure you want to sign out? You&apos;ll need to sign in
              again to access your account and saved properties.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
            <AlertDialogCancel className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 rounded-2xl py-3 px-6 font-semibold transition-all duration-200">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmSignOut}
              className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-2xl py-3 px-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}

function NavItem({
  href,
  label,
  icon: Icon,
  className = "",
}: {
  href: string;
  label: string;
  icon?: any;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group ${
        isActive
          ? "text-blue-700 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm border border-blue-200/50"
          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm"
      } ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
      {isActive && (
        <div className="absolute inset-x-4 -bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transform scale-x-100 transition-transform duration-300" />
      )}
    </Link>
  );
}

function MobileNavItem({
  href,
  label,
  icon: Icon,
  className = "",
  onClick,
}: {
  href: string;
  label: string;
  icon?: any;
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl mx-2 text-sm font-medium transition-all duration-300 ${
        isActive
          ? "text-blue-700 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50"
          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
      } ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </Link>
  );
}

function MenuLink({
  href,
  icon: Icon,
  label,
  onClick,
}: {
  href: string;
  icon: any;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-all duration-200 group"
      onClick={onClick}
    >
      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

function MobileMenuLink({
  href,
  icon: Icon,
  label,
  onClick,
}: {
  href: string;
  icon: any;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl mx-2 transition-all duration-200"
      onClick={onClick}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
