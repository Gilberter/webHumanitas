import React from "react";
import "./home.css";
import imagen from "../assets/imagen-home.jpeg";

import Header from "../componentes/header.jsx";
import Footer from "../componentes/footer.jsx";

const Home = () => {
  return (
    <>
      <Header />
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
      </main>
      <Footer/>
    </>
  );
};

export default Home;