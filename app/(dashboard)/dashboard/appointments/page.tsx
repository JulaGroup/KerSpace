"use client";

import { AppointmentList } from "@/components/dashboard/AppointmentList";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        heading="Appointments"
        text="Manage property viewings and client meetings"
      />
      <AppointmentList />
    </div>
  );
}
