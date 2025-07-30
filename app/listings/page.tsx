"use client";
import { API_URL } from "@/config/constat";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import { Property, PropertyFilters } from "@/types/property";
import {
  Filter,
  Search,
  MapPin,
  SlidersHorizontal,
  X,
  Home,
  Building,
  ArrowRight,
  Sparkles,
  Grid3X3,
  List,
  TrendingUp,
} from "lucide-react";
import axios from "axios";
import { SkeletonPropertyCard } from "@/components/dashboard/SkeletonPropertyCard";

type FilterSidebarProps = {
  filters: PropertyFilters;
  updateFilter: (key: keyof PropertyFilters, value: any) => void;
  clearFilters: () => void;
  activeFilterCount: number;
  applyFilters: () => void;
  isMobile?: boolean;
};

export const FilterSidebar = ({
  filters,
  updateFilter,
  clearFilters,
  activeFilterCount,
  applyFilters,
  isMobile = false,
}: FilterSidebarProps) => {
  const inputSizeClass =
    "border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm h-9";

  const renderSelect = (
    label: string,
    value: any,
    onChange: (value: string) => void,
    placeholder: string,
    options: { label: string; value: string }[]
  ) => (
    <div className="flex-1 min-w-[120px] space-y-1">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={inputSizeClass}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-5 border border-gray-100 ${
        isMobile ? "" : "mb-6"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="mr-2 h-5 w-5 text-gray-700" />
          Refine Your Search
        </h2>
        {activeFilterCount > 0 && (
          <Badge className="px-3 py-1 text-sm rounded-full bg-blue-600 text-white">
            {activeFilterCount} Active
          </Badge>
        )}
      </div>

      {/* Filters Grid */}
      <div
        className={`${
          isMobile
            ? "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
            : "hidden lg:flex items-end flex-wrap gap-6"
        }`}
      >
        {/* Location */}
        <div className="flex-1 min-w-[160px] space-y-1">
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
              placeholder="City, Area, or Landmark"
              value={filters.location || ""}
              onChange={(e) => updateFilter("location", e.target.value)}
              className={`pl-10 ${inputSizeClass} w-full`}
            />
          </div>
        </div>

        {/* Type */}
        {renderSelect(
          "Property Type",
          filters.type || "all-types",
          (value) =>
            updateFilter("type", value === "all-types" ? undefined : value),
          "All Types",
          [
            { label: "All Types", value: "all-types" },
            { label: "House", value: "house" },
            { label: "Apartment", value: "apartment" },
            { label: "Office", value: "office" },
            { label: "Land", value: "land" },
          ]
        )}

        {/* Status */}
        {filters.type !== "land" &&
          renderSelect(
            "Status",
            filters.status || "all-status",
            (value) =>
              updateFilter(
                "status",
                value === "all-status" ? undefined : value
              ),
            "All Status",
            [
              { label: "All", value: "all-status" },
              { label: "For Sale", value: "for-sale" },
              { label: "For Rent", value: "for-rent" },
            ]
          )}

        {/* Bedrooms */}
        {filters.type !== "land" &&
          filters.type !== "office" &&
          renderSelect(
            "Bedrooms",
            filters.bedrooms?.toString() || "any",
            (value) =>
              updateFilter(
                "bedrooms",
                value === "any" ? undefined : Number(value)
              ),
            "Any",
            ["any", "1", "2", "3", "4"].map((val) => ({
              label: val === "any" ? "Any" : `${val}+`,
              value: val,
            }))
          )}

        {/* Bathrooms */}
        {filters.type !== "land" &&
          filters.type !== "office" &&
          renderSelect(
            "Bathrooms",
            filters.bathrooms?.toString() || "any",
            (value) =>
              updateFilter(
                "bathrooms",
                value === "any" ? undefined : Number(value)
              ),
            "Any",
            ["any", "1", "2", "3", "4"].map((val) => ({
              label: val === "any" ? "Any" : `${val}+`,
              value: val,
            }))
          )}

        {/* Size Range */}
        <div className="flex-1 min-w-[180px] space-y-1">
          <Label className="text-sm font-medium text-gray-700">Size (m²)</Label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Min"
              value={filters.sizeMin || ""}
              onChange={(e) =>
                updateFilter("sizeMin", Number(e.target.value) || undefined)
              }
              className={inputSizeClass}
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.sizeMax || ""}
              onChange={(e) =>
                updateFilter("sizeMax", Number(e.target.value) || undefined)
              }
              className={inputSizeClass}
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="flex-1 min-w-[180px] space-y-1">
          <Label className="text-sm font-medium text-gray-700">
            Price (GMD)
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <Input
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
              className={inputSizeClass}
            />
            <Input
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
              className={inputSizeClass}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-3 justify-end">
        <Button
          onClick={applyFilters}
          disabled={Object.values(filters).filter(Boolean).length === 0}
          className="rounded-full text-sm px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 h-9"
        >
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
        <Button
          variant="outline"
          onClick={clearFilters}
          className="rounded-full text-sm px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 h-9"
        >
          <X className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>
    </div>
  );
};

export default function ListingsPage() {
  const searchParams = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<PropertyFilters | null>(null);
  const [pendingFilters, setPendingFilters] = useState<PropertyFilters>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (filters === null) return;
    async function fetchFilteredProperties() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        Object.entries(filters ?? {}).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "")
            params.set(key, value.toString());
        });
        const url = `${API_URL}/api/properties/search?${params.toString()}`;
        const res = await axios.get(url);
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

    setPendingFilters(initialFilters);

    if (hasQuery) {
      setFilters(initialFilters);
    } else {
      setFilters({});
    }
  }, [searchParams]);

  const updatePendingFilter = (key: keyof PropertyFilters, value: any) => {
    setPendingFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const applyFilters = () => {
    setFilters(pendingFilters);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setPendingFilters({});
    setFilters({});
  };

  const activeFilterCount =
    Object.values(pendingFilters).filter(Boolean).length;

  // Loading state
  if (loading && filters === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-xl w-64 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-96 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonPropertyCard key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-8 pb-6 overflow-hidden">
        {/* Backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 z-0" />
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5 z-0" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Optional Title */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            } mb-6 text-center`}
          >
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
              <span className="bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 bg-clip-text text-transparent">
                Your Next Property Is Just a Click Away
              </span>
            </h1>
          </div>

          {/* Filters (Desktop) */}
          <div className="hidden lg:block -mt-2">
            <FilterSidebar
              filters={pendingFilters}
              updateFilter={updatePendingFilter}
              clearFilters={clearFilters}
              activeFilterCount={activeFilterCount}
              applyFilters={applyFilters}
            />
          </div>

          {/* Results & View Toggle */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Results Count */}
            <div className="px-6 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow border border-gray-200">
              <span className="text-gray-600 font-medium">Found </span>
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {filteredProperties.length}
              </span>
              <span className="text-gray-600 font-medium"> properties</span>
            </div>

            {/* View Toggle & Filters (Mobile) */}
            <div className="flex items-center space-x-3">
              <div className="flex bg-white/90 backdrop-blur-md rounded-2xl p-1 shadow border border-gray-200">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Filters Button */}
              <div className="lg:hidden">
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow hover:scale-105 transition-all duration-300">
                      <SlidersHorizontal className="mr-2 h-5 w-5" />
                      Filters
                      {activeFilterCount > 0 && (
                        <Badge className="ml-3 px-2 py-1 text-xs bg-white/20 text-white rounded-full">
                          {activeFilterCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-full sm:w-96 h-full overflow-y-auto bg-white/70 backdrop-blur-xl border-r-0"
                  >
                    <SheetHeader className="pb-6 border-b border-gray-200">
                      <SheetTitle className="text-2xl font-bold text-gray-900 flex items-center">
                        <Filter className="mr-3 h-6 w-6 text-blue-600" />
                        Filter Properties
                      </SheetTitle>
                      <SheetDescription className="text-gray-600">
                        Narrow your search to match your needs
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar
                        filters={pendingFilters}
                        updateFilter={updatePendingFilter}
                        clearFilters={clearFilters}
                        activeFilterCount={activeFilterCount}
                        applyFilters={applyFilters}
                        isMobile={true}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-8">
        <div className="w-full">
          {/* Property Grid */}
          <div className="w-full">
            {loading ? (
              <div
                className={`grid ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "grid-cols-1 gap-4"
                }`}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <SkeletonPropertyCard key={i} />
                ))}
              </div>
            ) : filteredProperties.length > 0 ? (
              <div
                className={`grid ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "grid-cols-1 gap-4"
                } transition-all duration-500`}
              >
                {filteredProperties.map((property, index) => (
                  <div
                    key={property._id}
                    className={`transition-all duration-500 hover:scale-105 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            ) : (
              // No results state
              <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100 backdrop-blur-sm">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  No Properties Found
                </h3>
                <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto leading-relaxed">
                  We couldn&apos;t find any properties matching your current
                  search criteria. Try adjusting your filters or clearing them
                  to see more options.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={clearFilters}
                    className="group px-8 py-4 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl shadow-xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300"
                  >
                    <X className="mr-3 h-5 w-5" />
                    Clear All Filters
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
