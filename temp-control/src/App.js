import React, { useState} from 'react';

const App = () => {
  const [temperatureValue, setTemperatureValue] = useState(10);
  const [temperatureColor, setTemperatureColor] = useState("cold");
  
  const increaseTemperature = () => {
    if (temperatureValue === 30) return; //if temperatureValue is equal to 30, then return -no further action taken
    const newTemperature = temperatureValue + 1;

    if (newTemperature >= 15) { //if the temperature value is greater or equal to 15, then render/call the setTemperatureColor function
      setTemperatureColor('hot');
    }
    setTemperatureValue(newTemperature);

;

  const decreaseTemperature = () => {
    if (temperatureValue === 0) 
    return; 
    const newTemperature = temperatureValue - 1;

    if (newTemperature < 15) { //if the temperature value is less than 15, then render/call the setTemperatureColor function
      setTemperatureColor('cold');
    }
    setTemperatureValue(newTemperature);
  };

  return (
    <div className='app-container'>
      <div className='temperature-display-container'>
        <div className={`temperature-display ${temperatureColor}`}>{temperatureValue}°C</div>   
        </div>
        <div className='button-container'>
          <button onClick ={() => increaseTemperature()}>+</button>
          <button onClick ={() => decreaseTemperature()}>-</button>
        </div>
    </div>
  )

}
}
export default App;
