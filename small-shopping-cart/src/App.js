import Header from './components/Header';
import Basket from './components/Basket';
import Main from './components/Main';
import data from './data';
import { useState } from 'react';

function App() {
  const { products } = data;
  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) { //if product exists already in basket then increase quantity by 1
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else { //add to basket if the prduct already exists with quantity of 1
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) { //if product exists and quantity is one then remove it
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else { //otherwise if the product does exist, remove it, by decrementing 1
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
    return (
      <div className='App'>
        <Header countCartItems={cartItems.length}></Header>
        <div className='row'>
          <Main onAdd={onAdd} products={products}></Main>
          <Basket
            onAdd={onAdd}
            onRemove={onRemove}
            cartItems={cartItems}
          ></Basket>
        </div>
      </div>
    );
  }

export default App;
