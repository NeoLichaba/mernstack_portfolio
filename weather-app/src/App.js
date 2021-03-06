import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [country, setCountry] = useState('')
  const [icon, setIcon] = useState("")

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=cb90310f52e8a567778a8e7b68e57902`

  
 

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  //DATE

  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", {month: "long"});
  let day = d.toLocaleString("default", {weekday: "long"});


  //TIME

  let time = d.toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',    
  });

  
  
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            <br></br>
          </div>
          <div className="country">
            {data.main ? <h2>{data.sys.country}</h2> : null}
            <br></br>
          </div>
          <div className="date">
            {data.main ? <p>{day}, {date} {month} {year}, 
            <br></br>
            {time} </p>: null}
          </div>
          <div className="description">
            {data.weather ? <h2>{data.weather[0].description}</h2> : null}
          </div>
        </div>
        {data.name !== undefined &&
          <div className="bottom">
            <div className="temp_max">
            {data.main ? <h2>{data.main.temp_max.toFixed()}°C</h2> : null}
              <p>Highs</p>
            </div>
            <div className="temp_min">
              {data.main ? <h2>{data.main.temp_min.toFixed()}°C</h2> : null}
              <p>Lows</p>
            </div>
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} KM/H</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;