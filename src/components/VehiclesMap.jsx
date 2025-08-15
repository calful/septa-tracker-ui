import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icons for Vite
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

function FitBounds({ vehicles }) {
  const map = useMap();
  useEffect(() => {
    if (!vehicles?.length) return;
    const bounds = vehicles.reduce(
      (b, v) => b.extend([v.lat, v.lon]),
      L.latLngBounds([vehicles[0].lat, vehicles[0].lon], [vehicles[0].lat, vehicles[0].lon])
    );
    map.fitBounds(bounds.pad(0.2));
  }, [vehicles, map]);
  return null;
}

export default function VehiclesMap({ vehicles }) {
  const center = [39.9526, -75.1652]; // Philly

  return (
    <div className="map-container">
      <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {vehicles.map((v) => (
          <Marker key={v.id} position={[v.lat, v.lon]}>
            <Popup>
              <div>
                <div><strong>Route:</strong> {v.routeId}</div>
                <div><strong>Vehicle:</strong> {v.id}</div>
                <div><strong>Bearing:</strong> {v.bearing ?? "—"}</div>
                <div><strong>Updated:</strong> {new Date(v.epochSeconds * 1000).toLocaleTimeString()}</div>
                <div style={{ color: "#667", fontSize: 12 }}>
                  ({v.lat.toFixed(5)}, {v.lon.toFixed(5)})
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        <FitBounds vehicles={vehicles} />
      </MapContainer>
    </div>
  );
}
