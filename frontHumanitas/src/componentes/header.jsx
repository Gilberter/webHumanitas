import React, { useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import "./header.css";

function Header() {
  const [showLogin, setShowLogin] = useState(false); 

  return (
    <>
    <nav className="navbar navbar-expand-md header">
      <div className="container-fluid nav-container">
        {/* Logo + Hamburguesa */}
        <div className="d-flex align-items-center">
          <button className="navbar-toggler me-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a href="/home" className="navbar-brand">Logo</a>
        </div>

        {/* Icono + Iniciar Sesión */}
        <ul className="navbar-nav nav-right d-flex flex-row align-items-center">
          <li className="d-flex align-items-center">
            <FaRegUserCircle size={20} />
            <a href="#" className="nav-link active ps-2" onClick={() => setShowLogin(true)}>
              Iniciar Sesión
            </a>
          </li>
        </ul>

        {/* Collapse Items */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav nav-left d-flex flex-row align-items-center">
            <li>
              <a href="/login" className="nav-link active">Registrarse</a>
            </li>
            <li>
              <a className="nav-link active" href="#">Contacto</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    {/* Modal fuera del main para mejor posicionamiento */}
    {showLogin && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Iniciar Sesión</h2>
          <input 
            type="text" 
            placeholder="Usuario" 
            className="modal-input"
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            className="modal-input"
          />
          <button className="modal-btn login-btn">Entrar</button>
          <button 
            className="modal-btn close-btn" 
            onClick={() => setShowLogin(false)}
          >
            Cerrar
          </button>
        </div>
      </div>
    )}
    </>
  );
}

export default Header;