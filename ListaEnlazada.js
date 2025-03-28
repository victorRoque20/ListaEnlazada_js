/**
 * Clase Nodo representa cada elemento de la lista enlazada.
 */
class Nodo {
    /**
     * Constructor para crear un nodo.
     * @param {*} dato - Valor almacenado en el nodo.
     * @param {Nodo} enlace - Referencia al siguiente nodo (por defecto, null).
     */
    constructor(dato, enlace = null) {
        this.dato = dato;
        this.enlace = enlace;
    }

    /**
     * Representación en forma de cadena del nodo.
     * @returns {string} Cadena que representa el nodo y sus enlaces.
     */
    toString() {
        return `${this.dato} => ${this.enlace}`;
    }

    /**
     * Retorna el dato almacenado en el nodo.
     */
    leerDato() {
        return this.dato;
    }

    /**
     * Retorna el siguiente nodo enlazado.
     */
    siguiente() {
        return this.enlace;
    }
}

/**
 * Clase Lista representa una lista enlazada simple.
 */
class Lista {
    constructor() {
        this.primero = null;
    }

    /**
     * Retorna el primer nodo de la lista.
     * @returns {Nodo} Primer nodo.
     */
    leerPrimero() {
        return this.primero;
    }

    /**
     * Inserta un nuevo nodo al comienzo de la lista.
     * @param {*} entrada - Dato a insertar.
     * Complejidad: O(1)
     */
    insertarCabezaLista(entrada) {
        const nuevo = new Nodo(entrada, this.primero);
        this.primero = nuevo;
    }

    /**
     * Inserta un nuevo nodo después del nodo "anterior".
     * @param {Nodo} anterior - Nodo después del cual se insertará.
     * @param {*} entrada - Dato a insertar.
     * Complejidad: O(1)
     */
    insertarLista(anterior, entrada) {
        if (!anterior) {
            throw new Error("El nodo anterior debe ser válido.");
        }
        const nuevo = new Nodo(entrada, anterior.enlace);
        anterior.enlace = nuevo;
    }

    /**
     * Elimina el primer nodo que contenga el dato "entrada".
     * @param {*} entrada - Dato a eliminar.
     * Complejidad en peor caso: O(n)
     */
    eliminar(entrada) {
        let actual = this.primero;
        let anterior = null;
        
        while (actual !== null && actual.dato !== entrada) {
            anterior = actual;
            actual = actual.enlace;
        }
        
        if (actual !== null) {
            if (actual === this.primero) {
                this.primero = actual.enlace;
            } else {
                anterior.enlace = actual.enlace;
            }
        }
    }

    /**
     * Busca el primer nodo que contenga el dato "destino".
     * @param {*} destino - Dato a buscar.
     * @returns {Nodo|null} Nodo encontrado o null si no existe.
     * Complejidad en peor caso: O(n)
     */
    buscarLista(destino) {
        let actual = this.primero;
        while (actual !== null) {
            if (actual.dato === destino) {
                return actual;
            }
            actual = actual.enlace;
        }
        return null;
    }

    /**
     * Imprime la lista en consola.
     */
    visualizar() {
        let actual = this.primero;
        const elementos = [];
        while (actual !== null) {
            elementos.push(actual.dato);
            actual = actual.enlace;
        }
        console.log(elementos.join(' '));
    }

    /**
     * Representa la lista en forma de cadena.
     * Complejidad: O(1) (muestra referencia al primer nodo)
     */
    toString() {
        return `=> ${this.primero}`;
    }

    /**
     * Invierte el orden de la lista enlazada.
     * Complejidad: O(n)
     */
    invertir() {
        let prev = null;
        let current = this.primero;
        while (current !== null) {
            let nextTemp = current.enlace; // Guardamos el siguiente
            current.enlace = prev;         // Invertimos el enlace
            prev = current;                
            current = nextTemp;
        }
        this.primero = prev;
    }

    /**
     * Elimina los elementos duplicados en la lista.
     * Se recorre la lista y se usa un Set para registrar los valores únicos.
     * Complejidad: O(n) en tiempo y O(n) en espacio.
     */
    eliminarDuplicados() {
        let current = this.primero;
        let prev = null;
        const vistos = new Set();
        while (current !== null) {
            if (vistos.has(current.dato)) {
                // Eliminar el nodo actual.
                prev.enlace = current.enlace;
            } else {
                vistos.add(current.dato);
                prev = current;
            }
            current = current.enlace;
        }
    }

    /**
     * Retorna el n-ésimo elemento desde el final de la lista.
     * Si n es mayor que la cantidad de elementos, retorna null.
     * Implementación mediante dos punteros (ventana deslizante).
     * Complejidad: O(n)
     *
     * @param {number} n - Posición desde el final (1 -> último, 2 -> penúltimo, etc.)
     * @returns {*} Dato del n-ésimo nodo desde el final o null si no existe.
     */
    obtenerDesdeElFinal(n) {
        if(n <= 0) {
            throw new Error("El valor de n debe ser mayor que 0");
        }
        let puntero1 = this.primero;
        let puntero2 = this.primero;
        // Avanza puntero2 n nodos
        for (let i = 0; i < n; i++) {
            if(puntero2 === null) {
                return null;  // n es mayor que la longitud
            }
            puntero2 = puntero2.enlace;
        }
        // Mueve ambos punteros hasta que puntero2 llegue al final
        while(puntero2 !== null) {
            puntero1 = puntero1.enlace;
            puntero2 = puntero2.enlace;
        }
        return puntero1 ? puntero1.dato : null;
    }
}

//───────────────────────────────  
// Pruebas automáticas usando console.assert()
//───────────────────────────────

(function pruebas() {
    // 1. Prueba con lista vacía
    const listaVacia = new Lista();
    console.assert(listaVacia.leerPrimero() === null, "La lista vacía debe tener primero === null");
    console.assert(listaVacia.obtenerDesdeElFinal(1) === null, "Obtener desde el final en lista vacía debe retornar null");

    // 2. Prueba con lista de un solo elemento
    const listaUnElemento = new Lista();
    listaUnElemento.insertarCabezaLista(10);
    console.assert(listaUnElemento.leerPrimero().dato === 10, "La lista con un elemento debe tener primero 10");
    console.assert(listaUnElemento.obtenerDesdeElFinal(1) === 10, "El último (y único) elemento debe ser 10");
    // Invertir una lista de un elemento no debe modificar la lista.
    listaUnElemento.invertir();
    console.assert(listaUnElemento.leerPrimero().dato === 10, "Invertir lista de un elemento debe permanecer igual");
    
    // 3. Prueba con lista múltiple
    const listaMultiple = new Lista();
    listaMultiple.insertarCabezaLista(3);  // Lista: 3
    listaMultiple.insertarCabezaLista(2);  // Lista: 2 3
    listaMultiple.insertarCabezaLista(1);  // Lista: 1 2 3
    // Visualizar
    console.log("Lista múltiple inicial:");
    listaMultiple.visualizar();

    // Buscamos el nodo con valor 2 y luego insertamos un 5 después de él.
    const nodo2 = listaMultiple.buscarLista(2);
    if (nodo2) {
        listaMultiple.insertarLista(nodo2, 5); // Lista: 1 2 5 3
    }
    console.log("Después de insertar 5 después del 2:");
    listaMultiple.visualizar();
    // Verificamos que el 5 esté en la posición correcta.
    let nodoAux = listaMultiple.leerPrimero();
    console.assert(nodoAux.enlace.dato === 2, "El segundo nodo debe ser 2");
    console.assert(nodoAux.enlace.enlace.dato === 5, "El tercer nodo debe ser 5");

    // Eliminamos el 5
    listaMultiple.eliminar(5);
    console.log("Después de eliminar el 5:");
    listaMultiple.visualizar();
    // Eliminamos la cabeza (1)
    listaMultiple.eliminar(1);
    console.log("Después de eliminar la cabeza (1):");
    listaMultiple.visualizar();
    console.assert(listaMultiple.leerPrimero().dato === 2, "La nueva cabeza debe ser 2");

    // Prueba del método invertir
    // Creamos lista: 2 -> 3 -> 4 -> 2 -> 5 (con duplicado para probar eliminarDuplicados)
    const listaInvertir = new Lista();
    listaInvertir.insertarCabezaLista(5);
    listaInvertir.insertarCabezaLista(2);
    listaInvertir.insertarCabezaLista(4);
    listaInvertir.insertarCabezaLista(3);
    listaInvertir.insertarCabezaLista(2);
    console.log("Lista antes de invertir:");
    listaInvertir.visualizar();
    listaInvertir.invertir();
    console.log("Lista después de invertir:");
    listaInvertir.visualizar();
    // Se espera que la cabeza sea el último elemento de la lista original.
    console.assert(listaInvertir.leerPrimero().dato === 5, "Luego de invertir, la nueva cabeza debe ser 5");

    // Prueba del método eliminarDuplicados
    // Lista invertida es: 5 -> 2 -> 3 -> 4 -> 2
    listaInvertir.eliminarDuplicados();
    console.log("Lista después de eliminar duplicados:");
    listaInvertir.visualizar(); // Se espera: 5, 2, 3, 4
    // Recorrer para asegurarnos que no hay dos '2'
    let elementos = [];
    let actual = listaInvertir.leerPrimero();
    while(actual !== null) {
        elementos.push(actual.dato);
        actual = actual.enlace;
    }
    const cuenta2 = elementos.filter(x => x === 2).length;
    console.assert(cuenta2 === 1, "Debe quedar solo una ocurrencia del valor 2");

    // Prueba del método obtenerDesdeElFinal
    // Lista actual: 5 -> 2 -> 3 -> 4
    // n = 1: último elemento debe ser 4
    console.assert(listaInvertir.obtenerDesdeElFinal(1) === 4, "El último elemento debe ser 4");
    // n = 3: debe ser 2
    console.assert(listaInvertir.obtenerDesdeElFinal(3) === 2, "El tercer elemento desde el final debe ser 2");
    // n mayor que el tamaño debe retornar null
    console.assert(listaInvertir.obtenerDesdeElFinal(5) === null, "Si n es mayor que la longitud, debe retornarse null");

    console.log("Todas las pruebas pasaron correctamente.");
})();
