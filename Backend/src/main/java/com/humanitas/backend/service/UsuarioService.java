package com.humanitas.backend.service;

import com.humanitas.backend.entity.Usuario;
import com.humanitas.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario crearUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> obtenerUsuarioPorId(int id) {
        return usuarioRepository.findById(id);
    }


    public List<Usuario> obtenerTodosLosUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario actualizarUsuario(int id, Usuario usuarioActualizado) {
        Optional<Usuario> usuarioExistente = usuarioRepository.findById(id);
        if (usuarioExistente.isPresent()) {
            Usuario usuario = usuarioExistente.get();
            usuario.setNombre(usuarioActualizado.getNombre());
            usuario.setRol(usuarioActualizado.getRol());
            usuario.setContrasena(usuarioActualizado.getContrasena());
            return usuarioRepository.save(usuario);
        } else {
            return null;
        }
    }

    public void eliminarUsuario(int id) {
        usuarioRepository.deleteById(id);
    }
}
