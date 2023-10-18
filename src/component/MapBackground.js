import React, {useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import "./MapBackground.css";

function MapBackground() {
  const [position,setPosition] = useState([51.505, -0.09])
  return (
    <div className="map-background">
      <div className='pattern-bg'>
      </div>
      <div className="map-container">
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} id="map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default MapBackground;