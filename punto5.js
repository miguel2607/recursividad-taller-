/*Ejercicio 5
Desarrollar en JavaScript los siguientes algoritmos que den solución a la problemática
planteada.
Implementar una clase en JavaScript, la cual tenga los siguientes atributos y métodos.

Atributos:
● Código.
● Descripción.
● Precio de compra.
● Precio de venta.
● Cantidad en bodega.
● Cantidad mínima requerida en bodega.
● Cantidad máxima de inventario permitida.
● Porcentaje de Descuento.

Métodos:
● Solicitar pedido: devuelva true si debe solicitar el producto al proveedor y false en
caso contrario.
● Calcular total a pagar: devuelva la cantidad total a pagar al proveedor dado una
cantidad de unidades de compra.

Adicionalmente se desea dos subclases para los siguientes tipos de productos:
● Prendas de vestir (como lo son blusas, jeans, camisas, etc.) el cual debe tener los
siguientes parámetros adicionales:

○ Talla: S, M, L, etc.
○ Permite planchado: verdadero o falso.

● Calzado (como lo son tenis, calzado formal, sandalias, etc.) el cual debe tener el
siguiente parámetro adicional:
○ Talla: 35, 36, 37, etc.

Diseñar un programa que:
● Consulte el número de productos de tipo de prendas de vestir a manejar.
● Consulte el número de productos de tipo calzado a manejar.
● Cree en una estructura de datos (arrays, map, set), los productos de prendas de
vestir en el cual se guardarán las instancias de cada uno de ellos.
● Cree una estructura de datos (arrays, map, set) de productos de calzado en el cual
se guardarán las instancias de cada uno de ellos. */



class Producto {
    constructor(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento) {
        this.codigo = codigo
        this.descripcion = descripcion
        this.precioCompra = precioCompra
        this.precioVenta = precioVenta
        this.cantidadBodega = cantidadBodega
        this.cantidadMinima = cantidadMinima
        this.cantidadMaxima = cantidadMaxima
        this.porcentajeDescuento = porcentajeDescuento
    }

    solicitarPedido() {
        return this.cantidadBodega < this.cantidadMinima
    }

    calcularTotalAPagar(cantidadCompra) {
        let total = this.precioCompra * cantidadCompra
        let descuento = total * this.porcentajeDescuento / 100
        return total - descuento
    }
}


class PrendaVestir extends Producto { // super acceder a class producto
    constructor(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento, talla, permitePlanchado) {
        super(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento)
        this.talla = talla
        this.permitePlanchado = permitePlanchado
    }
}
class Calzado extends Producto { // aqui tambien, profe las notas son pues propias mias para que no se me olviden las cosas
    constructor(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento, talla) {
        super(codigo, descripcion, precioCompra, precioVenta, cantidadBodega, cantidadMinima, cantidadMaxima, porcentajeDescuento)
        this.talla = talla
    }
}
const productosPrendasVestir = [
    {
        codigo: "Mbappe01",
        descripcion: "Camisa real madrid",
        precioCompra: 20000,
        precioVenta: 30000,
        cantidadBodega: 10,
        cantidadMinima: 1,
        cantidadMaxima: 10,
        porcentajeDescuento: 10,
        talla: "M",
        permitePlanchado: true
    },
    {
        codigo: "Messi03",
        descripcion: "Pantaloneta de futbol",
        precioCompra: 30000,
        precioVenta: 50000,
        cantidadBodega: 15,
        cantidadMinima: 1,
        cantidadMaxima: 15,
        porcentajeDescuento: 15 ,
        talla: "L",
        permitePlanchado: false
    }
    
]
const productosCalzado = [
    {
        codigo: "Cristiano43",
        descripcion: "Zapatillas deportivas para correr",
        precioCompra: 40000,
        precioVenta: 80000,
        cantidadBodega: 20,
        cantidadMinima: 1,
        cantidadMaxima: 20,
        porcentajeDescuento: 20,
        talla: 39
    },
    {
        codigo: "Miguel098",
        descripcion: "Guayos de futbol",
        precioCompra: 50000,
        precioVenta: 100000,
        cantidadBodega: 25,
        cantidadMinima: 1,
        cantidadMaxima: 25,
        porcentajeDescuento: 15,
        talla: 35
    }
    
]
// funcionamiento de el almacen 
console.log("Productos de Prendas de Vestir:")
console.log(productosPrendasVestir)
console.log("Productos de Calzado:")
console.log(productosCalzado)
