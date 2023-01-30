import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [city, setCity] = useState('');
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [cityDetails, setCityDetails] = useState();

  useEffect(() => {
    const getData = async () => {
      let response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=28cfba4a29194d9abfd120501220406&q=${city}`
      );
      let data = await response.json();
      setCityList([...data]);
      setSelectedCity(data[0].name);
    };
    getData();
  }, [city]);

  const getWeather = async () => {
    console.log('get weather for ', selectedCity);
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=28cfba4a29194d9abfd120501220406&q=${selectedCity}&days=1&aqi=no&alerts=no`
    );
    let data = await response.json();
    console.log(data);
    setCityDetails(data);
  };

  return (
    <div className='body'>
      <h3>Weather API With Auto Suggest</h3>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {cityList.length > 0 && (
        <select
          name="city"
          id="city"
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
          }}
        >
          {cityList.map((city) => {
            return <option value={city.name}>{city.name}</option>;
          })}
        </select>
      )}
      <button onClick={getWeather}>Get Weather</button>
      <div>
        <div
          className="card"
          style={{ backgroundColor: '#b2b4d4', width: '50%' }}
        >
          <h2>{cityDetails?.location?.name}</h2>
          <div>{cityDetails?.location.country}</div>
        </div>
      </div>
    </div>
  );
}
