"use client";

import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Home, Mail, Lock, User, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          if (payload.role === "admin") {
            router.replace("/dashboard/");
          } else {
            router.replace("/");
          }
        } catch (e) {}
      }
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/auth/login`, // Use API_URL constant
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data && data.token) {
          toast.success("Signed in successfully!");
          // Store token for redirect logic
          if (typeof window !== "undefined") {
            localStorage.setItem("token", data.token);
          }
          const payload = JSON.parse(atob(data.token.split(".")[1]));
          if (payload.role === "admin") {
            router.push("/dashboard/");
          } else {
            router.push("/");
          }
        } else {
          toast.error("Invalid credentials. Please try again."); // Changed alert to toast
        }
      } else {
        toast.error("Login failed. Please try again."); // Changed alert to toast
      }
    } catch (error: any) {
      toast.error("An error occurred. Please try again."); // Changed alert to toast
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/api/auth/register`, // Use API_URL constant
        {
          email,
          password,
          name,
        }
      );
      if (res.data.success) {
        toast.success("Account created successfully!");
        setMode("login");
        setName("");
        setEmail("");
        setPassword("");
        setRole("user");
      } else {
        toast.error("Failed to create account. Please try again.");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
      toast.error("An error occurred. Please try again.");
      setPassword("");
      setRole("user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 shadow-2xl rounded-3xl overflow-hidden bg-white backdrop-blur-sm">
        {/* Form Section */}
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-12 py-4 lg:py-4 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600"></div>
          </div>

          <div className="relative z-10">
            {/* Logo/Brand */}
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                <Home className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">KërSpaces</h1>
                <p className="text-sm text-gray-500">
                  Find your space. Live your story
                </p>
              </div>
            </div>

            {/* Form Header */}
            <div className="mb-8">
              <h2 className="text-3xl lg:text-3xl font-bold text-gray-900 mb-2">
                {mode === "login"
                  ? "Welcome Back"
                  : "Unlock Your Perfect Space"}
              </h2>
              <p className="text-gray-600 text-base">
                {mode === "login"
                  ? "Sign in to explore properties, save favorites, and book appointments."
                  : "Create your account to start your property journey."}
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {mode === "register" && (
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 bg-white/80"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              )}

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 bg-white/80"
                    placeholder={
                      mode === "login"
                        ? "your.email@example.com"
                        : "Enter your email"
                    }
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 text-gray-900 placeholder-gray-400 bg-white/80"
                    placeholder={
                      mode === "login"
                        ? "Your secure password"
                        : "Create a secure password"
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={mode === "login" ? handleLogin : handleRegister}
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>
                      {mode === "login" ? "Sign In" : "Create Account"}
                    </span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Toggle Mode */}
            <div className="mt-4 text-center">
              <p className="text-gray-600 mb-3">
                {mode === "login"
                  ? "New to KërSpaces?"
                  : "Already have an account?"}
              </p>
              <button
                type="button"
                className="text-blue-600 hover:text-blue-700 font-semibold text-lg hover:underline transition-all duration-200"
                onClick={() => {
                  setMode(mode === "login" ? "register" : "login");
                  setEmail("");
                  setPassword("");
                  setName("");
                  setRole("user");
                }}
                disabled={isLoading}
              >
                {mode === "login" ? "Create an account" : "Sign in instead"}
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="hidden lg:block relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 z-10"></div>
          <img
            src="/login-hero.png" // Ensure this image is relevant to properties (homes, offices, lands)
            alt="Find Your Ideal Property with KërSpaces"
            className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20 bg-gradient-to-t from-black/60 to-transparent">
            <h3 className="text-2xl font-bold mb-2">
              Your Next Home, Office, or Land Awaits
            </h3>
            <p className="text-lg opacity-90">
              Explore a curated selection of properties for rent and sale,
              tailored to your needs.
            </p>
          </div>
        </div>

        {/* Mobile Hero Section */}
        <div className="lg:hidden relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-indigo-600/30 z-10"></div>
          <img
            src="/login-hero.png" // Ensure this image is relevant
            alt="Discover Properties on KërSpaces"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center text-white">
              <h3 className="text-xl font-bold mb-1">
                Your Property Journey Starts Here
              </h3>
              <p className="text-sm opacity-90">
                Rent, buy, book, and save with KërSpaces.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
