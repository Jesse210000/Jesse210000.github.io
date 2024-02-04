import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FanShop from './FanShop';
import ProductDetail from './compoments/ProductDetail';
import ShoppingCart from './compoments/ShoppingCart'; 
import About from './compoments/about';
import Contact from './compoments/Contact';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (productToAdd) => {
    setCart((currentCart) => {
      
      const existingProductIndex = currentCart.findIndex((item) => item.id === productToAdd.id);

      if (existingProductIndex > -1) {
        
        return currentCart.map((item, index) => {
          if (index === existingProductIndex) {
            return { ...item, quantity: item.quantity + productToAdd.quantity };
          }
          return item;
        });
      } else {
        
        return [...currentCart, { ...productToAdd, quantity: productToAdd.quantity }];
      }
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FanShop onAddToCart={addToCart} />} />
        <Route path="/product/:productId" element={<ProductDetail onAddToCart={addToCart} />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/cart" element={<ShoppingCart cart={cart} />} />
      </Routes>
    </Router>
  );
}

export default App;
