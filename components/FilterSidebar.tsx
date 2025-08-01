"use client";
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

import { Property, PropertyFilters } from "@/types/property";
import { Filter, Search, MapPin, X } from "lucide-react";

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
              autoFocus={false}
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
