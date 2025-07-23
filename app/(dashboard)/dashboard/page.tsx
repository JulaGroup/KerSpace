"use client";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checked, setChecked] = useState(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/auth");
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role === "admin") {
        setIsAdmin(true);
      } else {
        router.replace("/auth");
      }
    } catch {
      router.replace("/auth");
    }
    setChecked(true);
  }, [router]);

  if (!checked) return null;
  if (!isAdmin) return null;

  return (
    <div className="space-y-6">
      <DashboardHeader
        heading="Welcome, Muhammed!"
        text="Overview of Listings, Appointments, and Analytics"
      />
      <DashboardOverview />
    </div>
  );
}
