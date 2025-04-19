import React, { useEffect, useState } from "react";
import Header from "../componentes/header.jsx";
import Footer from "../componentes/footer.jsx";

import { Link } from "react-router-dom";


const Administracion = () => {

    // Cargar reservas desde API json
      const [menu, setMenu] = useState([]);
      useEffect(() => {
        fetch("/menuSemanalTest.json") // endpoint -------------------------------------------------------------------
          .then((res) => res.json())
          .then((data) => setMenu(data.menu_semanal))
          .catch((err) => console.error("Error al cargar el menú:", err));
      }, []);

      const [diaSeleccionado, setDiaSeleccionado] = useState("");
      const [showModalModificarDia, setShowModalModificarDia] = useState(false); 
        // Abre el modal y actualiza el día
        const abrirModal = (dia) => {
          setDiaSeleccionado(dia);
          setShowModalModificarDia(true);
        };

        const [nombrePlato, setNombrePlato] = useState("");
        const [descripcionPlato, setDescripcionPlato] = useState("");
        const [imagenPlato, setImagenPlato] = useState(null);
        // modificar día
        const modificarDia = async () => {

            if (nombrePlato == "" || descripcionPlato=="" || imagenPlato==null) {
                alert(`¡Algunos campos están vacíos!`);
            }else{
                const formData = new FormData();
                formData.append("dia", diaSeleccionado);
                formData.append("plato", nombrePlato);
                formData.append("descripcion", descripcionPlato);
                formData.append("imagen", imagenPlato);
            
                try {
                const response = await fetch("/api/modificar-menu", { // Solicitud al back -------------------------------------------------
                    method: "POST",
                    body: formData,
                });
            
                if (response.ok) {
                    alert(`¡Información modificada con éxito para el día ${diaSeleccionado}!`);
                    setShowModalModificarDia(false);
                } else {
                    alert(`¡Error al modificar el día ${diaSeleccionado}!`);
                }
                } catch (error) {
                    alert("Error al conectar con el servidor:", error);
                }
            }
          };
        
        

        // Hora límite
        const [horaLimite, setHoraLimite] = useState(null);
        useEffect(() => {
            fetch("/horaLimite.txt") // endpoint -------------------------------------------------------------------
              .then((res) => res.text())
              .then((data) => setHoraLimite(data))
              .catch((err) => console.error("Error al cargar la hora:", err));
          }, []);
        // Modificar Hora límite
          const modificarHoraLímite = async () => {
            try {
              const response = await fetch("/api/hora-limite", { // envío al back ----------------------------------------------
                method: "POST", // o PUT si prefieres
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ horaLimite }),
              });
          
              if (response.ok) {
                alert(`¡Hora límite actualizada a ${horaLimite}!`);
              } else {
                console.error("Error en la actualización");
                alert("Ocurrió un error al actualizar la hora.");
              }
            } catch (err) {
              console.error("Error de conexión:", err);
              alert("No se pudo conectar con el servidor.");
            }
          };
          
  return (
    <>
    <Header/>
    <div className="container">
        <h1 className="text-center mt-4 mb-4">Administración</h1>

        <h4 className="card-title">Hora límite cancelación</h4>
        <input type="time" defaultValue="02:25" value={horaLimite} onChange={(e) => setHoraLimite(e.target.value)}/>
        <button className="btn btn-primary mb-2" onClick={() => modificarHoraLímite()}>Modificar</button>

        <div className="row justify-content-center gx-0 mb-4">
          {menu.map((item, index) => (
            <div className="col-6 col-md-4 col-xl-2" key={index}>
              <div className="card m-2">
                <img className="img-fluid rounded" alt={`Imagen del día ${item.dia}`} src={item.imagen}/>
                <div className="card-body">
                  <h4 className="card-title">{item.dia}</h4>
                  <h5 className="card-title">{item.plato}</h5>
                  <p className="card-text">{item.descripcion}</p>
                  <button className="btn btn-primary w-100 mb-2" onClick={() => abrirModal(item.dia)}>Modificar</button>
                </div>
              </div>
            </div>
          ))}
        </div>

    </div>

    {/* Modal */}
    {showModalModificarDia && (
        <>
          <div className="modal d-block show" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modificar información día{" "}<strong>{diaSeleccionado}</strong></h5>
                  <button type="button" className="btn-close" onClick={() => setShowModalModificarDia(false)}></button>
                </div>
                <div className="modal-body text-center">
                
                <label className="form-label">Nombre plato</label>
                <input type="text" className="form-control" value={nombrePlato} onChange={(e) => setNombrePlato(e.target.value)} required/>

                <label className="form-label pt-4">Descripción plato</label>
                <textarea type="text" className="form-control" value={descripcionPlato} onChange={(e) => setDescripcionPlato(e.target.value)} required/>

                <label className="form-label pt-4">Imágen de plato</label>
                <input type="file" className="form-control" ivalue={imagenPlato} onChange={(e) => setImagenPlato(e.target.files[0])} required accept=".png, .jpg, .jpeg"/>

                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={() => modificarDia()}>¡Modificar!</button>
                  <button type="button" className="btn btn-danger" onClick={() => setShowModalModificarDia(false)}>Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    <Footer/>
    </>
  );  
};

export default Administracion;