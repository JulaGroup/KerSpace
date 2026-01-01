"use client";
import { API_URL } from "@/config/constat";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Property } from "@/types/property";
import { Appointment } from "@/types/appointment";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Phone,
  Mail,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Building,
  Clock,
  User,
  Star,
  Camera,
  ArrowLeft,
  MessageCircle,
  Video,
  X, // Added X icon for close button
  Info,
  Loader2, // Added Info icon for Request More Info
  Home,
  DollarSign,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useFavorites } from "@/contexts/FavoritesContext";
import LoadingPage from "@/app/loading";
import dynamic from "next/dynamic";

// Dynamically import PropertyMap to avoid SSR issues with Leaflet
const PropertyMap = dynamic(
  () => import("@/components/PropertyMap").then((mod) => mod.PropertyMap),
  { ssr: false }
);

export default function PropertyDetailPage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [userAppointment, setUserAppointment] = useState<Appointment | null>(
    null
  );
  // State for unsave confirmation dialog
  const [showUnsaveConfirm, setShowUnsaveConfirm] = useState(false);
  // Edit appointment form state (must be at top level)
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  const { isAuthenticated, user } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isFavorite, refreshFavorites } = useFavorites();
  const [isFavoriting, setIsFavoriting] = useState(false);
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
  const [isRequestInfoDialogOpen, setIsRequestInfoDialogOpen] = useState(false); // New state for Request More Info dialog
  const [isFullScreenImageOpen, setIsFullScreenImageOpen] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });
  const [isBooking, setIsBooking] = useState(false);
  const [requestInfoForm, setRequestInfoForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(true);
  // Loader for info request form
  const [isRequestingInfo, setIsRequestingInfo] = useState(false);
  // Login prompt dialog state
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Format price with currency
  const formatPrice = (price: number, currency: string = "GMD") => {
    const currencySymbols: Record<string, string> = {
      GMD: "D",
      USD: "$",
      GBP: "£",
    };
    const symbol = currencySymbols[currency] || "D";
    return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
  };

  // Helper for protected actions
  const handleProtectedAction = (action: () => void) => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
    } else {
      action();
    }
  };

  // Pre-fill appointment form with user info as soon as available
  useEffect(() => {
    if (isAuthenticated && user) {
      setAppointmentForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
      setRequestInfoForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    async function fetchProperty() {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/properties/${params.id}`);
        const data = await res.json();
        if (data) {
          setProperty(data);
        } else {
          setProperty(null);
        }
      } catch (err) {
        setProperty(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();

    // Fetch user's appointment for this property
    async function fetchUserAppointment() {
      if (!isAuthenticated) {
        setUserAppointment(null);
        return;
      }
      try {
        const res = await fetch(
          `${API_URL}/api/appointments/property/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.ok) {
          const appointment: Appointment = await res.json();
          setUserAppointment(appointment);
          // Pre-fill edit form with appointment data
          // Convert ISO date to 'YYYY-MM-DD' for input type="date"
          let formattedDate = "";
          if (appointment.date) {
            try {
              formattedDate = new Date(appointment.date)
                .toISOString()
                .slice(0, 10);
            } catch {
              formattedDate = appointment.date;
            }
          }
          setEditForm({
            name: appointment.name || "",
            email: appointment.email || "",
            phone: appointment.phone || "",
            date: formattedDate,
            time: appointment.time || "",
            message: appointment.message || "",
          });
        } else {
          setUserAppointment(null);
        }
      } catch {
        setUserAppointment(null);
      }
    }
    fetchUserAppointment();
  }, [params.id, isAuthenticated]);

  const handleEditAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAppointment) return;
    setIsEditing(true);
    fetch(`${API_URL}/api/appointments/${userAppointment._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(editForm),
    })
      .then(async (res) => {
        if (res.ok) {
          const updated: Appointment = await res.json();
          toast.success("Appointment updated successfully!");
          setUserAppointment(updated);
          setIsEditDialogOpen(false);
        } else {
          const error = await res.json();
          toast.error(error?.message || "Failed to update appointment.");
        }
      })
      .catch(() => {
        toast.error("Network error. Please try again.");
      })
      .finally(() => {
        setIsEditing(false);
      });
  };

  // Cancel appointment handler
  const [isCanceling, setIsCanceling] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const handleCancelAppointment = async () => {
    if (!userAppointment) return;
    setIsCanceling(true);
    try {
      const res = await fetch(
        `${API_URL}/api/appointments/${userAppointment._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.ok) {
        toast.success("Appointment canceled successfully!");
        setUserAppointment(null);
      } else {
        const error = await res.json();
        toast.error(error?.message || "Failed to cancel appointment.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsCanceling(false);
      setShowCancelConfirm(false);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Property not found
            </h1>
            <p className="text-gray-600 mt-2">
              The property you&apos;re looking for doesn&apos;t exist or
              isn&apos;t available.
            </p>
            <Button asChild className="mt-4">
              <Link href="/listings">
                {/* 360° Virtual Tour (Coming Soon) */}
                <Card className="shadow-lg border-0">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-2xl">
                      <Video className="h-6 w-6 mr-3 text-blue-600" />
                      360° Virtual Tour
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center min-h-[200px]">
                      <div className="text-center">
                        <Video className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                        <p className="text-gray-700 mb-4 text-lg font-medium">
                          Feature coming soon
                        </p>
                        <span className="text-gray-500 text-sm">
                          You&apos;ll be able to explore this property in 360°
                          soon.
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Listings
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images!.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images!.length - 1 : prev - 1
    );
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please sign in to book an appointment");
      return;
    }
    setIsBooking(true);
    // Send appointment to backend
    const appointmentData: any = {
      name: appointmentForm.name,
      email: appointmentForm.email,
      phone: appointmentForm.phone,
      date: appointmentForm.date,
      time: appointmentForm.time,
      propertyId: params.id,
    };
    if (appointmentForm.message && appointmentForm.message.trim() !== "") {
      appointmentData.message = appointmentForm.message;
    }
    fetch(`${API_URL}/api/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(appointmentData),
    })
      .then(async (res) => {
        if (res.ok) {
          toast.success("Appointment booked successfully!");
          setIsAppointmentDialogOpen(false);
          setAppointmentForm({
            name: "",
            email: "",
            phone: "",
            date: "",
            time: "",
            message: "",
          });
          // Re-fetch user appointment to update UI
          try {
            const res = await fetch(
              `${API_URL}/api/appointments/property/${params.id}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            if (res.ok) {
              const appointment: Appointment = await res.json();
              setUserAppointment(appointment);
            } else {
              setUserAppointment(null);
            }
          } catch {
            setUserAppointment(null);
          }
        } else {
          const error = await res.json();
          toast.error(error?.message || "Failed to book appointment.");
        }
      })
      .catch(() => {
        toast.error("Network error. Please try again.");
      })
      .finally(() => {
        setIsBooking(false);
      });
  };

  const handleRequestInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please sign in to request more information");
      return;
    }
    setIsRequestingInfo(true);
    // Send info request to backend
    const infoRequestData = {
      propertyId: params.id,
      message: requestInfoForm.message,
    };
    fetch(`${API_URL}/api/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(infoRequestData),
    })
      .then(async (res) => {
        if (res.ok) {
          toast.success("Your info request has been sent successfully!");
          setIsRequestInfoDialogOpen(false);
          setRequestInfoForm({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        } else {
          const error = await res.json();
          toast.error(error?.message || "Failed to send info request.");
        }
      })
      .catch(() => {
        toast.error("Network error. Please try again.");
      })
      .finally(() => {
        setIsRequestingInfo(false);
      });
  };

  // Add to favorites handler
  const handleFavorite = async () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    if (isFavoriting) return;
    setIsFavoriting(true);
    try {
      const res = await fetch(`${API_URL}/api/favorites/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        toast.success("Property added to favorites!");
        refreshFavorites();
      } else {
        const error = await res.json();
        toast.error(error?.message || "Failed to add to favorites.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsFavoriting(false);
    }
  };

  // Remove from favorites handler
  const handleUnsaveFavorite = async () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    if (isFavoriting) return;
    setIsFavoriting(true);
    try {
      const res = await fetch(`${API_URL}/api/favorites/${params.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        toast.success("Property removed from favorites!");
        refreshFavorites();
      } else {
        const error = await res.json();
        toast.error(error?.message || "Failed to remove from favorites.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsFavoriting(false);
      setShowUnsaveConfirm(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: property.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />

      {/* Hero Section with Enhanced Background */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-6">
          {/* Top Navigation Bar with Breadcrumb and Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fade-in">
            {/* Enhanced Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm">
              <Link
                href="/"
                className="text-gray-500 hover:text-blue-600 transition-colors duration-200 flex items-center"
              >
                <span>Home</span>
              </Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <Link
                href="/listings"
                className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
              >
                Listings
              </Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">
                {property.title}
              </span>
            </nav>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-3">
              {/* Enhanced Favorite Button */}
              {isFavorite(property._id) ? (
                <>
                  <Button
                    size="sm"
                    onClick={() => setShowUnsaveConfirm(true)}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-6"
                    disabled={isFavoriting}
                  >
                    <Heart className="h-4 w-4 mr-2 fill-current" />
                    {isFavoriting ? "Removing..." : "Saved"}
                  </Button>
                  {/* Enhanced Unsave Confirmation Dialog */}
                  <Dialog
                    open={showUnsaveConfirm}
                    onOpenChange={setShowUnsaveConfirm}
                  >
                    <DialogContent className="w-[92vw] max-w-[425px] bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
                      <DialogHeader className="text-center pb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Heart className="h-8 w-8 text-red-600" />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-gray-900">
                          Remove from Favorites?
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 text-lg">
                          Are you sure you want to remove this beautiful
                          property from your favorites?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex gap-3 mt-6">
                        <Button
                          variant="outline"
                          onClick={() => setShowUnsaveConfirm(false)}
                          disabled={isFavoriting}
                          className="flex-1 h-12 border-2 hover:bg-gray-50"
                        >
                          Keep it
                        </Button>
                        <Button
                          onClick={handleUnsaveFavorite}
                          disabled={isFavoriting}
                          className="flex-1 h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                        >
                          {isFavoriting ? (
                            <div className="flex items-center">
                              <Loader2 className="animate-spin mr-2 h-4 w-4" />
                              Removing...
                            </div>
                          ) : (
                            "Remove"
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <Button
                  size="sm"
                  onClick={handleFavorite}
                  className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-red-50 hover:to-red-100 text-gray-700 hover:text-red-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-6 border-2 border-gray-200 hover:border-red-200"
                  disabled={isFavoriting}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  {isFavoriting ? "Saving..." : "Save"}
                </Button>
              )}

              {/* Enhanced Share Button */}
              <Button
                size="sm"
                onClick={handleShare}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-6"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Compact Property Information Section */}
          <div className="animate-slide-up">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6">
              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
                <Badge
                  className={`${
                    property.status === "for-sale"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold flex-shrink-0`}
                >
                  {property.status === "for-sale" ? "For Sale" : "For Rent"}
                </Badge>

                <span
                  className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex-shrink-0 ${
                    property.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mr-1.5 sm:mr-2 ${
                      property.available ? "bg-green-600" : "bg-red-600"
                    }`}
                  />
                  <span className="whitespace-nowrap">
                    {property.available ? "Available" : "Not Available"}
                  </span>
                </span>

                {property.featured && (
                  <Badge className="bg-amber-100 text-amber-800 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold flex-shrink-0">
                    <Star className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                    <span className="whitespace-nowrap">Featured</span>
                  </Badge>
                )}
              </div>

              <div className="space-y-6">
                {/* Title, Location, and Price Section - Responsive Layout */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                  {/* Title and Location - Left Side */}
                  <div className="flex-1">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                      {property.title}
                    </h1>

                    <div className="flex items-start text-gray-600 mb-6">
                      <MapPin className="h-5 w-5 mr-3 text-blue-600 flex-shrink-0 mt-1" />
                      <div className="leading-relaxed">
                        <span className="block font-medium text-gray-800">
                          {property.location.address}
                        </span>
                        <span className="text-gray-600">
                          {property.location.city}
                          {property.location.state &&
                            `, ${property.location.state}`}
                          {property.location.country &&
                            `, ${property.location.country}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price Card - Right Side on Large Screens */}
                  <div className="lg:w-96 lg:flex-shrink-0">
                    <div className="relative bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-8 rounded-2xl text-center lg:text-right shadow-2xl border border-gray-600/20 overflow-hidden">
                      {/* Background decoration */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

                      <div className="relative z-10">
                        <div className="text-sm text-gray-300 mb-3 font-semibold uppercase tracking-wider">
                          Price
                        </div>
                        <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 break-words drop-shadow-lg leading-tight">
                          {formatPrice(property.price!, property.currency || "GMD")}
                        </div>
                        {property.status === "for-rent" && (
                          <span className="text-lg text-gray-300 font-medium">
                            per month
                          </span>
                        )}

                        {/* Price feature badge */}
                        <div className="mt-4 inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white font-medium">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                          {property.status === "for-sale"
                            ? "Best Value"
                            : "Monthly Rate"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Property Features - Full Width */}
                <div className="w-full">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <Building className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                      <div className="text-xs text-gray-500 mb-1">Type</div>
                      <div className="font-semibold text-gray-900 capitalize text-sm">
                        {property.type}
                      </div>
                    </div>

                    {property.bedrooms! > 0 && (
                      <div className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <Bed className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                        <div className="text-xs text-gray-500 mb-1">
                          Bedrooms
                        </div>
                        <div className="font-semibold text-gray-900 text-sm">
                          {property.bedrooms}
                        </div>
                      </div>
                    )}

                    {property.bathrooms! > 0 && (
                      <div className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <Bath className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                        <div className="text-xs text-gray-500 mb-1">
                          Bathrooms
                        </div>
                        <div className="font-semibold text-gray-900 text-sm">
                          {property.bathrooms}
                        </div>
                      </div>
                    )}

                    <div className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <Square className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                      <div className="text-xs text-gray-500 mb-1">Area</div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {property.size} m²
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery - Moved to top of main content */}
          <div className="mb-8">
            <Card className="overflow-hidden shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-0">
                <div
                  className="relative h-[70vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden cursor-pointer group"
                  onClick={() => setIsFullScreenImageOpen(true)}
                >
                  <Image
                    src={property.images![currentImageIndex]}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Image Counter */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white px-3 py-2 rounded-lg text-sm font-medium">
                    <Camera className="inline h-4 w-4 mr-2" />
                    {currentImageIndex + 1} / {property.images!.length}
                  </div>

                  {/* Navigation Arrows */}
                  {property.images!.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-md shadow-lg border-0 w-12 h-12 rounded-xl transition-all duration-200 hover:scale-105"
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5 text-gray-700" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-md shadow-lg border-0 w-12 h-12 rounded-xl transition-all duration-200 hover:scale-105"
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5 text-gray-700" />
                      </Button>
                    </>
                  )}

                  {/* View Full Screen Hint */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-gray-800 px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to view full screen
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                {property.images!.length > 1 && (
                  <div className="p-4 bg-gray-50">
                    <div className="flex space-x-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      {property.images!.map((image, index) => (
                        <button
                          key={index}
                          className={`relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            index === currentImageIndex
                              ? "border-blue-500 shadow-md"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                          aria-label={`View image ${index + 1}`}
                        >
                          <Image
                            src={image}
                            alt={`${property.title} ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Full-screen Image Dialog */}
            <Dialog
              open={isFullScreenImageOpen}
              onOpenChange={setIsFullScreenImageOpen}
            >
              <DialogContent className="max-w-full h-[100vh] p-0 flex flex-col bg-black/95 backdrop-blur-xl">
                <DialogHeader className="p-4 sm:p-6 flex flex-row justify-between items-center bg-black/80 text-white backdrop-blur-md">
                  <DialogTitle className="text-lg sm:text-xl lg:text-2xl font-semibold truncate pr-4">
                    {property.title} - Image {currentImageIndex + 1} of{" "}
                    {property.images!.length}
                  </DialogTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsFullScreenImageOpen(false)}
                    className="text-white hover:bg-white/20 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex-shrink-0"
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </DialogHeader>
                <div className="relative flex-1 bg-black flex items-center justify-center">
                  <Image
                    src={property.images![currentImageIndex]}
                    alt={property.title}
                    fill
                    className="object-contain"
                  />
                  {property.images!.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 backdrop-blur-md w-10 h-10 rounded-lg transition-all duration-200"
                        onClick={prevImage}
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 backdrop-blur-md w-10 h-10 rounded-lg transition-all duration-200"
                        onClick={nextImage}
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </>
                  )}

                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl text-sm font-medium">
                    {currentImageIndex + 1} / {property.images!.length}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Main Content with Enhanced Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Enhanced Property Overview with Modern Design */}
            <Card className="shadow-xl lg:shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden mx-2 sm:mx-0">
              <CardContent className="p-0">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 p-4 sm:p-6 lg:p-8 xl:p-10 border-b border-gray-100">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                      <Building className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      About This Property
                    </h3>
                  </div>
                  <div className="text-gray-600 leading-relaxed text-base sm:text-lg space-y-4">
                    {(() => {
                      const lines = (property.description || "").split("\n");
                      const elements = [];
                      let i = 0;

                      while (i < lines.length) {
                        const line = lines[i].trim();

                        // Skip empty lines
                        if (!line) {
                          i++;
                          continue;
                        }

                        // Check if this is a bullet point
                        if (line.startsWith("-")) {
                          // Collect all consecutive bullet points
                          const bullets = [];
                          let introLine = i > 0 ? lines[i - 1].trim() : "";

                          // Check if previous line ends with colon (intro text)
                          if (introLine.endsWith(":") && elements.length > 0) {
                            // Remove the last element (intro text) to re-add it properly
                            elements.pop();
                          } else {
                            introLine = "";
                          }

                          while (
                            i < lines.length &&
                            lines[i].trim().startsWith("-")
                          ) {
                            bullets.push(lines[i].trim().substring(1).trim());
                            i++;
                          }

                          elements.push(
                            <div key={`bullets-${i}`}>
                              {introLine && (
                                <p className="mb-3 font-medium">{introLine}</p>
                              )}
                              <ul className="list-disc list-inside space-y-2 ml-4">
                                {bullets.map((bullet, idx) => (
                                  <li key={idx} className="text-gray-600">
                                    {bullet}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        } else {
                          // Regular paragraph
                          elements.push(<p key={`p-${i}`}>{line}</p>);
                          i++;
                        }
                      }

                      return elements;
                    })()}
                  </div>
                </div>

                {/* Property Information Grid */}
                <div className="p-4 sm:p-6 lg:p-8 xl:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-10">
                    {/* Property Basics */}
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
                          <Building className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <h4 className="text-lg sm:text-xl font-bold text-gray-900">
                          Property Details
                        </h4>
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        <div className="group p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-all duration-200 border border-gray-100 hover:border-gray-200 hover:shadow-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              Type
                            </span>
                            <span className="font-bold text-gray-900 capitalize px-3 py-1 bg-white rounded-lg shadow-sm">
                              {property.type}
                            </span>
                          </div>
                        </div>

                        <div className="group p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-all duration-200 border border-gray-100 hover:border-gray-200 hover:shadow-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium flex items-center gap-2">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                              Status
                            </span>
                            <Badge
                              className={`${
                                property.status === "for-sale"
                                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                  : "bg-blue-600 hover:bg-blue-700 text-white"
                              } px-3 sm:px-4 py-1.5 sm:py-2 font-semibold shadow-md text-xs sm:text-sm`}
                            >
                              {property.status === "for-sale"
                                ? "For Sale"
                                : "For Rent"}
                            </Badge>
                          </div>
                        </div>

                        <div className="group p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-all duration-200 border border-gray-100 hover:border-gray-200 hover:shadow-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium flex items-center gap-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              Floor Area
                            </span>
                            <span className="font-bold text-gray-900 px-3 py-1 bg-white rounded-lg shadow-sm">
                              {property.size} m²
                            </span>
                          </div>
                        </div>

                        <div className="group p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 border border-gray-100 hover:border-gray-200 hover:shadow-sm">
                          <div className="flex justify-between items-center gap-3">
                            <span className="text-gray-600 text-sm font-medium flex items-center gap-2 flex-shrink-0">
                              <div
                                className={`w-2 h-2 ${
                                  property.available
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                } rounded-full animate-pulse`}
                              ></div>
                              Availability
                            </span>
                            <span
                              className={`font-bold text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-lg shadow-sm whitespace-nowrap ${
                                property.available
                                  ? "text-green-700 bg-green-50 border border-green-200"
                                  : "text-red-700 bg-red-50 border border-red-200"
                              }`}
                            >
                              {property.available
                                ? "Available"
                                : "Not Available"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Room Information */}
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
                          <Home className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <h4 className="text-lg sm:text-xl font-bold text-gray-900">
                          Room Information
                        </h4>
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        {property.bedrooms! > 0 && (
                          <div className="group p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-150 rounded-lg sm:rounded-xl transition-all duration-200 border border-blue-200 hover:border-blue-300 hover:shadow-md">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700 font-medium flex items-center gap-2 sm:gap-3">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-md sm:rounded-lg flex items-center justify-center">
                                  <Bed className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                                </div>
                                <span className="text-sm sm:text-base">
                                  Bedrooms
                                </span>
                              </span>
                              <span className="font-bold text-gray-900 text-lg sm:text-xl px-2 sm:px-3 py-1 bg-white rounded-lg shadow-sm">
                                {property.bedrooms}
                              </span>
                            </div>
                          </div>
                        )}

                        {property.bathrooms! > 0 && (
                          <div className="group p-3 sm:p-4 bg-gradient-to-r from-teal-50 to-teal-100/50 hover:from-teal-100 hover:to-teal-150 rounded-lg sm:rounded-xl transition-all duration-200 border border-teal-200 hover:border-teal-300 hover:shadow-md">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700 font-medium flex items-center gap-2 sm:gap-3">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-500 rounded-md sm:rounded-lg flex items-center justify-center">
                                  <Bath className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                                </div>
                                <span className="text-sm sm:text-base">
                                  Bathrooms
                                </span>
                              </span>
                              <span className="font-bold text-gray-900 text-lg sm:text-xl px-2 sm:px-3 py-1 bg-white rounded-lg shadow-sm">
                                {property.bathrooms}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Pricing & Listing Info */}
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
                          <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-gray-900">
                          Pricing & Details
                        </h4>
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        <div className="p-3 sm:p-4 bg-gradient-to-br from-gray-50 via-gray-100/50 to-gray-50 rounded-lg sm:rounded-xl border-2 border-gray-200 shadow-lg">
                          <div className="text-gray-700 font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                            Price
                          </div>
                          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-1 break-words leading-tight">
                            {formatPrice(property.price!)}
                          </div>
                          {property.status === "for-rent" && (
                            <span className="text-gray-600 font-medium text-sm sm:text-base">
                              per month
                            </span>
                          )}
                        </div>

                        <div className="group p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 border border-gray-100 hover:border-gray-200 hover:shadow-sm">
                          <div className="flex justify-between items-center gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                                <Calendar className="h-4 w-4 text-white" />
                              </div>
                              <span className="text-gray-600 font-medium text-sm">
                                Listed
                              </span>
                            </div>
                            <span className="font-bold text-sm text-gray-900 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-200 whitespace-nowrap">
                              {property.createdAt
                                ? new Date(
                                    property.createdAt
                                  ).toLocaleDateString("en-GB", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })
                                : "Recently"}
                            </span>
                          </div>
                        </div>

                        {property.featured && (
                          <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border-2 border-amber-200 shadow-md">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-md">
                                  <Star className="h-4 w-4 text-white fill-current" />
                                </div>
                                <span className="text-amber-700 font-semibold text-sm">
                                  Featured Property
                                </span>
                              </div>
                              <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-2 py-1 shadow-md text-xs">
                                PREMIUM
                              </Badge>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-10 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                  {/* Enhanced Property Features Grid */}
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                      Property Highlights
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                      <div className="group text-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl hover:from-blue-50 hover:to-blue-100/50 transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:shadow-lg transform hover:-translate-y-1">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-gray-600 to-gray-700 group-hover:from-blue-500 group-hover:to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-all duration-300 shadow-lg">
                          <Building className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 font-semibold">
                          Property Type
                        </div>
                        <div className="font-bold text-gray-900 capitalize text-sm sm:text-base lg:text-lg">
                          {property.type}
                        </div>
                      </div>

                      {property.bedrooms! > 0 && (
                        <div className="group text-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl hover:from-emerald-50 hover:to-emerald-100/50 transition-all duration-300 border border-gray-100 hover:border-emerald-200 hover:shadow-lg transform hover:-translate-y-1">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-gray-600 to-gray-700 group-hover:from-emerald-500 group-hover:to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-all duration-300 shadow-lg">
                            <Bed className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 font-semibold">
                            Bedrooms
                          </div>
                          <div className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg">
                            {property.bedrooms}
                          </div>
                        </div>
                      )}

                      {property.bathrooms! > 0 && (
                        <div className="group text-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl hover:from-purple-50 hover:to-purple-100/50 transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:shadow-lg transform hover:-translate-y-1">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-gray-600 to-gray-700 group-hover:from-purple-500 group-hover:to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-all duration-300 shadow-lg">
                            <Bath className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 font-semibold">
                            Bathrooms
                          </div>
                          <div className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg">
                            {property.bathrooms}
                          </div>
                        </div>
                      )}

                      <div className="group text-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl hover:from-orange-50 hover:to-orange-100/50 transition-all duration-300 border border-gray-100 hover:border-orange-200 hover:shadow-lg transform hover:-translate-y-1">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-gray-600 to-gray-700 group-hover:from-orange-500 group-hover:to-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-all duration-300 shadow-lg">
                          <Square className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 font-semibold">
                          Floor Area
                        </div>
                        <div className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg">
                          {property.size} m²
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar with Action Cards */}
          <div className="space-y-4 sm:space-y-6 animate-slide-up mx-2 sm:mx-0">
            {/* Enhanced Book Appointment Card */}
            <Card className="shadow-xl lg:shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent flex items-center">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-blue-600" />
                  <span className="text-base sm:text-xl">Schedule a Visit</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userAppointment ? (
                  <div className="flex flex-col items-center gap-2">
                    <Button
                      className="w-full cursor-not-allowed h-12 text-lg"
                      disabled
                    >
                      Appointment Booked
                    </Button>
                    <div className="w-full flex gap-2">
                      <Button
                        variant="secondary"
                        className="w-full bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() => setIsEditDialogOpen(true)}
                      >
                        Edit Appointment
                      </Button>
                      <AlertDialog
                        open={showCancelConfirm}
                        onOpenChange={setShowCancelConfirm}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            className="w-full"
                            onClick={() => setShowCancelConfirm(true)}
                            disabled={isCanceling}
                          >
                            Cancel Appointment
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-[92vw] max-w-[425px]">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure you want to cancel your appointment?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              We value your interest in this property! If
                              something went wrong or you need help, please{" "}
                              <span className="text-blue-600 font-semibold">
                                contact our support team(+220 7595999 or +220
                                3902798)
                              </span>{" "}
                              before canceling.
                              <br />
                              <br />
                              Canceling your appointment means you may lose your
                              reserved slot. Would you like to proceed?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel disabled={isCanceling}>
                              Keep Appointment
                            </AlertDialogCancel>
                            <AlertDialogAction asChild>
                              <Button
                                variant="destructive"
                                className="w-full"
                                onClick={handleCancelAppointment}
                                disabled={isCanceling}
                              >
                                {isCanceling ? (
                                  <span className="flex items-center justify-center">
                                    <span className="animate-spin mr-2 h-4 w-4 border-2 border-t-2 border-gray-300 border-t-red-600 rounded-full"></span>
                                    Canceling...
                                  </span>
                                ) : (
                                  "Yes, Cancel Appointment"
                                )}
                              </Button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    <Dialog
                      open={isEditDialogOpen}
                      onOpenChange={setIsEditDialogOpen}
                    >
                      <DialogContent className="w-[92vw] max-w-[425px] max-h-[85vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Appointment</DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={handleEditAppointmentSubmit}
                          className="space-y-4"
                        >
                          <div>
                            <Label htmlFor="editName">Full Name</Label>
                            <Input
                              id="editName"
                              value={editForm.name}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  name: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="editEmail">Email</Label>
                            <Input
                              id="editEmail"
                              type="email"
                              value={editForm.email}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  email: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="editPhone">Phone</Label>
                            <Input
                              id="editPhone"
                              type="tel"
                              value={editForm.phone}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  phone: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="editDate">Date</Label>
                              <Input
                                id="editDate"
                                type="date"
                                value={editForm.date}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    date: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="editTime">Time</Label>
                              <Input
                                id="editTime"
                                type="time"
                                value={editForm.time}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    time: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="editMessage">
                              Message (Optional)
                            </Label>
                            <Textarea
                              id="editMessage"
                              value={editForm.message}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  message: e.target.value,
                                })
                              }
                              placeholder="Any specific requirements or questions..."
                            />
                          </div>
                          <Button
                            type="submit"
                            className="w-full"
                            disabled={isEditing}
                          >
                            {isEditing ? (
                              <span className="flex items-center justify-center">
                                <span className="animate-spin mr-2 h-4 w-4 border-2 border-t-2 border-gray-300 border-t-blue-600 rounded-full"></span>
                                Saving...
                              </span>
                            ) : (
                              "Save Changes"
                            )}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : (
                  /* Optionally show appointment details here */
                  <Dialog
                    open={isAppointmentDialogOpen}
                    onOpenChange={(open) => {
                      setIsAppointmentDialogOpen(open);
                      if (open && isAuthenticated && user) {
                        setAppointmentForm((prev) => ({
                          ...prev,
                          name: user.name || "",
                          email: user.email || "",
                        }));
                      }
                      if (!open) {
                        // Reset only phone, date, time, message when closing dialog, keep name/email from user
                        setAppointmentForm((prev) => ({
                          ...prev,
                          phone: "",
                          date: "",
                          time: "",
                          message: "",
                        }));
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        className="w-full h-12 text-lg"
                        onClick={(e) => {
                          e.preventDefault();
                          handleProtectedAction(() =>
                            setIsAppointmentDialogOpen(true)
                          );
                        }}
                      >
                        <Calendar color="white" className="mr-3 h-5 w-5" />
                        Book Appointment
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[92vw] max-w-[425px] max-h-[85vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Book an Appointment</DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={handleAppointmentSubmit}
                        className="space-y-4"
                      >
                        <div>
                          <Label htmlFor="appName">Full Name</Label>
                          <Input
                            id="appName"
                            value={appointmentForm.name}
                            onChange={(e) =>
                              setAppointmentForm({
                                ...appointmentForm,
                                name: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="appEmail">Email</Label>
                          <Input
                            id="appEmail"
                            type="email"
                            value={appointmentForm.email}
                            onChange={(e) =>
                              setAppointmentForm({
                                ...appointmentForm,
                                email: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="appPhone">Phone</Label>
                          <Input
                            id="appPhone"
                            type="tel"
                            value={appointmentForm.phone}
                            onChange={(e) =>
                              setAppointmentForm({
                                ...appointmentForm,
                                phone: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="appDate">Date</Label>
                            <Input
                              id="appDate"
                              type="date"
                              value={appointmentForm.date}
                              onChange={(e) =>
                                setAppointmentForm({
                                  ...appointmentForm,
                                  date: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="appTime">Time</Label>
                            <Input
                              id="appTime"
                              type="time"
                              value={appointmentForm.time}
                              onChange={(e) =>
                                setAppointmentForm({
                                  ...appointmentForm,
                                  time: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="appMessage">Message (Optional)</Label>
                          <Textarea
                            id="appMessage"
                            value={appointmentForm.message}
                            onChange={(e) =>
                              setAppointmentForm({
                                ...appointmentForm,
                                message: e.target.value,
                              })
                            }
                            placeholder="Any specific requirements or questions..."
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isBooking}
                        >
                          {isBooking ? (
                            <span className="flex items-center justify-center">
                              <span className="animate-spin mr-2 h-4 w-4 border-2 border-t-2 border-gray-300 border-t-blue-600 rounded-full"></span>
                              Booking...
                            </span>
                          ) : (
                            "Book Appointment"
                          )}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Request More Info Card */}
            <Card className="shadow-xl lg:shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent flex items-center">
                  <Info className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-purple-600" />
                  <span className="text-base sm:text-xl">
                    Request More Info
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog
                  open={isRequestInfoDialogOpen}
                  onOpenChange={(open) => {
                    setIsRequestInfoDialogOpen(open);
                    if (open && isAuthenticated && user) {
                      setRequestInfoForm((prev) => ({
                        ...prev,
                        name: user.name || "",
                        email: user.email || "",
                      }));
                    }
                    if (!open) {
                      setRequestInfoForm((prev) => ({
                        ...prev,
                        phone: "",
                        message: "",
                      }));
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-12 text-lg"
                      onClick={(e) => {
                        e.preventDefault();
                        handleProtectedAction(() =>
                          setIsRequestInfoDialogOpen(true)
                        );
                      }}
                    >
                      <Info className="mr-3 h-5 w-5" />
                      Request More Info
                    </Button>
                  </DialogTrigger>
                  {/* Login Prompt Dialog */}
                  <Dialog
                    open={showLoginPrompt}
                    onOpenChange={setShowLoginPrompt}
                  >
                    <DialogContent className="w-[88vw] max-w-sm">
                      <DialogHeader>
                        <DialogTitle>Login Required</DialogTitle>
                      </DialogHeader>
                      <div className="py-4 text-gray-700 text-base">
                        You need to be logged in to book an appointment or
                        request more information about this property.
                      </div>
                      <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                        <Button
                          variant="secondary"
                          onClick={() => setShowLoginPrompt(false)}
                          className="w-full sm:w-auto"
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="default"
                          onClick={() => {
                            setShowLoginPrompt(false);
                            window.location.href = "/auth";
                          }}
                          className="w-full sm:w-auto"
                        >
                          Go to Login
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <DialogContent className="w-[92vw] max-w-[425px] max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Request More Information</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={handleRequestInfoSubmit}
                      className="space-y-4"
                    >
                      <div>
                        <Label htmlFor="reqName">Full Name</Label>
                        <Input
                          id="reqName"
                          value={requestInfoForm.name}
                          onChange={(e) =>
                            setRequestInfoForm({
                              ...requestInfoForm,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="reqEmail">Email</Label>
                        <Input
                          id="reqEmail"
                          type="email"
                          value={requestInfoForm.email}
                          onChange={(e) =>
                            setRequestInfoForm({
                              ...requestInfoForm,
                              email: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="reqPhone">Phone</Label>
                        <Input
                          id="reqPhone"
                          type="tel"
                          value={requestInfoForm.phone}
                          onChange={(e) =>
                            setRequestInfoForm({
                              ...requestInfoForm,
                              phone: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="reqMessage">Message (Optional)</Label>
                        <Textarea
                          id="reqMessage"
                          value={requestInfoForm.message}
                          onChange={(e) =>
                            setRequestInfoForm({
                              ...requestInfoForm,
                              message: e.target.value,
                            })
                          }
                          placeholder="I would like more information about this property..."
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isRequestingInfo}
                      >
                        {isRequestingInfo ? (
                          <span className="flex items-center justify-center">
                            <span className="animate-spin mr-2 h-4 w-4 border-2 border-t-2 border-gray-300 border-t-blue-600 rounded-full"></span>
                            Sending...
                          </span>
                        ) : (
                          "Send Request"
                        )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Virtual Tour and Location Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12 mx-2 sm:mx-0">
          {/* Virtual Tour */}
          <Card className="shadow-xl lg:shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="flex items-center text-lg sm:text-2xl">
                <Video className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-blue-600" />
                <span className="text-base sm:text-xl">360° Virtual Tour</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center min-h-[150px] sm:min-h-[200px]">
                <div className="text-center">
                  <Video className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600 mx-auto mb-3 sm:mb-4" />
                  <p className="text-gray-700 mb-3 sm:mb-4 text-base sm:text-lg font-medium">
                    Feature coming soon
                  </p>
                  <span className="text-gray-500 text-xs sm:text-sm">
                    You&apos;ll be able to explore this property in 360° soon.
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="shadow-xl lg:shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-lg sm:text-2xl">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-blue-600" />
                <span className="text-base sm:text-xl">
                  Location & Neighborhood
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg sm:rounded-xl mb-4 sm:mb-6 min-h-[150px] sm:min-h-[200px]">
                {property.location.coordinates?.lat &&
                property.location.coordinates?.lng ? (
                  <PropertyMap
                    lat={property.location.coordinates.lat}
                    lng={property.location.coordinates.lng}
                    title={property.title}
                    address={property.location.address}
                    price={formatPrice(property.price || 0, property.currency || "GMD")}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                      <p className="text-gray-700 text-lg font-medium">
                        Interactive Map
                      </p>
                      <p className="text-gray-500">
                        Location coordinates not available
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-xl">
                  <h4 className="font-bold text-gray-900 mb-3 text-lg">
                    Address
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {property.location.address}
                    <br />
                    {property.location.city},{" "}
                    {property.location.state && `${property.location.state}, `}
                    {property.location.country}
                  </p>
                </div>

                <div className="p-6 bg-gray-50 rounded-xl">
                  <h4 className="font-bold text-gray-900 mb-3 text-lg">
                    Property Details
                  </h4>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>
                        Listed{" "}
                        {new Date(property.createdAt!).toLocaleDateString()}
                      </span>
                    </div>
                    {/* <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>
                          Updated{" "}
                          {new Date(property.updatedAt).toLocaleDateString()}
                        </span>
                      </div> */}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
