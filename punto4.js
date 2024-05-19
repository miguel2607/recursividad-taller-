/*Ejercicio 4
Se necesita simular en JavaScript la atención de clientes a través de la asignación de
turnos en un banco. Se debe usar arreglos o objetos dependiendo del algoritmo que
diseñe. Y tener en cuenta las siguientes restricciones y requisitos.

• Hay tres tipos de clientes: cliente preferencial, cliente general y cliente que no
tiene cuenta en el banco
• Hay dos tipos de atención: caja o asesoría.
• Los de atención de caja se clasifican en depósitos y retiros.
• El banco cuenta con 5 cajas, de las cuales la 1 y 2 están reservadas para retiros.

• Aquellos clientes presenciales se atienden primero de los demás tipos.
• La caja 5 es solo asesoría.
• A medida que se atienden clientes se va liberando las cajas y distribuyendo entre
los usuarios de las colas. */



class Cliente {
    constructor(nombre, tipoCliente, tipoAtencion) {
        this.nombre = nombre
        this.tipoCliente = tipoCliente
        this.tipoAtencion = tipoAtencion
    }
}
class Banco {
    constructor() {
        this.cajas = [
            { identificacion: 1, tipo: 'retiro', cliente: false },
            { identificacion: 2, tipo: 'retiro', cliente: false },
            { identificacion: 3, tipo: 'deposito', cliente: false },
            { identificacion: 4, tipo: 'deposito', cliente: false },
            { identificacion: 5, tipo: 'asesoria', cliente: false }
        ]
        this.colaPreferencial = []
        this.colaGeneral = []
        this.colaSinCuenta = []
    }
    agregarCliente(cliente) {
        if (cliente.tipoCliente === 'preferencial') {
            this.colaPreferencial.push(cliente);
        } else if (cliente.tipoCliente === 'general') {
            this.colaGeneral.push(cliente)
        } else {
            this.colaSinCuenta.push(cliente)
        }
    }
    atenderClientes() {
        const todasLasColas = [this.colaPreferencial, this.colaGeneral, this.colaSinCuenta]
        for (let i = 0; i < 2; i++) {
            if (!this.cajas[i].cliente) {
                this.cajas[i].cliente = this.obtenerSiguienteCliente('retiro', todasLasColas)
            }
        }
        for (let i = 2; i < 4; i++) {
            if (!this.cajas[i].cliente) {
                this.cajas[i].cliente = this.obtenerSiguienteCliente('deposito', todasLasColas)
            }
        }
        if (!this.cajas[4].cliente) {
            this.cajas[4].cliente = this.obtenerSiguienteCliente('asesoria', todasLasColas)
        }
    }
    obtenerSiguienteCliente(tipoAtencion, colas) {
        for (let cola of colas) {
            for (let i = 0; i < cola.length; i++) {
                if (cola[i].tipoAtencion === tipoAtencion) {
                    return cola.splice(i, 1)[0]
                }
            }
        }
        return null
    }
    liberarCaja(id) {
        this.cajas[id - 1].cliente = null
    }
    mostrarEstado() {
        console.log("Estado de las  cajas:")
        this.cajas.forEach(caja => {
            console.log(`Caja ${caja.identificacion}: ${caja.cliente? caja.cliente.nombre:'Libre'}`)
        })
        console.log("espera:")
        console.log("Preferencial:", this.colaPreferencial.map(c => c.nombre))
        console.log("General:", this.colaGeneral.map(c => c.nombre))
        console.log("Sin cuenta:", this.colaSinCuenta.map(c => c.nombre))
    }
}

// se crea el banco con sus clientes
const banco = new Banco();
const clientes = [
    new Cliente('Mbappe', 'preferencial', 'retiro'),
    new Cliente('Ronaldo', 'general', 'deposito'),
    new Cliente('Messi', 'sinCuenta', 'asesoria'),
    new Cliente('Benzema', 'preferencial', 'deposito'),
    new Cliente('Haaland', 'general', 'retiro'),
    new Cliente('Diaz', 'sinCuenta', 'retiro')
]
// para cada cliente se  iterar sobre cada elemento del array clientes y ejecutar una función para cada elemento
clientes.forEach(cliente => banco.agregarCliente(cliente))
banco.atenderClientes()
banco.mostrarEstado()
banco.liberarCaja(1)
banco.liberarCaja(3)
banco.atenderClientes()
banco.mostrarEstado()
