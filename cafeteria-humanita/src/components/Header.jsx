import React from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import "../components-styles/header.css"
function Header() {
  return (
    <header className="header">
      <nav className="nav-container">
        {/* Izquierda */}
        <ul className="nav-left">
          <li>
            <p><FaRegUserCircle size={20} /> Iniciar Sesión</p>
          </li>
        </ul>

        {/* Derecha */}
        <ul className="nav-right">
          <li><p>Registrarse</p></li>
          <li><p>Contacto</p></li>
        </ul>
      </nav>
    </header>
  );
}


export default Header;