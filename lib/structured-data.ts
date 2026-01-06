import { Property } from "@/types/property";

/**
 * Generates JSON-LD structured data for a property listing
 * This helps search engines understand your content better
 */
export function generatePropertyStructuredData(property: Property) {
  const currencyMap = {
    GMD: "GMD",
    USD: "USD",
    GBP: "GBP",
  };

  return {
    "@context": "https://schema.org",
    "@type": property.type === "apartment" ? "Apartment" : "House",
    name: property.title,
    description: property.description,
    image: property.images || [],
    address: {
      "@type": "PostalAddress",
      streetAddress: property.location.address,
      addressLocality: property.location.city,
      addressRegion: property.location.state,
      addressCountry: property.location.country || "The Gambia",
    },
    geo: property.location.coordinates
      ? {
          "@type": "GeoCoordinates",
          latitude: property.location.coordinates.lat,
          longitude: property.location.coordinates.lng,
        }
      : undefined,
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: currencyMap[property.currency || "GMD"],
      availability: property.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceValidUntil: new Date(
        Date.now() + 90 * 24 * 60 * 60 * 1000
      ).toISOString(), // 90 days
      seller: {
        "@type": "Organization",
        name: "KërSpace",
      },
    },
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.size,
      unitCode: "MTK", // square meters
    },
  };
}

/**
 * Generates breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generates organization structured data
 */
export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "KërSpace",
    description:
      "The Gambia's trusted property hub to buy, rent, sell, and invest in homes, apartments, offices, and land.",
    url: "https://kerspace.gm",
    logo: "https://kerspace.gm/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+220-759-5999",
      contactType: "Customer Service",
      areaServed: "GM",
      availableLanguage: ["English"],
    },
    sameAs: [
      "https://twitter.com/kerspacegm",
      "https://facebook.com/kerspace",
      "https://instagram.com/kerspacegm",
    ],
  };
}
