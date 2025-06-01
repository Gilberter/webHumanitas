import React, { useState } from "react";
import Header from "../../componentes/Header/header.jsx";
import Footer from "../../componentes/Footer/footer.jsx";
import { useAuth } from "../../context/AuthContext";

const Usuario = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    nombre: user?.nombre || "",
    apellidos: user?.apellidos || "",
    codigoEstudiante: user?.codigoEstudiante || "",
    correo: user?.correo || "",
    contrasena: "",
    nuevaContrasena: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construir objeto para enviar solo los campos modificados
    const datosActualizados = {
      nombre: form.nombre,
      apellidos: form.apellidos,
      codigoEstudiante: form.codigoEstudiante,
      correo: form.correo,
      contrasena: form.nuevaContrasena ? form.nuevaContrasena : undefined,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosActualizados),
      });
      if (response.ok) {
        setMensaje("Datos actualizados correctamente.");
      } else {
        setMensaje("Error al actualizar los datos.");
      }
    } catch (error) {
      setMensaje("No se pudo conectar con el servidor.");
    }
  };

  return (
    <>
      <Header />
      <div className="container py-5">
        <h2 className="mb-4 text-center">Mi Perfil</h2>
        <form className="mx-auto" style={{ maxWidth: 500 }} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellidos</label>
            <input
              type="text"
              className="form-control"
              name="apellidos"
              value={form.apellidos}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="form-label">Código de estudiante</label>
            <input
              type="text"
              className="form-control"
              name="codigoEstudiante"
              value={form.codigoEstudiante}
              onChange={handleChange}
              placeholder="Opcional"    
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña actual</label>
            <input
              type="password"
              className="form-control"
              name="contrasena"
              value={form.contrasena}
              onChange={handleChange}
              placeholder="Para cambiar la contraseña, ingresa la actual"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nueva contraseña</label>
            <input
              type="password"
              className="form-control"
              name="nuevaContrasena"
              value={form.nuevaContrasena}
              onChange={handleChange}
              placeholder="Deja en blanco si no deseas cambiarla"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Guardar cambios
          </button>
          {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Usuario;