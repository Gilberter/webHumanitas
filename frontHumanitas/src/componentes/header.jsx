import React from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import "./header.css"
function Header({ setShowLogin }) {
  return (
    <header className="header">
      <nav className="nav-container">
        {/* Izquierda */}
        <ul className="nav-left">
          <li>
            <p className="btn-login" onClick={() => setShowLogin(true)} ><FaRegUserCircle size={20} /> Iniciar Sesión</p>
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