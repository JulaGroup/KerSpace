"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* KërSpace Brand Section */}
          <div className="space-y-6">
            <div>
              <Link href="/" className="flex items-center space-x-3 group">
                <Image src="/logo.png" alt="logo" width={70} height={70} />
              </Link>
              <p className="text-gray-400 leading-relaxed">
                Your trusted partner in finding and selling properties in The
                Gambia and beyond. Connecting dreams with reality through
                innovative technology.
              </p>
            </div>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                <span className="text-white font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors cursor-pointer">
                <span className="text-white font-bold">in</span>
              </div>
              <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer">
                <span className="text-white font-bold">ig</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Listings", href: "/listings" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mr-3">
                  <Phone className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white font-medium">+220 7595999</p>
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center mr-3">
                  <Mail className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-medium">info@terango.gm</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center mr-3 mt-1">
                  <MapPin className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Office</p>
                  <p className="text-white font-medium">
                    Turntable, Brusubi
                    <br />
                    The Gambia
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-center md:text-left">
            &copy; 2024 KërSpace. All rights reserved. Built with ❤️ for The
            Gambia.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
