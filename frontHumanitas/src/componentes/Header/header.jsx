import React, { useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import "./header.css"; 
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { user, isAuthenticated, logout, login } = useAuth();
  const [showLogin, setShowLogin] = useState(false); 
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

    
  };
  const handleLogin = async () => {
    const success = await login(credentials.username, credentials.password);
    if (success) {
      setShowLogin(false); // Cerrar modal inmediatamente si el inicio de sesión fue exitoso
    } else {
      console.error("Inicio de sesión fallido.");
    }
  };

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
          {isAuthenticated ? 
            <li className="d-flex align-items-center">
              <FaRegUserCircle size={20} />
              <a href="#" className="nav-link active ps-2" >
                {user.name}
              </a>
            </li>
          : 
            <li className="d-flex align-items-center">
              <FaRegUserCircle size={20} />
              <a href="#" className="nav-link active ps-2" onClick={() => setShowLogin(true)}>
                Iniciar Sesión
              </a>
          </li>
        }

        </ul>

        {/* Collapse Items */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          
            {isAuthenticated ? 
              <ul className="navbar-nav nav-left d-flex flex-row align-items-center">
                <li>
                  <a href="/" className="nav-link active" onClick={(e) => {e.preventDefault(); logout();}}>Cerrar Sesion</a>
                </li>
                <li>
                  <a className="nav-link active" href="#" >Contacto</a>
                </li>
              </ul>
              :
              <ul className="navbar-nav nav-left d-flex flex-row align-items-center">
                <li>
                  <a href="/login" className="nav-link active">Registrarse</a>
                </li>
                <li>
                  <a className="nav-link active" href="#">Contacto</a>
                </li>
              </ul>
            }

          
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
            name='username'
            placeholder="Usuario" 
            required
            onChange={handleChange}
            className="modal-input"

          />
          <input 
            type="password" 
            name='password'
            placeholder="Contraseña" 
            required
            onChange={handleChange}
            className="modal-input"
            
          />
          <button className="modal-btn login-btn" onClick={handleLogin}>Entrar</button>
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