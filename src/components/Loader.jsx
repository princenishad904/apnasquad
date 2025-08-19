import React from 'react';
import "./components.css"
const Loader = ({ size = 15, color = 'black' }) => {
  return (
    <span 
      className="loader"
      style={{
        width: size,
        height: size,
        border: `3px solid ${color}`,
        borderBottomColor: 'transparent',
        borderRadius: '50%',
        display: 'inline-block',
        animation: 'rotation 1s linear infinite',
      }}
    />
  );
};

export default Loader;