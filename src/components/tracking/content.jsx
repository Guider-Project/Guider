"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

export default function TrackingContent() {
  const position = [51.505, -0.09];

  return (
    <>
      <div className="w-full py-5 px-5 h-[800px]">
        <MapContainer
          center={{ lat: 6.82177958831233, lng: 80.04256172705482 }}
          zoom={60}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%", zIndex: 0 }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[40.8054, -74.0241]} draggable={true} animate={true}>
            <Popup>Hey ! you found me</Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
}
