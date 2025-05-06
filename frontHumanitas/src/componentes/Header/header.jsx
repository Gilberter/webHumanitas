import React, { useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import "./header.css"; 
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { user, isAuthenticated, logout, login } = useAuth();
  const [showLogin, setShowLogin] = useState(false); 
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [showMenuModal, setShowMenuModal] = useState(false); // Estado para controlar la visibilidad del menú modal
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
      <div className="h-100 container-fluid nav-container">
        {/* Logo + Hamburguesa */}
        <div className="d-flex align-items-center">
            <button
              className="navbar-toggler me-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setShowMenuModal(!showMenuModal)} // Cambia el estado del menú modal
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <a href="/home" className="navbar-brand"><img className="logo" src="logoWH.png" alt='"Logo'></img></a>
        </div>

        {/*Iniciar Sesión No se Collapse, para pantallas pequeñas a la derecha*/}
        {
          isAuthenticated ? 
            <ul className="navbar-nav flex-md-row d-flex align-items-center nav-right h-100 align-items-center text-center">
              <li className='nav-item align-content-center nav-item-bg-hover d-flex text-center align-items-center'>
                <FaRegUserCircle size={20} />
                <a href="#" className="nav-link active ps-2" >
                  {user.name}
                </a>
              </li>
            </ul>
          : 
          <ul className="navbar-nav flex-md-row d-flex align-items-center nav-right h-100 align-items-center text-center justify-content-start">
            <li className='nav-item align-content-center nav-item-bg-hover d-flex text-center align-items-center'>
              <FaRegUserCircle size={20} />
              <a href="#" className="nav-link active ps-2" onClick={() => setShowLogin(true)} >
                Iniciar Sesión
              </a>
            </li>
          </ul>
        }
        

        {/* Collapse Items */}
        <div className="h-100 collapse navbar-collapse " id="navbarSupportedContent">
          {isAuthenticated ? 
            <ul className="h-100 navbar-nav nav-right flex-md-row d-flex flex-row align-items-center text-center">
              <li className='nav-item nav-item-bg align-content-center nav-item-bg-hover'>
                <a className='nav-link active' href="">Reservas</a>
              </li>
              <li className='nav-item nav-item-bg  align-content-center nav-item-bg-hover'>
                <a className='nav-link active' href="/historial">Historial</a>
              </li>
            </ul>
          : 
            <p></p>
          }
          {isAuthenticated ? 
            <ul className="h-100 navbar-nav flex-md-row nav-left d-flex flex-row align-items-center justify-content-end ms-auto text-center">
              <li className="nav-item nav-item-bg-hover align-content-center">
                <a href="/" className="nav-link active" onClick={(e) => {e.preventDefault(); logout();}}>Cerrar Sesion</a>
              </li>
              <li className='nav-item nav-item-bg-hover align-content-center'>
                <a className="nav-link active" href="#" >Contacto</a>
              </li>
            </ul>
            :
            <ul className="h-100 navbar-nav flex-md-row nav-left d-flex flex-row align-items-center justify-content-end ms-auto text-center">
              <li className='nav-item nav-item-bg-hover align-content-center'>
                <a href="/login" className="nav-link active">Registrarse</a>
              </li>
              <li className='nav-item nav-item-bg-hover align-content-center'>
                <a className="nav-link active" href="/contacto">Contactanos</a>
              </li>
            </ul>
          } 
        </div>
      </div>
    </nav>
    {/* Modal del menú */}
    {showMenuModal && (
      <div className={`menu-modal-overlay ${showMenuModal ? 'active' : ''}`}>
        <div className="menu-modal-content">
          <ul>
            {isAuthenticated ? 
              <>
                <li><a href="/reservas">Reservas</a></li>
                <li><a href="/pedidos">Pedidos</a></li>
                <li><a href="/contacto">Contacto</a></li>
                <li>
                  <a href="/" onClick={(e) => { e.preventDefault(); logout(); }}>
                    Cerrar Sesión
                  </a>
                </li>
              </>
            :
              <>
                <li><a href="/login">Registrarse</a></li>
                <li><a href="/contacto">Contactanos</a></li>
              </>
            }
            
          </ul>
          <button onClick={() => setShowMenuModal(false)}>Cerrar</button>
        </div>
      </div>
    )}

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