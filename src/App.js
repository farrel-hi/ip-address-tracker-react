import React, { useEffect,useState } from 'react';
import './App.css';
import MapBackground from './component/MapBackground';
import Card from './component/Card';
import InputIP from './component/InputIP';
import OutputIP from './component/OutputIP';
import config from './config.json';

function App() {
  const [data, setData] = useState('');
  const [iPAddress, setIPAddress] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [isp, setIsp] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const saveLocationDataHandler = (locationData) => {
    setData(locationData);

    console.log(locationData);

    // Set IP Address
    setIPAddress(locationData.ip);

    // Set Location
    setLocation(locationData.location.region + ", " + locationData.location.country);

    // Set Timezone
    setTimezone("UTC "+locationData.location.timezone);

    // Set ISP
    setIsp(locationData.isp);

    // Set Longitude
    setLongitude(locationData.location.lng);

    // Set Latitude
    setLatitude(locationData.location.lat);
  }

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => initialAddress(data))
      .catch(error => console.log(error))
  }, []);

  function initialAddress(initialData){
    const api_url = "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=" + config.api_key + "&ipAddress=" + initialData.ip;

    async function getapi(url) {
      // Storing response
      const response = await fetch(url);
  
      // Storing data in form of JSON
      let data = await response.json();
      // setLocationData(data); //Save to useState
      console.log("Data : "+data);
      saveLocationDataHandler(data); //Don't use the useState data, it has a delay when transfering the data to App.js
    }
    getapi(api_url);

  }
 

  return (
    <div className="App">
      <MapBackground 
        lng={longitude}
        lat={latitude}
        ip={iPAddress}
      />
      <div className='Main-Content'>
        <h1 className='page-title'>IP Address Tracker</h1>
        <InputIP
          onSaveLocationData={saveLocationDataHandler}
        />
        <Card>
          <OutputIP
            type={"IP ADDRESS"}
            value={iPAddress}
          />
          <div className='divider'></div>
          <OutputIP
            type={"LOCATION"}
            value={location}
          />
          <div className='divider'></div>
          <OutputIP
            type={"TIMEZONE"}
            value={timezone}
          />
          <div className='divider'></div>
          <OutputIP
            type={"ISP"}
            value={isp}
          />
        </Card>
      </div>
    </div>
  );
}

export default App;
