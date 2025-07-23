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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([13.4549, -16.579], 13); // Default to Banjul
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on("click", (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        onChange({ gplusCode: `${lat},${lng}` });
      });
    }
  }, [onChange]);

  const handleGetLocation = () => {
    setLoading(true);
    onChange({ gplusCode: "" }); // Reset chosen location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onChange({ gplusCode: `${latitude},${longitude}` });
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([latitude, longitude], 13);
            L.marker([latitude, longitude]).addTo(mapInstanceRef.current);
          }
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange({ gplusCode: newValue });

    const [lat, lng] = newValue.split(",").map(Number);
    if (mapInstanceRef.current && !isNaN(lat) && !isNaN(lng)) {
      mapInstanceRef.current.setView([lat, lng], 13);
      L.marker([lat, lng]).addTo(mapInstanceRef.current);
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = gambianCities.find(
      (city) => city.name === e.target.value
    );
    if (selectedCity && mapInstanceRef.current) {
      const { lat, lng } = selectedCity;
      onChange({ gplusCode: `${lat},${lng}` });
      mapInstanceRef.current.setView([lat, lng], 13);
      L.marker([lat, lng]).addTo(mapInstanceRef.current);
    }
  };

  return (
    <div className="space-y-4 relative">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Input
            type="text"
            value={value.gplusCode}
            onChange={handleInputChange}
            step="any"
          />
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={handleGetLocation}
            >
              Get Location
            </Button>
            <select
              title="Choose Location"
              onChange={handleCityChange}
              className="p-2 border rounded"
            >
              <option value="">Choose Location</option>
              {gambianCities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div ref={mapRef} className="h-[400px] bg-muted rounded-lg relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}
