"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Shield,
  Award,
  Globe,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Building,
  Target,
  Eye,
  Lightbulb,
  HandHeart,
  Zap,
  PlayCircle,
  Quote,
} from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description:
        "Every property is verified, every transaction is transparent, and every client relationship is built on trust.",
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:shadow-blue-500/25",
    },
    {
      icon: HandHeart,
      title: "Client-First Approach",
      description:
        "Your dreams and needs drive everything we do. We're not just selling properties, we're building futures.",
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:shadow-purple-500/25",
    },
    {
      icon: Award,
      title: "Excellence in Service",
      description:
        "From first contact to keys in hand, we deliver exceptional service that exceeds expectations.",
      color: "from-pink-500 to-pink-600",
      hoverColor: "hover:shadow-pink-500/25",
    },
    {
      icon: Lightbulb,
      title: "Innovation & Technology",
      description:
        "Leveraging cutting-edge technology to make real estate accessible, efficient, and enjoyable.",
      color: "from-green-500 to-green-600",
      hoverColor: "hover:shadow-green-500/25",
    },
    {
      icon: Globe,
      title: "Local Expertise",
      description:
        "Deep understanding of The Gambian market combined with international best practices.",
      color: "from-orange-500 to-orange-600",
      hoverColor: "hover:shadow-orange-500/25",
    },
    {
      icon: TrendingUp,
      title: "Sustainable Growth",
      description:
        "Building communities and relationships that create lasting value for all stakeholders.",
      color: "from-teal-500 to-teal-600",
      hoverColor: "hover:shadow-teal-500/25",
    },
  ];

  const testimonials = [
    {
      name: "Amina Jallow",
      role: "First-time Homeowner",
      location: "Banjul",
      content:
        "KërSpace made my dream of owning a home come true. Their team guided me through every step with patience and expertise. I couldn't be happier!",
      rating: 5,
      image: "/person.jpg",
    },
    {
      name: "Omar Ceesay",
      role: "Property Investor",
      location: "Serrekunda",
      content:
        "As an investor, I need accurate information and reliable partners. KërSpace delivers both consistently. They've helped me build a solid portfolio.",
      rating: 5,
      image: "/person.jpg",
    },
    {
      name: "Fatou Sanneh",
      role: "Business Owner",
      location: "Kanifing",
      content:
        "Finding the perfect office space for my business was challenging until I found KërSpace. Their commercial property expertise is unmatched.",
      rating: 5,
      image: "/person.jpg",
    },
  ];

  const stats = [
    {
      icon: Building,
      label: "Properties Listed",
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
      icon: CheckCircle,
      label: "Successful Deals",
      value: "2,500+",
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            width={1920}
            height={1080}
            src="/about-hero.jpg"
            alt="KërSpace - About Our Story"
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
          <div className="mb-8">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 px-6 py-3 text-lg font-semibold backdrop-blur-md">
              About KërSpace
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Redefining Real Estate{" "}
              </span>
              <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-pulse">
                in The Gambia
              </span>
            </h1>
            <div className="space-y-4">
              <p className="text-xl sm:text-2xl lg:text-3xl text-blue-100 font-semibold">
                Where Innovation Meets Tradition
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
                Born from a vision to transform how people find, buy, and sell
                properties in The Gambia, KërSpace combines{" "}
                <span className="text-blue-300 font-medium">
                  cutting-edge technology
                </span>{" "}
                with
                <span className="text-purple-300 font-medium">
                  {" "}
                  deep local knowledge
                </span>{" "}
                to create exceptional real estate experiences.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/listings" passHref>
              <Button
                size="lg"
                className="group px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300 border-0 min-w-[200px]"
              >
                <Building className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                Explore Properties
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact" passHref>
              <Button
                variant="outline"
                size="lg"
                className="group px-8 py-6 text-lg font-semibold bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 rounded-2xl shadow-2xl hover:shadow-white/20 transform hover:scale-105 transition-all duration-300 min-w-[200px]"
              >
                <Users className="mr-3 h-6 w-6" />
                Meet Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <Badge className="mb-4 bg-blue-100 text-blue-700 px-6 py-2 text-sm font-semibold">
                Our Story
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                From Vision to Reality
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  KërSpace was born from a simple observation: finding quality
                  properties in The Gambia and West Africa was unnecessarily
                  complicated, time-consuming, and often unreliable. As a new
                  company, we saw an opportunity to change that narrative
                  entirely.
                </p>
                <p>
                  Founded by a team of passionate entrepreneurs with deep roots
                  in both technology and real estate, we set out to create a
                  platform that would democratize access to quality properties
                  while maintaining the personal touch that makes property
                  transactions special.
                </p>
                <p>
                  Today, we&apos;re proud to be at the forefront of real estate
                  innovation in West Africa, combining modern technology with
                  traditional values of trust, transparency, and community
                  building. Every property listing, every client interaction,
                  and every successful transaction brings us closer to our
                  vision of making real estate accessible to everyone.
                </p>
              </div>
            </div>
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
                <Image
                  width={600}
                  height={400}
                  src="/about.jpg"
                  alt="KërSpace Story"
                  className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 px-6 py-2 text-sm font-semibold">
              Mission & Vision
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Drives Us Forward
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div
              className={`bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 mb-0 mr-4 shadow-lg">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                To revolutionize the real estate experience in West Africa by
                providing a transparent, efficient, and technology-driven
                platform that connects people with their perfect properties.
                We&apos;re committed to making property transactions seamless,
                trustworthy, and accessible to everyone, regardless of their
                background or experience level.
              </p>
            </div>

            <div
              className={`bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 mb-0 mr-4 shadow-lg">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                To become West Africa&apos;s most trusted and innovative real
                estate platform, where every person can confidently find their
                ideal space. We envision a future where property transactions
                are completely transparent, efficiently managed, and enhanced by
                technology while preserving the human connections that make
                finding a home truly special.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700 px-6 py-2 text-sm font-semibold">
              Our Values
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              The Principles That Guide Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our values aren&apos;t just words on a wall—they&apos;re the
              foundation of every interaction, every decision, and every
              solution we provide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className={`group cursor-default bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl ${
                    value.hoverColor
                  } transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-transparent ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 px-6 py-2 text-sm font-semibold">
              Our Impact
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Making Dreams Reality, One Property at a Time
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Though we&apos;re a new company, our impact is already being felt
              across The Gambia
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-pink-100 text-pink-700 px-6 py-2 text-sm font-semibold">
              Client Stories
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real people who trusted us with their property
              dreams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="absolute -top-4 left-8">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Quote className="h-4 w-4 text-white" />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg italic">
                    &quot;{testimonial.content}&quot;
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    <p className="text-gray-500 text-xs">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Commented out as requested */}
      {/* 
      <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-700 px-6 py-2 text-sm font-semibold">
              Our Team
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet the People Behind KërSpace
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A passionate team of real estate experts, technology innovators, and customer service champions
            </p>
          </div>
          // Team members would go here
        </div>
      </section>
      */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your Property Journey?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Join thousands of satisfied clients who trust KërSpace with their
              real estate needs. Whether you&apos;re buying, selling, or
              renting, we&apos;re here to make your dreams a reality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/listings" passHref>
                <Button
                  size="lg"
                  className="group px-8 py-6 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 rounded-2xl shadow-2xl hover:shadow-white/20 transform hover:scale-105 transition-all duration-300 border-0 min-w-[200px]"
                >
                  <Building className="mr-3 h-6 w-6" />
                  Browse Properties
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact" passHref>
                <Button
                  variant="outline"
                  size="lg"
                  className="group px-8 py-6 text-lg font-semibold bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 rounded-2xl shadow-2xl hover:shadow-white/20 transform hover:scale-105 transition-all duration-300 min-w-[200px]"
                >
                  <Users className="mr-3 h-6 w-6" />
                  Contact Us Today
                </Button>
              </Link>
            </div>
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
                  { label: "Properties", href: "/listings" },
                  { label: "Services", href: "/services" },
                  { label: "About Us", href: "/about" },
                  { label: "Contact", href: "/contact" },
                  { label: "Blog", href: "/blog" },
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
                    <p className="text-white font-medium">+220 123 4567</p>
                    <p className="text-gray-400 text-sm">24/7 Support</p>
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-purple-400">✉️</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">info@kerspace.com</p>
                    <p className="text-gray-400 text-sm">Email us anytime</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-400">📍</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      456 Real Estate Blvd
                    </p>
                    <p className="text-gray-400 text-sm">Banjul, The Gambia</p>
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
    </div>
  );
}
