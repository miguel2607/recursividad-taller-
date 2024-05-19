/*Ejercicio 6:
Una subasta o remate es una venta organizada basado en la competencia directa, y
generalmente pública, es decir, a aquel comprador que pague la mayor cantidad de
dinero o de bienes a cambio del producto.
Hacer en JavaScript una simulación de subasta que cumpla con las siguientes
características:
1. Se podrá registrar los productos a subastar almacenados (id del producto, nombre
del producto, fecha y precio inicial de subasta).
2. Cada persona puede pujar por el producto que desea, indicando la fecha, el
producto y el valor ofrecido.
3. Se puede ver la lista de productos registrados.
4. La lista de ofertas por producto.
5. Seleccionar una oferta ganadora.*/


class Subasta {
    constructor(idProducto, nombre, fecha, precioInicial) {
        this.idProducto = idProducto
        this.nombre = nombre
        this.fecha = fecha
        this.precioInicial = precioInicial
        this.pujas = []
        this.finalizada = false
    }

    agregarPuja(nombrePujador, puja) {
        if (!this.finalizada && puja > this.getPrecioActual()) {
            this.pujas.push({ nombrePujador: nombrePujador, valor: puja })
            console.log(`Se puso la puja de $${puja} por ${nombrePujador} al producto ${this.idProducto}`)
        } else {
            console.log(`La puja no es válida para el producto ${this.idProducto} por ${nombrePujador}`)
        }
    }

    getPrecioActual() {
        if (this.pujas.length === 0) {
            return this.precioInicial
        }
        let maximo = this.precioInicial
        for (let i = 0; i < this.pujas.length; i++) {
            if (this.pujas[i].valor > maximo) {
                maximo = this.pujas[i].valor
            }
        }
        return maximo
    }

    obtenerGanador() {
        if (this.pujas.length === 0) {
            return false
        }
        let maximaPuja = this.pujas[0]
        for (let i = 1; i < this.pujas.length; i++) {
            if (this.pujas[i].valor > maximaPuja.valor) {
                maximaPuja = this.pujas[i]
            }
        }
        return maximaPuja
    }

    finalizarSubasta() {
        this.finalizada = true;
        const ganador = this.obtenerGanador()
        if (ganador) {
            console.log(`La subasta ha finalizado señor o señora  ${ganador.nombrePujador} con una oferta de $${ganador.valor} GANASTE AMIGO O AMIGAAA`)
        } else {
            console.log("La subasta ha finalizado sin pujas :( ")
        }
    }
}

class SistemaSubastas {
    constructor() {
        this.productos = []
    }

    registrarProducto(id, nombre, fecha, precioInicial) {
        const producto = new Subasta(id, nombre, fecha, precioInicial)
        this.productos.push(producto)
        console.log(`Producto ${nombre} registrado `)
    }

    pujar(idProducto, nombrePujador, valor) {
        let producto = false
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].idProducto === idProducto) {
                producto = this.productos[i]
                break
            }
        }
        if (producto) {
            producto.agregarPuja(nombrePujador, valor)
        } else {
            console.log("Producto no encontrado : ( ")
        }
    }

    verlosProductos() {
        for (let i = 0; i < this.productos.length; i++) {
            const producto = this.productos[i];
            console.log(`Id: ${producto.idProducto}, nombre: ${producto.nombre}, fecha: ${producto.fecha}, precio inicial: $${producto.precioInicial}`)
        }
    }

    verlasOfertas(idProducto) {
        let producto = false
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].idProducto === idProducto) {
                producto = this.productos[i]
                break
            }
        }
        if (producto) {
            for (let j = 0; j < producto.pujas.length; j++) {
                const puja = producto.pujas[j]
                console.log(`Nombre: ${puja.nombrePujador}, Valor: $${puja.valor}`)
            }
        } else {
            console.log("Producto no encontrado : ( ")
        }
    }

    seleccionarGanador(idProducto) {
        let producto = false
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].idProducto === idProducto) {
                producto = this.productos[i]
                break } 
            }
        if (producto) {
            producto.finalizarSubasta()
        } else {
            console.log("Producto no encontrad : ( ")
        }
    }
}


// se crea la nueva subasta
const sistemaSubastas = new SistemaSubastas()
// se registran los producticos 
sistemaSubastas.registrarProducto(1, "Balon de futbol", "2024-05-19", 100000  )
sistemaSubastas.registrarProducto(2, "Camisa autografiada por cristiano ronaldo", "2024-05-19", 200000 )
// las nuevas subastas 
sistemaSubastas.pujar(1, "Miguel", 150000)
sistemaSubastas.pujar(2, "Tio", 2000000)
sistemaSubastas.pujar(2, "Hermano ", 200001)
// el como funciona la subasta 
sistemaSubastas.verlosProductos()
sistemaSubastas.verlasOfertas(1)
sistemaSubastas.verlasOfertas(2)
sistemaSubastas.seleccionarGanador(1)
sistemaSubastas.seleccionarGanador(2)
