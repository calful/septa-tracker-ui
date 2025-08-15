import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export default function RoutesList({ onSelect }) {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/routes`)
      .then((r) => r.json())
      .then((data) => setRoutes(data))
      .catch((e) => console.error("Failed to fetch /routes", e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading routes…</p>;
  if (!routes.length) return <p>No routes cached yet.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {routes
        .sort((a, b) => b.vehicles - a.vehicles)
        .map((r) => (
          <li key={r.routeId} style={{ marginBottom: 8 }}>
            <button onClick={() => onSelect(r.routeId)}>
              {r.routeId} — {r.vehicles} vehicles (TTL {r.ttlSeconds}s)
            </button>
          </li>
        ))}
    </ul>
  );
}
