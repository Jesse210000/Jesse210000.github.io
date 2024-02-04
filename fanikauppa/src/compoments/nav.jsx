import React from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../img/Logo1.png'

function NavMenu() {
  let navigate = useNavigate();

  const handleNavigate = (path) => {
    return () => navigate(path);
  };

  return (
    <main className="navMenu">
      <nav className="navHead">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <ul>
          <li><img className="logo" src={logo} alt="Logo" onClick={handleNavigate('/')} /></li>
          <li><a onClick={handleNavigate('/')}>Home</a></li>
          <li><a onClick={handleNavigate('/about')}>About</a></li>
          <li><a onClick={handleNavigate('/contact')}>Contact</a></li>
          <li><a className="fa fa-shopping-cart" onClick={handleNavigate('/cart')}></a></li>
        </ul>
      </nav>
    </main>
  );
}

export default NavMenu;
