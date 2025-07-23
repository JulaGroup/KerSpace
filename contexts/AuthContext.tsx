"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, ReactNode } from "react";

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

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call your API
    const mockUsers = [
      {
        id: "1",
        email: "user@demo.com",
        name: "John Doe",
        role: "user" as UserRole,
      },
      {
        id: "2",
        email: "vendor@demo.com",
        name: "Jane Smith",
        role: "vendor" as UserRole,
      },
      {
        id: "3",
        email: "admin@demo.com",
        name: "Admin User",
        role: "admin" as UserRole,
      },
    ];

    const foundUser = mockUsers.find((u) => u.email === email);
    if (foundUser && password === "demo123") {
      setUser(foundUser);
      router.push("/dashboard"); // Redirect to admin dashboard for admin users
      return true;
    }
    return false;
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: UserRole = "user"
  ): Promise<boolean> => {
    // Mock registration
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      role,
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
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
