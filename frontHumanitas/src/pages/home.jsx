import React from "react";
import Header from "../componentes/header.jsx";
import Footer from "../componentes/footer.jsx";
import "./home.css";
import imagen from "../assets/imagen-home.jpeg";
import { useState } from 'react'

const Home = () => {
  const [showLogin, setShowLogin] = useState(false); 

  return (
    <>
    <main className="page-wrapper">
      <Header setShowLogin={setShowLogin}/>
      <div className="top-div row m-0 p-0">
        <h1 className="col-12 text-center text-md-start m-0 p-0">
          <span className="green">Café</span>   
          <span className="white">Humanitas</span>
        </h1>
      </div>

      <div className="container-fluid content-wrapper d-flex flex-column flex-md-row p-0 m-0 flex-grow-1">
        <div className="info d-flex justify-content-center align-items-center col-12 col-md-6 " >
          <p className="text-center">
            Descubre el sabor que despierta tus sentidos...
          </p>
        </div>

        <div className=" d-flex flex-row col-12 col-md-6 p-20 flex-grow-1">
          <div className="option d-flex justify-content-center align-items-center flex-grow-1">
            <p>Ver Menú Semanal</p>
          </div>
          <div className="option d-flex justify-content-center align-items-center flex-grow-1">
            <p>Ver Productos</p>
          </div>
          <div className="option d-flex justify-content-center align-items-center flex-grow-1">
            <p>Ver Bebidas</p>
          </div>
        </div>
      </div>

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
      <Footer />
    </main>
    </>
  );  
};

export default Home;