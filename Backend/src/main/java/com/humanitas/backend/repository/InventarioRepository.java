package com.humanitas.backend.repository;

import com.humanitas.backend.entity.Inventario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventarioRepository extends JpaRepository<Inventario, Long> { // CAMBIADO Integer a Long

    // Buscar productos por tipo (ej: "almuerzo", "dulces", etc.)
    List<Inventario> findByTipo(String tipo);

    // Buscar productos disponibles (el campo en la entidad es 'disponible')
    List<Inventario> findByDisponibleTrue(); // Ajustado para coincidir con el nombre del campo 'disponible'

    // Métodos básicos de CRUD están incluidos por JpaRepository:
    // - save(Inventario inventario): crear o actualizar un producto
    // - deleteById(Long id): eliminar un producto por su ID (ahora con Long)
    // - findById(Long id): buscar un producto por su ID (ahora con Long)
    // - findAll(): obtener todos los productos

}