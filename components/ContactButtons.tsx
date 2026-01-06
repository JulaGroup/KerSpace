"use client";

import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContactButtonsProps {
  phone: string;
  propertyTitle?: string;
  className?: string;
  variant?: "full" | "compact";
}

export function ContactButtons({
  phone,
  propertyTitle,
  className,
  variant = "full",
}: ContactButtonsProps) {
  // Format phone number for links (remove spaces, hyphens, etc.)
  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  // WhatsApp message template
  const whatsappMessage = propertyTitle
    ? `Hi, I'm interested in ${propertyTitle} listed on KërSpace.`
    : "Hi, I'm interested in your property listing on KërSpace.";

  const handleCall = () => {
    window.location.href = `tel:${cleanPhone}`;
  };

  const handleWhatsApp = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  if (variant === "compact") {
    return (
      <div className={cn("flex gap-2", className)}>
        <Button
          onClick={handleCall}
          size="icon"
          variant="outline"
          className="bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-600"
          aria-label="Call"
        >
          <Phone className="h-4 w-4" />
        </Button>
        <Button
          onClick={handleWhatsApp}
          size="icon"
          variant="outline"
          className="bg-green-50 border-green-200 hover:bg-green-100 text-green-600"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col sm:flex-row gap-3", className)}>
      <Button
        onClick={handleCall}
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-12"
      >
        <Phone className="mr-2 h-5 w-5" />
        Call Now
      </Button>
      <Button
        onClick={handleWhatsApp}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white h-12"
      >
        <MessageCircle className="mr-2 h-5 w-5" />
        WhatsApp
      </Button>
    </div>
  );
}
