package com.humanitas.backend.service;

import com.humanitas.backend.entity.Reserva;
import com.humanitas.backend.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    // Crear una nueva reserva
    public Reserva crearReserva(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    // Obtener una reserva por su ID
    public Optional<Reserva> obtenerReservaPorId(Integer id) {
        return reservaRepository.findById(id);
    }

    // Obtener todas las reservas
    public List<Reserva> obtenerTodasLasReservas() {
        return reservaRepository.findAll();
    }

    // Actualizar una reserva existente
    public Reserva actualizarReserva(Integer id, Reserva reservaActualizada) {
        if (reservaRepository.existsById(id)) {
            reservaActualizada.setId(id);
            return reservaRepository.save(reservaActualizada);
        } else {
            throw new RuntimeException("Reserva no encontrada");
        }
    }

    // Eliminar una reserva por su ID
    public void eliminarReserva(Integer id) {
        if (reservaRepository.existsById(id)) {
            reservaRepository.deleteById(id);
        } else {
            throw new RuntimeException("Reserva no encontrada");
        }
    }
}
