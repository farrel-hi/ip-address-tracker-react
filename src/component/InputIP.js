import React, { useState } from "react";
import submitBtn from '../images/icon-arrow.svg'
import './InputIP.css';
import config from "../config";


function InputIP(props) {
  const [inputValue, setInputValue] = useState('')
  const [locationData, setLocationData] = useState('')

  function inRange(n) {
    // check if every split is in range 0-255
    if (n >= 0 && n <= 255) {
      return true;
    }
    return false;
  }

  function hasLeadingZero(n) {
    // check if every split has leading zero or not.
    if (n.length > 1) {
      if (n.charAt(0) === '0') {
        return true;
      }
    }
    return false;
  }

  function isValid(s) {
    let parts = s.split('.');
    if (parts.length !== 4) { // if number of splitting element is not 4 it is not a valid IP address
      return 0;
    }
    for (let i = 0; i < parts.length; i++) {
      let part = parts[i];
      if (hasLeadingZero(part)) {
        return 0;
      }
      if (part.length === 0) {
        return 0;
      }
      try {
        let num = parseInt(part, 10);
        if (!inRange(num)) {
          return 0;
        }
      } catch (e) {
        return 0;
      }
    }
    return 1;
  }

  const ipChangeHandler = (event) => {
    setInputValue(event.target.value);
    console.log(inputValue);
    console.log(event.target.value);
  }

  const submitIPAdress = (event) => {
    event.preventDefault();
    if (isValid(inputValue) == 1) {
      const api_key = config.api_key;
      const api_url = "https://geo.ipify.org/api/v2/country?apiKey=" + api_key + "&ipAddress=" + inputValue;

      // Function to get IP Location Data
      async function getapi(url) {

        // Storing response
        const response = await fetch(url);

        // Storing data in form of JSON
        let data = await response.json();
        setLocationData(data); //Save to useState
        console.log("Data : "+data);
        props.onSaveLocationData(data); //Don't use the useState data, it has a delay when transfering the data to App.js
      }

      // Activating the function
      getapi(api_url);
    }
    else {
      alert("Please Submit a Valid IP Address");
    }

  }

  return (
    <form className="input-form" onSubmit={submitIPAdress}>
      <input type="text" className="ip-input" placeholder="Search for any IP address or domain" onChange={ipChangeHandler}></input>
      <button type="submit" className="submit-button">
        <img src={submitBtn} alt="submit" />
      </button>
    </form>
  );
}

export default InputIP;