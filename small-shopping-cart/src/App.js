
import Header from './components/Header';
import Basket from './components/Basket';
import Main from './components/Main';
import data from './data';

function App() {
  const { products } = data;
  return (
  <div className='App'>
    <Header></Header>
    <div className="row">
    <Main products = {products}></Main>
    <Basket></Basket>
  </div>
  </div>
  )
}
export default App;
