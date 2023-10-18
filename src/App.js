import React, { useState } from 'react';
import './App.css';
import MapBackground from './component/MapBackground';
import Card from './component/Card';
import InputIP from './component/InputIP';
import OutputIP from './component/OutputIP';

function App() {
  const [data, setData] = useState('');
  const [iPAddress, setIPAddress] = useState("XXX.XXX.XXX.XXX");
  const [location, setLocation] = useState("X LAND, X COUNTRY XXXXX");
  const [timezone, setTimezone] = useState("UTC - XX:XX");
  const [isp, setIsp] = useState("XXXXXXXX");

  const saveLocationDataHandler = (locationData) => {
    setData(locationData);

    console.log(locationData);

    // Set IP Address
    setIPAddress(locationData.ip);

    // Set Location
    setLocation(locationData.location.region + ", " + locationData.location.country);

    // Set Timezone
    setTimezone(locationData.location.timezone);

    // Set ISP
    setIsp(locationData.isp);
  }

  return (
    <div className="App">
      <MapBackground />
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
