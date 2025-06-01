import React, { useEffect, useState } from "react";
import Header from "../../../componentes/Header/header.jsx";
import Footer from "../../../componentes/Footer/footer.jsx";

const UsuarioAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    codigoEstudiante: "",
    contrasena: "",
    rol: "ADMIN"
  });
  const [mensaje, setMensaje] = useState("");

  // Obtener solo usuarios administradores
  useEffect(() => {
    fetch("http://localhost:8080/api/usuarios")
      .then(res => res.json())
      .then(data => setAdmins(data.filter(u => u.rol === "ADMIN")))
      .catch(err => setMensaje("Error al cargar administradores"));
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Agregar nuevo administrador
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setMensaje("Administrador creado correctamente.");
        setForm({ nombre: "", apellidos: "", correo: "", codigoEstudiante:"" , contrasena: "", rol: "ADMIN" });
        // Recargar lista
        const nuevosAdmins = await fetch("http://localhost:8080/api/usuarios").then(res => res.json());
        setAdmins(nuevosAdmins.filter(u => u.rol === "ADMIN"));
      } else {
        setMensaje("Error al crear administrador.");
      }
    } catch (err) {
      setMensaje("No se pudo conectar con el servidor.");
    }
  };

  // Eliminar administrador (opcional)
  const eliminarAdmin = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este administrador?")) return;
    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setAdmins(admins.filter(a => a.id !== id));
        setMensaje("Administrador eliminado.");
      } else {
        setMensaje("Error al eliminar administrador.");
      }
    } catch (err) {
      setMensaje("No se pudo conectar con el servidor.");
    }
  };

  return (
    <>
      <Header />
      <div className="container py-5">
        <h2 className="mb-4 text-center">Administradores</h2>
        <form className="mx-auto mb-5" style={{ maxWidth: 500 }} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellidos</label>
            <input type="text" className="form-control" name="apellidos" value={form.apellidos} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input type="email" className="form-control" name="correo" value={form.correo} onChange={handleChange} required />
          </div>
          <div>
            <label className="form-label">Código Administrador</label>
            <input type="number" className="form-control" name="codigoEstudiante" value={form.codigoEstudiante} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" name="contrasena" value={form.contrasena} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Agregar Administrador</button>
          {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </form>

        <h4 className="mb-3">Lista de Administradores</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin.id}>
                <td>{admin.nombre}</td>
                <td>{admin.apellidos}</td>
                <td>{admin.correo}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminarAdmin(admin.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default UsuarioAdmin;