"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { API_URL } from "@/config/constat";

export type UserRole = "public" | "user" | "vendor" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    name: string,
    role?: UserRole
  ) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  // Hydrate user from JWT in localStorage on initial load and when token changes
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Decode JWT payload
          const payload = JSON.parse(atob(token.split(".")[1]));
          setUser({
            id: payload.id || "",
            email: payload.email,
            name: payload.name,
            role: payload.role,
          });
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        // Decode JWT payload
        const payload = JSON.parse(atob(data.token.split(".")[1]));
        setUser({
          id: payload.id || "",
          email: payload.email,
          name: payload.name,
          role: payload.role,
        });
        // Redirect based on role
        if (payload.role === "admin") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role?: UserRole
  ): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      if (data && data.token) {
        localStorage.setItem("token", data.token);
        // Decode JWT payload
        const payload = JSON.parse(atob(data.token.split(".")[1]));
        setUser({
          id: payload.id || "",
          email: payload.email,
          name: payload.name,
          role: payload.role,
        });
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
