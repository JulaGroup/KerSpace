export default function LoadingPage({ message = "Loading..." }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        {/* Minimal animated logo/icon */}
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-blue-200 dark:border-blue-900" />
          <div className="absolute inset-0 rounded-full border-2 border-t-blue-600 dark:border-t-blue-400 animate-spin" />
        </div>

        {/* Optional message */}
        {message && (
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
