import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

// Set default icon paths
L.Icon.Default.mergeOptions({
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
  iconRetinaUrl: "/images/marker-icon-2x.png",
  shadowSize: [41, 41],
});

const gambianCities = [
  { name: "Banjul", lat: 13.4549, lng: -16.579 },
  { name: "Serrekunda", lat: 13.4384, lng: -16.678 },
  { name: "Brikama", lat: 13.2711, lng: -16.646 },
  { name: "Bakau", lat: 13.4781, lng: -16.6819 },
  { name: "Farafenni", lat: 13.5667, lng: -15.6 },
  // Add more cities
];

interface Coordinates {
  gplusCode: string;
}

interface MapPickerProps {
  value: Coordinates;
  onChange: (value: Coordinates) => void;
}

export function MapPicker({ value, onChange }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Custom marker icon
  const customIcon = L.divIcon({
    html: `
      <div class="relative">
        <div class="bg-blue-600 rounded-full p-2 shadow-lg border-2 border-white animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
        <div class="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-blue-600 absolute left-1/2 -translate-x-1/2"></div>
      </div>
    `,
    className: "custom-picker-marker",
    iconSize: [40, 50],
    iconAnchor: [20, 50],
  });

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([13.4549, -16.579], 13);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on("click", (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        updateMarker(lat, lng);
        onChange({ gplusCode: `${lat},${lng}` });
      });
    }
  }, [onChange]);

  const updateMarker = (lat: number, lng: number) => {
    if (markerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(markerRef.current);
    }
    if (mapInstanceRef.current) {
      markerRef.current = L.marker([lat, lng], { icon: customIcon }).addTo(
        mapInstanceRef.current
      );
    }
  };

  const handleGetLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onChange({ gplusCode: `${latitude},${longitude}` });
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([latitude, longitude], 15);
            updateMarker(latitude, longitude);
          }
          setLoading(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLoading(false);
          alert(
            "Unable to get your location. Please enable location services."
          );
        }
      );
    } else {
      setLoading(false);
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange({ gplusCode: newValue });

    const [lat, lng] = newValue.split(",").map(Number);
    if (mapInstanceRef.current && !isNaN(lat) && !isNaN(lng)) {
      mapInstanceRef.current.setView([lat, lng], 15);
      updateMarker(lat, lng);
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = gambianCities.find(
      (city) => city.name === e.target.value
    );
    if (selectedCity && mapInstanceRef.current) {
      const { lat, lng } = selectedCity;
      onChange({ gplusCode: `${lat},${lng}` });
      mapInstanceRef.current.setView([lat, lng], 14);
      updateMarker(lat, lng);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      // Using Nominatim API for geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&limit=1`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        onChange({ gplusCode: `${lat},${lon}` });
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView(
            [parseFloat(lat), parseFloat(lon)],
            15
          );
          updateMarker(parseFloat(lat), parseFloat(lon));
        }
      } else {
        alert("Location not found. Try a different search term.");
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 relative">
      {/* Coordinates Display */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          📍 Coordinates (Latitude, Longitude)
        </label>
        <Input
          type="text"
          value={value.gplusCode}
          onChange={handleInputChange}
          placeholder="e.g., 13.4549, -16.579"
          className="font-mono text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          Click on the map or use the tools below to set location
        </p>
      </div>

      {/* Location Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Search Box */}
        <div className="flex gap-2">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for an address..."
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1"
          />
          <Button
            type="button"
            size="sm"
            onClick={handleSearch}
            disabled={loading || !searchQuery.trim()}
          >
            🔍
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={handleGetLocation}
            disabled={loading}
            className="flex-1"
          >
            {loading ? <Spinner /> : "📍 My Location"}
          </Button>
          <select
            title="Choose City"
            onChange={handleCityChange}
            className="p-2 border rounded bg-white dark:bg-gray-800 flex-1 text-sm"
          >
            <option value="">🏙️ Quick Cities</option>
            {gambianCities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative">
        <div
          ref={mapRef}
          className="h-[450px] bg-muted rounded-lg border-2 border-gray-200 dark:border-gray-700 shadow-lg relative"
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900 bg-opacity-75 z-[1000]">
              <div className="text-center">
                <Spinner />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Loading...
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="absolute bottom-3 left-3 bg-white dark:bg-gray-800 px-3 py-2 rounded-md shadow-lg text-xs text-gray-600 dark:text-gray-300 z-[1000]">
          💡 Click anywhere on the map to set location
        </div>
      </div>
    </div>
  );
}
