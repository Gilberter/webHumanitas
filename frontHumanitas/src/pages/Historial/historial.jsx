import React, { useEffect, useState } from "react";

import Header from "../../componentes/Header/header.jsx";
import Footer from "../../componentes/Footer/footer.jsx";

const Historial = () => {

    // Cargar historial desde API json
      const [historial, setHistorial] = useState([]);
      useEffect(() => {
        fetch("historialTest.json") // endpoint -------------------------------------------------------------------
          .then((res) => res.json())
          .then((data) => setHistorial(data.historial))
          .catch((err) => console.error("Error al cargar el menú:", err));
      }, []);

      const [resumen, setResumen] = useState([]);
      useEffect(() => {
        fetch("historialTest.json") // endpoint -------------------------------------------------------------------
          .then((res) => res.json())
          .then((data) => setResumen(data.resumen))
          .catch((err) => console.error("Error al cargar el menú:", err));
      }, []);
    

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="text-center mt-4 mb-4">Historial</h1>
        <p className="text-center">Total entradas: {resumen.entradas}</p>
        <p className="text-center">Total gastado: {resumen.total}</p>

        <table class="table table-striped table-hover table-bordered">
            <thead >
                <tr>
                    <td>#</td>
                    <td>Fecha</td>
                    <td>Tipo</td>
                    <td>Dia Resevado</td>
                    <td>Estado</td>
                    <td>Precio</td>
                </tr>
            </thead>
            {historial.map((item, index) => (
                <tbody>
                    <td>{index}</td>
                    <td>{item.fecha}</td>
                    <td>{item.tipo}</td>
                    <td>{item.diaReservado}</td>
                    <td>{item.estado}</td>
                    <td>{item.precio}</td>
                </tbody>
            ))}
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Historial;