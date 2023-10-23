import React, {useEffect, useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import "./MapBackground.css";

function MapBackground(props) {
  // const [position,setPosition] = useState([51.505, -0.09])
  const [position,setPosition] = useState([107.47278, -6.83778]);
  const [positionLng, setPositionLng] = useState(0);
  const [positionLat, setPositionLat] = useState(0);


  useEffect(() => {
    setPosition([props.lng,props.lat]);
    setPositionLat(props.lat);
    setPositionLng(props.lng);
  }, [position]);

  return (
    <div className="map-background">
      <div className='pattern-bg'>
      </div>
      <div className="map-container">
        <MapContainer center={position} zoom={13} scrollWheelZoom={true} id="map" key={`${positionLng}${positionLat}`}>
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