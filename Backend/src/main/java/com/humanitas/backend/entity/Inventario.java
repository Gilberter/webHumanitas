package com.humanitas.backend.entity;

import jakarta.persistence.*;

@Entity
public class Inventario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // CAMBIADO a Long

    private String nombre;
    private int cantidad;
    private String tipo;
    private double precio;
    @Column(nullable = false)
    private boolean disponible;

    // Getters y Setters
    public Long getId() { // CAMBIADO el tipo de retorno a Long
        return id;
    }

    public void setId(Long id) { // CAMBIADO el tipo de parámetro a Long
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public int getCantidad() {
        return cantidad;
    }
    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public double getPrecio() {
        return precio;
    }
    public void setPrecio(double precio) {
        this.precio = precio;
    }
    public boolean isDisponible() {
        return disponible;
    }
    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }
}