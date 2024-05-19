/*Ejercicio 3:

• Desarrollar en JavaScript un programa para la gestión reservas de un hotel,
el cual, debe tener las siguientes características y consideraciones:
• Un cliente puede reservar cualquier tipo de habitación: individual, doble y
familiar.
• Las habitaciones pueden ser para fumadores o no fumadores.
• Las mascotas solo se aceptan en habitaciones familiares.
• El hotel cuenta con 3 habitaciones de cada tipo.
• No se puede exceder el número de personas por habitación: individual 2
personas, 4 personas para doble y 6 personas para familiar.
• El hotel necesita una estadística de las reservas: nombre de quien reserva,
país de origen, número de personas, el periodo de la estadía, número de
personas que están ocupando el hotel y si el huésped trajo mascota.*/




class Cliente {
    constructor(nombre, pais, numeroPersonas, mascota = false) {
        this.nombre = nombre
        this.pais = pais
        this.numeroPersonas = numeroPersonas
        this.mascota = mascota
    }
}

class Habitacion {
    constructor(tipo, capacidad, fumadores) {
        this.tipo = tipo
        this.capacidad = capacidad
        this.fumadores = fumadores
        this.ocupada = false
        this.cliente = false
    }

    reservar(cliente) {
        if (this.ocupada || cliente.numeroPersonas > this.capacidad || (cliente.mascota && this.tipo !== 'Familiar')) {
            return false

        }
        this.ocupada = true
        this.cliente = cliente
        return true
    }

    liberar() {
        this.ocupada = false
        this.cliente = false
    }
}

class Hotel {
    constructor() {
        this.habitaciones = [
            new Habitacion('Solo', 2, false),
            new Habitacion('Solo', 2, true),
            new Habitacion('Solo', 2, false),
            new Habitacion('2personas', 4, false), 
            new Habitacion('2personas', 4, true),
            new Habitacion('2personas', 4, false),
            new Habitacion('Familiar', 6, false),
            new Habitacion('Familiar', 6, true),
            new Habitacion('Familiar', 6, false)
        ]
        this.reservas = []
    }

    reservarHabitacion(cliente, tipo, fumadores) {
        for (let i = 0; i < this.habitaciones.length; i++) {
            let habitacion  = this.habitaciones[i]
            if (habitacion.tipo === tipo && hab.fumadores === fumadores && !habitacion.ocupada) {
                if (habitacion.reservar(cliente)) {
                    this.reservas.push(habitacion)
                    return true
                }
                return false
            }
        }
        return false
    }

    liberarHabitacion(cliente) {
        for (let i = 0; i < this.reservas.length; i++) {
            let hab = this.reservas[i]
            if (hab.cliente === cliente) {
                hab.liberar()
                this.reservas.splice(i, 1);
                return true
            }
        }
        return false
    }

    obtenerEstadisticas() {
        let estadisticas = [] 
        let ocupacionTotal = 0;

        for (let i = 0; i < this.reservas.length; i++) {
            let hab = this.reservas[i];
            ocupacionTotal += hab.cliente.numeroPersonas;
            estadisticas.push({
                nombre: hab.cliente.nombre,
                pais: hab.cliente.pais,
                numeroPersonas: hab.cliente.numeroPersonas,
                tipoHabitacion: hab.tipo,
                fumadores: hab.fumadores,
                mascota: hab.cliente.mascota
            });
        }

        return {
            reservas: estadisticas,
            ocupacionTotal: ocupacionTotal
        };
    }
}

// se crea el hotel
const hotel = new Hotel()
// se crean los clientes 
const cliente1 = new Cliente('CRISTIANO', 'Portugal', 2)
const cliente2 = new Cliente('Mbappe', 'Francia', 3, true)
// las reservitas
const Reserva1 = hotel.reservarHabitacion(cliente1, 'Solo', false)
const Reserva2 = hotel.reservarHabitacion(cliente2, 'Familiar', true)
// y el como funciona cada una de las reservas 
console.log('eserva 1:', Reserva1)
console.log('reserva 2:', Reserva2)
console.log(hotel.obtenerEstadisticas());
const resultado1 = hotel.liberarHabitacion(cliente1)

console.log('Resultado de habitacion 1:', resultado1)

console.log(hotel.obtenerEstadisticas())
