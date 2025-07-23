"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Property } from "@/types/property";
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
  Info, // Added Info icon for Request More Info
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function PropertyDetailPage() {
  const params = useParams();
  const { isAuthenticated } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
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
  const [requestInfoForm, setRequestInfoForm] = useState({
    // New state for Request More Info form
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(true);
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
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Header />
        <div className="text-center text-lg text-gray-600">
          Loading property...
        </div>
      </div>
    );
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

    // Here you would typically send the appointment data to your backend
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
  };

  const handleRequestInfoSubmit = (e: React.FormEvent) => {
    // New submit handler for Request More Info
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please sign in to request more information");
      return;
    }

    // Here you would typically send the request info data to your backend
    toast.success("Your request has been sent successfully!");
    setIsRequestInfoDialogOpen(false);
    setRequestInfoForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
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
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white px-3 py-1`}
                >
                  {property.status === "for-sale" ? "For Sale" : "For Rent"}
                </Badge>
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
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  if (!isAuthenticated) {
                    setShowLoginPrompt(true);
                  } else {
                    setIsLiked(!isLiked);
                  }
                }}
                className="border-red-200 hover:bg-red-50"
              >
                <Heart
                  className={`h-5 w-5 mr-2 ${
                    isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                  }`}
                />
                {isLiked ? "Saved" : "Save"}
              </Button>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

            {/* Virtual Tour */}
            {/* Assuming property.virtualTourUrl exists if you want to display this section */}
            {/*
            {property.virtualTourUrl && (
              <Card className="shadow-lg border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-2xl">
                    <Video className="h-6 w-6 mr-3 text-blue-600" />
                    Virtual Tour
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Video className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                      <p className="text-gray-700 mb-4 text-lg font-medium">
                        Experience this property in 360°
                      </p>
                      <Button size="lg" asChild>
                        <a
                          href={property.virtualTourUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center"
                        >
                          <Video className="mr-2 h-5 w-5" />
                          Start Virtual Tour
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            */}

            {/* Location */}
            <Card className="shadow-lg border-0">
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
                      {property.location.state &&
                        `${property.location.state}, `}
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
                        ? "bg-emerald-600"
                        : "bg-blue-600"
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
                <Dialog
                  open={isAppointmentDialogOpen}
                  onOpenChange={setIsAppointmentDialogOpen}
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
                      <Calendar className="mr-3 h-5 w-5" />
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
                      <Button type="submit" className="w-full">
                        Book Appointment
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
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
                  onOpenChange={setIsRequestInfoDialogOpen}
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
                      <Button type="submit" className="w-full">
                        Send Request
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
