"use client";
import { API_URL } from "@/config/constat";
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
import { SkeletonPropertyCard } from "@/components/dashboard/SkeletonPropertyCard";

// Moved FilterSidebar outside to keep the main component cleaner
const FilterSidebar = ({
  filters,
  updateFilter,
  clearFilters,
  activeFilterCount,
  applyFilters,
}: {
  filters: PropertyFilters;
  updateFilter: (key: keyof PropertyFilters, value: any) => void;
  clearFilters: () => void;
  activeFilterCount: number;
  applyFilters: () => void;
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
        {/* ...existing code... */}
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
      {filters.type !== "land" && (
        <>
          {/* Status */}
          <div className="flex-1 min-w-[120px] space-y-1">
            <Label className="text-sm font-medium text-gray-700">Status</Label>
            <Select
              value={filters.status || "all-status"}
              onValueChange={(value) =>
                updateFilter(
                  "status",
                  value === "all-status" ? undefined : value
                )
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
        </>
      )}
      {/* Hide Bedrooms and Bathrooms if type is 'land' or 'office' */}
      {filters.type !== "land" && filters.type !== "office" && (
        <>
          {/* Bedrooms */}
          <div className="flex-1 min-w-[100px] space-y-1">
            <Label className="text-sm font-medium text-gray-700">
              Bedrooms
            </Label>
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
            <Label className="text-sm font-medium text-gray-700">
              Bathrooms
            </Label>
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
        </>
      )}
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

      {/* Price Range */}
      <div className="flex-1 min-w-[180px]">
        <div className="space-y-1">
          <Label
            htmlFor="priceMin"
            className="text-sm font-medium text-gray-700"
          >
            Price Range (GMD)
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              id="priceMin"
              type="text"
              placeholder="Min"
              value={
                filters.priceMin !== undefined
                  ? Number(filters.priceMin).toLocaleString()
                  : ""
              }
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, "");
                const num = Number(raw);
                updateFilter("priceMin", isNaN(num) ? undefined : num);
              }}
              className="border w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 text-sm"
            />
            <Input
              id="priceMax"
              type="text"
              placeholder="Max"
              value={
                filters.priceMax !== undefined
                  ? Number(filters.priceMax).toLocaleString()
                  : ""
              }
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, "");
                const num = Number(raw);
                updateFilter("priceMax", isNaN(num) ? undefined : num);
              }}
              className="border w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-5 flex gap-3">
        <Button
          variant="default"
          onClick={applyFilters}
          disabled={Object.values(filters).filter(Boolean).length === 0}
          className="rounded-full text-sm px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 h-9"
        >
          Search
        </Button>
        <Button
          variant="outline"
          onClick={clearFilters}
          className="rounded-full text-sm px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 h-9"
        >
          Clear Filters
        </Button>
      </div>
    </div>

    {/* Mobile/Tablet Filter Sidebar (scrollable) */}
    <div className="lg:hidden overflow-y-auto flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 flex-1 overflow-y-auto">
        {/* Location */}
        <div className="space-y-1">
          <Label
            htmlFor="location"
            className="text-sm font-medium text-gray-700"
          >
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
        {/* Property Type */}
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
        {filters.type !== "land" && (
          <div className="space-y-1">
            <Label className="text-sm font-medium text-gray-700">Status</Label>
            <Select
              value={filters.status || "all-status"}
              onValueChange={(value) =>
                updateFilter(
                  "status",
                  value === "all-status" ? undefined : value
                )
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
        )}
        {/* Bedrooms & Bathrooms */}
        {filters.type !== "land" && filters.type !== "office" && (
          <>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-700">
                Bedrooms
              </Label>
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
            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-700">
                Bathrooms
              </Label>
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
          </>
        )}
        {/* Size Range */}
        <div className="space-y-1">
          <Label
            htmlFor="sizeMin"
            className="text-sm font-medium text-gray-700"
          >
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
          <Label
            htmlFor="sizeMax"
            className="text-sm font-medium text-gray-700"
          >
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
        {/* Price Range */}
        <div className="space-y-1">
          <Label
            htmlFor="priceMin"
            className="text-sm font-medium text-gray-700"
          >
            Min Price (GMD)
          </Label>
          <Input
            id="priceMin"
            type="text"
            placeholder="0"
            value={
              filters.priceMin !== undefined
                ? Number(filters.priceMin).toLocaleString()
                : ""
            }
            onChange={(e) => {
              const raw = e.target.value.replace(/,/g, "");
              const num = Number(raw);
              updateFilter("priceMin", isNaN(num) ? undefined : num);
            }}
            className="border w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label
            htmlFor="priceMax"
            className="text-sm font-medium text-gray-700"
          >
            Max Price (GMD)
          </Label>
          <Input
            id="priceMax"
            type="text"
            placeholder="Any"
            value={
              filters.priceMax !== undefined
                ? Number(filters.priceMax).toLocaleString()
                : ""
            }
            onChange={(e) => {
              const raw = e.target.value.replace(/,/g, "");
              const num = Number(raw);
              updateFilter("priceMax", isNaN(num) ? undefined : num);
            }}
            className="border w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-9 text-sm"
          />
        </div>
      </div>
      {/* Action Buttons for smaller screens */}
      <div className="mt-6 flex gap-3 justify-end">
        <Button
          variant="default"
          onClick={applyFilters}
          disabled={Object.values(filters).filter(Boolean).length === 0}
          className="rounded-full text-sm px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 h-9"
        >
          Search
        </Button>
        <Button
          variant="outline"
          onClick={clearFilters}
          className="rounded-full text-sm px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 h-9"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  </div>
);

export default function ListingsPage() {
  const searchParams = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<PropertyFilters | null>(null); // Used for actual search
  const [pendingFilters, setPendingFilters] = useState<PropertyFilters>({}); // Used for form inputs
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (filters === null) return; // Don't fetch on initial mount
    async function fetchFilteredProperties() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        Object.entries(filters ?? {}).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "")
            params.set(key, value.toString());
        });
        const url = `${API_URL}/api/properties/search?${params.toString()}`;
        console.log("Fetching:", url);
        const res = await axios.get(url);
        console.log("Response:", res.data);
        setFilteredProperties(res.data);
      } catch (err) {
        setFilteredProperties([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFilteredProperties();
  }, [filters]);

  useEffect(() => {
    const initialFilters: PropertyFilters = {};
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const location = searchParams.get("location");
    const bedrooms = searchParams.get("bedrooms");
    const bathrooms = searchParams.get("bathrooms");
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const sizeMin = searchParams.get("sizeMin");
    const sizeMax = searchParams.get("sizeMax");

    if (type) initialFilters.type = type as Property["type"];
    if (status) initialFilters.status = status as Property["status"];
    if (location) initialFilters.location = location;
    if (bedrooms) initialFilters.bedrooms = Number(bedrooms);
    if (bathrooms) initialFilters.bathrooms = Number(bathrooms);
    if (priceMin) initialFilters.priceMin = Number(priceMin);
    if (priceMax) initialFilters.priceMax = Number(priceMax);
    if (sizeMin) initialFilters.sizeMin = Number(sizeMin);
    if (sizeMax) initialFilters.sizeMax = Number(sizeMax);

    // Only trigger search if there are query params
    const hasQuery =
      type ||
      status ||
      location ||
      bedrooms ||
      bathrooms ||
      priceMin ||
      priceMax ||
      sizeMin ||
      sizeMax;

    setPendingFilters(initialFilters); // always sync form

    // Set filters for search or default fetch
    if (hasQuery) {
      setFilters(initialFilters); // triggers search with filters
    } else {
      setFilters({}); // triggers default fetch (all properties)
    }
  }, [searchParams]);

  // Update pendingFilters on input change
  const updatePendingFilter = (key: keyof PropertyFilters, value: any) => {
    setPendingFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  // When Search button is clicked, update filters (triggers search)
  const applyFilters = () => {
    setFilters(pendingFilters);
    setIsFilterOpen(false); // Close mobile filter sidebar after search
  };

  const clearFilters = () => {
    setPendingFilters({});
    setFilters({}); // Fetch all properties after clearing filters
  };

  const activeFilterCount =
    Object.values(pendingFilters).filter(Boolean).length;

  // Skeleton grid for loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 mt-11">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-10">
          <div className="mb-7">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
              Discover Your Dream Property ✨
            </h1>
          </div>
          <div className="flex flex-col gap-8">
            <div className="hidden lg:block">
              <FilterSidebar
                filters={pendingFilters}
                updateFilter={updatePendingFilter}
                clearFilters={clearFilters}
                activeFilterCount={activeFilterCount}
                applyFilters={applyFilters}
              />
            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonPropertyCard key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pass pendingFilters and updatePendingFilter to FilterSidebar
  return (
    <div className="min-h-screen bg-gray-50 mt-11">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-10">
        {/* Header Section */}
        <div className="mb-7">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Discover Your Dream Property ✨
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-600 text-lg mb-4 sm:mb-0">
              Found{" "}
              <span className="font-semibold text-blue-600">
                {filteredProperties.length}
              </span>
              {activeFilterCount > 0
                ? " properties matching your criteria."
                : " properties available."}
            </p>
            {/* Mobile Filter Button */}
            <div className="lg:hidden">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 px-5 py-2 rounded-full text-gray-700 border-gray-300 hover:bg-gray-50 transition-colors h-9"
                  >
                    <SlidersHorizontal className="h-5 w-5" />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                      <Badge className="ml-2 h-6 w-6 flex items-center justify-center p-0 text-xs bg-blue-500 text-white rounded-full">
                        {activeFilterCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-80 sm:w-96 h-full overflow-y-auto"
                >
                  <SheetHeader>
                    <SheetTitle>Refine Your Search</SheetTitle>
                    <SheetDescription>
                      Adjust the filters to find the perfect property.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar
                      filters={pendingFilters}
                      updateFilter={updatePendingFilter}
                      clearFilters={clearFilters}
                      activeFilterCount={activeFilterCount}
                      applyFilters={applyFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        {/* Main Content Layout */}
        <div className="flex flex-col gap-8">
          {/* Filter Bar (for larger screens, now above listings) */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={pendingFilters}
              updateFilter={updatePendingFilter}
              clearFilters={clearFilters}
              activeFilterCount={activeFilterCount}
              applyFilters={applyFilters}
            />
          </div>
          {/* Property Grid */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonPropertyCard key={i} />
                  ))
                : filteredProperties.length > 0
                ? filteredProperties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))
                : null}
            </div>
            {!loading && filteredProperties.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-10 text-center border border-gray-100 mt-8">
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
