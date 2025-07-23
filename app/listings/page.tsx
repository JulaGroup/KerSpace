"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Property, PropertyFilters } from "@/types/property";
import { Filter, Search, MapPin, SlidersHorizontal } from "lucide-react";
import axios from "axios";

// Moved FilterSidebar outside to keep the main component cleaner
const FilterSidebar = ({
  filters,
  updateFilter,
  clearFilters,
  activeFilterCount,
}: {
  filters: PropertyFilters;
  updateFilter: (key: keyof PropertyFilters, value: any) => void;
  clearFilters: () => void;
  activeFilterCount: number;
}) => (
  <div className="bg-white rounded-xl shadow-lg p-5 mb-6 border border-gray-100">
    <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center">
      <Filter className="mr-3 h-5 w-5 text-gray-700" />
      Refine Your Search
      {activeFilterCount > 0 && (
        <Badge className="ml-3 px-3 py-1 text-sm font-medium rounded-full bg-blue-500 text-white">
          {activeFilterCount}
        </Badge>
      )}
    </h2>
    {/* Main filter row for large screens */}
    <div className="hidden lg:flex items-end flex-wrap justify-between gap-x-8 gap-y-4">
      {/* Location */}
      <div className="flex-1 min-w-[160px] space-y-1">
        {" "}
        {/* flex-1 to allow it to grow, min-w to ensure readability */}
        <Label htmlFor="location" className="text-sm font-medium text-gray-700">
          Location
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="location"
            placeholder="City, State, or Address"
            value={filters.location || ""}
            onChange={(e) => updateFilter("location", e.target.value)}
            className="pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 w-full"
          />
        </div>
      </div>

      {/* Type */}
      <div className="flex-1 min-w-[140px] space-y-1">
        <Label className="text-sm font-medium text-gray-700">
          Property Type
        </Label>
        <Select
          value={filters.type || "all-types"}
          onValueChange={(value) =>
            updateFilter("type", value === "all-types" ? undefined : value)
          }
        >
          <SelectTrigger className="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 text-sm">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-types">All Types</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="office">Office</SelectItem>
            <SelectItem value="land">Land</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div className="flex-1 min-w-[120px] space-y-1">
        <Label className="text-sm font-medium text-gray-700">Status</Label>
        <Select
          value={filters.status || "all-status"}
          onValueChange={(value) =>
            updateFilter("status", value === "all-status" ? undefined : value)
          }
        >
          <SelectTrigger className="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 text-sm">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-status">All</SelectItem>
            <SelectItem value="for-sale">For Sale</SelectItem>
            <SelectItem value="for-rent">For Rent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bedrooms */}
      <div className="flex-1 min-w-[100px] space-y-1">
        <Label className="text-sm font-medium text-gray-700">Bedrooms</Label>
        <Select
          value={filters.bedrooms?.toString() || "any"}
          onValueChange={(value) =>
            updateFilter(
              "bedrooms",
              value === "any" ? undefined : Number(value)
            )
          }
        >
          <SelectTrigger className="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 text-sm">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bathrooms */}
      <div className="flex-1 min-w-[100px] space-y-1">
        <Label className="text-sm font-medium text-gray-700">Bathrooms</Label>
        <Select
          value={filters.bathrooms?.toString() || "any"}
          onValueChange={(value) =>
            updateFilter(
              "bathrooms",
              value === "any" ? undefined : Number(value)
            )
          }
        >
          <SelectTrigger className="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 text-sm">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="flex-1 min-w-[180px]">
        {" "}
        {/* Adjusted min-width for the pair */}
        <div className="space-y-1">
          <Label
            htmlFor="priceMin"
            className="text-sm font-medium text-gray-700"
          >
            Price Range
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {" "}
            {/* Internal grid for min/max */}
            <Input
              id="priceMin"
              type="number"
              placeholder="Min"
              value={filters.priceMin || ""}
              onChange={(e) =>
                updateFilter("priceMin", Number(e.target.value) || undefined)
              }
              className="border w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 text-sm"
            />
            <Input
              id="priceMax"
              type="number"
              placeholder="Max"
              value={filters.priceMax || ""}
              onChange={(e) =>
                updateFilter("priceMax", Number(e.target.value) || undefined)
              }
              className="border w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Size Range */}
      <div className="flex-1 min-w-[180px]">
        {" "}
        {/* Adjusted min-width for the pair */}
        <div className="space-y-1">
          <Label
            htmlFor="sizeMin"
            className="text-sm font-medium text-gray-700"
          >
            Size (m²)
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {" "}
            {/* Internal grid for min/max */}
            <Input
              id="sizeMin"
              type="number"
              placeholder="Min"
              value={filters.sizeMin || ""}
              onChange={(e) =>
                updateFilter("sizeMin", Number(e.target.value) || undefined)
              }
              className="border w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 text-sm"
            />
            <Input
              id="sizeMax"
              type="number"
              placeholder="Max"
              value={filters.sizeMax || ""}
              onChange={(e) =>
                updateFilter("sizeMax", Number(e.target.value) || undefined)
              }
              className="border w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="pt-5">
        {" "}
        {/* Aligns the clear button with the bottom of inputs */}
        <Button
          variant="outline"
          onClick={clearFilters}
          className="rounded-full text-sm px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 h-9"
        >
          Clear Filters
        </Button>
      </div>
    </div>

    {/* Mobile/Tablet Filter Grid (original structure, hidden on large screens) */}
    <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      {/* Location */}
      <div className="space-y-1">
        <Label htmlFor="location" className="text-sm font-medium text-gray-700">
          Location
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="location"
            placeholder="City, State, or Address"
            value={filters.location || ""}
            onChange={(e) => updateFilter("location", e.target.value)}
            className="pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 w-full"
          />
        </div>
      </div>

      {/* Type */}
      <div className="space-y-1">
        <Label className="text-sm font-medium text-gray-700">
          Property Type
        </Label>
        <Select
          value={filters.type || "all-types"}
          onValueChange={(value) =>
            updateFilter("type", value === "all-types" ? undefined : value)
          }
        >
          <SelectTrigger className="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 text-sm">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-types">All Types</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="office">Office</SelectItem>
            <SelectItem value="land">Land</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div className="space-y-1">
        <Label className="text-sm font-medium text-gray-700">Status</Label>
        <Select
          value={filters.status || "all-status"}
          onValueChange={(value) =>
            updateFilter("status", value === "all-status" ? undefined : value)
          }
        >
          <SelectTrigger className="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 text-sm">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-status">All</SelectItem>
            <SelectItem value="for-sale">For Sale</SelectItem>
            <SelectItem value="for-rent">For Rent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bedrooms */}
      <div className="space-y-1">
        <Label className="text-sm font-medium text-gray-700">Bedrooms</Label>
        <Select
          value={filters.bedrooms?.toString() || "any"}
          onValueChange={(value) =>
            updateFilter(
              "bedrooms",
              value === "any" ? undefined : Number(value)
            )
          }
        >
          <SelectTrigger className="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 text-sm">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bathrooms */}
      <div className="space-y-1">
        <Label className="text-sm font-medium text-gray-700">Bathrooms</Label>
        <Select
          value={filters.bathrooms?.toString() || "any"}
          onValueChange={(value) =>
            updateFilter(
              "bathrooms",
              value === "any" ? undefined : Number(value)
            )
          }
        >
          <SelectTrigger className="w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 text-sm">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-1">
        <Label htmlFor="priceMin" className="text-sm font-medium text-gray-700">
          Min Price
        </Label>
        <Input
          id="priceMin"
          type="number"
          placeholder="0"
          value={filters.priceMin || ""}
          onChange={(e) =>
            updateFilter("priceMin", Number(e.target.value) || undefined)
          }
          className="border w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 text-sm"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="priceMax" className="text-sm font-medium text-gray-700">
          Max Price
        </Label>
        <Input
          id="priceMax"
          type="number"
          placeholder="Any"
          value={filters.priceMax || ""}
          onChange={(e) =>
            updateFilter("priceMax", Number(e.target.value) || undefined)
          }
          className="border w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 text-sm"
        />
      </div>

      {/* Size Range */}
      <div className="space-y-1">
        <Label htmlFor="sizeMin" className="text-sm font-medium text-gray-700">
          Min Size (m²)
        </Label>
        <Input
          id="sizeMin"
          type="number"
          placeholder="0"
          value={filters.sizeMin || ""}
          onChange={(e) =>
            updateFilter("sizeMin", Number(e.target.value) || undefined)
          }
          className="border w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 text-sm"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="sizeMax" className="text-sm font-medium text-gray-700">
          Max Size (m²)
        </Label>
        <Input
          id="sizeMax"
          type="number"
          placeholder="Any"
          value={filters.sizeMax || ""}
          onChange={(e) =>
            updateFilter("sizeMax", Number(e.target.value) || undefined)
          }
          className="border w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 text-sm"
        />
      </div>
    </div>
    {/* Clear Filters Button for smaller screens, outside the main filter row */}
    <div className="mt-6 flex justify-end lg:hidden">
      <Button
        variant="outline"
        onClick={clearFilters}
        className="rounded-full text-sm px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 h-9"
      >
        Clear Filters
      </Button>
    </div>
  </div>
);

export default function ListingsPage() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/properties");
        const data = res.data;
        setProperties(data);
      } catch (err) {
        setProperties([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();

    const initialFilters: PropertyFilters = {};
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const location = searchParams.get("location");

    if (type) initialFilters.type = type as Property["type"];
    if (status) initialFilters.status = status as Property["status"];
    if (location) initialFilters.location = location;

    setFilters(initialFilters);
  }, [searchParams]);

  useEffect(() => {
    let filtered = properties;
    if (filters.type) {
      filtered = filtered.filter((p) => p.type === filters.type);
    }
    if (filters.status) {
      filtered = filtered.filter((p) => p.status === filters.status);
    }
    if (filters.location) {
      filtered = filtered.filter(
        (p) =>
          p.location
            .city!.toLowerCase()
            .includes(filters.location!.toLowerCase()) ||
          p.location
            .state!.toLowerCase()
            .includes(filters.location!.toLowerCase()) ||
          p.location
            .address!.toLowerCase()
            .includes(filters.location!.toLowerCase())
      );
    }
    if (filters.priceMin) {
      filtered = filtered.filter((p) => p.price! >= filters.priceMin!);
    }
    if (filters.priceMax) {
      filtered = filtered.filter((p) => p.price! <= filters.priceMax!);
    }
    if (filters.sizeMin) {
      filtered = filtered.filter((p) => p.size! >= filters.sizeMin!);
    }
    if (filters.sizeMax) {
      filtered = filtered.filter((p) => p.size! <= filters.sizeMax!);
    }
    if (filters.bedrooms) {
      filtered = filtered.filter((p) => p.bedrooms! >= filters.bedrooms!);
    }
    if (filters.bathrooms) {
      filtered = filtered.filter((p) => p.bathrooms! >= filters.bathrooms!);
    }
    setFilteredProperties(filtered);
  }, [properties, filters]);

  const updateFilter = (key: keyof PropertyFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 mt-11 flex items-center justify-center">
        <Header />
        <div className="text-center text-lg text-gray-600">
          Loading listings...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-11">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-10">
        {" "}
        {/* Adjusted pt-12 to pt-10 */}
        {/* Header Section */}
        <div className="mb-7">
          {" "}
          {/* Adjusted mb-8 to mb-7 */}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            {" "}
            {/* Adjusted mb-4 to mb-3 */}
            Discover Your Dream Property ✨
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-600 text-lg mb-4 sm:mb-0">
              Found{" "}
              <span className="font-semibold text-blue-600">
                {filteredProperties.length}
              </span>{" "}
              properties matching your criteria.
            </p>

            {/* Mobile Filter Button */}
            <div className="lg:hidden">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 px-5 py-2 rounded-full text-gray-700 border-gray-300 hover:bg-gray-50 transition-colors h-9"
                  >
                    {" "}
                    {/* Adjusted py-3 to py-2, added h-9 */}
                    <SlidersHorizontal className="h-5 w-5" />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                      <Badge className="ml-2 h-6 w-6 flex items-center justify-center p-0 text-xs bg-blue-500 text-white rounded-full">
                        {activeFilterCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 sm:w-96">
                  <SheetHeader>
                    <SheetTitle>Refine Your Search</SheetTitle>
                    <SheetDescription>
                      Adjust the filters to find the perfect property.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar
                      filters={filters}
                      updateFilter={updateFilter}
                      clearFilters={clearFilters}
                      activeFilterCount={activeFilterCount}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        {/* Main Content Layout */}
        <div className="flex flex-col gap-8">
          {" "}
          {/* Adjusted gap from 10 to 8 */}
          {/* Filter Bar (for larger screens, now above listings) */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              updateFilter={updateFilter}
              clearFilters={clearFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>
          {/* Property Grid */}
          <div>
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-10 text-center border border-gray-100">
                {" "}
                {/* Reduced p-12 to p-10 */}
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  No properties found
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  It looks like there are no properties matching your current
                  filters.
                </p>
                <Button
                  onClick={clearFilters}
                  className="px-8 py-3 rounded-full text-blue-600 border border-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
