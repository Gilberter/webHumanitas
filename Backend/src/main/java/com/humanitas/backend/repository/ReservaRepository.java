package com.humanitas.backend.repository;

import com.humanitas.backend.entity.EstadoReserva; // Importar el Enum
import com.humanitas.backend.entity.Reserva;
import com.humanitas.backend.entity.Usuario; // Importar si se usa directamente el objeto Usuario
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List; // Importar List
// Optional no es necesario importarlo explícitamente aquí si no se usa en un nuevo metodo

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Integer> {

    // Buscar reservas por ID de usuario
    // Es más común que un usuario tenga múltiples reservas, así que se devuelve una Lista
    List<Reserva> findByUsuarioId(Long usuarioId); // Asumiendo que Usuario.id es Long

    // Buscar reservas por ID del producto reservado
    List<Reserva> findByProductoReservadoId(Long productoId); // Asumiendo que Inventario.id es Long

    // --- Nuevos métodos de búsqueda basados en los cambios ---

    // Buscar reservas por fecha específica
    List<Reserva> findByFechaReserva(LocalDate fechaReserva);

    // Buscar reservas de un usuario para una fecha específica
    List<Reserva> findByUsuarioIdAndFechaReserva(Long usuarioId, LocalDate fechaReserva);

    // Buscar reservas por estado
    List<Reserva> findByEstado(EstadoReserva estado);

    // Buscar reservas de un usuario por estado
    List<Reserva> findByUsuarioIdAndEstado(Long usuarioId, EstadoReserva estado);

    // Buscar reservas por producto y fecha
    List<Reserva> findByProductoReservadoIdAndFechaReserva(Long productoId, LocalDate fechaReserva);

}