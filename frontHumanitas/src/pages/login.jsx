import React from "react";

const Login = () => {
  return (
    <>
      <div className="container-fluid p-0 border-0"  style={{overflowX: "hidden"  }}>
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 d-flex justify-content-center align-items-center" style={{ height:"100vh", backgroundColor: "#ffffff" }}>

            <form>
              <div className="mb-3">
                <h1 className="p-4">Iniciar sesion</h1>
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="remember" />
                  <label className="form-check-label" htmlFor="remember">
                    Recuérdame
                  </label>
                </div>
                <a href="#" className="text-decoration-none">¿Olvidaste tu contraseña?</a>
              </div>

              <button type="submit" className="btn btn-primary w-100">Entrar</button>
            </form>


          </div>
          <div className="col-12 col-md-6 d-flex justify-content-center align-items-center" style={{ height:"100vh", backgroundColor: "#99cc33" }}>

            <form>
              <div className="mb-3">
                <h1 className="p-4">Registrarse</h1>
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombres"
                  placeholder="nombre"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Apellido</label>
                <input
                  type="password"
                  className="form-control"
                  id="apellidos"
                  placeholder="apellido"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Codigo Estudiante</label>
                <input
                  type="codigo"
                  className="form-control"
                  id="codigo"
                  placeholder="2211221"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="usuario@correo.com"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="********"
                  required
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="recibir_email" />
                  <label className="form-check-label" htmlFor="recibir_email">
                    Recibir notificaciones vía email
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-secundary w-100">Registrarse</button>
            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
