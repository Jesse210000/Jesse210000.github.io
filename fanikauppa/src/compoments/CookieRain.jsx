import React from 'react';
import cookieImage from '../img/money.png'; 

const CookieRain = () => {
  const numberOfCookies = 50; 

  return (
    <div className="cookie-rain">
      {Array.from({ length: numberOfCookies }).map((_, index) => (
        <img
          key={index}
          src={cookieImage}
          className="cookie"
          style={{
            left: `${Math.random() * 100}vw`, 
            animationDelay: `-${Math.random() * 5}s`, 
            transform: `scale(${Math.random() * 0.5 + 0.5})`, 
            top: `-${Math.random() * 20}vh`, 
          }}
          alt="Cookie"
        />
      ))}
    </div>
  );
};

export default CookieRain;
