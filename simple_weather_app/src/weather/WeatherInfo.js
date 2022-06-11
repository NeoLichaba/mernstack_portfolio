function WeatherInfo({weatherData, cityName}){

    return(
        <>
  <div className="weather-info text-center card bg-light">

  <h3>{cityName}</h3>
  <i className="bi bi-cloud-haze text-center display-2 text-warning"></i>
  {
      typeof weatherData.main=="undefined" ? (
          <p>No data found</p>
      ): (
           <>
  <h3>{weatherData.main.temp.toFixed()}<sup>o</sup> Cel</h3>
  <hr />
 <div className="row">
  <div className="col-sm-4">{weatherData.main.temp_max.toFixed()}<sup>o</sup> Cel<br /><b>Max Temp</b></div>
  <div className="col-sm-4">{weatherData.main.temp_min.toFixed()}<sup>o</sup> Cel<br /><b>Min Temp</b></div>
  <div className="col-sm-4">{weatherData.main.humidity}%<br /><b>Humidity</b></div>
 
</div> 
           </>
      )
  }

 </div>

        </>
    );
}

export default WeatherInfo;