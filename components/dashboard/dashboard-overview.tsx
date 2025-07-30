"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Overview } from "../dashboard/overview";
import { RecentSales } from "../dashboard/recent-sales";
import { Building2, Users, CalendarClock, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";

export function DashboardOverview() {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const appsRes = await fetch(`${API_URL}/api/appointments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const propsRes = await fetch(`${API_URL}/api/properties`);
        const apps = await appsRes.json();
        const props = await propsRes.json();
        if (mounted) {
          setAppointments(apps);
          setListings(props);
          setLoading(false);
        }
      } catch (err) {
        setAppointments([]);
        setListings([]);
        setLoading(false);
      }
    }
    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="w-10 h-10">
          <Spinner />
        </div>
        <span className="ml-4 text-lg text-gray-300">
          Loading dashboard data...
        </span>
      </div>
    );
  }

  // Analytics
  const totalProperties = listings.length;
  const activeListings = listings.filter(
    (l: any) => l.approvalStatus === "approved"
  ).length;
  const totalClients = 42; // Replace with real logic if available
  const pendingAppointments = appointments.length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Properties
          </CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProperties}</div>
          <p className="text-xs text-muted-foreground">+2 from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeListings}</div>
          <p className="text-xs text-muted-foreground">+1 since last week</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalClients}</div>
          <p className="text-xs text-muted-foreground">+5 from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Appointments
          </CardTitle>
          <CalendarClock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingAppointments}</div>
          <p className="text-xs text-muted-foreground">+2 since yesterday</p>
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>
            Property views and interactions over time
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview />
        </CardContent>
      </Card>
      <Card className="col-span-4 md:col-span-2">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>
            Latest property interactions and appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecentSales />
        </CardContent>
      </Card>
    </div>
  );
}
