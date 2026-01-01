"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  Maximize2,
  Minimize2,
  Navigation,
  Layers,
  ExternalLink,
} from "lucide-react";
import { Button } from "./ui/button";

// Fix for default marker icon in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom marker icon with house symbol
const createCustomIcon = (price?: string) => {
  const priceLabel = price
    ? `<div class="bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-bold shadow-lg mb-1">${price}</div>`
    : "";
  return L.divIcon({
    html: `
      <div class="flex flex-col items-center">
        ${priceLabel}
        <div class="bg-red-600 rounded-full p-2 shadow-lg border-2 border-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </div>
        <div class="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-red-600"></div>
      </div>
    `,
    className: "custom-marker",
    iconSize: [48, 60],
    iconAnchor: [24, 60],
  });
};

interface PropertyMapProps {
  lat: number;
  lng: number;
  title: string;
  address?: string;
  price?: string;
}

// Map controls component
function MapControls({
  lat,
  lng,
  onRecenter,
}: {
  lat: number;
  lng: number;
  onRecenter: () => void;
}) {
  const map = useMap();
  const [mapType, setMapType] = useState<"street" | "satellite" | "terrain">(
    "street"
  );

  const tileUrls = {
    street: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    satellite:
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  };

  useEffect(() => {
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    L.tileLayer(tileUrls[mapType], {
      attribution:
        mapType === "street"
          ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          : mapType === "satellite"
          ? "&copy; Esri"
          : "&copy; OpenTopoMap",
    }).addTo(map);
  }, [mapType, map]);

  return (
    <div className="absolute top-2 right-2 z-[1000] flex flex-col gap-2">
      <Button
        size="sm"
        variant="secondary"
        className="bg-white hover:bg-gray-100 shadow-lg"
        onClick={onRecenter}
        title="Recenter map"
      >
        <Navigation className="h-4 w-4" />
      </Button>
      <div className="bg-white rounded-md shadow-lg p-1">
        <select
          value={mapType}
          onChange={(e) => setMapType(e.target.value as any)}
          className="text-xs p-1 border-0 outline-none cursor-pointer"
          title="Map Type"
        >
          <option value="street">🗺️ Street</option>
          <option value="satellite">🛰️ Satellite</option>
          <option value="terrain">⛰️ Terrain</option>
        </select>
      </div>
    </div>
  );
}

export function PropertyMap({
  lat,
  lng,
  title,
  address,
  price,
}: PropertyMapProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(0);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const recenterMap = () => {
    setKey((prev) => prev + 1);
  };

  const openInGoogleMaps = () => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  };

  return (
    <div
      ref={mapContainerRef}
      className={`w-full h-full rounded-lg sm:rounded-xl overflow-hidden relative ${
        isFullscreen ? "bg-black" : ""
      }`}
    >
      <MapContainer
        key={key}
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={true}
        className="w-full h-full min-h-[200px]"
        style={{ zIndex: 0 }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={createCustomIcon(price)}>
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-bold text-sm mb-1">{title}</h3>
              {address && (
                <p className="text-xs text-gray-600 mb-2">{address}</p>
              )}
              {price && (
                <p className="text-blue-600 font-bold text-sm">{price}</p>
              )}
              <button
                onClick={openInGoogleMaps}
                className="mt-2 text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                Open in Google Maps
              </button>
            </div>
          </Popup>
        </Marker>
        <MapControls lat={lat} lng={lng} onRecenter={recenterMap} />
      </MapContainer>

      {/* Fullscreen toggle */}
      <Button
        size="sm"
        variant="secondary"
        className="absolute bottom-2 right-2 z-[1000] bg-white hover:bg-gray-100 shadow-lg"
        onClick={toggleFullscreen}
        title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? (
          <Minimize2 className="h-4 w-4" />
        ) : (
          <Maximize2 className="h-4 w-4" />
        )}
      </Button>

      {/* Google Maps link */}
      <Button
        size="sm"
        variant="secondary"
        className="absolute bottom-2 left-2 z-[1000] bg-white hover:bg-gray-100 shadow-lg text-xs"
        onClick={openInGoogleMaps}
        title="Open in Google Maps"
      >
        <ExternalLink className="h-3 w-3 mr-1" />
        Google Maps
      </Button>
    </div>
  );
}
