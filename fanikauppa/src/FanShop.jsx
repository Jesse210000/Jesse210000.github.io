import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductsInList from './compoments/ProductsInList'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './compoments/ProductDetail';
import NavMenu from './compoments/nav';
import CookieRain from './compoments/CookieRain';

  

function FanShop({ onAddToCart }) {
  
  return (
    
    <div>
      <CookieRain />
      <NavMenu/>
      <h1>Cookie bites</h1>
      <h3>Cookies made by love</h3>
      <ProductsInList onAddToCart={onAddToCart} />
    </div>
  );
}



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default FanShop
