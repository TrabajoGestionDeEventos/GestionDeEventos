// objeto Cliente*******************************************************************************************************
function Cliente(sDniCliente, sNombre, sApellidos, iTelefono) {
    this.dniCliente = sDniCliente;
    this.nombre = sNombre;
    this.apellidos = sApellidos;
    this.telefono = iTelefono;
}

// objeto Contrato******************************************************************************************************
function Contrato(dFecha, iIdContrato, sImporte, articulos, dniCliente, descripcion) {
    this.fecha = dFecha;
    this.idContrato = iIdContrato;
    this.importe = sImporte;
    Cliente.call(this, dniCliente);
    Evento.call(this, descripcion);
}

// objeto Asistente*****************************************************************************************************
function Asistente(sDniAsistente, sNombre, sApellidos, iTelefono, sEmail/*, eventos*/) {
    this.dniAsistente = sDniAsistente;
    this.nombre = sNombre;
    this.apellidos = sApellidos;
    this.telefono = iTelefono;
    this.email = sEmail;
    //this.eventos = eventos;
}

// objeto Transporte****************************************************************************************************
function Transporte(iId, sTipo, iPlazas) {
    this.id = iId;
    this.tipo = sTipo;
    this.plazas = iPlazas;
}

// objeto Lugar*********************************************************************************************************
function Lugar(sDescripcion, sDireccion, iCapacidad) {
    this.descripcion = sDescripcion;
    this.direccion = sDireccion;
    this.capacidad = iCapacidad;
}

//Objeto Trabajador*****************************************************************************************************
function Trabajador(dni, nombre, apellidos) {
    this.dni = dni;
    this.nombre = nombre;
    this.apellidos = apellidos;
}

//Herencia de Trabajador
function Artista(dni, nombre, apellidos, especialidad, genero) {
    Trabajador.call(this, dni, nombre, apellidos);
    this.especialidad = especialidad;
    this.genero = genero;
}

//Herencia de Trabajador
Artista.prototype = Object.create(Trabajador.prototype);
Artista.prototype.constructor = Artista;


function Tecnicos(dni, nombre, apellidos, especialidad, herramientas) {
    Trabajador.call(this, dni, nombre, apellidos);
    this.especialidad = especialidad;
    this.herramientas = herramientas;
}

//Herencia de Trabajador
Tecnicos.prototype = Object.create(Trabajador.prototype);
Tecnicos.prototype.constructor = Tecnicos;

function Sanitarios(dni, nombre, apellidos, especialidad) {
    Trabajador.call(this, dni, nombre, apellidos);
    this.especialidad = especialidad;
}

//Herencia de Trabajador
Sanitarios.prototype = Object.create(Trabajador.prototype);
Sanitarios.prototype.constructor = Sanitarios;

function Limpieza(dni, nombre, apellidos, compañia) {
    Trabajador.call(this, dni, nombre, apellidos);
    this.compañia = compañia;
}

//Herencia de Trabajador
Limpieza.prototype = Object.create(Trabajador.prototype);
Limpieza.prototype.constructor = Limpieza;


// objeto Evento********************************************************************************************************
function Evento(dFecha, sDescripcion) {
    this.fecha = dFecha;
    this.descripcion = sDescripcion;
    this.asistente = [];
    this.transporte = [];
    this.lugar = [];
}

//**********************************************************************************************************************
//Prototipos************************************************************************************************************

function Gestion() {
    this.asistentes = [];
    this.transportes = [];
    this.lugares = [];
    this.clientes = [];
    this.trabajadores = [];
    this.eventos = [];
}


Gestion.prototype.altaCliente = function (oCliente) {
    var i = 0;
    var bEnc = false;
    var sMensaje = "";

    // Busco por dni
    while (i < this.clientes.length && bEnc == false) {
        if (this.clientes[i].dniCliente == oCliente.dni) {
            bEnc = true;
        }
        i++;
    }

    if (bEnc != true) {
        this.clientes.push(oCliente);
    }

    return bEnc;
}

Gestion.prototype.darBajaCliente = function (dniCliente) {
    var i = 0;
    var bEnc = false;
    var sMensaje = "";
    var posicion = 0;
    // Busco por descripcion
    while (i < this.clientes.length && bEnc == false) {
        if (this.clientes[i].dniCliente == dniCliente)
        {
            posicion=i;
            bEnc = true;
        }
        i++;
    }

    if (bEnc) {
        this.clientes.splice(posicion,1);
    }

    return bEnc;
}

Gestion.prototype.altaAsistente = function (oAsistente) {
    var i = 0;
    var bEnc = false;
    var sMensaje = "";

    // Busco por descripcion
    while (i < this.asistentes.length && bEnc == false) {
        if (this.asistentes[i].id == oAsistente.id) {
            bEnc = true;
        }
        i++;
    }

    if (bEnc != true) {
        this.asistentes.push(oAsistente);
    }

    return bEnc;
}

Gestion.prototype.altaEvento = function (oEvento) {
    var i = 0;
    var bEnc = false;
    var sMensaje = "";

    // Busco por descripcion
    while (i < this.eventos.length && bEnc == false) {
        if (this.eventos[i].descripcion == oEvento.descripcion && this.eventos[i].fecha == oEvento.fecha) {
            bEnc = true;
        }
        i++;
    }
    if (bEnc != true) {
        this.eventos.push(oEvento);
    }
    return bEnc;
}

Gestion.prototype.altaTransporte = function (oTransporte) {
    var i = 0;
    var bEnc = false;
    var sMensaje = "";

    // Busco por descripcion
    while (i < this.transportes.length && bEnc == false) {
        if (this.transportes[i].id == oTransporte.id) {
            bEnc = true;
        }
        i++;
    }


    if (bEnc != true) {
        this.transportes.push(oTransporte);
    }

    return bEnc;
}

Gestion.prototype.altaLugar = function (oLugar) {
    var i = 0;
    var bEnc = false;
    var sMensaje = "";

    // Busco por descripcion
    while (i < this.lugares.length && bEnc == false) {
        if (this.lugares[i].descripcion == oLugar.descripcion) {
            bEnc = true;
        }
        i++;
    }

    if (bEnc != true) {
        this.lugares.push(oLugar);
    }

    return bEnc;
}


Gestion.prototype.altaTrabajador = function (oTrabajador) {
    var i = 0;
    var bEnc = false;
    var sMensaje = "";

    // Busco por dni
    while (i < this.trabajadores.length && bEnc == false) {
        if (this.trabajadores[i].dni == oTrabajador.dni) {
            bEnc = true;
        }
        i++;
    }

    if (bEnc != true) {
        this.trabajadores.push(oTrabajador);
    }

    return bEnc;
}

Gestion.prototype.obtenerClientes = function () {
    var arrayClientes = [];

    if(this.clientes.length!=0) {

        for (var i = 0; i < this.clientes.length; i++) {
            arrayClientes.push(this.clientes[i].dniCliente + " " + this.clientes[i].nombre);
        }
    }
    else{
        arrayClientes.push("No hay clientes registrados");
    }
    return arrayClientes;

}

/*Gestion.prototype.obtenerEventos = function () {
    var arrayEventos = [];

    if(this.clientes.length!=0) {

        for (var i = 0; i < this.clientes.length; i++) {
            arrayEventos.push(this.eventos[i].descripcion);
        }
    }
    else{
        arrayEventos.push("No hay eventos registrados");
    }
    return arrayEventos;

}*/

//LISTADOS
Gestion.prototype.cogerTodosLosClientes = function () {
    var arrayClientes = [];

    for(var i = 0;i<this.clientes.length;i++){
        arrayClientes.push(this.clientes[i]);
    }
    return arrayClientes;
}