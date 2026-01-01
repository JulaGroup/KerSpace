"use client";
import { API_URL } from "@/config/constat";

import { useState, useEffect } from "react";
import { Plus, X, Pencil } from "lucide-react";
import axios from "axios";
import Image from "next/image";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Button } from "@/components/ui/button";
import PropertyList from "@/components/dashboard/PropertyList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// MODIFIED: Changed 'id' to '_id' to match backend and PropertyList component
type Property = {
  _id?: string;
  title: string;
  address: string;
  city: string;
  status: "for-sale" | "for-rent";
  price: string;
  state?: string;
  country?: string;
  featured?: boolean;
  description?: string;
  lat?: string;
  lng?: string;
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

const emptyProperty: Property = {
  title: "",
  address: "",
  city: "",
  status: "for-sale",
  price: "",
  featured: false,
  description: "",
  state: "",
  country: "",
  lat: "",
  lng: "",
  phone: "",
  type: "apartment",
  bedrooms: "",
  bathrooms: "",
  size: "",
  images: [],
  available: true,
  totalUnits: "",
  availableUnits: "",
  approvalStatus: "pending",
  createdAt: undefined,
  updatedAt: undefined,
};

export default function PropertiesPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formProperty, setFormProperty] = useState<Property>(emptyProperty);
  const [adding, setAdding] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [initialForm, setInitialForm] = useState<Property>(emptyProperty);

  const openForm = async (property?: Property) => {
    if (property && property._id) {
      try {
        const res = await axios.get(
          `${API_URL}/api/properties/${property._id}` // Use API_URL constant
        );
        const apiProp = res.data;
        // Map API response to form shape
        const safeProperty: Property = {
          _id: apiProp._id,
          title: apiProp.title || "",
          address: apiProp.location?.address || "",
          city: apiProp.location?.city || "",
          state: apiProp.location?.state || "",
          country: apiProp.location?.country || "",
          lat: apiProp.location?.coordinates?.lat?.toString() || "",
          lng: apiProp.location?.coordinates?.lng?.toString() || "",
          phone: apiProp.location?.phone || "",
          status: apiProp.status || "for-sale",
          price: apiProp.price?.toString() || "",
          featured: !!apiProp.featured,
          description: apiProp.description || "",
          type: apiProp.type || "",
          bedrooms: apiProp.bedrooms?.toString() || "",
          bathrooms: apiProp.bathrooms?.toString() || "",
          size: apiProp.size?.toString() || "",
          images: Array.isArray(apiProp.images) ? apiProp.images : [],
          available:
            typeof apiProp.available === "boolean" ? apiProp.available : true,
          totalUnits: apiProp.totalUnits?.toString() || "",
          availableUnits: apiProp.availableUnits?.toString() || "",
          approvalStatus: apiProp.approvalStatus || "pending",
          createdAt: apiProp.createdAt
            ? new Date(apiProp.createdAt)
            : undefined,
          updatedAt: apiProp.updatedAt
            ? new Date(apiProp.updatedAt)
            : undefined,
        };
        setEditingProperty(safeProperty);
        setFormProperty(safeProperty);
        setInitialForm(safeProperty);
        setSelectedFiles([]);
      } catch (err) {
        console.error("Failed to fetch property:", err);
        // fallback to passed property
        setEditingProperty(property);
        setFormProperty(property);
        setInitialForm(property);
        setSelectedFiles([]);
      }
    } else {
      setEditingProperty(null);
      setFormProperty(emptyProperty);
      setInitialForm(emptyProperty);
      setSelectedFiles([]);
    }
    setShowForm(true);
  };

  // Track changes
  const isChanged =
    JSON.stringify(formProperty) !== JSON.stringify(initialForm) ||
    selectedFiles.length > 0;

  // Image upload
  const handleImageUpload = async () => {
    if (selectedFiles.length === 0) return formProperty.images;
    setUploading(true);
    const uploadedUrls: string[] = [];
    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "unsigned_preset");
      const cloudName = "dkpi5ij2t";
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const res = await axios.post(url, formData);
      uploadedUrls.push(res.data.secure_url);
    }
    setUploading(false);
    return [...formProperty.images, ...uploadedUrls];
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChanged) return;
    setAdding(true);
    try {
      const urls = await handleImageUpload();
      const token = localStorage.getItem("token");
      const payload: any = {
        title: formProperty.title,
        status: formProperty.status,
        description: formProperty.description,
        location: {
          address: formProperty.address,
          city: formProperty.city,
          state: formProperty.state,
          country: formProperty.country,
          coordinates: {
            lat: formProperty.lat ? Number(formProperty.lat) : undefined,
            lng: formProperty.lng ? Number(formProperty.lng) : undefined,
          },
          phone: formProperty.phone,
        },
        price: Number(formProperty.price),
        type: formProperty.type,
        bedrooms: Number(formProperty.bedrooms),
        bathrooms: Number(formProperty.bathrooms),
        size: Number(formProperty.size),
        images: urls,
        featured: formProperty.featured,
        available:
          typeof formProperty.available === "boolean"
            ? formProperty.available
            : true,
      };
      if (formProperty.type === "apartment") {
        payload.totalUnits = formProperty.totalUnits
          ? Number(formProperty.totalUnits)
          : undefined;
        payload.availableUnits = formProperty.availableUnits
          ? Number(formProperty.availableUnits)
          : undefined;
      }

      // MODIFIED: Use editingProperty._id
      if (editingProperty?._id) {
        await axios.put(
          `${API_URL}/api/properties/${editingProperty._id}`, // Use API_URL constant
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(`${API_URL}/api/properties`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setShowForm(false);
      setRefresh((r) => !r);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      <DashboardHeader
        heading="Properties"
        text="Manage your real estate listings"
      >
        <Button onClick={() => openForm()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </DashboardHeader>

      <PropertyList refresh={refresh} onEdit={openForm} />

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="w-[85%] max-w-[850px] h-[80vh] overflow-y-auto p-6">
          <DialogHeader className="flex flex-row justify-between items-center">
            <DialogTitle className="text-xl font-bold">
              {editingProperty ? "Edit Property" : "Add Property"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* --- Property Information --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-full">
                <label className="text-sm text-gray-300">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Modern Apartment"
                  value={formProperty.title}
                  onChange={(e) =>
                    setFormProperty({ ...formProperty, title: e.target.value })
                  }
                  required
                  className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700"
                />
              </div>

              <div className="col-span-full">
                <label className="text-sm text-gray-300">Description</label>
                <textarea
                  placeholder="Enter a detailed property description..."
                  value={formProperty.description}
                  onChange={(e) =>
                    setFormProperty({
                      ...formProperty,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  required
                  className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 resize-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Type</label>
                <select
                  name="type"
                  title="Property Type"
                  value={formProperty.type}
                  onChange={(e) => {
                    const newType = e.target.value as
                      | "house"
                      | "apartment"
                      | "office"
                      | "land";
                    let updated = { ...formProperty, type: newType };
                    // Reset apartment fields if not apartment
                    if (newType !== "apartment") {
                      updated.totalUnits = undefined;
                      updated.availableUnits = undefined;
                      updated.available = formProperty.available ?? true;
                    }
                    setFormProperty(updated);
                  }}
                  required
                  className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700"
                >
                  <option value="">Select type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="office">Office</option>
                  <option value="land">Land</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-300">Status</label>
                <select
                  name="status"
                  title="Property Status"
                  value={formProperty.status}
                  onChange={(e) =>
                    setFormProperty({
                      ...formProperty,
                      status: e.target.value as "for-sale" | "for-rent",
                    })
                  }
                  required
                  className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700"
                >
                  <option value="">Select status</option>
                  <option value="for-sale">For Sale</option>
                  <option value="for-rent">For Rent</option>
                </select>
              </div>

              {/* Available toggle for all, but disabled for apartments (auto) */}
              <div>
                <label htmlFor="available" className="text-sm text-gray-300">
                  Available
                </label>
                <input
                  id="available"
                  name="available"
                  type="checkbox"
                  checked={formProperty.available ?? true}
                  disabled={formProperty.type === "apartment"}
                  onChange={(e) =>
                    setFormProperty({
                      ...formProperty,
                      available: e.target.checked,
                    })
                  }
                  className="accent-blue-600 w-5 h-5 mt-2"
                />
                {formProperty.type === "apartment" && (
                  <span className="text-xs text-gray-400 ml-2">
                    Auto-calculated from available units
                  </span>
                )}
              </div>
            </div>

            {/* --- Price & Specs --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["price", "bedrooms", "bathrooms", "size"].map((field) => (
                <div key={field}>
                  <label className="text-sm text-gray-300 capitalize">
                    {field}
                  </label>
                  <input
                    type="number"
                    placeholder={`e.g., ${
                      field === "price"
                        ? "500000"
                        : field === "size"
                        ? "120"
                        : "3"
                    }`}
                    value={(formProperty as any)[field]}
                    onChange={(e) =>
                      setFormProperty({
                        ...formProperty,
                        [field]: e.target.value,
                      })
                    }
                    required
                    className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700"
                  />
                </div>
              ))}
              {/* Apartment-specific fields */}
              {formProperty.type === "apartment" && (
                <>
                  <div>
                    <label className="text-sm text-gray-300">Total Units</label>
                    <input
                      type="number"
                      placeholder="e.g., 10"
                      value={formProperty.totalUnits ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormProperty((prev) => ({
                          ...prev,
                          totalUnits: val === "" ? undefined : val,
                        }));
                      }}
                      required
                      className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300">
                      Available Units
                    </label>
                    <input
                      type="number"
                      placeholder="e.g., 5"
                      value={formProperty.availableUnits ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        const num = val === "" ? undefined : Number(val);
                        setFormProperty((prev) => ({
                          ...prev,
                          availableUnits: val === "" ? undefined : val,
                          available: val === "0" ? false : true,
                        }));
                      }}
                      required
                      className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700"
                    />
                  </div>
                </>
              )}
            </div>

            {/* --- Location --- */}
            <div>
              <h3 className="text-sm text-gray-400 font-semibold">Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {[
                  { key: "address", label: "Address" },
                  { key: "city", label: "City" },
                  { key: "state", label: "State" },
                  { key: "country", label: "Country" },
                  { key: "lat", label: "Latitude" },
                  { key: "lng", label: "Longitude" },
                  { key: "phone", label: "Contact Phone" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="text-sm text-gray-300">{label}</label>
                    <input
                      type={key === "lat" || key === "lng" ? "number" : "text"}
                      placeholder={label}
                      value={(formProperty as any)[key]}
                      onChange={(e) =>
                        setFormProperty({
                          ...formProperty,
                          [key]: e.target.value,
                        })
                      }
                      className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* --- Featured Toggle --- */}
            <div>
              <label className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={(formProperty as any).featured || false}
                  onChange={(e) =>
                    setFormProperty({
                      ...formProperty,
                      featured: e.target.checked,
                    })
                  }
                  className="accent-blue-600 w-5 h-5"
                />
                <span className="text-gray-300 text-sm">Mark as Featured</span>
              </label>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-2">
              <label
                htmlFor="image-upload"
                className="block text-sm font-medium text-gray-300"
              >
                Property Images (Max 10)
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setSelectedFiles(files.slice(0, 10));
                }}
                className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              {/* Existing images */}
              {formProperty.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2 p-2 bg-zinc-800 rounded-md border border-zinc-700">
                  {formProperty.images.map((url, idx) => (
                    <div
                      key={idx}
                      className="relative w-full aspect-video rounded overflow-hidden shadow-lg group"
                    >
                      <Image
                        src={url}
                        alt={`Preview ${idx + 1}`}
                        fill
                        className="object-cover rounded transition-transform duration-300 group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormProperty({
                            ...formProperty,
                            images: formProperty.images.filter(
                              (_, i) => i !== idx
                            ),
                          })
                        }
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-label="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {/* New images */}
              {selectedFiles.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2 p-2 bg-zinc-800 rounded-md border border-zinc-700">
                  {selectedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="relative w-full aspect-video rounded overflow-hidden shadow-lg group"
                    >
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${idx + 1}`}
                        fill
                        className="object-cover rounded transition-transform duration-300 group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedFiles(
                            selectedFiles.filter((_, i) => i !== idx)
                          )
                        }
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-label="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {uploading && (
                <p className="text-sm text-blue-400">Uploading images...</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={adding || uploading || !isChanged}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-lg font-semibold transition duration-200 ease-in-out"
            >
              {adding
                ? editingProperty
                  ? "Updating Property..."
                  : "Adding Property..."
                : editingProperty
                ? "Save Changes"
                : "Add Property"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
