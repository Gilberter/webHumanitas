package com.humanitas.backend.service;

import com.humanitas.backend.entity.EstadoReserva; // Importar el Enum
import com.humanitas.backend.entity.Reserva;
import com.humanitas.backend.entity.Usuario; // Necesario si vas a validar el usuario
import com.humanitas.backend.entity.Inventario; // Necesario si vas a validar el producto
import com.humanitas.backend.repository.ReservaRepository;
import com.humanitas.backend.repository.UsuarioRepository; // Para validar existencia de usuario
import com.humanitas.backend.repository.InventarioRepository; // Para validar existencia de producto y stock
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate; // Importar LocalDate
import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository; // Para validar el usuario

    @Autowired
    private InventarioRepository inventarioRepository; // Para validar el producto y su stock

    // Crear una nueva reserva
    @Transactional
    public Reserva crearReserva(Reserva reserva) {
        // Validar que el usuario exista
        Usuario usuario = usuarioRepository.findById(reserva.getUsuario().getId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + reserva.getUsuario().getId()));
        reserva.setUsuario(usuario);

        // Validar que el producto exista y esté disponible
        Inventario producto = inventarioRepository.findById(reserva.getProductoReservado().getId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + reserva.getProductoReservado().getId()));

        if (!producto.isDisponibilidad() || producto.getCantidad() <= 0) {
            throw new RuntimeException("Producto no disponible o sin stock: " + producto.getNombre());
        }
        reserva.setProductoReservado(producto);

        // Validar que la fecha de reserva no sea en el pasado (opcional, pero buena práctica)
        if (reserva.getFechaReserva().isBefore(LocalDate.now())) {
            throw new RuntimeException("La fecha de reserva no puede ser en el pasado.");
        }

        // Lógica para que un usuario no reserve más de una vez el mismo producto para el mismo día (opcional)
        List<Reserva> reservasExistentes = reservaRepository.findByUsuarioIdAndProductoReservadoIdAndFechaReserva(
                usuario.getId(), producto.getId(), reserva.getFechaReserva()
        );
        if (!reservasExistentes.isEmpty()) {
            throw new RuntimeException("Ya existe una reserva para este usuario, producto y fecha.");
        }


        // Asignar estado por defecto si no se proporciona o validar el proporcionado
        if (reserva.getEstado() == null) {
            reserva.setEstado(EstadoReserva.CONFIRMADO); // Estado por defecto al crear
        }

        // Lógica para descontar del inventario (¡Importante!)
        producto.setCantidad(producto.getCantidad() - 1);
        if (producto.getCantidad() == 0) {
            producto.setDisponibilidad(false); // Marcar como no disponible si se acaba el stock
        }
        inventarioRepository.save(producto); // Guardar el cambio en el inventario

        return reservaRepository.save(reserva);
    }

    // Obtener una reserva por su ID
    @Transactional(readOnly = true)
    public Optional<Reserva> obtenerReservaPorId(Integer id) {
        return reservaRepository.findById(id);
    }

    // Obtener todas las reservas
    @Transactional(readOnly = true)
    public List<Reserva> obtenerTodasLasReservas() {
        return reservaRepository.findAll();
    }

    // --- Nuevos métodos de ejemplo basados en el Repositorio ---
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


    // Actualizar una reserva existente (principalmente para cambiar el estado a CANCELADO)
    @Transactional
    public Reserva actualizarReserva(Integer id, Reserva reservaActualizada) {
        Reserva reservaExistente = reservaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada con ID: " + id));

        // Principalmente permitiría cambiar el estado
        if (reservaActualizada.getEstado() != null) {
            // Si se cancela una reserva, se debería reponer el stock del producto
            if (reservaExistente.getEstado() == EstadoReserva.CONFIRMADO && reservaActualizada.getEstado() == EstadoReserva.CANCELADO) {
                Inventario producto = reservaExistente.getProductoReservado();
                producto.setCantidad(producto.getCantidad() + 1);
                if (producto.getCantidad() > 0 && !producto.isDisponibilidad()) {
                    producto.setDisponibilidad(true); // Volver a marcar como disponible si hay stock
                }
                inventarioRepository.save(producto);
            }
            reservaExistente.setEstado(reservaActualizada.getEstado());
        }

        // Opcionalmente, permitir cambiar la fecha si la lógica de negocio lo permite
        // y si no ha pasado la fecha original o la nueva fecha.
        if (reservaActualizada.getFechaReserva() != null &&
                !reservaActualizada.getFechaReserva().isBefore(LocalDate.now()) &&
                reservaExistente.getEstado() == EstadoReserva.CONFIRMADO) { // Solo si está confirmada
            // Aquí podrías añadir lógica de validación compleja si se permite cambiar la fecha.
            // Por simplicidad, solo actualizamos si se proporciona una nueva fecha válida.
            // Considerar si cambiar la fecha implica verificar stock de nuevo para la nueva fecha.
            reservaExistente.setFechaReserva(reservaActualizada.getFechaReserva());
        }

        return reservaRepository.save(reservaExistente);
    }

    // Eliminar una reserva por su ID (Generalmente no se eliminan, se cancelan)
    // Si se elimina, asegurarse de reponer el stock.
    @Transactional
    public void eliminarReserva(Integer id) {
        Reserva reserva = reservaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada para eliminar con ID: " + id));

        // Si la reserva estaba CONFIRMADA, reponer el stock antes de eliminar
        if (reserva.getEstado() == EstadoReserva.CONFIRMADO) {
            Inventario producto = reserva.getProductoReservado();
            producto.setCantidad(producto.getCantidad() + 1);
            if (producto.getCantidad() > 0 && !producto.isDisponibilidad()) {
                producto.setDisponibilidad(true);
            }
            inventarioRepository.save(producto);
        }
        reservaRepository.deleteById(id);
    }
}