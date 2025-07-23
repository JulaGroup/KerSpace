"use client";
import { Header } from "@/components/Header";
import Link from "next/link";

export default function VendorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/vendor/listings"
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">My Listings</h2>
            <p>View, edit, or delete your property listings.</p>
          </Link>
          <Link
            href="/vendor/add"
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">Add Listing</h2>
            <p>Add a new property listing to the platform.</p>
          </Link>
          <Link
            href="/vendor/appointments"
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">Appointments</h2>
            <p>View and manage your property appointments.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
