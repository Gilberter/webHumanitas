import React, { useState } from "react";
import { Modal } from "bootstrap"; // Necesitamos esto para manejar el modal
import "./reservas.css";
import Header from "../componentes/header.jsx";
import Footer from "../componentes/footer.jsx";

const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

const Reservas = () => {
  const [diaSeleccionado, setDiaSeleccionado] = useState("");

  // Abre el modal y actualiza el día
  const abrirModal = (dia) => {
    setDiaSeleccionado(dia);
    const modal = new Modal(document.getElementById("miModal"));
    modal.show();
  };

  // Confirmación de la reserva
  const confirmarReserva = () => {
    alert(`¡Reserva confirmada para el día ${diaSeleccionado}!`);
    const modal = Modal.getInstance(document.getElementById("miModal"));
    modal.hide();
  };

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="text-center mt-4 mb-4">Menú semanal</h1>
        <div className="row justify-content-center gx-0 mb-4">
          {dias.map((dia, index) => (
            <div className="col-6 col-md-4 col-xl-3" key={index}>
              <div className="card m-2">
                <img
                  className="img-fluid rounded"
                  alt={`Imagen del día ${dia}`}
                  src="https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg"
                />
                <div className="card-body">
                  <h2 className="card-title">{dia}</h2>
                  <p className="card-text">Contenido</p>
                  <button
                    className="btn btn-primary w-100 mb-2"
                    onClick={() => abrirModal(dia)}
                  >
                    Reservar
                  </button>
                  <button className="btn btn-danger w-100">Cancelar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="miModal"
        tabIndex="-1"
        aria-labelledby="tituloModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="tituloModal">
                Confirmación
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body text-center">
              <p>
                Estás a punto de realizar una reserva para el día{" "}
                <strong>{diaSeleccionado}</strong>.
              </p>
              <p>¿Deseas continuar?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={confirmarReserva}
              >
                ¡Reservar!
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Reservas;
