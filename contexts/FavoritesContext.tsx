"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface FavoritesContextType {
  favorites: string[]; // Array of property IDs
  isFavorite: (propertyId: string) => boolean;
  refreshFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const fetchFavorites = async () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (!token) {
      setFavorites([]);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        // If backend returns array of property objects, map to IDs
        const ids = Array.isArray(data)
          ? data.map((p: any) => p._id || p.id || p.propertyId)
          : [];
        setFavorites(ids);
      } else {
        setFavorites([]);
      }
    } catch {
      setFavorites([]);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const isFavorite = (propertyId: string) => favorites.includes(propertyId);

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, refreshFavorites: fetchFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
