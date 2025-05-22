package com.humanitas.backend.service;

import com.humanitas.backend.entity.EstadoReserva;
import com.humanitas.backend.entity.Reserva;
import com.humanitas.backend.entity.Usuario;
import com.humanitas.backend.entity.Inventario;
import com.humanitas.backend.repository.ReservaRepository;
import com.humanitas.backend.repository.UsuarioRepository;
import com.humanitas.backend.repository.InventarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private InventarioRepository inventarioRepository;

    @Transactional
    public Reserva crearReserva(Reserva reserva) {
        // Validar que el usuario exista (asumiendo que Usuario.id es Long)
        Usuario usuario = usuarioRepository.findById(reserva.getUsuario().getId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + reserva.getUsuario().getId()));
        reserva.setUsuario(usuario);

        // Validar que el producto exista y esté disponible (asumiendo que Inventario.id es Long)
        Inventario producto = inventarioRepository.findById(reserva.getProductoReservado().getId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + reserva.getProductoReservado().getId()));

        if (!producto.isDisponible() || producto.getCantidad() <= 0) {
            throw new RuntimeException("Producto no disponible o sin stock: " + producto.getNombre());
        }
        reserva.setProductoReservado(producto);

        if (reserva.getFechaReserva().isBefore(LocalDate.now())) {
            throw new RuntimeException("La fecha de reserva no puede ser en el pasado.");
        }

        // Esta llamada ahora coincide si Usuario.id e Inventario.id son Long,
        // y si ReservaRepository.findByUsuarioIdAndProductoReservadoIdAndFechaReserva
        // espera (Long, Long, LocalDate)
        List<Reserva> reservasExistentes = reservaRepository.findByUsuarioIdAndProductoReservadoIdAndFechaReserva(
                usuario.getId(), producto.getId(), reserva.getFechaReserva()
        );
        if (!reservasExistentes.isEmpty()) {
            throw new RuntimeException("Ya existe una reserva para este usuario, producto y fecha.");
        }

        if (reserva.getEstado() == null) {
            reserva.setEstado(EstadoReserva.CONFIRMADO);
        }

        producto.setCantidad(producto.getCantidad() - 1);
        if (producto.getCantidad() == 0) {
            producto.setDisponible(false);
        }
        inventarioRepository.save(producto);

        return reservaRepository.save(reserva);
    }

    @Transactional(readOnly = true)
    public Optional<Reserva> obtenerReservaPorId(Integer id) { // Reserva.id es int
        return reservaRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Reserva> obtenerTodasLasReservas() {
        return reservaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Reserva> obtenerReservasPorUsuarioId(Long usuarioId) { // Usuario.id es Long
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
    public Reserva actualizarReserva(Integer id, Reserva reservaActualizada) { // Reserva.id es int
        Reserva reservaExistente = reservaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada con ID: " + id));

        if (reservaActualizada.getEstado() != null) {
            if (reservaExistente.getEstado() == EstadoReserva.CONFIRMADO && reservaActualizada.getEstado() == EstadoReserva.CANCELADO) {
                Inventario producto = reservaExistente.getProductoReservado();
                producto.setCantidad(producto.getCantidad() + 1);
                if (producto.getCantidad() > 0 && !producto.isDisponible()) {
                    producto.setDisponible(true);
                }
                inventarioRepository.save(producto);
            }
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
    public void eliminarReserva(Integer id) { // Reserva.id es int
        Reserva reserva = reservaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada para eliminar con ID: " + id));

        if (reserva.getEstado() == EstadoReserva.CONFIRMADO) {
            Inventario producto = reserva.getProductoReservado();
            producto.setCantidad(producto.getCantidad() + 1);
            if (producto.getCantidad() > 0 && !producto.isDisponible()) {
                producto.setDisponible(true);
            }
            inventarioRepository.save(producto);
        }
        reservaRepository.deleteById(id);
    }
}