import React, { useEffect, useState } from "react";
import Header from "../../../componentes/Header/header.jsx";
import Footer from "../../../componentes/Footer/footer.jsx";

const AdministrarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    categoria: "",
    precio: ""
  });

  useEffect(() => {
    fetch("/productosTest.json")
      .then((res) => res.json())
      .then((data) => setProductos(data.productos))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  const handleEliminar = (id) => {
    setProductos(productos.filter((p) => p.id !== id));
  };

  const handleModificar = (id) => {
    const nuevoNombre = prompt("Nuevo nombre del producto:");
    if (nuevoNombre) {
      setProductos(
        productos.map((p) =>
          p.id === id ? { ...p, nombre: nuevoNombre } : p
        )
      );
    }
  };

  const handleAñadir = (e) => {
    e.preventDefault();
    const nuevo = {
      id: Date.now(), // id temporal
      nombre: nuevoProducto.nombre,
      categoria: nuevoProducto.categoria,
      precio: parseFloat(nuevoProducto.precio)
    };
    setProductos([...productos, nuevo]);
    setNuevoProducto({ nombre: "", categoria: "", precio: "" });
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h1 className="mb-4">Administrar Productos</h1>

        <form className="mb-4" onSubmit={handleAñadir}>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={nuevoProducto.nombre}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
                }
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Categoría"
                value={nuevoProducto.categoria}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })
                }
                required
              />
            </div>
            <div className="col">
              <input
                type="number"
                step="0.01"
                className="form-control"
                placeholder="Precio"
                value={nuevoProducto.precio}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
                }
                required
              />
            </div>
            <div className="col">
              <button className="btn btn-primary w-100" type="submit">Añadir</button>
            </div>
          </div>
        </form>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>${p.precio}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleModificar(p.id)}
                  >
                    Modificar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleEliminar(p.id)}
                  >
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

export default AdministrarProductos;
