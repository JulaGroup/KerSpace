import Link from "next/link";
import { Home, Search, ArrowLeft, MapPin, Building, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className="text-center max-w-4xl mx-auto">
          {/* 404 Number with gradient */}
          <div className="mb-8 relative">
            <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-extrabold leading-none">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                404
              </span>
            </h1>
            <div className="absolute inset-0 text-8xl sm:text-9xl lg:text-[12rem] font-extrabold leading-none text-blue-100/30 blur-sm -z-10">
              404
            </div>
          </div>

          {/* Status badge */}
          <Badge className="mb-6 bg-red-100 text-red-700 px-6 py-2 text-sm font-semibold">
            Page Not Found
          </Badge>

          {/* Title and description */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Oops! This property doesn&apos;t exist
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
            Looks like this page has been sold or moved to a new address.
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-xl mx-auto">
            Don&apos;t worry though - there are plenty of amazing properties
            waiting for you on KërSpace.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/" passHref>
              <Button
                size="lg"
                className="group px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300 border-0 min-w-[200px]"
              >
                <Home className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                Go Home
              </Button>
            </Link>
            <Link href="/listings" passHref>
              <Button
                variant="outline"
                size="lg"
                className="group px-8 py-6 text-lg font-semibold bg-white/80 backdrop-blur-md border-gray-200 text-gray-700 hover:bg-white hover:text-blue-600 hover:border-blue-300 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 min-w-[200px]"
              >
                <Search className="mr-3 h-6 w-6" />
                Browse Properties
              </Button>
            </Link>
          </div>

          {/* Quick stats or suggestions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 mb-4 group-hover:scale-110 transition-transform">
                <Building className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">1,200+</h3>
              <p className="text-gray-600">Properties Available</p>
            </div>

            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600">Locations Covered</p>
            </div>

            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">5,000+</h3>
              <p className="text-gray-600">Happy Clients</p>
            </div>
          </div>
        </div>

        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-blue-200 rounded-full animate-bounce delay-300 opacity-60" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-purple-200 rounded-full animate-bounce delay-700 opacity-60" />
        <div className="absolute bottom-32 left-20 w-10 h-10 bg-pink-200 rounded-full animate-bounce delay-1000 opacity-60" />
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-blue-200 rounded-full animate-bounce delay-500 opacity-60" />
      </div>

      {/* Back to top indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <Link href="/" passHref>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to KërSpace
          </Button>
        </Link>
      </div>
    </div>
  );
}
