import React, {useEffect, useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import "./MapBackground.css";

function MapBackground(props) {
  const [position,setPosition] = useState([-6.83778,107.47278]);
  const [positionLng, setPositionLng] = useState(0);
  const [positionLat, setPositionLat] = useState(0);

  // Call whenever there's a new Input
  useEffect(() => {
    setPosition([props.lat,props.lng]);
    setPositionLat(props.lat);
    setPositionLng(props.lng);
  }, [props.lat,props.lng]);

  return (
    <div className="map-background">
      <div className='pattern-bg'>
      </div>
      <div className="map-container">
        <MapContainer center={position} zoom={13} zoomControl={true} scrollWheelZoom={true} id="map" key={`${positionLat}${positionLng}`}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              IP Adress:<br />
              {props.ip}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default MapBackground;