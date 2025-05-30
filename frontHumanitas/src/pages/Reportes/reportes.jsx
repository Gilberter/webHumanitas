// Para reportes necesito ventas de almuerzos, reservas , ventas de bebidas y productos varios.

import React, { useEffect, useState } from "react";
import Header from "../../componentes/Header/header.jsx";
import Footer from "../../componentes/Footer/footer.jsx";

import { PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer  } from 'recharts';
import "./reportes.css";


const Reportes = () => {
    const [ventasAlmuerzos, setVentasAlmuezos] = useState([]);
    const [pedidos, setPedidos] = useState([])
    const [gananciasPorDia, setGananciasPorDia] = useState([]);


    useEffect(() => {
    fetch("http://localhost:8080/api/reservas/metricas/ventas-almuerzos-semanal")
        .then((res) => res.json())
        .then((data) => setVentasAlmuezos(data))
        .catch((err) => console.error("Error al cargar ventas de almuerzos:", err));
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/api/reservas/metricas/pedidos-semanales")
            .then((res) => res.json())
            .then((data) => setPedidos(data))
            .catch((err) => console.error("Error al cargar pedidos:", err));
    }, []);

    useEffect(() => {
    fetch("http://localhost:8080/api/reservas/metricas/ganancias-por-dia")
        .then((res) => res.json())
        .then((data) => setGananciasPorDia(data))
        .catch((err) => console.error("Error al cargar ganancias por dia:", err));
    }, []);

    // Colores para el gráfico de pastel
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];


    return(
        <>
            <main className="page-wrapper">
                <Header />  
                {/* Ventas Semanales */}
                <div className="container-fluid d-flex">
                    <div className="container justify-content-center align-content-center text-center m-5">
                        <p>Ventas de almuerzos semanales</p>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart width={400} height={300} data={ventasAlmuerzos}>
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="ventas" fill="#99cc33" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="container-fluid d-flex">
                    <div className="container justify-content-center align-content-center text-center m-5">
                        <h4>Ganancias por Día</h4>
                        <ResponsiveContainer width="100%" height={400}>
                        <BarChart width={400} height={300} data={gananciasPorDia}>
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={v => `$${v.toLocaleString()}`} />
                            <Bar dataKey="ganancias" fill="#3399ff" />
                        </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pedidos Cancelados, Realizados, Multas*/}

                <div className="container-fluid">
                    <div className="container m-5">
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart width={400} height={300}>
                                <Pie
                                    data={pedidos}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    fill="#8884d8"
                                    label
                                    >
                                    {pedidos.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <Footer/>
            </main>
        </>
    )
}

export default Reportes