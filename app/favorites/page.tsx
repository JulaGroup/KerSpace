"use client";
import { useEffect, useState } from "react";
import { Property } from "@/types/property";
import { PropertyCard } from "@/components/PropertyCard";
import { Header } from "@/components/Header";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Favorites = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      setLoading(true);
      try {
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) {
          setProperties([]);
          setLoading(false);
          return;
        }
        const res = await fetch(
          `${API_URL}/api/favorites/properties`, // Use API_URL constant
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch {
        setProperties([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFavorites();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 mt-11">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          My Favorites
        </h1>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-96 bg-white rounded-xl animate-pulse" />
            ))}
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center border border-gray-100 mt-8">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No favorites yet
            </h3>
            <p className="text-gray-600 mb-8 text-lg">
              You haven&apos;t added any properties to your favorites yet.
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

export default Favorites;
