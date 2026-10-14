"use client";

import "leaflet/dist/leaflet.css";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { actionRows, type Severity } from "@/lib/placeholder-data";

const SEVERITY_COLOR: Record<Severity, string> = {
  critical: "#ff646b",
  warning: "#ff963d",
  info: "#55b4eb",
};

export function FleetMapInner() {
  const center: [number, number] = [41.75, -87.9];

  return (
    <MapContainer
      center={center}
      zoom={10}
      scrollWheelZoom={false}
      className="h-full w-full"
      attributionControl={false}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {actionRows.map((row) => (
        <CircleMarker
          key={row.id}
          center={[row.lat, row.lng]}
          radius={8}
          pathOptions={{
            color: SEVERITY_COLOR[row.severity],
            fillColor: SEVERITY_COLOR[row.severity],
            fillOpacity: 0.85,
            weight: 2,
          }}
        >
          <Popup>
            <strong>{row.asset}</strong>
            <br />
            {row.description}
            <br />
            Driver: {row.driver}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
