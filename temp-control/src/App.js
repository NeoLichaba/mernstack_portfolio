
import React, { useState} from 'react';

const App = () => {
  const [temperatureValue, setTemperatureValue] = useState(10);
  const [temperatureColor, setTemperatureColor] = useState("cold");

  return (
    <div className='app-container'>
      <div className='temperature-display-container'>
        <div className={`temperature-display ${temperatureColor}`}>{temperatureValue}°C</div>   
        </div>
        <div className='button-container'>
          <button onClick ={() => setTemperatureValue(temperatureValue +1)}>+</button>
          <button onClick ={() => setTemperatureValue(temperatureValue-1)}>-</button>
        </div>
    </div>
  )

}
export default App;
