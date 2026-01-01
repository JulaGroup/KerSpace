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
  viewMode?: "grid" | "list";
}

export function PropertyCard({
  property,
  showApprovalStatus = false,
  viewMode = "grid",
}: PropertyCardProps) {
  const { isFavorite } = useFavorites();
  const [imageLoaded, setImageLoaded] = useState(false);

  let isAuthenticated = false;
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    isAuthenticated = !!token;
  }

  const formatPrice = (price: number, currency: string = "GMD") => {
    const currencySymbols: Record<string, string> = {
      GMD: "D",
      USD: "$",
      GBP: "£",
    };
    const symbol = currencySymbols[currency] || "D";
    return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
  };

  const getStatusBadge = () => {
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
      <Card
        className={cn(
          "group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm",
          viewMode === "list"
            ? "flex flex-row h-32 hover:shadow-2xl hover:bg-white/95"
            : "hover:-translate-y-1 h-auto"
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden",
            viewMode === "list"
              ? "w-48 h-full flex-shrink-0 rounded-l-xl"
              : "h-64 rounded-t-xl"
          )}
        >
          {getStatusBadge()}

          {isAuthenticated && (
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "absolute z-10 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-sm",
                viewMode === "list" ? "bottom-2 left-2" : "top-2 right-2",
                showApprovalStatus && viewMode !== "list" && "right-16"
              )}
              onClick={(e) => {
                e.preventDefault();
                // favorite toggle logic placeholder
              }}
            >
              <Heart
                className={cn(
                  "h-5 w-5",
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
                imageLoaded ? "opacity-100" : "opacity-0",
                viewMode === "list" ? "rounded-l-xl" : "rounded-t-xl"
              )}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <CardContent
          className={cn(
            viewMode === "list"
              ? "flex-1 p-4 flex flex-col justify-between min-w-0"
              : "p-4"
          )}
        >
          {viewMode === "list" ? (
            <div className="flex flex-col justify-between h-full py-1">
              {/* Top: Title, Location, Price (stack on mobile) */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
                <div className="flex-1 min-w-0 pr-0 sm:pr-3">
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-1 mb-1">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="line-clamp-1">
                      {property.location.address}, {property.location.city}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-start sm:items-end">
                  <div className="text-base sm:text-lg font-bold text-blue-600 whitespace-nowrap">
                    {formatPrice(property.price!, property.currency || "GMD")}
                    {property.status === "for-rent" && (
                      <span className="text-[10px] font-normal text-gray-500 block">
                        /month
                      </span>
                    )}
                  </div>
                  {property.featured && (
                    <Badge variant="outline" className="text-[10px] mt-1">
                      Featured
                    </Badge>
                  )}
                </div>
              </div>

              {/* Bottom: Details */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex flex-wrap items-center space-x-2 text-sm text-gray-600">
                  {property.bedrooms! > 0 && (
                    <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
                      <Bed className="h-3.5 w-3.5 mr-1" />
                      <span className="font-medium">{property.bedrooms}</span>
                    </div>
                  )}
                  {property.bathrooms! > 0 && (
                    <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
                      <Bath className="h-3.5 w-3.5 mr-1" />
                      <span className="font-medium">{property.bathrooms}</span>
                    </div>
                  )}
                  <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
                    <Square className="h-3.5 w-3.5 mr-1" />
                    <span className="font-medium">{property.size} m²</span>
                  </div>
                </div>

                {property.type === "apartment" && (
                  <div className="flex flex-wrap items-center space-x-2 text-xs mt-2 sm:mt-0">
                    <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg font-medium">
                      Total: {property.totalUnits ?? "-"}
                    </div>
                    <div className="bg-green-50 text-green-700 px-2 py-1 rounded-lg font-medium">
                      Available: {property.availableUnits ?? "-"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
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
                  {formatPrice(property.price!, property.currency || "GMD")}
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
                {property.type === "apartment" && (
                  <>
                    {/* <div className="flex items-center">
                      <span className="font-semibold text-blue-700 ml-2">
                        Units: {property.totalUnits ?? "-"}
                      </span>
                    </div> */}
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
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
