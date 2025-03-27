import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h3 className="nombreWeb">Web Humanitas</h3>
        <button className="usuario">
          Iniciar Sesión
        </button>
      </div>
    </header>
  );
};

export default Header;
