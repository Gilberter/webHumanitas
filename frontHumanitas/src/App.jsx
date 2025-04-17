import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Reservas from './pages/reservas.jsx';

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
<<<<<<< HEAD
=======
          <Route path="/login" element={<Login />} />
          <Route path="/reservas" element={<Reservas />} />
>>>>>>> 78e4b56ce11af8490327a0b26651e3da1c07d505
        </Routes>
      </Router>
    );
  }

  export default App;