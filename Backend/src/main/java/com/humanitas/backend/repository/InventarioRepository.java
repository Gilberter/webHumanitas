package com.humanitas.backend.repository;

import com.humanitas.backend.entity.Inventario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventarioRepository extends JpaRepository<Inventario, Integer> {

    // Buscar productos por tipo (ej: "almuerzo", "dulces", etc.)
    List<Inventario> findByTipo(String tipo);

    // Buscar productos disponibles (disponibilidad = true)
    List<Inventario> findByDisponibilidadTrue();

    // Métodos básicos de CRUD están incluidos por JpaRepository:
    // - save(Inventario inventario): crear o actualizar un producto
    // - deleteById(Integer id): eliminar un producto por su ID
    // - findById(Integer id): buscar un producto por su ID
    // - findAll(): obtener todos los productos

}
