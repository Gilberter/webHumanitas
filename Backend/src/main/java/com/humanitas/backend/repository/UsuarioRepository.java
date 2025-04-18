package com.humanitas.backend.repository;

import com.humanitas.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    // Método para buscar un usuario por su nombre y contraseña
    Optional<Usuario> findByNombreAndContrasena(String nombre, String contrasena);

    // Método para buscar un usuario por su nombre
    Optional<Usuario> findByNombre(String nombre);

    // Método para buscar todos los usuarios con un rol específico
    List<Usuario> findByRol(String rol);
}
