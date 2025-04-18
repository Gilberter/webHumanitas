package com.humanitas.backend.service;

import com.humanitas.backend.entity.Inventario;
import com.humanitas.backend.repository.InventarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventarioService {

    @Autowired
    private InventarioRepository inventarioRepository;

    // Crear un nuevo producto en el inventario
    public Inventario crearProducto(Inventario inventario) {
        return inventarioRepository.save(inventario);
    }

    // Obtener un producto por su ID
    public Optional<Inventario> obtenerProductoPorId(Integer id) {
        return inventarioRepository.findById(id);
    }

    // Obtener todos los productos del inventario
    public List<Inventario> obtenerTodosLosProductos() {
        return inventarioRepository.findAll();
    }

    // Actualizar un producto en el inventario
    public Inventario actualizarProducto(Integer id, Inventario productoActualizado) {
        if (inventarioRepository.existsById(id)) {
            productoActualizado.setId(id);
            return inventarioRepository.save(productoActualizado);
        } else {
            throw new RuntimeException("Producto no encontrado");
        }
    }

    // Eliminar un producto por su ID
    public void eliminarProducto(Integer id) {
        if (inventarioRepository.existsById(id)) {
            inventarioRepository.deleteById(id);
        } else {
            throw new RuntimeException("Producto no encontrado");
        }
    }
}
