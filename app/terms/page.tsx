"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Shield,
  Scale,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Home,
  Users,
  CreditCard,
  Gavel,
  Lock,
  Mail,
  ArrowLeft,
  Info,
} from "lucide-react";

export default function TermsOfServicePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: [
        {
          subtitle: "Agreement to Terms",
          text: "By accessing and using KërSpace, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, you must not use our platform.",
        },
        {
          subtitle: "Modifications",
          text: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the platform after changes constitutes acceptance of the modified terms.",
        },
        {
          subtitle: "Eligibility",
          text: "You must be at least 18 years old and legally capable of entering into binding contracts to use KërSpace. By using our services, you represent and warrant that you meet these requirements.",
        },
      ],
    },
    {
      icon: Users,
      title: "User Accounts and Responsibilities",
      content: [
        {
          subtitle: "Account Creation",
          text: "To access certain features, you must create an account by providing accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account credentials.",
        },
        {
          subtitle: "Account Security",
          text: "You are solely responsible for all activities that occur under your account. Notify us immediately of any unauthorized use or security breach. We are not liable for losses caused by unauthorized use of your account.",
        },
        {
          subtitle: "Prohibited Conduct",
          text: "You agree not to: (a) use the platform for illegal purposes; (b) post false, misleading, or fraudulent listings; (c) harass, abuse, or harm other users; (d) attempt to gain unauthorized access to our systems; (e) interfere with platform operations; or (f) violate any applicable laws or regulations.",
        },
        {
          subtitle: "Account Termination",
          text: "We reserve the right to suspend or terminate your account at any time, with or without notice, for violations of these terms or any other reason at our sole discretion.",
        },
      ],
    },
    {
      icon: Home,
      title: "Property Listings and Content",
      content: [
        {
          subtitle: "Listing Accuracy",
          text: "Property owners and agents must provide accurate, truthful, and complete information in all listings. You are responsible for the accuracy of your listings and must update them promptly if information changes.",
        },
        {
          subtitle: "Content Ownership",
          text: "You retain ownership of content you submit (photos, descriptions, etc.), but grant KërSpace a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content on our platform and marketing materials.",
        },
        {
          subtitle: "Prohibited Content",
          text: "You may not post content that is: illegal, fraudulent, defamatory, obscene, hateful, discriminatory, or infringes on intellectual property rights. We reserve the right to remove any content that violates these terms.",
        },
        {
          subtitle: "Verification",
          text: "While we strive to verify listings, KërSpace does not guarantee the accuracy, legality, or quality of properties listed. Users are responsible for conducting their own due diligence before entering into any transaction.",
        },
      ],
    },
    {
      icon: CreditCard,
      title: "Fees and Payments",
      content: [
        {
          subtitle: "Service Fees",
          text: "Certain features or services may require payment. All fees are non-refundable unless otherwise stated. We reserve the right to change fees with advance notice.",
        },
        {
          subtitle: "Payment Processing",
          text: "Payments are processed through secure third-party payment processors. You agree to provide accurate payment information and authorize us to charge applicable fees to your payment method.",
        },
        {
          subtitle: "Taxes",
          text: "You are responsible for all applicable taxes related to your use of KërSpace. Fees displayed may not include applicable taxes.",
        },
      ],
    },
    {
      icon: Scale,
      title: "Disclaimers and Limitations",
      content: [
        {
          subtitle: "No Warranty",
          text: 'KërSpace is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the platform will be uninterrupted, error-free, or secure.',
        },
        {
          subtitle: "Third-Party Transactions",
          text: "KërSpace facilitates connections between property owners/agents and potential buyers/renters but is not a party to any transaction. We are not responsible for disputes, damages, or losses arising from transactions between users.",
        },
        {
          subtitle: "Limitation of Liability",
          text: "To the maximum extent permitted by law, KërSpace and its officers, directors, employees, and affiliates shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of the platform or any transaction conducted through it.",
        },
        {
          subtitle: "Maximum Liability",
          text: "Our total liability to you for any claims arising from these terms or your use of KërSpace shall not exceed the amount you paid to us in the 12 months preceding the claim, or GMD 5,000, whichever is less.",
        },
      ],
    },
    {
      icon: Gavel,
      title: "Intellectual Property",
      content: [
        {
          subtitle: "Platform Ownership",
          text: "All content, features, functionality, trademarks, logos, and software on KërSpace are owned by us or our licensors and are protected by intellectual property laws. You may not copy, modify, or distribute our content without permission.",
        },
        {
          subtitle: "User Content License",
          text: "By submitting content to KërSpace, you grant us a perpetual, irrevocable, worldwide, royalty-free license to use, reproduce, modify, and display your content for operating and promoting our platform.",
        },
        {
          subtitle: "Copyright Infringement",
          text: "We respect intellectual property rights. If you believe content on our platform infringes your copyright, please contact us with details, and we will investigate and take appropriate action.",
        },
      ],
    },
    {
      icon: Shield,
      title: "Privacy and Data Protection",
      content: [
        {
          subtitle: "Privacy Policy",
          text: "Your use of KërSpace is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information. Please review it carefully.",
        },
        {
          subtitle: "Data Security",
          text: "While we implement reasonable security measures, no method of transmission over the internet is 100% secure. You acknowledge the inherent security risks of providing information online.",
        },
        {
          subtitle: "Data Sharing",
          text: "When you list a property or inquire about a listing, certain information will be shared with relevant parties to facilitate the transaction. By using our services, you consent to this sharing.",
        },
      ],
    },
    {
      icon: AlertTriangle,
      title: "Dispute Resolution",
      content: [
        {
          subtitle: "Governing Law",
          text: "These Terms of Service are governed by the laws of The Gambia. Any disputes arising from these terms or your use of KërSpace shall be subject to the exclusive jurisdiction of the courts of The Gambia.",
        },
        {
          subtitle: "Dispute Between Users",
          text: "Disputes between users (e.g., buyers and sellers) must be resolved directly between the parties. KërSpace is not obligated to mediate or resolve such disputes but may assist at our discretion.",
        },
        {
          subtitle: "Informal Resolution",
          text: "Before initiating any legal action, you agree to contact us to attempt to resolve the dispute informally. We will work in good faith to find a mutually acceptable resolution.",
        },
      ],
    },
    {
      icon: Info,
      title: "General Provisions",
      content: [
        {
          subtitle: "Entire Agreement",
          text: "These Terms of Service, together with our Privacy Policy, constitute the entire agreement between you and KërSpace regarding your use of the platform.",
        },
        {
          subtitle: "Severability",
          text: "If any provision of these terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.",
        },
        {
          subtitle: "Waiver",
          text: "Our failure to enforce any right or provision of these terms does not constitute a waiver of that right or provision.",
        },
        {
          subtitle: "Assignment",
          text: "You may not assign or transfer these terms or your account without our prior written consent. We may assign our rights and obligations without restriction.",
        },
      ],
    },
  ];

  const lastUpdated = "January 1, 2026";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-600 to-blue-600 overflow-hidden">
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
              <FileText className="h-4 w-4 mr-2 inline" />
              Terms of Service
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using KërSpace. By
              accessing or using our platform, you agree to be bound by these
              terms and conditions.
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
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <div className="flex items-start">
              <Info className="h-6 w-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Welcome to KërSpace
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  These Terms of Service (&quot;Terms&quot;) govern your access
                  to and use of KërSpace, a real estate platform operating in
                  The Gambia. These Terms form a legally binding agreement
                  between you and KërSpace. Please read them carefully, as they
                  contain important information about your rights and
                  obligations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-purple-50">
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
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
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

      {/* Important Notice */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Important Legal Notice
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      KërSpace is a platform that connects property owners with
                      potential buyers/renters. We are not real estate agents,
                      brokers, or legal advisors.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      All transactions are conducted directly between users. We
                      do not guarantee the outcome of any transaction.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      Users are responsible for conducting due diligence,
                      verifying property details, and ensuring legal compliance
                      before entering into any agreement.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      We strongly recommend consulting with legal and financial
                      professionals before making real estate decisions.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white">
            <Mail className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">
              Questions About These Terms?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              If you have any questions or concerns about these Terms of
              Service, please contact us. We&apos;re here to help clarify any
              aspect of our terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-purple-600 hover:bg-gray-100"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Us
                </Button>
              </Link>
              <Link href="/privacy">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Lock className="h-5 w-5 mr-2" />
                  Privacy Policy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Acknowledgment */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-3 text-xl">
              Acknowledgment
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed max-w-2xl mx-auto">
              By using KërSpace, you acknowledge that you have read, understood,
              and agree to be bound by these Terms of Service and our Privacy
              Policy. If you do not agree with any part of these terms, you must
              discontinue use of our platform immediately.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
