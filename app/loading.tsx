import { Loader2 } from "lucide-react";

export default function LoadingPage({ message = "Loading properties..." }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto">
        {/* KërSpace logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            KërSpace
          </h1>
        </div>

        {/* Simple spinner */}
        <div className="mb-6">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
        </div>

        {/* Loading message */}
        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-900">{message}</p>
          <p className="text-sm text-gray-500">Please wait a moment</p>
        </div>

        {/* Simple progress indicator */}
        <div className="mt-8 w-48 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
