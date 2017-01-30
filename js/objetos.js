// objeto Cliente*******************************************************************************************************
function Cliente(sDniCliente, sNombre, sApellidos, iTelefono) {
    this.dniCliente = sDniCliente;
    this.nombre = sNombre;
    this.apellidos = sApellidos;
    this.telefono = iTelefono;
}

// objeto Contrato******************************************************************************************************
function Contrato(iIdContrato,dFechaInicio,dFechaFin, sImporte, objetoCliente,objetoEvento) {
    this.iIdContrato = iIdContrato;
    this.fechaInicio = dFechaInicio;
    this.fechaFin = dFechaFin;
    this.sImporte = sImporte;
    this.objetoCliente = objetoCliente;
    this.objetoEvento = objetoEvento;
}

// objeto Asistente*****************************************************************************************************
function Asistente(sDniAsistente, sNombre, sApellidos, iTelefono, sEmail, eventos) {
    this.dniAsistente = sDniAsistente;
    this.nombre = sNombre;
    this.apellidos = sApellidos;
    this.telefono = iTelefono;
    this.email = sEmail;
    this.eventos = eventos;
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
function Evento(dFecha, sDescripcion, trabajadores, sTransporte, sLugar, iAforo) {
    this.fecha = dFecha;
    this.descripcion = sDescripcion;
    this.trabajadores = trabajadores;
    this.transporte = sTransporte;
    this.lugar = sLugar;
    this.aforo = iAforo;
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

    // Busco por dni
    while (i < this.clientes.length && bEnc == false) {
        if (this.clientes[i].dniCliente == oCliente.dniCliente) {
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
    var posicion = 0;
    // Busco por descripcion
    while (i < this.clientes.length && bEnc == false) {
        if (this.clientes[i].dniCliente == dniCliente) {

            posicion = i;
            bEnc = true;
        }
        i++;
    }

    if (bEnc) {
        this.clientes.splice(posicion, 1);
    }

    return bEnc;
}

Gestion.prototype.altaContrato = function (oContrato) {
    var i = 0;
    var bEnc = false;

    while (i < this.contratos.length && bEnc == false)
    {
        if (this.contratos[i].id == oContrato.id && this.contratos[i].objetoCliente==oContrato.objetoCliente && this.contratos[i].objetoEvento==oContrato.objetoEvento) {
            bEnc = true;
        }
        i++;
    }

    if(bEnc!=true){
        this.contratos.push(oContrato);
    }

    return bEnc;
}

Gestion.prototype.altaAsistente = function (oAsistente) {
    var i = 0;
    var bEnc = false;
    var bEnc2 = false;

    // Busco por descripcion
    while (i < this.asistentes.length && bEnc == false) {
        if (this.asistentes[i].dniAsistente == oAsistente.dniAsistente && this.asistentes[i].eventos == oAsistente.eventos) {
            bEnc = true;
        }
        i++;
    }
    if (bEnc != true) {
        var i = 0;
        while (i < this.eventos.length && bEnc2 == false) {
            if ((this.eventos[i].descripcion + " (" + this.eventos[i].fecha + ")")== oAsistente.eventos) {
                this.eventos[i].aforo--;
                bEnc2 = true;
            }
            i++;
        }
        this.asistentes.push(oAsistente);
    }
    return bEnc;
}

Gestion.prototype.comprobarAforo = function (evento) {
    var i = 0;
    var bEnc = false;
    var aforo =false;
    while (i < this.eventos.length && bEnc == false) {
        if ((this.eventos[i].descripcion + " (" + this.eventos[i].fecha + ")")== evento) {
            if(this.eventos[i].aforo>0){
                aforo=true;
            }
            bEnc = true;
        }
        i++;
    }
    return aforo;
}

Gestion.prototype.altaEvento = function (oEvento) {
    var i = 0;
    var bEnc = false;

    // Busco por descripcion
    while (i < this.eventos.length && bEnc == false) {
        if (this.eventos[i].fecha == oEvento.fecha && this.eventos[i].lugar == oEvento.lugar) {
            bEnc = true;
        }
        i++;
    }
    if (bEnc != true) {
        this.eventos.push(oEvento);
    }
    return bEnc;
}

Gestion.prototype.obtenerAforoDelLugar = function (lugar) {
    var i = 0;
    var bEnc = false;

    // Busco por descripcion
    while (i < this.lugares.length && bEnc == false) {
        if (this.lugares[i].descripcion == lugar) {
            bEnc = true;
            var aforo= this.lugares[i].capacidad;
        }
        i++;
    }
    return aforo;
}

Gestion.prototype.comprobarEvento = function (oEvento) {
    var i = 0;
    var bEnc = false;

    // Busco por descripcion
    while (i < this.eventos.length && bEnc == false) {
        if (this.eventos[i].descripcion == oEvento.descripcion && this.eventos[i].fecha == oEvento.fecha) {
            bEnc = true;
        }
        i++;
    }
    return bEnc;
}

Gestion.prototype.darCancelacionEvento = function (oEvento) {
    var i = 0;
    var bEnc = false;
    var posicion = 0;
    // Busco por descripcion
    while (i < this.eventos.length && bEnc == false) {
        if ((this.eventos[i].descripcion.trim() + " (" + this.eventos[i].fecha.trim() + ")") == oEvento) {
            posicion = i;
            bEnc = true;
        }
        i++;
    }

    if (bEnc) {
        this.eventos.splice(posicion, 1);
    }
    return bEnc;
}

Gestion.prototype.obtenerEventos = function () {
    var arrayEventos = [];
    if (this.eventos.length != 0) {
        for (var i = 0; i < this.eventos.length; i++) {
            arrayEventos.push(this.eventos[i].descripcion.trim() + " (" + this.eventos[i].fecha.trim() + ")");
        }
    }
    else {
        arrayEventos.push("No hay eventos disponibles");
    }
    return arrayEventos;
}

Gestion.prototype.ponerCanceladoAEventos = function(oEvento) {
    var i = 0;
    // Busco por descripcion
    while (i < this.asistentes.length) {
        if (this.asistentes[i].eventos== oEvento) {
            this.asistentes[i].eventos =this.asistentes[i].eventos+ " CANCELADO";
        }
        i++;
    }
}

Gestion.prototype.altaTransporte = function (oTransporte) {
    var i = 0;
    var bEnc = false;

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
    if (this.clientes.length != 0) {

        for (var i = 0; i < this.clientes.length; i++) {
            arrayClientes.push(this.clientes[i].dniCliente + " " + this.clientes[i].nombre);
        }
    }
    else {
        arrayClientes.push("No hay clientes registrados");
    }
    return arrayClientes;

}

//LISTADOS
Gestion.prototype.cogerTodosLosClientes = function () {
    var arrayClientes = [];
    for (var i = 0; i < this.clientes.length; i++) {
        arrayClientes.push(this.clientes[i]);
    }
    return arrayClientes;
}

Gestion.prototype.cogerTodosLosAsistentes = function () {
    var arrayAsistentes = [];
    for (var i = 0; i < this.asistentes.length; i++) {
        arrayAsistentes.push(this.asistentes[i]);
    }
    return arrayAsistentes;
}

Gestion.prototype.cogerTodosLosEventos = function () {
    var arrayEventos = [];
    for (var i = 0; i < this.eventos.length; i++) {
        arrayEventos.push(this.eventos[i]);
    }
    return arrayEventos;
}

Gestion.prototype.cogerTodosLosTransportes = function () {
    var arrayTransportes = [];

    for (var i = 0; i < this.transportes.length; i++) {
        arrayTransportes.push(this.transportes[i]);
    }
    return arrayTransportes;
}

Gestion.prototype.cogerTodosLosLugares = function () {
    var arrayLugares = [];

    for (var i = 0; i < this.lugares.length; i++) {
        arrayLugares.push(this.lugares[i]);
    }
    return arrayLugares;
}