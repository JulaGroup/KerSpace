"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, MapPin, Phone, Eye } from "lucide-react";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/config/constat";

// Define the Appointment type based on expected properties
interface Appointment {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  message?: string;
  propertyId: string;
}

export function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const [appsRes, propsRes] = await Promise.all([
          axios.get(`${API_URL}/api/admin/appointments`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/api/properties`),
        ]);
        setAppointments(Array.isArray(appsRes.data) ? appsRes.data : []);
        setProperties(Array.isArray(propsRes.data) ? propsRes.data : []);
      } catch (err: any) {
        setError(err?.message || "Failed to fetch appointments");
        setAppointments([]);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Spinner />
        <span className="mt-4 text-gray-400">Loading appointments...</span>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <span className="text-red-400 font-semibold">{error}</span>
        <Button
          onClick={() => window.location.reload()}
          className="mt-4"
          variant="outline"
        >
          Retry
        </Button>
      </div>
    );

  if (!appointments.length)
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <span className="text-gray-400">No appointments found.</span>
      </div>
    );

  // Ensure appointments is always an array
  const safeAppointments = Array.isArray(appointments) ? appointments : [];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-2 bg-background text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Property View Appointments</h1>

        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeAppointments.map((appt: Appointment) => {
            const property = properties.find(
              (p: any) => p.id === appt.propertyId
            );
            const formattedDate = new Date(
              `${appt.date}T${appt.time}`
            ).toLocaleString("en-GB", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              timeZone: "Africa/Banjul",
            });

            return (
              <Card
                key={appt.id}
                className="overflow-hidden w-full bg-muted border border-border shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold text-white truncate">
                        {appt.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="h-4 w-4" /> {appt.phone}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 pb-4 px-4 space-y-3">
                  {property && (
                    <div className="inline-flex items-center gap-1 text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full">
                      <Eye className="h-3 w-3" /> {property.title}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{formattedDate}</span>
                  </div>

                  {appt.message && (
                    <div className="text-sm text-gray-400 italic border-l-2 border-gray-600 pl-3">
                      “{appt.message}”
                    </div>
                  )}

                  <Separator className="bg-gray-700" />

                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <User className="h-4 w-4" /> {appt.email}
                  </div>

                  {property && (
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {property.location.address}, {property.location.city}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
