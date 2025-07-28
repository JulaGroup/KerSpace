import { Loader2 } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center h-screen w-full justify-center space-y-4 mt-10">
      <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
      <p className="text-xl font-medium text-gray-700">Loading...</p>
      <p className="text-sm text-gray-500 max-w-md text-center">
        Please wait while we fetch the latest data for you.
      </p>
    </div>
  );
}
