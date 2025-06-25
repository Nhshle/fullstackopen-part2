import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState([]);
  const [weather, setWeather] = useState(null);
  const apiKey = "8de802149ade5c6b8d8d5f03246ee267";

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilter(filteredCountries);
    } else {
      setFilter([]);
    }
  }, [searchTerm, countries]);

  useEffect(() => {
    if (
      filter.length === 1 &&
      filter[0].capital &&
      filter[0].capital.length > 0
    ) {
      const capitalCity = filter[0].capital[0];
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&appid=${apiKey}&units=metric`
        )
        .then((response) => setWeather(response.data))
        .catch(() => setWeather(null));
    } else {
      setWeather(null);
    }
  }, [apiKey, filter]);

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h1>Countries</h1>
      <div>
        Find Countries: <input value={searchTerm} onChange={onSearchChange} />
      </div>
      {filter.length > 10 ? (
        <p>Too many matches, try another filter!</p>
      ) : filter.length === 1 ? (
        filter.map((country) => (
          <div key={country.name.common}>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Area {country.area}</p>
            <h3>Languages</h3>
            <ul>
              {Object.values(country.languages).map((language, i) => (
                <li key={i}>{language}</li>
              ))}
            </ul>
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              width={150}
            />
            {weather && weather.main && (
              <div>
                <h3>Weather in: {country.capital[0]}</h3>
                <p>Temperature: {weather.main.temp} °C</p>
                {weather.weather && weather.weather[0] && (
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                  />
                )}
                <p>Wind: {weather.wind && weather.wind.speed} m/s</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <ul>
          {filter.map((country, id) => (
            <div key={id}>
              <li>
                {country.name.common}{" "}
                <button
                  onClick={() => {
                    setSearchTerm(country.name.common);
                  }}
                >
                  Show
                </button>
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
