"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, XCircle, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import axios from "axios";
import { API_URL } from "@/config/constat";

type Property = {
  _id?: string;
  title: string;
  address: string;
  city: string;
  status: "for-sale" | "for-rent";
  price: string;
  // state?: string;
  // country?: string;
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
  featured?: boolean;
  description?: string;
  // lat?: string;
  // lng?: string;
  phone?: string;
  type: "house" | "apartment" | "office" | "land";
  bedrooms: string;
  bathrooms: string;
  size: string;
  images: string[];
  available?: boolean;
  totalUnits?: string;
  availableUnits?: string;
  approvalStatus?: "pending" | "approved" | "rejected";
  createdAt?: Date;
  updatedAt?: Date;
};

interface PropertyListProps {
  refresh?: boolean;
  onEdit: (property?: Property) => void | Promise<void>;
}

export default function PropertyList({ refresh, onEdit }: PropertyListProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [viewProperty, setViewProperty] = useState<Property | null>(null);
  const [deleteProperty, setDeleteProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [viewMode, setViewMode] = useState<"thumbnail" | "list">("thumbnail");
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API_URL}/api/properties/search?limit=1000` // Use search endpoint with high limit for dashboard
        );
        setProperties(res.data.properties || []);
      } catch (err) {
        setProperties([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, [refresh]);

  const handleDelete = async (id: string | undefined) => {
    if (!id) {
      setDeleting(false);
      setDeleteProperty(null);
      return;
    }
    setDeleting(true);
    try {
      // Get JWT token from localStorage (adjust if you use context or cookies)
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        throw new Error("No authentication token found. Please log in again.");
      }
      await axios.delete(`${API_URL}/api/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProperties((prev) => prev.filter((p) => p._id !== id));
      setDeleteProperty(null);
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    setSelectedImageIdx(0);
  }, [viewProperty]);

  return (
    <div className="min-h-screen py-4 px-2 sm:px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-end mb-8">
          <div className="flex gap-2 ml-auto">
            <Button
              variant={viewMode === "thumbnail" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("thumbnail")}
            >
              Thumbnail
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              List
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Spinner />
          </div>
        ) : viewMode === "thumbnail" ? (
          properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <svg
                width="64"
                height="64"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="mb-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 19V7a2 2 0 012-2h14a2 2 0 012 2v12M16 3v4M8 3v4m-5 4h18"
                />
              </svg>
              <span className="text-lg font-semibold">
                No properties found.
              </span>
              <span className="text-sm">
                Add a new property to get started.
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card
                  key={property._id}
                  className="rounded-2xl overflow-hidden border border-gray-800 bg-card shadow hover:shadow-lg transition-all"
                >
                  <div className="relative w-full h-48">
                    {property.images! && property.images!.length > 0 ? (
                      <Image
                        src={property.images![0]}
                        alt={property.title}
                        fill
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="truncate text-lg font-bold">
                      {property.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-1">
                    <span className="text-gray-400 text-sm">
                      {property.location!.address}, {property.location!.city}
                    </span>
                    <span className="text-blue-300 font-bold text-lg">
                      GMD{property.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400">
                      {property.bedrooms} bed • {property.bathrooms} bath •{" "}
                      {property.size} m²
                    </span>
                    <div className="flex gap-2 mt-2">
                      <a
                        href={`/dashboard/properties/${property._id}`}
                        title="View property details"
                      >
                        <Button
                          size="icon"
                          variant="outline"
                          title="View property details"
                        >
                          <Eye className="h-5 w-5" />
                        </Button>
                      </a>
                      <Button
                        onClick={() => onEdit(property)} // This is correct, passes property with _id
                        size="icon"
                        variant="outline"
                      >
                        <Edit className="h-5 w-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => setDeleteProperty(property)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        ) : properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <svg
              width="64"
              height="64"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="mb-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 19V7a2 2 0 012-2h14a2 2 0 012 2v12M16 3v4M8 3v4m-5 4h18"
              />
            </svg>
            <span className="text-lg font-semibold">No properties found.</span>
            <span className="text-sm">Add a new property to get started.</span>
          </div>
        ) : (
          <div className="divide-y divide-gray-800 bg-transparent">
            {properties.map((property) => (
              <div
                key={property._id}
                className="flex items-center gap-4 py-4 px-2 hover:bg-gray-900/40 rounded-xl transition-all"
              >
                <div className="relative w-24 h-20 flex-shrink-0">
                  {property.images! && property.images!.length > 0 ? (
                    <Image
                      src={property.images![0]}
                      alt={property.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold truncate text-lg">
                      {property.title}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {property.location.address}, {property.location!.city}
                  </span>
                  <span className="text-blue-300 font-bold text-base block">
                    GMD{property.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-400">
                    {property.bedrooms} bed • {property.bathrooms} bath •{" "}
                    {property.size} m²
                  </span>
                </div>
                <div className="flex gap-2 ml-4">
                  <a
                    href={`/dashboard/properties/${property._id}`}
                    title="View property details"
                  >
                    <Button
                      size="icon"
                      variant="outline"
                      title="View property details"
                    >
                      <Eye className="h-5 w-5" />
                    </Button>
                  </a>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => onEdit(property)}
                  >
                    <Edit className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => setDeleteProperty(property)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Modal removed: now handled by detail page */}

      {/* Delete Confirmation Modal */}
      <Dialog
        open={!!deleteProperty}
        onOpenChange={(open) => {
          if (!open) setDeleteProperty(null);
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="text-gray-400">
            Are you sure you want to delete &quot;{deleteProperty?.title || ""}
            &quot;?
          </p>
          <DialogFooter className="mt-4 flex justify-end gap-4">
            <Button variant="outline" onClick={() => setDeleteProperty(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(deleteProperty?._id)}
              disabled={deleting || !deleteProperty?._id}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
