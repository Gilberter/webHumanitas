import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./reservas.css";
import Header from "../componentes/header.jsx";
import Footer from "../componentes/footer.jsx";

const Reservas = () => {

  // Cargar reservas desde API json
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("/menuSemanalTest.json") // endpoint -------------------------------------------------------------------
      .then((res) => res.json())
      .then((data) => setMenu(data.menu_semanal))
      .catch((err) => console.error("Error al cargar el menú:", err));
  }, []);


  const [diaSeleccionado, setDiaSeleccionado] = useState("");
  const [accion, setAccion] = useState("");
  const [showModal, setShowModal] = useState(false); 

  // Abre el modal y actualiza el día
  const abrirModal = (dia, accion) => {
    setDiaSeleccionado(dia);
    setAccion(accion)
    setShowModal(true);
  };

  // Confirmación de la reserva
  const confirmarCancelarReserva = () => {
    setShowModal(false);
    if (accion == "Reservar") {
      confirmarReserva();
    } else if (accion == "Cancelar") {
      cancelarReserva();
    }
  };

  // Confimación de la reserva
  const confirmarReserva = () => {
    setShowModal(false);
    // Envió al back  -------------------------------------------------------------------
    alert(`¡Reserva confirmada para el día ${diaSeleccionado}!`);
  };

  // Cancelación de la reserva
  const cancelarReserva = () => {
    setShowModal(false);
    // Envió al back  -------------------------------------------------------------------
    alert(`¡Reserva Cancelada con éxito para el día ${diaSeleccionado}!`);
  };

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="text-center mt-4 mb-4">Menú semanal</h1>
        <div className="row justify-content-center gx-0 mb-4">
          {menu.map((item, index) => (
            <div className="col-6 col-md-4 col-xl-3" key={index}>
              <div className="card m-2">
                <img className="img-fluid rounded" alt={`Imagen del día ${item.dia}`} src={item.imagen}/>
                <div className="card-body">
                  <h1 className="card-title">{item.dia}</h1>
                  <h4 className="card-title">{item.plato}</h4>
                  <p className="card-text">{item.descripcion}</p>
                  <button className="btn btn-primary w-100 mb-2" onClick={() => abrirModal(item.dia, "Reservar")}>Reservar</button>
                  <button className="btn btn-danger w-100" onClick={() => abrirModal(item.dia, "Cancelar")}>Cancelar reserva</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className="modal d-block show" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmación</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body text-center">
                  <p> Estás a punto de <strong>{accion}</strong> una reserva para el día{" "}<strong>{diaSeleccionado}</strong></p>
                  <p>¿Deseas continuar?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={() => {confirmarCancelarReserva();}}>¡{accion}!</button>
                  <button type="button" className="btn btn-danger" onClick={() => setShowModal(false)}>Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Reservas;
