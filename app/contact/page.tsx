"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  ArrowRight,
  Send,
  CheckCircle,
  Heart,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Thank you for your message! We'll get back to you soon.");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+220 7595999", "+220 390 2798"],
      description: "24/7 Support Available",
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:shadow-blue-500/25",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@terango.gm"],
      description: "Quick Response Guaranteed",
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:shadow-purple-500/25",
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["Turntable, Brusubi", "The Gambia"],
      description: "Visit Our Headquarters",
      color: "from-pink-500 to-pink-600",
      hoverColor: "hover:shadow-pink-500/25",
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon-Fri: 9AM-6PM", "Sat: 10AM-4PM"],
      description: "We're Here When You Need Us",
      color: "from-green-500 to-green-600",
      hoverColor: "hover:shadow-green-500/25",
    },
  ];

  const quickActions = [
    {
      icon: Phone,
      title: "Call Us Now",
      description: "Immediate assistance available",
      action: "tel:+2207595999",
      color: "from-blue-600 to-blue-700",
      hoverColor: "hover:from-blue-700 hover:to-blue-800",
    },
    {
      icon: Mail,
      title: "Send Email",
      description: "Detailed inquiries welcome",
      action: "mailto:info@terango.gm",
      color: "from-purple-600 to-purple-700",
      hoverColor: "hover:from-purple-700 hover:to-purple-800",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp Chat",
      description: "Instant messaging support",
      action: "https://wa.me/2207595999",
      color: "from-green-600 to-green-700",
      hoverColor: "hover:from-green-700 hover:to-green-800",
    },
  ];

  const faqs = [
    {
      question: "What are your response times?",
      answer:
        "We typically respond within 2-4 hours during working hours, ensuring you get timely and helpful answers to all your inquiries.",
    },
    {
      question: "Do you work weekends?",
      answer:
        "Yes! Our team is available on Saturdays (10 AM - 4 PM) and by appointment on Sundays for your convenience.",
    },
    {
      question: "Can I schedule a property viewing?",
      answer:
        "Absolutely! Contact us using any method below, and we'll arrange a viewing time that perfectly suits your schedule.",
    },
    {
      question: "Do you offer virtual tours?",
      answer:
        "Yes, we provide comprehensive virtual property tours using advanced 360° technology for your convenience.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Enhanced Hero Section - No Image */}
      <section className="relative py-24 bg-gradient-to-br from-slate-800 via-slate-700 to-blue-800 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />

        <div
          className={`relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Badge className="mb-6 bg-white/15 text-white border-white/20 px-6 py-3 text-lg font-semibold backdrop-blur-md">
            Contact KërSpace
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            Let&apos;s Make Your Property{" "}
            <span className="bg-gradient-to-r from-blue-300 via-blue-200 to-white bg-clip-text text-transparent">
              Dreams Reality
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-slate-200 max-w-4xl mx-auto leading-relaxed">
            Whether you&apos;re buying, selling, renting, or investing — our
            expert team is here to guide you every step of the way with{" "}
            <span className="text-blue-300 font-medium">
              personalized service
            </span>{" "}
            and{" "}
            <span className="text-blue-200 font-medium">
              cutting-edge solutions
            </span>
            .
          </p>
        </div>
      </section>

      {/* Enhanced Contact Info Cards */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 px-6 py-2 text-sm font-semibold">
              Get In Touch
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the method that works best for you — we&apos;re always
              ready to help
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.title}
                  className={`group cursor-default bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl ${
                    info.hoverColor
                  } transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-transparent ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${info.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {info.title}
                  </h3>
                  <div className="space-y-1 mb-3">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-900 font-semibold">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Main Content Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            {/* Enhanced Form */}
            <div className="lg:col-span-2">
              <div
                className={`bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 transition-all duration-1000 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 mr-4 shadow-lg">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">
                      Send Us a Message
                    </h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Ready to start your property journey? Fill out the form
                    below and our expert team will get back to you with
                    personalized solutions.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-gray-700 font-semibold"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="h-12 px-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-gray-700 font-semibold"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="h-12 px-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-gray-700 font-semibold"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+220 XXX XXXX"
                        className="h-12 px-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="subject"
                        className="text-gray-700 font-semibold"
                      >
                        Subject <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What can we help you with?"
                        className="h-12 px-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-gray-700 font-semibold"
                    >
                      Your Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your property needs, budget, preferred location, or any specific requirements..."
                      rows={6}
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 transition-all duration-300 min-h-[140px] resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-xl hover:shadow-blue-500/25 transform hover:scale-[1.02] transition-all duration-300 border-0"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                        Send Message
                        <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div
                className={`transition-all duration-1000 delay-200 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Zap className="h-6 w-6 mr-3 text-yellow-500" />
                    Quick Actions
                  </h4>
                  <div className="space-y-4">
                    {quickActions.map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <Button
                          key={action.title}
                          className={`w-full justify-start h-14 text-left bg-gradient-to-r ${action.color} ${action.hoverColor} text-white shadow-lg transform hover:scale-[1.02] transition-all duration-300 rounded-xl border-0`}
                          asChild
                        >
                          <a
                            href={action.action}
                            target={
                              action.action.startsWith("http")
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              action.action.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            <div className="flex items-center">
                              <div className="flex-shrink-0 mr-4">
                                <Icon className="h-6 w-6" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold">
                                  {action.title}
                                </div>
                                <div className="text-sm opacity-90 truncate">
                                  {action.description}
                                </div>
                              </div>
                            </div>
                          </a>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Enhanced Map Card */}
              <div
                className={`transition-all duration-1000 delay-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <MapPin className="h-6 w-6 mr-3 text-pink-500" />
                    Find Us Here
                  </h4>
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-inner overflow-hidden mb-6">
                    <div className="text-center p-4">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 font-medium">
                        Interactive Map
                      </p>
                      <p className="text-gray-500 text-sm">Coming Soon</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <MapPin className="h-5 w-5 text-pink-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          KërSpace Headquarters
                        </p>
                        <p className="text-gray-600">Turntable, Brusubi</p>
                        <p className="text-gray-600">WCR, The Gambia</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-4 h-12 border-2 border-pink-200 text-pink-700 hover:bg-pink-50 hover:border-pink-300 rounded-xl transition-all duration-300"
                      asChild
                    >
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Turntable,+Brusubi,+WCR,+The+Gambia"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MapPin className="h-5 w-5 mr-2" />
                        Get Directions
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Enhanced FAQ Section */}
              <div
                className={`transition-all duration-1000 delay-400 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <MessageSquare className="h-6 w-6 mr-3 text-blue-500" />
                    Quick Answers
                  </h4>
                  <div className="space-y-6">
                    {faqs.map((faq, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
                      >
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {faq.question}
                        </h5>
                        <p className="text-gray-600 text-sm leading-relaxed ml-7">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
