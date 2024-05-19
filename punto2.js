/*El software que se desarrollará controlará un cajero automático (ATM) a través de una
simulación usando el lenguaje de programación JavaScript.

• El cajero automático atenderá a un cliente a la vez. Se le pedirá al cliente
que inserte su documento de identidad y su pin de 4 dígitos, los cuales se
enviarán al banco para su validación como parte de cada transacción. El
cliente podrá entonces realizar una o más transacciones. El menú se
mostrará en la consola hasta que el cliente indique que no desea realizar
más transacciones.
• El cajero automático debe ser capaz de proporcionar los siguientes servicios
al cliente:
• Un cliente debe poder realizar un retiro de efectivo de cualquier cuenta
adecuada vinculada al documento de identidad, en múltiplos de $50000. Se
debe obtener la aprobación del banco antes de entregar efectivo.
• Un cliente debe poder realizar un depósito en cualquier cuenta vinculada al
documento de identidad, consistente en efectivo y/o cheques. El cliente
ingresará el monto del depósito en el cajero automático e indicar si es
efectivo o cheque.
• Un cliente debe poder realizar una transferencia de dinero entre dos
cuentas cualesquiera vinculadas a al documento de identidad.
• Un cliente debe poder realizar una consulta de saldo de cualquier cuenta
vinculada al documento de identidad.

• El cajero automático comunicará al cliente los resultados de cada
transacción dependiendo de su tipo. Ejemplo “retiro exitoso, puede tomar x
dinero de la bandeja principal”
• Si el banco determina que el PIN del cliente no es válido, se le pedirá al
cliente que vuelva a ingresar el PIN antes de que se pueda continuar con la
transacción. Si el cliente no puede ingresar correctamente el PIN después
de tres intentos saldrá de la aplicación.
• El cajero automático tendrá un panel de operador con un interruptor que
permitirá apagar o encender el cajero */


class CajeroAutomatico {
    constructor() {
        this.clienteActual = false
        this.banco = new Banco()
        this.operador = new Operador()
    }

    comenzar() {
        console.log("Bienvenido al cajero automático de Miguel")
        this.solicitarInformacion();
    }

    solicitarInformacion() {
        console.log("Por favor, digite su cédula y PIN de 4 dígitos")
        const cedula = 988175692
        const pin = 3457
        this.validarDocumentoYPin(cedula, pin)
    }

    validarDocumentoYPin(documento, pin) {
        const cliente = this.banco.clienteAutenticado(documento, pin)
        if (cliente) {
            this.clienteActual = cliente
            this.menu();
        } else {
            console.log("Documento de identidad o PIN no válido. Por favor, inténtelo de nuevo.")
        }
    }

    menu() {
        console.log("Por favor, seleccione una opción:")
        console.log("1. Retiro de efectivo")
        console.log("2. Depósito de efectivo o cheques")
        console.log("3. Transferencia de dinero")
        console.log("4. Consulta de saldo")
        console.log("5. Salir")

       
        const opcion = 1;
        this.ejecutarOpcion(opcion)
    }

    ejecutarOpcion(opcion) {
        switch (opcion) {
            case 1:
                this.realizarRetiro()
                break;
            case 2:
                this.realizarDeposito()
                break;
            case 3:
                this.realizarTransferencia()
                break;
            case 4:
                this.realizarConsultaSaldo()
                break;
            case 5:
                console.log("Gracias por usar el cajero de miguel")
                break;
            default:
                console.log("Esa opcion no es valida reintentelo")
                break;
        }
    }

    realizarRetiro() {
        console.log("¿Cuánto dinero quiere retirar?")
        const cantidadARetirar = 1000; 
        if (this.clienteActual && this.clienteActual.cuenta && this.clienteActual.cuenta.saldo >= cantidadARetirar) {
            this.clienteActual.cuenta.saldo -= cantidadARetirar
            console.log(` Puede retirar ${cantidadARetirar} de la bandeja principal.`)
            console.log(`Nuevo saldo : ${this.clienteActual.cuenta.saldo}`)
        } else {
            console.log("No tiene dinero suficiente")
        }
    }

    realizarDeposito() {
        console.log("¿Cuánto quiere depositar?")
        const cantidadADepositar = 2000
        const tipoDeposito = "efectivo"

        if (this.clienteActual && this.clienteActual.cuenta) {
            if (tipoDeposito === "efectivo") {
                this.clienteActual.cuenta.saldo += cantidadADepositar
                console.log(` Se ha depositado ${cantidadADepositar}.`)
                console.log(`Nuevo saldo : ${this.clienteActual.cuenta.saldo}`)
            } else if (tipoDeposito === "cheque") {
                console.log("Aun no tenemos esa funcionalidad, pronto la endremos .")
            } else {
                console.log("Por favor seleccione 'efectivo' o 'cheque'.")
            }
        } else {
            console.log("No se ha podido realizar el depósito")
        }
    }

    realizarTransferencia() {
        console.log("Por favor, ingrese el número de cuenta de destino:")
        const numeroCuentaDestino = "1234567890"
        console.log("¿Cuánto dinero va a dar?")
        const montoTransferencia = 1000

        if (this.clienteActual && this.clienteActual.cuenta && this.clienteActual.cuenta.saldo >= montoTransferencia) {
            this.clienteActual.cuenta.saldo -= montoTransferencia;
            this.banco.realizarTransferencia(this.clienteActual.cuenta.numero, numeroCuentaDestino, montoTransferencia)
            console.log(` Se han transferido ${montoTransferencia} a la cuenta ${numeroCuentaDestino}.`)
            console.log(`Nuevo saldo: ${this.clienteActual.cuenta.saldo}`)
        } else {
            console.log("No tiene fondos suficientes para realizar esta transferencia.")
        }
    }

    realizarConsultaSaldo() {
        if (this.clienteActual && this.clienteActual.cuenta) {
            const saldoActual = this.clienteActual.cuenta.saldo
            console.log(`Su saldo actual es: ${saldoActual}`)
        } else {
            console.log("No se pudo realizar la consulta de saldo")
        }
    }
}

class Banco {
    constructor() {
        this.clientes = []
    }

    clienteAutenticado(documento, pin) {
       
        for (let i = 0; i < this.clientes.length; i++) {
            const cliente = this.clientes[i];
            if (cliente.documento === documento && cliente.pin === pin) {
                return cliente
            }
        }
        return false; 
    }


    realizarTransferencia(numeroCuentaOrigen, numeroCuentaDestino, dinero) {
        const cuentaOrigen = this.buscarCuenta(numeroCuentaOrigen)
        const cuentaDestino = this.buscarCuenta(numeroCuentaDestino)
    
        if (!cuentaOrigen || !cuentaDestino) {
            console.log("Cuenta no válida.")
            return
        }
    
        if (cuentaOrigen.saldo < dinero) {
            console.log("no hay dinero.")
            return
        }
    
        cuentaOrigen.saldo -= dinero
        cuentaDestino.saldo += dinero
        console.log(`Transferencia de ${dinero} de la cuenta ${numeroCuentaOrigen} a la cuenta ${numeroCuentaDestino} `)
    }
}

class Operador {
    constructor() {
        this.cajeroAutomatico = false
        this.encendido = false
    }

    conectarCajero(cajero) {
        this.cajeroAutomatico = cajero
    }

    encenderCajero() {
        this.encendido = true
        console.log("Esta encendido, a trabajar .")
        this.cajeroAutomatico.comenzar()
    }

    apagarCajero() {
        this.encendido = false
        console.log("Estoy apagado")
    }
}
// crea un cajero automatico
const cajeroAutomatico = new CajeroAutomatico()
// crea el nuevo operador
const operador = new Operador()

// el oprador conecta el cajero 
operador.conectarCajero(cajeroAutomatico)

// ahi ya lo usa
operador.encenderCajero()
