import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Reservas from './pages/reservas.jsx';
import Administracion from './pages/administracion.jsx';

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/administracion" element={<Administracion />} />
        </Routes>
      </Router>
    );
  }

  export default App;