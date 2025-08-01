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
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import axios from "axios";
import { SkeletonPropertyCard } from "@/components/dashboard/SkeletonPropertyCard";
import { FilterSidebar } from "@/components/FilterSidebar";

export default function ListingsPage() {
  const searchParams = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<PropertyFilters | null>(null);
  const [pendingFilters, setPendingFilters] = useState<PropertyFilters>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isVisible, setIsVisible] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    offset: 0,
    limit: 12,
    hasMore: false,
  });
  const [currentPage, setCurrentPage] = useState(1);

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
        // Add pagination params
        params.set("limit", pagination.limit.toString());
        params.set("offset", ((currentPage - 1) * pagination.limit).toString());

        const url = `${API_URL}/api/properties/search?${params.toString()}`;
        const res = await axios.get(url);
        setFilteredProperties(res.data.properties);
        setPagination(res.data.pagination);
      } catch (err) {
        setFilteredProperties([]);
        setPagination({
          total: 0,
          offset: 0,
          limit: 12,
          hasMore: false,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchFilteredProperties();
  }, [filters, currentPage, pagination.limit]);

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
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setPendingFilters({});
    setFilters({});
    setCurrentPage(1); // Reset to first page when clearing filters
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  const activeFilterCount =
    Object.values(pendingFilters).filter(Boolean).length;

  // Loading state
  if (loading && filters === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* <Header /> */}
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
                Discover Property That Fits You
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

          {/* Results & View Toggle/Filters Row */}
          {/* Mobile: results + filters in a row. Desktop: results + view toggle spaced below filters. */}
          <div className="mt-6">
            {/* Mobile layout: results + view toggle + filters in a row, equal width */}
            <div className="flex flex-row items-center justify-between gap-3 lg:hidden">
              {/* Results Count - compact, single line, hide 'Found' on mobile */}
              <div className="flex items-center justify-center px-3 py-3 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 w-1/3 min-w-0">
                <span className="text-xs text-gray-700 font-medium hidden sm:inline">
                  Found{" "}
                </span>
                <span className="font-bold text-base bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {pagination.total}
                </span>
                <span className="text-xs text-gray-700 font-medium ml-1">
                  properties
                </span>
              </div>

              {/* Filters Button */}
              <div className="w-1/3 min-w-0 flex justify-center">
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button className="w-full px-3 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center backdrop-blur-xl">
                      <SlidersHorizontal className="mr-2 h-5 w-5" />
                      <span className="hidden xs:inline">Filters</span>
                      {activeFilterCount > 0 && (
                        <Badge className="ml-2 px-2 py-1 text-xs bg-white/20 text-white rounded-full border border-white/30">
                          {activeFilterCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-full sm:w-96 h-full overflow-y-auto bg-white/95 backdrop-blur-xl border-r border-gray-200/50"
                    onOpenAutoFocus={(event) => {
                      event.preventDefault();
                    }}
                  >
                    <SheetHeader className="pb-6 border-b border-gray-200/50">
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

              {/* View Toggle */}
              <div className="flex flex-row items-center justify-center bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 w-1/3 min-w-0 p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-xl transition-all h-9 w-9 ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-white/50"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="h-5 w-5" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={`rounded-xl transition-all h-9 w-9 ml-2 ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-white/50"
                  }`}
                  aria-label="List view"
                >
                  <List className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Desktop layout: results + view toggle spaced below filters */}
            <div className="hidden lg:flex flex-row items-center justify-between gap-4 mt-0">
              <div className="px-6 py-3 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30">
                <span className="text-gray-700 font-medium max-sm:text-base">
                  Found{" "}
                </span>
                <span className="font-bold text-2xl max-sm:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {pagination.total}
                </span>
                <span className="text-gray-700 max-sm:text-base font-medium">
                  {" "}
                  {pagination.total < 2 ? "property" : "properties"}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex bg-white/80 backdrop-blur-xl rounded-2xl p-1 shadow-lg border border-white/30">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      viewMode === "grid"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                        : "text-gray-600 hover:bg-white/50"
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
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                        : "text-gray-600 hover:bg-white/50"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
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
                className={`${
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "flex flex-col space-y-4"
                }`}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <SkeletonPropertyCard key={i} viewMode={viewMode} />
                ))}
              </div>
            ) : filteredProperties.length > 0 ? (
              <div
                className={`${
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "flex flex-col space-y-4"
                } transition-all duration-500`}
              >
                {filteredProperties.map((property, index) => (
                  <div
                    key={property._id}
                    className={`transition-all duration-500 ${
                      viewMode === "grid"
                        ? "hover:scale-105"
                        : "hover:shadow-lg"
                    } ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    <PropertyCard property={property} viewMode={viewMode} />
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

          {/* Enhanced Pagination Component */}
          {!loading && filteredProperties.length > 0 && (
            <div className="mt-12 flex flex-col items-center space-y-6">
              {/* Pagination Info */}
              <div className="text-center">
                <p className="text-gray-600 text-sm md:text-base">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {pagination.offset + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-gray-900">
                    {Math.min(
                      pagination.offset + pagination.limit,
                      pagination.total
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900">
                    {pagination.total}
                  </span>{" "}
                  results
                </p>
              </div>

              {/* Desktop Pagination */}
              <div className="hidden md:flex items-center space-x-2">
                {/* Previous Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>

                {/* Page Numbers */}
                {totalPages > 1 && (
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((page) => {
                        // Show first page, last page, current page, and pages around current page
                        if (page === 1 || page === totalPages) return true;
                        if (Math.abs(page - currentPage) <= 1) return true;
                        return false;
                      })
                      .map((page, index, array) => {
                        // Add ellipsis if there's a gap
                        const showEllipsisBefore =
                          index > 0 && page - array[index - 1] > 1;

                        return (
                          <div
                            key={page}
                            className="flex items-center space-x-1"
                          >
                            {showEllipsisBefore && (
                              <div className="px-2 py-1 text-gray-400">
                                <MoreHorizontal className="h-4 w-4" />
                              </div>
                            )}
                            <Button
                              variant={
                                currentPage === page ? "default" : "ghost"
                              }
                              size="sm"
                              onClick={() => handlePageChange(page)}
                              className={`min-w-[40px] h-10 rounded-xl transition-all duration-200 ${
                                currentPage === page
                                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {page}
                            </Button>
                          </div>
                        );
                      })}
                  </div>
                )}

                {/* Next Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              {/* Mobile Pagination */}
              <div className="md:hidden flex flex-col items-center space-y-4 w-full">
                {/* Mobile Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between w-full max-w-xs">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="flex items-center px-3 py-2 bg-white border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">
                        Page {currentPage} of {totalPages}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="flex items-center px-3 py-2 bg-white border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Jump to Page (Desktop only) */}
              <div className="hidden lg:flex items-center space-x-3">
                <span className="text-sm text-gray-600">Jump to page:</span>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                      const page = parseInt(e.target.value);
                      if (page >= 1 && page <= totalPages) {
                        handlePageChange(page);
                      }
                    }}
                    className="w-16 h-8 text-center text-sm border-gray-200 rounded-lg"
                  />
                  <span className="text-sm text-gray-500">of {totalPages}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
