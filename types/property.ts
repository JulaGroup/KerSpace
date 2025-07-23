export interface Property {
  _id: string;
  title: string;
  description?: string;
  price?: number;
  size?: number;
  bedrooms?: number;
  bathrooms?: number;
  type: "house" | "apartment" | "office" | "land";
  status: "for-sale" | "for-rent";
  location: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    coordinates?: {
      lat?: number;
      lng?: number;
    };
    phone?: string;
  };
  images?: string[];
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PropertyFilters {
  priceMin?: number;
  priceMax?: number;
  sizeMin?: number;
  sizeMax?: number;
  bedrooms?: number;
  bathrooms?: number;
  type?: Property["type"];
  status?: Property["status"];
  location?: string;
}
