"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProperties } from "@/lib/mockData";
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
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { IllustrationCard } from "@/components/IllustrationCards";

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:5000/api/properties/featured"
        );
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

  // Your updated stats exactly as you gave
  const stats = [
    { icon: Building, label: "Properties", value: "1,200+" },
    { icon: Users, label: "Happy Clients", value: "5,000+" },
    { icon: Star, label: "Client Rating", value: "4.9/5" },
    { icon: TrendingUp, label: "Years Experience", value: "15+" },
  ];

  // Your detailed services with exact descriptions and icons
  const services = [
    {
      icon: Search,
      title: "Advanced Search",
      description:
        "Find properties with powerful filters and real-time results.",
      link: "/services/advanced-search",
    },
    {
      icon: Home,
      title: "Quality Listings",
      description:
        "All properties are verified and reviewed by our expert team.",
      link: "/services/quality-listings",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Get guidance from experienced real estate professionals.",
      link: "/services/expert-support",
    },
    {
      icon: CheckCircle,
      title: "Secure Transactions",
      description:
        "Safe and secure property transactions with full documentation.",
      link: "/services/secure-transactions",
    },
  ];

  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50 mt-8">
      <Header />

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center text-white overflow-hidden"
        style={{
          backgroundImage: `url('/hero.jpg')`,
        }}
      >
        {/* 🔳 Overlay */}
        <div className="absolute inset-0 bg-black/60 z-0" />

        {/* 🌟 Hero Content */}
        <div className="relative z-10 max-w-4xl w-full px-4 text-center flex flex-col items-center space-y-6">
          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              KërSpace: Where{" "}
              <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Your Story{" "}
              </span>
              Begins
            </span>
          </h1>

          {/* Tagline */}
          <div>
            <p className="text-xl sm:text-2xl text-blue-100 font-medium mb-2">
              Find your space. Live your story
            </p>
            <p className="text-lg sm:text-xl text-blue-100  max-w-3xl mx-auto leading-relaxed">
              Revolutionizing real estate in The Gambia and West Africa with
              modern technology, local expertise, and unmatched transparency.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/listings" passHref>
              <Button
                size="lg"
                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 border-0"
              >
                <Search className="mr-2 h-5 w-5" />
                Browse Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Enhanced Search Bar */}
          <div className="w-full">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
              <SearchBar
              // No onSearch prop needed; SearchBar handles navigation
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - your detailed version */}
      <section className="py-10 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row flex-wrap sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12 text-center justify-center">
          {/* Properties */}
          <div className="flex-1 min-w-[120px]">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-3xl shadow-lg bg-gradient-to-tr from-blue-500 to-purple-600 mb-4 sm:mb-6 mx-auto">
              <Building className="h-7 w-7 sm:h-10 sm:w-10 text-white" />
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-1 sm:mb-2">
              1,200+
            </h3>
            <p className="text-base sm:text-lg text-gray-600">Properties</p>
          </div>

          {/* Happy Clients */}
          <div className="flex-1 min-w-[120px]">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-3xl shadow-lg bg-gradient-to-tr from-purple-500 to-pink-600 mb-4 sm:mb-6 mx-auto">
              <Users className="h-7 w-7 sm:h-10 sm:w-10 text-white" />
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-1 sm:mb-2">
              5,000+
            </h3>
            <p className="text-base sm:text-lg text-gray-600">Happy Clients</p>
          </div>

          {/* Client Rating */}
          <div className="flex-1 min-w-[120px]">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-3xl shadow-lg bg-gradient-to-tr from-pink-500 to-red-600 mb-4 sm:mb-6 mx-auto">
              <Star className="h-7 w-7 sm:h-10 sm:w-10 text-white" />
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-1 sm:mb-2">
              4.9/5
            </h3>
            <p className="text-base sm:text-lg text-gray-600">Client Rating</p>
          </div>

          {/* Years Experience */}
          <div className="flex-1 min-w-[120px]">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-3xl shadow-lg bg-gradient-to-tr from-green-500 to-teal-600 mb-4 sm:mb-6 mx-auto">
              <TrendingUp className="h-7 w-7 sm:h-10 sm:w-10 text-white" />
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-1 sm:mb-2">
              15+
            </h3>
            <p className="text-base sm:text-lg text-gray-600">
              Years Experience
            </p>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4">Featured Properties</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover Our Best Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked premium properties that offer exceptional value and
              quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/listings" passHref>
              <Button size="lg">
                View All Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What Would You Like to Do Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Would You Like to Do?
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Whether you&apos;re buying, selling, renting, or investing —
            KërSpace has you covered.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Buy a Home */}
            <IllustrationCard
              title="Buy a Home"
              description="Find a place to call yours with verified listings and expert guidance."
              illustration="/illustrations/buy.svg"
              onClick={() =>
                router.push("/listings?type=house&status=for-sale")
              }
              style={{ cursor: "pointer" }}
            />

            {/* Rent a Home */}
            <IllustrationCard
              title="Rent a Home"
              description="Browse rentals across The Gambia and West Africa with ease."
              illustration="/illustrations/rent.svg"
              onClick={() =>
                router.push("/listings?type=house&status=for-rent")
              }
              style={{ cursor: "pointer" }}
            />

            {/* Sell a Home */}
            <IllustrationCard
              title="Sell a Home"
              description="List your property with confidence and reach the right buyers."
              illustration="/illustrations/sell.svg"
              onClick={() => router.push("/contact")}
              style={{ cursor: "pointer" }}
            />

            {/* Buy Land */}
            <IllustrationCard
              title="Buy Land"
              description="Explore investment-ready land plots verified and documented."
              illustration="/illustrations/land.svg"
              onClick={() => router.push("/listings?type=land")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </section>

      {/* Services Section - your detailed version */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <Badge className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4 font-semibold">
              Our Services
            </Badge>
            <h2 className="text-4xl font-extrabold mb-4 text-gray-900">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600">
              From finding your dream home to managing your property portfolio,
              we&apos;ve got you covered every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Advanced Search */}
            <Link href="/services/advanced-search" passHref>
              <div className="cursor-pointer bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-3 border border-transparent hover:border-blue-400">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-300 to-purple-400 mb-6">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  Advanced Search
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Find properties with powerful filters and real-time results.
                </p>
              </div>
            </Link>

            {/* Quality Listings */}
            <Link href="/services/quality-listings" passHref>
              <div className="cursor-pointer bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-3 border border-transparent hover:border-purple-400">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-300 to-pink-400 mb-6">
                  <Home className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  Quality Listings
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  All properties are verified and reviewed by our expert team.
                </p>
              </div>
            </Link>

            {/* Expert Support */}
            <Link href="/services/expert-support" passHref>
              <div className="cursor-pointer bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-3 border border-transparent hover:border-pink-400">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-pink-300 to-red-400 mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  Expert Support
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Get guidance from experienced real estate professionals.
                </p>
              </div>
            </Link>

            {/* Secure Transactions */}
            <Link href="/services/secure-transactions" passHref>
              <div className="cursor-pointer bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-3 border border-transparent hover:border-green-400">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-green-300 to-teal-400 mb-6">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  Secure Transactions
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Safe and secure property transactions with full documentation.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* On mobile: KërSpace on top, then links/info side by side. On md+: 3 columns */}
          <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
            {/* KërSpace section always on top on mobile, left on desktop */}
            <div className="mb-8 md:mb-0">
              <h3 className="font-semibold mb-4 text-white">KërSpace</h3>
              <p className="text-gray-400">
                Your trusted partner in finding and selling properties in The
                Gambia and beyond.
              </p>
            </div>
            {/* Quick Links and Contact Info side by side on mobile, stacked on desktop */}
            <div className="flex flex-row gap-8 justify-between md:flex-col md:gap-0 md:justify-start col-span-2">
              <div>
                <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/listings" className="hover:text-white">
                      Listings
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="hover:text-white">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-white">Contact Info</h3>
                <ul className="space-y-2">
                  <li>+220 123 4567</li>
                  <li>info@KërSpace.com</li>
                  <li>
                    456 Real Estate Blvd
                    <br />
                    Banjul, The Gambia
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          &copy; 2024 KërSpace. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
