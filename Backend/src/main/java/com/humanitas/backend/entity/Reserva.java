package com.humanitas.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate; // Cambiado de LocalDateTime a LocalDate

@Entity
@Table(name = "reservas")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // Se mantiene como int (equivalente a int32)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "producto_id", nullable = false)
    private Inventario productoReservado;

    @Column(name = "fecha_reserva", nullable = false)
    private LocalDate fechaReserva; // Cambiado a LocalDate para formato año/mes/día

    @Enumerated(EnumType.STRING) // Guarda el Enum como String ("CONFIRMADO", "CANCELADO")
    @Column(nullable = false)
    private EstadoReserva estado; // Nuevo campo para el estado

    // Constructores
    public Reserva() {
    }

    public Reserva(Usuario usuario, Inventario productoReservado, LocalDate fechaReserva, EstadoReserva estado) {
        this.usuario = usuario;
        this.productoReservado = productoReservado;
        this.fechaReserva = fechaReserva;
        this.estado = estado;
    }

    // Getters y Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Inventario getProductoReservado() {
        return productoReservado;
    }

    public void setProductoReservado(Inventario productoReservado) {
        this.productoReservado = productoReservado;
    }

    public LocalDate getFechaReserva() {
        return fechaReserva;
    }

    public void setFechaReserva(LocalDate fechaReserva) {
        this.fechaReserva = fechaReserva;
    }

    public EstadoReserva getEstado() {
        return estado;
    }

    public void setEstado(EstadoReserva estado) {
        this.estado = estado;
    }

}