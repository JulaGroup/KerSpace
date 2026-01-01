"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  FileText,
  Mail,
  Globe,
  Cookie,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "When you register on KërSpace, we collect your name, email address, phone number, and other contact details. Property owners may provide additional information such as property details, images, and location data.",
        },
        {
          subtitle: "Usage Data",
          text: "We automatically collect information about your interactions with our platform, including IP address, browser type, device information, pages visited, and time spent on our website.",
        },
        {
          subtitle: "Cookies and Tracking",
          text: "We use cookies and similar technologies to enhance your experience, remember your preferences, and analyze site usage. You can control cookie settings through your browser.",
        },
      ],
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Service Delivery",
          text: "We use your information to provide and improve our real estate services, process property listings, facilitate appointments, and communicate with you about your account and inquiries.",
        },
        {
          subtitle: "Personalization",
          text: "Your data helps us personalize your experience, recommend relevant properties, and send tailored notifications based on your preferences and search history.",
        },
        {
          subtitle: "Analytics and Improvement",
          text: "We analyze user behavior to improve our platform, understand market trends, and enhance our services. This helps us serve you better and maintain a high-quality experience.",
        },
        {
          subtitle: "Marketing Communications",
          text: "With your consent, we may send you promotional emails about new properties, special offers, and updates. You can opt-out anytime using the unsubscribe link in our emails.",
        },
      ],
    },
    {
      icon: Lock,
      title: "Data Security and Protection",
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your personal information from unauthorized access, disclosure, or destruction.",
        },
        {
          subtitle: "Access Control",
          text: "Access to your personal data is restricted to authorized personnel only. Our team members are trained on data protection and privacy practices.",
        },
        {
          subtitle: "Data Breach Protocol",
          text: "In the unlikely event of a data breach, we will notify affected users promptly and take immediate action to mitigate any potential harm.",
        },
      ],
    },
    {
      icon: Globe,
      title: "Information Sharing and Disclosure",
      content: [
        {
          subtitle: "Property Listings",
          text: "When you list a property, certain information (property details, images, contact info) will be publicly visible to help potential buyers or renters contact you.",
        },
        {
          subtitle: "Service Providers",
          text: "We may share data with trusted third-party service providers who assist us in operating our platform, such as hosting services, analytics tools, and email services. These providers are bound by confidentiality agreements.",
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information when required by law, to protect our rights, comply with legal processes, or respond to government requests.",
        },
        {
          subtitle: "Business Transfers",
          text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity, with continued protection under this privacy policy.",
        },
      ],
    },
    {
      icon: UserCheck,
      title: "Your Rights and Choices",
      content: [
        {
          subtitle: "Access and Update",
          text: "You have the right to access, update, or correct your personal information at any time through your account settings or by contacting us.",
        },
        {
          subtitle: "Data Deletion",
          text: "You can request deletion of your account and associated data. Some information may be retained for legal compliance or legitimate business purposes.",
        },
        {
          subtitle: "Opt-Out Options",
          text: "You can opt-out of marketing communications, disable cookies, or limit data collection. Note that some features may be limited if you restrict certain data collection.",
        },
        {
          subtitle: "Data Portability",
          text: "You have the right to receive a copy of your personal data in a structured, commonly used, and machine-readable format.",
        },
      ],
    },
    {
      icon: Cookie,
      title: "Cookies and Tracking Technologies",
      content: [
        {
          subtitle: "Types of Cookies",
          text: "We use essential cookies (required for site functionality), performance cookies (to analyze usage), functional cookies (to remember preferences), and marketing cookies (for targeted advertising).",
        },
        {
          subtitle: "Managing Cookies",
          text: "You can control or delete cookies through your browser settings. However, disabling certain cookies may affect your ability to use some features of our platform.",
        },
        {
          subtitle: "Third-Party Cookies",
          text: "We may allow third-party services (like Google Analytics) to place cookies on your device for analytics and advertising purposes.",
        },
      ],
    },
    {
      icon: FileText,
      title: "Data Retention",
      content: [
        {
          subtitle: "Retention Period",
          text: "We retain your personal information for as long as your account is active or as needed to provide services. After account deletion, we may retain certain data for legal, tax, or business purposes.",
        },
        {
          subtitle: "Backup and Archives",
          text: "Deleted data may persist in backup systems for a limited period before permanent deletion.",
        },
      ],
    },
  ];

  const lastUpdated = "January 1, 2026";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link
            href="/"
            className="inline-flex items-center text-white/90 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Badge className="mb-6 bg-white/20 text-white px-6 py-2 text-sm font-semibold backdrop-blur-sm">
              <Shield className="h-4 w-4 mr-2 inline" />
              Privacy Policy
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Your Privacy Matters
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              At KërSpace, we are committed to protecting your personal
              information and being transparent about how we collect, use, and
              safeguard your data.
            </p>
            <p className="text-white/80 mt-4">
              <strong>Last Updated:</strong> {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Important Notice
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  This Privacy Policy explains how KërSpace (&quot;we,&quot;
                  &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses,
                  discloses, and protects your information when you use our real
                  estate platform and services. By accessing or using KërSpace,
                  you agree to this Privacy Policy. If you do not agree, please
                  discontinue use of our services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.title}
                  className={`transition-all duration-700 delay-${
                    index * 100
                  } ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {section.title}
                      </h2>
                    </div>

                    <div className="space-y-6">
                      {section.content.map((item, idx) => (
                        <div key={idx}>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            {item.subtitle}
                          </h3>
                          <p className="text-gray-700 leading-relaxed ml-7">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <Mail className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">
              Questions About Your Privacy?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or how we handle your personal information, please
              don&apos;t hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Us
                </Button>
              </Link>
              <Link href="/terms">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Terms of Service
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Children's Privacy */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
              Children&apos;s Privacy
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              KërSpace is not intended for users under the age of 18. We do not
              knowingly collect personal information from children. If you
              believe we have inadvertently collected information from a child,
              please contact us immediately so we can delete it.
            </p>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Globe className="h-5 w-5 text-blue-600 mr-2" />
              International Users
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              KërSpace operates primarily in The Gambia. If you access our
              services from outside The Gambia, please be aware that your
              information may be transferred to, stored, and processed in The
              Gambia. By using our services, you consent to this transfer.
            </p>
          </div>

          <div className="mt-6 bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <FileText className="h-5 w-5 text-purple-600 mr-2" />
              Policy Updates
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or legal requirements. We will notify you
              of any material changes by posting the updated policy on our
              website and updating the &quot;Last Updated&ldquo; date. Your
              continued use of our services after changes constitutes acceptance
              of the updated policy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
