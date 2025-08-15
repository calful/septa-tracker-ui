import { useEffect, useState } from "react";
import VehiclesTable from "./VehiclesTable";
import VehiclesMap from "./VehiclesMap";

const API = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export default function VehiclesView({ routeId }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("table"); // "table" | "map"

  useEffect(() => {
    if (!routeId) return;
    let stopped = false;

    async function load() {
      try {
        const r = await fetch(`${API}/vehicles?route=${encodeURIComponent(routeId)}`);
        const data = await r.json();
        if (!stopped) {
          setVehicles(data);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
        if (!stopped) setLoading(false);
      }
    }
    load();
    const id = setInterval(load, 5000); // refresh every 5s
    return () => {
      stopped = true;
      clearInterval(id);
    };
  }, [routeId]);

  if (!routeId) return <p>Select a route.</p>;
  if (loading) return <p>Loading vehicles for {routeId}…</p>;
  if (!vehicles.length) return <p>No vehicles for {routeId}.</p>;

  return (
    <div>
      <div className="tabs">
        <button
          className={`tab-btn ${tab === "table" ? "active" : ""}`}
          onClick={() => setTab("table")}
        >
          Table
        </button>
        <button
          className={`tab-btn ${tab === "map" ? "active" : ""}`}
          onClick={() => setTab("map")}
        >
          Map
        </button>
      </div>

      {tab === "table" ? (
        <VehiclesTable vehicles={vehicles} />
      ) : (
        <VehiclesMap vehicles={vehicles} />
      )}
    </div>
  );
}
