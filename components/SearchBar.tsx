"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
  className?: string;
  onSearch?: (filters: any) => void;
}

export function SearchBar({ className, onSearch }: SearchBarProps) {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const filters = {
      location: location || undefined,
      type: type || undefined,
      status: status || undefined,
    };

    if (onSearch) {
      onSearch(filters);
    } else {
      // Navigate to listings page with filters
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });
      router.push(`/listings?${params.toString()}`);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Location (City, State)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 text-black"
          />
        </div>

        <Select
          value={type}
          onValueChange={(value) => setType(value === "all-types" ? "" : value)}
        >
          <SelectTrigger style={{ color: "black" }}>
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent style={{ color: "black" }}>
            <SelectItem value="all-types">All Types</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="office">Office</SelectItem>
            <SelectItem value="land">Land</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={status}
          onValueChange={(value) =>
            setStatus(value === "all-status" ? "" : value)
          }
        >
          <SelectTrigger style={{ color: "black" }}>
            <SelectValue placeholder="For Sale or Rent" />
          </SelectTrigger>
          <SelectContent style={{ color: "black" }}>
            <SelectItem value="all-status">All</SelectItem>
            <SelectItem value="for-sale">For Sale</SelectItem>
            <SelectItem value="for-rent">For Rent</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSearch} className="w-full">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
    </div>
  );
}
