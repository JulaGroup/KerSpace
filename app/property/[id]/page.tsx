"use client";

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
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useFavorites } from "@/contexts/FavoritesContext";
import LoadingPage from "@/components/loading";

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
        const res = await fetch(
          `http://localhost:5000/api/properties/${params.id}`
        );
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
          `http://localhost:5000/api/appointments/property/${params.id}`,
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
    fetch(`http://localhost:5000/api/appointments/${userAppointment._id}`, {
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
        `http://localhost:5000/api/appointments/${userAppointment._id}`,
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GMD",
      minimumFractionDigits: 0,
    }).format(price);
  };

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
    fetch("http://localhost:5000/api/appointments", {
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
              `http://localhost:5000/api/appointments/property/${params.id}`,
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
    fetch("http://localhost:5000/api/requests", {
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
      const res = await fetch(
        `http://localhost:5000/api/favorites/${params.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
      const res = await fetch(
        `http://localhost:5000/api/favorites/${params.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 mt-16">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* <button
          className="mb-4 bg-blue-600 text-white py-1 px-6 rounded hover:hover:bg-blue-700 transition-colors"
          onClick={() => window.history.back()}
        >
          Back
        </button> */}
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/listings" className="hover:text-blue-600">
              Listing
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">
              {property.title}
            </span>
          </nav>
        </div>

        {/* Header with Actions */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <Badge
                  variant={
                    property.status === "for-sale" ? "default" : "secondary"
                  }
                  className={`${
                    property.status === "for-sale"
                      ? "bg-emerald-600"
                      : "bg-blue-600"
                  } text-white px-3 py-1`}
                >
                  {property.status === "for-sale" ? "For Sale" : "For Rent"}
                </Badge>
                {/* Availability Chip - always visible, strong bg */}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ml-1
                    ${
                      property.available
                        ? "bg-emerald-600 text-white"
                        : "bg-red-600 text-white"
                    }
                  `}
                >
                  {property.available ? "Available" : "Not Available"}
                </span>
                {property.featured && (
                  <Badge
                    variant="outline"
                    className="border-amber-300 text-amber-700 bg-amber-50"
                  >
                    <Star className="mr-1 h-3 w-3" />
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {property.title}
              </h1>

              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                <span className="text-lg">
                  {property.location.address}, {property.location.city},{" "}
                  {property.location.state && `${property.location.state}, `}
                  {property.location.country}
                </span>
              </div>

              <div className="text-4xl font-bold text-blue-600 mb-2">
                {formatPrice(property.price!)}
                {property.status === "for-rent" && (
                  <span className="text-xl font-normal text-gray-500 ml-2">
                    /month
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Favorite/Unsave Button with Confirmation Dialog */}
              {isFavorite(property._id) ? (
                <>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setShowUnsaveConfirm(true)}
                    className="border-red-200 hover:bg-red-50"
                    disabled={isFavoriting}
                  >
                    <Heart className="h-5 w-5 mr-2 fill-red-500 text-red-500" />
                    {isFavoriting ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin mr-2 h-4 w-4 border-2 border-t-2 border-gray-300 border-t-red-600 rounded-full"></span>
                        Removing...
                      </span>
                    ) : (
                      "Saved"
                    )}
                  </Button>
                  <Dialog
                    open={showUnsaveConfirm}
                    onOpenChange={setShowUnsaveConfirm}
                  >
                    <DialogContent className="max-w-sm">
                      <DialogHeader>
                        <DialogTitle>Remove from Favorites?</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to remove this property from
                          your favorites?
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="secondary"
                          onClick={() => setShowUnsaveConfirm(false)}
                          disabled={isFavoriting}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleUnsaveFavorite}
                          disabled={isFavoriting}
                        >
                          {isFavoriting ? "Removing..." : "Remove"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleFavorite}
                  className="border-red-200 hover:bg-red-50"
                  disabled={isFavoriting}
                >
                  <Heart className="h-5 w-5 mr-2 text-gray-600" />
                  {isFavoriting ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-t-2 border-gray-300 border-t-red-600 rounded-full"></span>
                      Saving...
                    </span>
                  ) : (
                    "Save"
                  )}
                </Button>
              )}
              <Button
                variant="outline"
                size="lg"
                onClick={handleShare}
                className="hover:bg-blue-50 border-blue-200"
              >
                <Share2 className="h-5 w-5 mr-2 text-blue-600" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card className="overflow-hidden shadow-xl border-0">
              <CardContent className="p-0">
                <div
                  className="relative h-[60vh] overflow-hidden cursor-pointer"
                  onClick={() => setIsFullScreenImageOpen(true)} // Open full screen on click
                >
                  <Image
                    src={property.images![currentImageIndex]}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />

                  {/* Image counter */}
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                    <Camera className="inline h-4 w-4 mr-1" />
                    {currentImageIndex + 1} / {property.images!.length}
                  </div>

                  {property.images!.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent opening full screen when clicking arrows
                          prevImage();
                        }}
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent opening full screen when clicking arrows
                          nextImage();
                        }}
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {property.images!.length > 1 && (
                  <div className="p-4 bg-gray-50">
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                      {property.images!.map((image, index) => (
                        <button
                          key={index}
                          className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentImageIndex
                              ? "border-blue-500 shadow-lg"
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
              <DialogContent className="max-w-full h-[100vh] p-0 flex flex-col">
                <DialogHeader className="p-4 flex flex-row justify-between items-center bg-black/80 text-white">
                  <DialogTitle className="text-xl font-semibold">
                    {property.title} - Image {currentImageIndex + 1} of{" "}
                    {property.images!.length}
                  </DialogTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsFullScreenImageOpen(false)}
                    className="text-white hover:bg-gray-700"
                  >
                    <X className="h-6 w-6" />
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
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white hover:bg-white/40"
                        onClick={prevImage}
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 text-white hover:bg-white/40"
                        onClick={nextImage}
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            {/* Property Overview */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {property.description}
                  </p>
                </div>
                <Separator className="my-8" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                    <Building className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                    <div className="text-sm text-gray-600 mb-1">Type</div>
                    <div className="font-bold text-gray-900 capitalize text-lg">
                      {property.type}
                    </div>
                  </div>
                  {property.bedrooms! > 0 && (
                    <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
                      <Bed className="h-10 w-10 text-emerald-600 mx-auto mb-3" />
                      <div className="text-sm text-gray-600 mb-1">Bedrooms</div>
                      <div className="font-bold text-gray-900 text-lg">
                        {property.bedrooms}
                      </div>
                    </div>
                  )}
                  {property.bathrooms! > 0 && (
                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                      <Bath className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                      <div className="text-sm text-gray-600 mb-1">
                        Bathrooms
                      </div>
                      <div className="font-bold text-gray-900 text-lg">
                        {property.bathrooms}
                      </div>
                    </div>
                  )}
                  <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                    <Square className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                    <div className="text-sm text-gray-600 mb-1">Area</div>
                    <div className="font-bold text-gray-900 text-lg">
                      {property.size} m²
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Property Summary */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Property Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Price:</span>
                  <span className="font-bold text-lg text-blue-600">
                    {formatPrice(property.price!)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Type:</span>
                  <span className="font-bold text-gray-900 capitalize">
                    {property.type}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Status:</span>
                  <Badge
                    variant={
                      property.status === "for-sale" ? "default" : "secondary"
                    }
                    className={
                      property.status === "for-sale"
                        ? "bg-emerald-600 text-white"
                        : "bg-blue-600 text-white"
                    }
                  >
                    {property.status === "for-sale" ? "For Sale" : "For Rent"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Size:</span>
                  <span className="font-bold text-gray-900">
                    {property.size} m²
                  </span>
                </div>
                {property.bedrooms! > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Bedrooms:</span>
                    <span className="font-bold text-gray-900">
                      {property.bedrooms}
                    </span>
                  </div>
                )}
                {property.bathrooms! > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      Bathrooms:
                    </span>
                    <span className="font-bold text-gray-900">
                      {property.bathrooms}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Book Appointment */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Schedule a Visit</CardTitle>
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
                        <AlertDialogContent>
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
                      <DialogContent className="sm:max-w-[425px]">
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
                          <div className="grid grid-cols-2 gap-4">
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
                    <DialogContent className="sm:max-w-[425px]">
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
                        <div className="grid grid-cols-2 gap-4">
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

            {/* Request More Info Card */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Request More Info</CardTitle>
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
                    <DialogContent className="max-w-sm">
                      <DialogHeader>
                        <DialogTitle>Login Required</DialogTitle>
                      </DialogHeader>
                      <div className="py-4 text-gray-700 text-base">
                        You need to be logged in to book an appointment or
                        request more information about this property.
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button
                          variant="secondary"
                          onClick={() => setShowLoginPrompt(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="default"
                          onClick={() => {
                            setShowLoginPrompt(false);
                            window.location.href = "/auth";
                          }}
                        >
                          Go to Login
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <DialogContent className="sm:max-w-[425px]">
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
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-6 w-full">
          {/* Virtual Tour */}
          <Card className="shadow-lg border-0 w-full lg:w-1/2 flex-shrink-0 min-w-0">
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
                    You&apos;ll be able to explore this property in 360° soon.
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="shadow-lg border-0 w-full lg:w-1/2 flex-shrink-0 min-w-0">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <MapPin className="h-6 w-6 mr-3 text-blue-600" />
                Location & Neighborhood
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                  <p className="text-gray-700 text-lg font-medium">
                    Interactive Map
                  </p>
                  <p className="text-gray-500">Coming soon</p>
                </div>
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
