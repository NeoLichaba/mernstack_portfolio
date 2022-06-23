import { useState } from 'react';
import './App.css';
import JSONDATA from './countrydata.json';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className='App'>
      <input
        type='text'
        placeholder='Search...'
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      {JSONDATA.filter((val) => {
        if (searchTerm == '') {
          return val;
        } else if (
          val.country.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return val;
        }
      }).map((val, key) => {
        return (
          <div className='Search' key={key}>
            <p>{val.country}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
