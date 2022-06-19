import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Basket from './components/Basket';
import Main from './components/Main';

function App() {
  return (
  <div className='App'>
    <Header></Header>
    <div className="row">
    <Main></Main>
    <Basket></Basket>
  </div>
  </div>
  )
}
export default App;
