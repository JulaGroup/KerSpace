"use client";

import { useState } from "react";
import { Header } from "@/components/Header"; // Assuming your Header component path
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react"; // Make sure lucide-react is installed
import { toast } from "sonner"; // Make sure sonner is installed for toasts

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this formData to your backend API
    console.log("Form submitted:", formData); // For demonstration

    // Simulate API call success
    toast.success("Thank you for your message! We'll get back to you soon.");

    // Reset the form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+220 7595999",
      description: "Call us for immediate assistance",
    },
    {
      icon: Mail,
      title: "Email",
      details: "hello@KërSpace.com",
      description: "Send us your questions anytime",
    },
    {
      icon: MapPin,
      title: "Office",
      details: "Brusubi, WCR, The Gambia",
      description: "Visit our headquarters",
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
      description: "We're here when you need us",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 py-24 text-white text-center overflow-hidden">
        {/* Optional: Subtle background pattern or image overlay - you'd define this class in your global CSS */}
        {/* <div className="absolute inset-0 bg-pattern-light opacity-10 pointer-events-none"></div> */}
        <div className="relative max-w-4xl mx-auto px-6 z-10">
          <h1 className="text-6xl font-extrabold mb-6 leading-tight animate-fade-in-up">
            Let’s Talk Real Estate
          </h1>
          <p className="text-xl text-blue-100 opacity-90 leading-relaxed animate-fade-in-up delay-200">
            Whether you're buying, selling, or just exploring — KërSpace is here
            to help you achieve your property goals.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="text-center p-6 shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-none"
              >
                <CardContent className="flex flex-col items-center justify-center space-y-3">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4 shadow-inner">
                    <info.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {info.title}
                  </h3>
                  <p className="font-semibold text-lg text-blue-700">
                    {info.details}
                  </p>
                  <p className="text-sm text-gray-500 max-w-xs">
                    {info.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            {/* Form */}
            <Card className="shadow-2xl lg:col-span-2 rounded-xl bg-white border-none p-6">
              <CardHeader className="mb-6 p-0">
                <CardTitle className="flex items-center text-3xl font-bold text-gray-900">
                  <MessageSquare className="h-8 w-8 mr-3 text-blue-600" />
                  Send Us a Message
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  We'd love to hear from you! Fill out the form below and we'll
                  get back to you promptly.
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="name"
                        className="text-gray-700 font-medium mb-1 block"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="text-gray-700 font-medium mb-1 block"
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
                        placeholder="john@example.com"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="phone"
                        className="text-gray-700 font-medium mb-1 block"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+220 7595999"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="subject"
                        className="text-gray-700 font-medium mb-1 block"
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
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="message"
                      className="text-gray-700 font-medium mb-1 block"
                    >
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can assist you..."
                      rows={6}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[120px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-3 px-6 bg-blue-700 hover:bg-blue-800 text-white text-lg font-semibold rounded-lg shadow-xl transform hover:scale-[1.01] transition-all duration-300"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Sidebar Cards */}
            <div className="space-y-8">
              {/* Location Map Placeholder / Integration */}
              <Card className="shadow-lg rounded-xl bg-white border-none">
                <CardHeader className="p-6 pb-4">
                  <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                    <MapPin className="h-6 w-6 mr-3 text-blue-600" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center shadow-inner overflow-hidden">
                    {/* Placeholder for actual map integration.
                        Replace this div content with your chosen map component (e.g., Google Maps iframe or library). */}
                    <img
                      src="https://via.placeholder.com/600x400?text=Interactive+Map+Coming+Soon"
                      alt="Map Placeholder"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-5 text-base text-gray-700 leading-relaxed">
                    <strong>KërSpace Headquarters</strong>
                    <br />
                    Brusubi Phase 1, Brusubi
                    <br />
                    WCR, The Gambia
                    <br />
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Brusubi,+WCR,+The+Gambia" // Direct link to Google Maps search for directions
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline mt-2 inline-flex items-center text-sm"
                    >
                      <MapPin className="h-4 w-4 mr-1" /> Get Directions
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact Buttons */}
              <Card className="shadow-lg rounded-xl bg-white border-none">
                <CardHeader className="p-6 pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Quick Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6 pt-0">
                  <Button
                    className="w-full justify-start py-3 text-base bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                    asChild
                  >
                    <a href="tel:+2207595999">
                      <Phone className="mr-3 h-5 w-5" />
                      Call Us Now
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start py-3 text-base border-blue-400 text-blue-700 hover:bg-blue-50 hover:border-blue-500"
                    asChild
                  >
                    <a href="mailto:hello@KërSpace.com">
                      <Mail className="mr-3 h-5 w-5" />
                      Send Email
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start py-3 text-base border-green-400 text-green-700 hover:bg-green-50 hover:border-green-500"
                    asChild
                  >
                    <a
                      href="https://wa.me/2207595999"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageSquare className="mr-3 h-5 w-5" />
                      WhatsApp Chat
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card className="shadow-lg rounded-xl bg-white border-none">
                <CardHeader className="p-6 pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 p-6 pt-0 text-sm text-gray-700">
                  <div>
                    <strong className="text-gray-800 text-base">
                      What are your response times?
                    </strong>
                    <p className="mt-1 leading-relaxed">
                      We typically respond within **2-4 hours** during working
                      hours, ensuring you get timely answers.
                    </p>
                  </div>
                  <div>
                    <strong className="text-gray-800 text-base">
                      Do you work weekends?
                    </strong>
                    <p className="mt-1 leading-relaxed">
                      Yes, our team is available on **Saturdays (10 AM - 4 PM)**{" "}
                      and by appointment on Sundays for your convenience.
                    </p>
                  </div>
                  <div>
                    <strong className="text-gray-800 text-base">
                      Can I schedule a property viewing?
                    </strong>
                    <p className="mt-1 leading-relaxed">
                      Absolutely! Just reach out to us using the form or quick
                      contact options, and we’ll arrange a time that suits your
                      schedule perfectly.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
