"use client";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Home, Clock, Search } from "lucide-react";
import Image from "next/image";

interface Appointment {
  _id: string;
  property?: {
    _id: string;
    title: string;
    location: { address: string; city: string };
    images?: string[];
  };
  propertyId?: {
    _id: string;
    title: string;
    location: { address: string; city: string };
    images?: string[];
  };
  date: string;
  status: "pending" | "confirmed" | "cancelled";
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointments() {
      setLoading(true);
      try {
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) {
          setAppointments([]);
          setLoading(false);
          return;
        }
        const res = await fetch(
          `${API_URL}/api/appointments`, // Use API_URL constant
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setAppointments(data);
        } else {
          setAppointments([]);
        }
      } catch {
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 mt-11">
      <Header />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          My Appointments
        </h1>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-48 bg-white rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : appointments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {appointments.map((appt) => {
              // Support both appt.property and appt.propertyId
              const prop = appt.property || appt.propertyId;
              return (
                <div
                  key={appt._id}
                  className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl transition-all border border-gray-100"
                >
                  {/* Property Image */}
                  <div className="flex-shrink-0 w-full md:w-40 h-40 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                    {prop &&
                    Array.isArray(prop.images) &&
                    prop.images.length > 0 &&
                    prop.images[0] ? (
                      <Image
                        width={160}
                        height={160}
                        src={prop.images[0]}
                        alt={prop.title || "Property"}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Home className="h-12 w-12 text-gray-300" />
                    )}
                  </div>
                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
                        {prop?.title || "Property"}
                      </h2>
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="line-clamp-1">
                          {prop?.location?.address || ""}
                          {prop?.location?.city
                            ? `, ${prop.location.city}`
                            : ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mb-2">
                        <span className="flex items-center text-gray-700 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(appt.date).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center text-gray-700 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(appt.date).toLocaleTimeString(undefined, {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <Badge
                        className={`px-3 py-1 rounded-full font-semibold text-xs ${
                          statusColors[appt.status]
                        }`.trim()}
                      >
                        {appt.status.charAt(0).toUpperCase() +
                          appt.status.slice(1)}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-50 ml-2"
                        onClick={() =>
                          prop?._id &&
                          (window.location.href = `/property/${prop._id}`)
                        }
                      >
                        View Property
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center border border-gray-100 mt-8">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No appointments found
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              You have no appointments yet. Book a property viewing to get
              started!
            </p>
            <Button
              onClick={() => (window.location.href = "/listings")}
              className="px-8 py-3 rounded-full text-blue-600 border border-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200"
            >
              Browse Properties
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
