import React from "react";
import "./login.css";

import "./reservas.css";
import Header from "../componentes/header.jsx";
import Footer from "../componentes/footer.jsx";

const Reservas = () => {
  return (
    <>
    <Header />
    <div className="container">
            <h1 className="text-center mt-4 mb-4">Menú semanal</h1>
            <div class="row justify-content-center gx-0">

                <div class="col-6 col-md-4 col-xl-3">
                    <div class="card">
                        <img class="img-fluid rounded" alt="Img" src="https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
                        <div class="card-body">
                            <h2 class="card-title">Lunes</h2>
                            <p class="card-text">Contenido</p>
                            <a class="btn btn-primary">Reservar</a>
                            <a class="btn btn-danger">Cancelar</a>
                        </div>
                    </div>
                </div>

                <div class="col-6 col-md-4 col-xl-3">
                    <div class="card">
                        <img class="img-fluid rounded" alt="Img" src="https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
                        <div class="card-body">
                            <h2 class="card-title">Martes</h2>
                            <p class="card-text">Contenido</p>
                            <a class="btn btn-primary">Reservar</a>
                            <a class="btn btn-danger">Cancelar</a>
                        </div>
                    </div>
                </div>

                <div class="col-6 col-md-4 col-xl-3">
                    <div class="card">
                        <img class="img-fluid rounded" alt="Img" src="https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
                        <div class="card-body">
                            <h2 class="card-title">Miercoles</h2>
                            <p class="card-text">Contenido</p>
                            <a class="btn btn-primary">Reservar</a>
                            <a class="btn btn-danger">Cancelar</a>
                        </div>
                    </div>
                </div>

                <div class="col-6 col-md-4 col-xl-3">
                    <div class="card">
                        <img class="img-fluid rounded" alt="Img" src="https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
                        <div class="card-body">
                            <h2 class="card-title">Jueves</h2>
                            <p class="card-text">Contenido</p>
                            <a class="btn btn-primary">Reservar</a>
                            <a class="btn btn-danger">Cancelar</a>
                        </div>
                    </div>
                </div>

                <div class="col-6 col-md-4 col-xl-3">
                    <div class="card">
                        <img class="img-fluid rounded" alt="Img" src="https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
                        <div class="card-body">
                            <h2 class="card-title">Viernes</h2>
                            <p class="card-text">Contenido</p>
                            <a class="btn btn-primary">Reservar</a>
                            <a class="btn btn-danger">Cancelar</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <Footer />
    </>
  );
};

export default Reservas;