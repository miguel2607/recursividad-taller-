// ejercicio 1 Ejercicio 1:
//Construya un algoritmo con JavaScript” para las estadísticas de atención de una
//universidad teniendo en cuenta los siguientes requisitos:
//1. Hay dos módulos de atención: terminal para llamada telefónica y oficina.
//2. El sistema brinda las estadísticas de todo el proceso de atención:
//• Cantidad de usuarios atendidos.
//• Atendidos por día y especificación por segmento (Estudiante – docente) en
//cada uno de los módulos de atención.
//• Se permite trasferir de módulo de atención y se debe generar estadística de
//esta trasferencia.

class Usuario {
    constructor(nombre, tipo) {
        this.nombre = nombre
        this.tipo = tipo
    }
}
class profesor extends Usuario {
    constructor(nombre) {
        super(nombre, 'profesor')
    }
}

class Estudiante extends Usuario {
    constructor(nombre) {
        super(nombre, 'Estudiante')
    }
}

class Atencion {
    constructor(nombre) {
        this.nombre = nombre
        this.usuariosAtendidos = []
    }

    atenderUsuario(usuario) {
        this.usuariosAtendidos.push(usuario)
    }

    pasarUsuario(usuario, siguienteModulo) {
        this.usuariosAtendidos = this.usuariosAtendidos.filter(user => user == usuario)
        siguienteModulo.atenderUsuario(usuario)
      }
      

    getEstadisticas() {
        let estudiantes = 0
        let profesor = 0

        this.usuariosAtendidos.forEach(usuario => {
            if (usuario.tipo === 'Estudiante') {
                estudiantes++
            } else if (usuario.tipo === 'profesor') {
                profesor++
            }
        })

        return {
            modulo: this.nombre,
            total: this.usuariosAtendidos.length,
            estudiantes: estudiantes,
            profesor: profesor
        };
    }
}

class Telefono extends Atencion {
    constructor() {
        super('Telefono')
    }
}
class Oficina extends Atencion {
    constructor() {
        super('Oficina')
    }
}
class Estadistica {
    constructor() {
        this.modulos = []
    }

    agregarModulo(modulo) {
        this.modulos.push(modulo)
    }

    generarEstadisticas() {
        return this.modulos.map(modulo => modulo.getEstadisticas())
    }
}
// crea una nueva terminal para los telefonos
const Telefonos = new Telefono()
// igual para la terminal de ofivina
const oficina = new Oficina()

// se crean las nuevas estadisticas
const estadisticas = new Estadistica()

estadisticas.agregarModulo(Telefonos)
estadisticas.agregarModulo(oficina)

// se crea en la llamada a el nuevo estudiante
const estudiante1 = new Estudiante('Juan')
// se crea a el profe
const profesor1 = new profesor('Arle')
// se atiende a el esudiante
Telefonos.atenderUsuario(estudiante1)
// se atiende a el profesor en la oficina
oficina.atenderUsuario(profesor1)
// se pasa a el estudiante  a la oficina 
Telefonos.pasarUsuario(estudiante1, oficina)
// se crean las estadisticas 
console.log(estadisticas.generarEstadisticas())