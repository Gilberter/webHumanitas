package com.humanitas.backend.repository;

import com.humanitas.backend.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Integer> {

    // Buscar reserva por usuario
    Optional<Reserva> findByUsuarioId(Integer usuarioId);

    // Buscar reserva por producto (almuerzo)
    Optional<Reserva> findByProductoReservadoId(Integer productoId);
}
