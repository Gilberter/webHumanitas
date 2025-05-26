package com.humanitas.backend.service;

import com.humanitas.backend.entity.EstadoReserva;
import com.humanitas.backend.entity.MenuSemanal;
import com.humanitas.backend.entity.Reserva;
import com.humanitas.backend.entity.Usuario;
import com.humanitas.backend.repository.ReservaRepository;
import com.humanitas.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.humanitas.backend.repository.MenuSemanalRepository;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MenuSemanalRepository menuSemanalRepository;

    @Transactional
    public Reserva crearReserva(Reserva reserva) {
        Usuario usuario = usuarioRepository.findById(reserva.getUsuario().getId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + reserva.getUsuario().getId()));
        reserva.setUsuario(usuario);

        MenuSemanal menuSemanal = menuSemanalRepository.findById(reserva.getMenuSemanal().getId())
                .orElseThrow(() -> new RuntimeException("MenuSemanal no encontrado con ID: " + reserva.getMenuSemanal().getId()));
        reserva.setMenuSemanal(menuSemanal);

        if (reserva.getFechaReserva().isBefore(LocalDate.now())) {
            throw new RuntimeException("La fecha de reserva no puede ser en el pasado.");
        }

        if (reserva.getEstado() == null) {
            reserva.setEstado(EstadoReserva.CONFIRMADO);
        }

        return reservaRepository.save(reserva);
    }

    @Transactional(readOnly = true)
    public Optional<Reserva> obtenerReservaPorId(Integer id) {
        return reservaRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Reserva> obtenerTodasLasReservas() {
        return reservaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Reserva> obtenerReservasPorUsuarioId(Long usuarioId) {
        return reservaRepository.findByUsuarioId(usuarioId);
    }

    @Transactional(readOnly = true)
    public List<Reserva> obtenerReservasPorFecha(LocalDate fecha) {
        return reservaRepository.findByFechaReserva(fecha);
    }

    @Transactional(readOnly = true)
    public List<Reserva> obtenerReservasPorEstado(EstadoReserva estado) {
        return reservaRepository.findByEstado(estado);
    }

    @Transactional
    public Reserva actualizarReserva(Integer id, Reserva reservaActualizada) {
        Reserva reservaExistente = reservaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada con ID: " + id));

        if (reservaActualizada.getEstado() != null) {
            reservaExistente.setEstado(reservaActualizada.getEstado());
        }

        if (reservaActualizada.getFechaReserva() != null &&
                !reservaActualizada.getFechaReserva().isBefore(LocalDate.now()) &&
                reservaExistente.getEstado() == EstadoReserva.CONFIRMADO) {
            reservaExistente.setFechaReserva(reservaActualizada.getFechaReserva());
        }

        return reservaRepository.save(reservaExistente);
    }

    @Transactional
    public void eliminarReserva(Integer id) {
        reservaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Reserva no encontrada para eliminar con ID: " + id));
        reservaRepository.deleteById(id);
    }

    
}