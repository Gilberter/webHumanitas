import React, { useEffect, useState } from "react";
import Header from "../../componentes/Header/header.jsx";
import Footer from "../../componentes/Footer/footer.jsx";

const Administracion = () => {

  const [nombrePlato, setNombrePlato] = useState("");
  const [descripcionPlato, setDescripcionPlato] = useState("");
  const [imagenPlato, setImagenPlato] = useState("");

    // Cargar reservas desde API json
      const [menu, setMenu] = useState([]);
      useEffect(() => {
        fetch("/menuSemanalTest.json") // endpoint -------------------------------------------------------------------
          .then((res) => res.json())
          .then((data) => setMenu(data.menu_semanal))
          .catch((err) => console.error("Error al cargar el menú:", err));
      }, []);

      const [diaSeleccionado, setDiaSeleccionado] = useState(null);
      const [showModalModificarDia, setShowModalModificarDia] = useState(false); 
        // Abre el modal y actualiza el día
        const abrirModal = (dia) => {
          setNombrePlato(dia.plato);
          setDescripcionPlato(dia.descripcion);
          setImagenPlato(dia.imagen);

          setDiaSeleccionado(dia);
          setShowModalModificarDia(true);
        };

        // modificar día
        const modificarDia = async () => {
          if (nombrePlato === "" || descripcionPlato ==="" || imagenPlato === "") {
                alert(`¡Algunos campos están vacíos!`);
                return;
          }
          const datosModificados = {
            dia: diaSeleccionado.dia,
            nombrePlato: nombrePlato,
            descripcionPlato: descripcionPlato,
            imagenPlato: imagenPlato
          };
          try {
            const response = await fetch(`/api/platosSemanales/${diaSeleccionado.id}`, { // ------------------------------------------------- API
              method: "PUT", // o PATCH según cómo esté configurado tu backend
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(datosModificados)
            });
            if (response.ok) {
              alert("Día modificado correctamente.");
              setShowModalModificarDia(false);
              window.location.reload(); // Recargar paǵina para ver reflejados los cambios
            } else {
              console.error("Error al modificar día");
              alert("Hubo un error al modificar la información del día.");
            }
          } catch (error) {
            console.error("Error de conexión:", error);
            alert("No se pudo conectar con el servidor.");
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
                window.location.reload(); // Recargar paǵina para ver reflejados los cambios
              } else {
                console.error("Error en la actualización");
                alert("Ocurrió un error al actualizar la hora.");
              }
            } catch (err) {
              console.error("Error de conexión:", err);
              alert("No se pudo conectar con el servidor.");
            }
          };



          // Crear nuevo menú
          const crearNuevoMenu = async () => {
            const confirmar = window.confirm("Esta acción eliminará el menú actual y creará uno nuevo");
            if (!confirmar) return;
            try {
              const response = await fetch("/api/crearNuevoMenu", { // envío al back ----------------------------------------------
                method: "POST", // o PUT si prefieres
                headers: {
                  "Content-Type": "application/json",
                }
              });
              if (response.ok) {
                alert(`¡Nuevo menú ha sido creado a ${horaLimite}!`);
                window.location.reload(); // Recargar paǵina para ver reflejados los cambios
              } else {
                console.error("Error al crear menú");
                alert("Error al crear menú");
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


        <div className="row justify-content-center gx-0 mb-4">
          <div className="col-6">
            <h4 className="card-title">Hora límite cancelación</h4>
            <input type="time" defaultValue="02:25" value={horaLimite} onChange={(e) => setHoraLimite(e.target.value)}/>
            <button className="btn btn-primary mb-2" onClick={() => modificarHoraLímite()}>Modificar</button>
          </div>

          <div className="col-6">
            <h4 className="card-title">Nuevo menú semanal</h4>
              <button className="btn btn-primary mb-2" onClick={() => crearNuevoMenu()}>Crear nuevo menú</button>
              <p>Esta acción notifica a los estudiantes</p>
          </div>
        </div>

        <div className="row justify-content-center gx-0 mb-4">
          <h2>Modificar menú actual</h2>
          {menu.map((item, index) => (
            <div className="col-6 col-md-4 col-xl-2" key={index}>
              <div className="card m-2">
                <img className="img-fluid rounded" alt={`Imagen del día ${item.dia}`} src={item.imagen}/>
                <div className="card-body">
                  <h4 className="card-title">{item.dia}</h4>
                  <h5 className="card-title">{item.plato}</h5>
                  <p className="card-text">{item.descripcion}</p>
                  <button className="btn btn-primary w-100 mb-2" onClick={() => abrirModal(item)}>Modificar</button>
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
                  <h5 className="modal-title">Modificar información día{" "}<strong>{diaSeleccionado.dia}</strong></h5>
                  <button type="button" className="btn-close" onClick={() => setShowModalModificarDia(false)}></button>
                </div>
                <div className="modal-body text-center">
                
                <label className="form-label">Nombre plato</label>
                <input type="text" className="form-control" value={nombrePlato} onChange={(e) => setNombrePlato(e.target.value)} required/>

                <label className="form-label pt-4">Descripción plato</label>
                <textarea type="text" className="form-control" value={descripcionPlato} onChange={(e) => setDescripcionPlato(e.target.value)} required/>

                <label className="form-label pt-4">Imágen de plato</label>
                <input type="text" className="form-control" value={imagenPlato} onChange={(e) => setImagenPlato(e.target.value)} required/>

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