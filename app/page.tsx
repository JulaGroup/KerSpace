"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/types/property";
import {
  Building,
  Users,
  Search,
  Star,
  ArrowRight,
  CheckCircle,
  Home,
  TrendingUp,
  Globe,
  PlayCircle,
  Shield,
  Heart,
  Award,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { IllustrationCard } from "@/components/IllustrationCards";
import { API_URL } from "@/config/constat";
import Image from "next/image";

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/properties/featured`);
        const data = res.data;
        setFeaturedProperties(data);
      } catch (err) {
        setFeaturedProperties([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      icon: Building,
      label: "Properties",
      value: "1,200+",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Users,
      label: "Happy Clients",
      value: "5,000+",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Star,
      label: "Client Rating",
      value: "4.9/5",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: TrendingUp,
      label: "Years Experience",
      value: "15+",
      color: "from-green-500 to-green-600",
    },
  ];

  const services = [
    {
      icon: Search,
      title: "Smart Property Search",
      description:
        "Easily find homes, apartments, offices, and land using simple, powerful filters.",
      link: "/properties",
      color: "from-blue-400 to-blue-600",
      hoverColor: "hover:shadow-blue-500/25",
    },
    {
      icon: Home,
      title: "Carefully Curated Listings",
      description:
        "We work closely with property owners and agents to list clear, genuine opportunities.",
      link: "/listings",
      color: "from-purple-400 to-purple-600",
      hoverColor: "hover:shadow-purple-500/25",
    },
    {
      icon: Users,
      title: "Direct Connections",
      description:
        "Connect directly with property owners, agents, and verified companies through KërSpace.",
      link: "/contact",
      color: "from-pink-400 to-pink-600",
      hoverColor: "hover:shadow-pink-500/25",
    },
    {
      icon: CheckCircle,
      title: "Built for Growth",
      description:
        "A modern platform designed to grow with The Gambia’s real estate market.",
      link: "/about",
      color: "from-green-400 to-green-600",
      hoverColor: "hover:shadow-green-500/25",
    },
  ];

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10">
        {/* Background with enhanced overlay */}
        <div className="absolute inset-0">
          <Image
            width={1920}
            height={1080}
            src="/hero.jpg"
            alt="KërSpace - Your Real Estate Journey Begins"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-purple-900/20" />
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Hero Content */}
        <div
          className={`relative z-20 max-w-6xl w-full px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                KërSpace: Where{" "}
              </span>
              <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-pulse">
                Your Story Begins
              </span>
            </h1>
            <div className="space-y-4">
              <p className="text-xl sm:text-2xl lg:text-3xl text-blue-100 font-semibold">
                Find your space. Live your story.
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Discover homes, apartments, offices, and land across The Gambia
                — powered by{" "}
                <span className="text-blue-300 font-medium">technology</span>,
                <span className="text-purple-300 font-medium"> trust</span>, and
                <span className="text-pink-300 font-medium"> simplicity</span>.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/listings" passHref>
              <Button
                size="lg"
                className="group px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300 border-0 min-w-[200px]"
              >
                <Search className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                Browse Properties
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/about" passHref>
              <Button
                variant="outline"
                size="lg"
                className="group px-8 py-6 text-lg font-semibold bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 rounded-2xl shadow-2xl hover:shadow-white/20 transform hover:scale-105 transition-all duration-300 min-w-[200px]"
              >
                <PlayCircle className="mr-3 h-6 w-6" />
                Watch Our Story
              </Button>
            </Link>
          </div>

          {/* Enhanced Search Bar */}
          <div className="w-full max-w-4xl mx-auto mb-5">
            <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="mb-4">
                <h3 className="text-white text-lg font-semibold mb-2">
                  Start Your Property Search
                </h3>
                <p className="text-blue-100 text-sm">
                  Discover verified properties across The Gambia
                </p>
              </div>
              <SearchBar />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 px-6 py-2 text-sm font-semibold">
              Our Impact
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Building dreams and connecting communities across West Africa
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`text-center group transition-all duration-500 hover:scale-105 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-3xl shadow-xl bg-gradient-to-r ${stat.color} mb-6 mx-auto group-hover:shadow-2xl transition-all duration-300`}
                  >
                    <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {stat.value}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 font-medium">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Properties */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 px-6 py-2 text-sm font-semibold">
              Featured Properties
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Discover Our Best Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked premium properties that offer exceptional value,
              quality, and investment potential
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
                >
                  <div className="h-48 bg-gray-200 rounded-xl mb-4" />
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProperties.slice(0, 6).map((property, index) => (
                <div
                  key={property._id}
                  className={`transition-all duration-500 hover:scale-105 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link href="/listings" passHref>
              <Button
                size="lg"
                className="group px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
              >
                View All Properties
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced What Would You Like to Do Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700 px-6 py-2 text-sm font-semibold">
              Your Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Would You Like to Do?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you&apos;re buying, selling, renting, or investing —
              KërSpace has you covered with expert guidance every step of the
              way.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <IllustrationCard
              title="Buy a Home"
              description="Find a place to call yours with verified listings and expert guidance."
              illustration="/illustrations/buy.svg"
              onClick={() =>
                router.push("/listings?type=house&status=for-sale")
              }
            />

            <IllustrationCard
              title="Rent a Home"
              description="Browse rentals across The Gambia and West Africa with ease."
              illustration="/illustrations/rent.svg"
              onClick={() =>
                router.push("/listings?type=house&status=for-rent")
              }
            />

            <IllustrationCard
              title="Sell a Home"
              description="List your property with confidence and reach the right buyers."
              illustration="/illustrations/sell.svg"
              onClick={() => router.push("/contact")}
            />

            <IllustrationCard
              title="Buy Land"
              description="Explore investment-ready land plots verified and documented."
              illustration="/illustrations/land.svg"
              onClick={() => router.push("/listings?type=land")}
            />
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 px-6 py-2 text-sm font-semibold">
              Our Services
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From finding your dream home to managing your property portfolio,
              we&apos;ve got you covered every step of the way with cutting-edge
              technology and expert support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 jus">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link key={service.title} href={service.link} passHref>
                  <div
                    className={`group cursor-pointer bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl ${service.hoverColor} transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-transparent`}
                  >
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* KërSpace Brand Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  KërSpace
                </h3>
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
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                    <span className="text-blue-400">📞</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      +220 7595999 or +220 390 2798
                    </p>
                    <p className="text-gray-400 text-sm">24/7 Support</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-purple-400">✉️</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      ker.spacegm@gmail.com
                    </p>
                    <p className="text-gray-400 text-sm">Email us anytime</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-400">📍</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Turntable</p>
                    <p className="text-gray-400 text-sm">Brusubi, The Gambia</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              &copy; 2024 KërSpace. All rights reserved. Powered by
              <Image
                src="/terango-logo.jpg"
                alt="TeranGO"
                width={120}
                height={50}
                className="inline-block ml-2"
              />
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
    </div>
  );
}
