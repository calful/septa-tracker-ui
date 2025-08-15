export default function VehiclesTable({ vehicles }) {
  return (
    <table cellPadding="6" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th align="left">Vehicle ID</th>
          <th align="left">Route</th>
          <th align="left">Lat</th>
          <th align="left">Lon</th>
          <th align="left">Bearing</th>
          <th align="left">Updated (epoch)</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((v) => (
          <tr key={v.id} style={{ borderTop: "1px solid #ddd" }}>
            <td>{v.id}</td>
            <td>{v.routeId}</td>
            <td>{v.lat.toFixed(5)}</td>
            <td>{v.lon.toFixed(5)}</td>
            <td>{v.bearing ?? "—"}</td>
            <td>{v.epochSeconds}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
