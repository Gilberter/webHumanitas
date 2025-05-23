package com.humanitas.backend.Controller;

import com.humanitas.backend.entity.Inventario;
import com.humanitas.backend.service.InventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/inventario")
@CrossOrigin(origins = "*")
public class InventarioController {

    @Autowired
    private InventarioService inventarioService;

    // Crear producto
    @PostMapping
    public Inventario crearProducto(@RequestBody Inventario inventario) {
        return inventarioService.crearProducto(inventario);
    }

    // Obtener producto por ID
    @GetMapping("/{id}")
    public Optional<Inventario> obtenerProductoPorId(@PathVariable Long id) {
        return inventarioService.obtenerProductoPorId(id);
    }

    // Obtener todos los productos
    @GetMapping
    public List<Inventario> obtenerTodosLosProductos() {
        return inventarioService.obtenerTodosLosProductos();
    }

    // Actualizar producto
    @PutMapping("/{id}")
    public Inventario actualizarProducto(@PathVariable Long id, @RequestBody Inventario inventarioActualizado) {
        return inventarioService.actualizarProducto(id, inventarioActualizado);
    }

    // Eliminar producto
    @DeleteMapping("/{id}")
    public void eliminarProducto(@PathVariable Long id) {
        inventarioService.eliminarProducto(id);
    }
}
