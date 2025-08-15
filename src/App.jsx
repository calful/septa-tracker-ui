import { useState } from "react";
import "./App.css";

// Components
import RoutesList from "./components/RoutesList";
import VehiclesView from "./components/VehiclesView";

export default function App() {
  const [selectedRoute, setSelectedRoute] = useState(null);

  return (
    <div className="container">
      <h1>SEPTA Real‑Time</h1>
      <p style={{ color: "#555" }}>
        Pick a route, then view live vehicles (table or map).
      </p>

      <div className="grid">
        <div>
          <h3>Routes</h3>
          <RoutesList onSelect={setSelectedRoute} />
        </div>

        <div>
          <h3>{selectedRoute ? `Vehicles: ${selectedRoute}` : "Vehicles"}</h3>
          <VehiclesView routeId={selectedRoute} />
        </div>
      </div>
    </div>
  );
}