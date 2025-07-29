"use client";

import { useState } from "react";
import { useFavorites } from "@/contexts/FavoritesContext";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types/property";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Bed, Bath, Square, MapPin, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  showApprovalStatus?: boolean;
}

export function PropertyCard({
  property,
  showApprovalStatus = false,
}: PropertyCardProps) {
  const { isFavorite } = useFavorites();
  // Remove local isLiked state
  const [imageLoaded, setImageLoaded] = useState(false);
  // Check if user is logged in
  let isAuthenticated = false;
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    isAuthenticated = !!token;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-Uk", {
      style: "currency",
      currency: "GMD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = () => {
    // Show Sold, Fully Booked, or Available
    if (property.type === "apartment") {
      if (property.availableUnits === 0) {
        return (
          <Badge className="absolute top-3 left-3 z-10 bg-red-600 hover:bg-red-700 text-white">
            Fully Booked
          </Badge>
        );
      } else {
        return (
          <Badge className="absolute top-3 left-3 z-10 bg-green-600 hover:bg-green-700 text-white">{`Available Units: ${
            property.availableUnits ?? "-"
          }`}</Badge>
        );
      }
    } else if (property.available === false) {
      return (
        <Badge className="absolute top-3 left-3 z-10 bg-red-600 hover:bg-red-700 text-white">
          Sold / Unavailable
        </Badge>
      );
    } else {
      // For non-apartment: show both availability and status badges side by side
      const isForSale = property.status === "for-sale";
      return (
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          <Badge
            className={cn(
              isForSale
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            )}
          >
            {isForSale ? "For Sale" : "For Rent"}
          </Badge>
          <Badge className="bg-green-600 hover:bg-green-700 text-white">
            Available
          </Badge>
        </div>
      );
    }
  };

  return (
    <Link href={`/property/${property._id}`} className="block">
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <div className="relative h-64 overflow-hidden">
          {getStatusBadge()}

          {isAuthenticated && (
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/90 hover:bg-white",
                showApprovalStatus && "right-20"
              )}
              onClick={(e) => {
                e.preventDefault();
                // You can add favorite/unfavorite logic here if needed
              }}
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isFavorite(property._id)
                    ? "fill-red-500 text-red-500"
                    : "text-gray-600"
                )}
              />
            </Button>
          )}

          <div className="relative h-full w-full">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <Image
              src={property.images![0]}
              alt={property.title}
              fill
              className={cn(
                "object-cover transition-transform duration-300 group-hover:scale-105",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                {property.title}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="line-clamp-1">
                  {property.location.address}, {property.location.city}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-blue-600">
                {formatPrice(property.price!)}
                {property.status === "for-rent" && (
                  <span className="text-sm font-normal text-gray-500">
                    /month
                  </span>
                )}
              </div>
              {property.featured && (
                <Badge variant="outline" className="text-xs">
                  Featured
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              {property.bedrooms! > 0 && (
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  <span>{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms! > 0 && (
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  <span>{property.bathrooms}</span>
                </div>
              )}
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{property.size} m²</span>
              </div>
              {/* Apartment unit info */}
              {property.type === "apartment" && (
                <>
                  <div className="flex items-center">
                    <span className="font-semibold text-blue-700 ml-2">
                      Units: {property.totalUnits ?? "-"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-green-700 ml-2">
                      Available: {property.availableUnits ?? "-"}
                    </span>
                  </div>
                </>
              )}
            </div>

            <p className="text-sm text-gray-600 line-clamp-2">
              {property.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
