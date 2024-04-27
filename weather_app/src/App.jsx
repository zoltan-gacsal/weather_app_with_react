import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const apiKey = "6948399619fb422fb13140458242704";

  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
      setCity("");
    } catch (error) {
      console.log("Error fetching weather data:".error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <input
            className="input"
            type="text"
            placeholder="Add meg a város nevét"
            value={city}
            onChange={(ev) => setCity(ev.target.value)}
          />
          <button onClick={fetchData} className="btn">
            Lekérés
          </button>
        </div>
        <div>
          {weatherData.location && (
            <div>
              <h2>
                {weatherData.location.name}, {weatherData.location.country}
              </h2>
              <p>Időjárás: {weatherData.current.condition.text}</p>
              <p>Hőmérséklet: {weatherData.current.temp_c}°C</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}