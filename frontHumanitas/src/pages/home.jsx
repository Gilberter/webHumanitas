import React from "react";
import "./home.css";
import imagen from "../assets/imagen-home.jpeg";
import { useState } from 'react'

import Header from "../componentes/header.jsx";
import Footer from "../componentes/footer.jsx";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false); 

  return (
    <>
      <Header setShowLogin={setShowLogin}/>
      <main className="home">
        <div className="top-div"> 
          <h1>
            <span className="green">Café</span> 
            <span className="white">Humanitas</span>
          </h1>
        </div>
        
        <div className="bottom-div">
          <section className="info">
            <p>
              Descubre el sabor que despierta tus sentidos. Cafés seleccionados,
              ambiente acogedor y momentos que quedan en tu memoria.
            </p>
          </section>

          <section className="menu-options">
            <div className="option">
              <p>Ver Menú Semanal</p>
            </div>
            <div className="option">
              <p>Ver Productos</p>
            </div>
            <div className="option">
              <p>Ver Bebidas</p>
            </div>
          </section>
        </div>
        {showLogin && (
          <div className="modal">
            <div className="modal-content">
              <h2>Iniciar Sesión</h2>
              <input type="text" placeholder="Usuario" />
              <input type="password" placeholder="Contraseña" />
              <button className="btn-login">Entrar</button>
              <button className="btn-close" onClick={() => setShowLogin(false)}>Cerrar</button>
            </div>
          </div>
        )}
      </main>
      <Footer/>
    </>
  );
};

export default Home;