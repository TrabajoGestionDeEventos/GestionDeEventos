// objeto Cliente*******************************************************************************************************
function Cliente(sDniCliente, sNombre, sApellidos, iTelefono, contratos) {
    this.dniCliente = sDniCliente;
    this.nombre = sNombre;
    this.apellidos = sApellidos;
    this.telefono = iTelefono;
    this.contratos = contratos;
}

Cliente.prototype.toHTMLRow = function () {
    var sFila = "<td>" + this.dniCliente + "</td>";
    sFila += "<td>" + this.nombre + "</td>";
    sFila += "<td>" + this.apellidos + "</td>";
    sFila += "<td>" + this.telefono + "</td>";
    sFila += "<td>";
    var i = 0;
    while (i < this.contratos.length) {
        if (this.contratos[i] != false) {
            sFila += this.contratos[i] + "<br>";
        }
        i++;
    }
    sFila += "</td>";
    return sFila;
}

// objeto Contrato******************************************************************************************************
function Contrato(dFecha, iIdContrato, sImporte, articulos, dniCliente, descripcion, idOferta, cif) {
    this.fecha = dFecha;
    this.idContrato = iIdContrato;
    this.importe = sImporte;
    Cliente.call(this, dniCliente);
    Evento.call(this, descripcion);
    Oferta.call(this, idOferta);
    Subcontrata.call(this, cif);
}

// Aqui es donde heredamos propiedades y metodos del contrato
Contrato.prototype = Object.create(Cliente.prototype);
Contrato.prototype = Object.create(Evento.prototype);

Contrato.prototype.constructor = Contrato;

Contrato.prototype.toHTMLRow = function () {
    var sFila = "<td>" + this.fecha.getDate() + "/" + (this.fecha.getMonth() + 1) + "/" + this.fecha.getFullYear() + "</td>";
    sFila += "<td>" + this.idContrato + "</td>";
    sFila += "<td>" + this.importe + "</td>";
    sFila += "<td>" + this.dniCliente + "</td>";
    sFila += "<td>" + this.descripcion + "</td>";
    sFila += "<td>" + this.idOferta + "</td>";
    sFila += "<td>" + this.cif + "</td>";
    return sFila;
}


// objeto Oferta********************************************************************************************************
function Oferta(iIdOferta, sNombre) {
    this.oferta = iIdOferta;
    this.nombre = sNombre;
}

Oferta.prototype.toHTMLRow = function () {
    var sFila = "<td>" + this.iIdOferta + "</td>";
    sFila += "<td>" + this.sNombre + "</td>";
    return sFila;
}
/*
 // objeto Subcontrata***************************************************************************************************
 function Subcontrata(sCif, sNombre, sTelefono, sDireccion, contratos) {
 this.cif = sCif;
 this.nombre = sNombre;
 this.telefono = sTelefono;
 this.direccion = sDireccion;
 this.contratos = contratos;
 }

 Subcontrata.prototype.toHTMLRow = function () {
 var sFila = "<td>" + this.cif + "</td>";
 sFila += "<td>" + this.nombre + "</td>";
 sFila += "<td>" + this.telefono + "</td>";
 sFila += "<td>" + this.direccion + "</td>";
 sFila += "<td>";
 var i = 0;
 while (i < this.contratos.length) {
 if (this.contratos[i] != false) {
 sFila += this.contratos[i] + "<br>";
 }
 i++;
 }
 sFila += "</td>";
 return sFila;
 }

 // objeto Animacion*****************************************************************************************************
 function Animacion(iId, sTipo, sDuracion, descripcion) {
 this.id = iId;
 this.tipo = sTipo;
 this.duracion = sDuracion;
 Evento.call(this, descripcion);
 }

 // Aqui es donde heredamos propiedades y metodos de la animacion
 Animacion.prototype = Object.create(Evento.prototype);
 Animacion.prototype.constructor = Animacion;

 Animacion.prototype.toHTMLRow = function () {
 var sFila = "<td>" + this.id + "</td>";
 sFila += "<td>" + this.tipo + "</td>";
 sFila += "<td>" + this.duracion + "</td>";
 sFila += "<td>" + this.descripcion + "</td>";
 return sFila;
 }
 */
// objeto Transporte****************************************************************************************************
function Transporte(iId, sTipo, iPlazas, descripcion) {
    this.id = iId;
    this.tipo = sTipo;
    this.plazas = iPlazas;
    Evento.call(this, descripcion);
}

// Aqui es donde heredamos propiedades y metodos de la animacion
Transporte.prototype = Object.create(Evento.prototype);
Transporte.prototype.constructor = Transporte;

Transporte.prototype.toHTMLRow = function () {
    var sFila = "<td>" + this.id + "</td>";
    sFila += "<td>" + this.tipo + "</td>";
    sFila += "<td>" + this.plazas + "</td>";
    sFila += "<td>" + this.descripcion + "</td>";
    return sFila;
}

// objeto Lugar*********************************************************************************************************
function Lugar(sDescripcion, sDireccion, iCapacidad/* ,lLatitud, lLongitud, sFoto, descripcion*/) {
    this.descripcion = sDescripcion;
    this.direccion = sDireccion;
    this.capacidad = iCapacidad;
    /*
     this.latitud = lLatitud;
     this.longitud = lLongitud;
     this.foto = sFoto;
     Evento.call(this, descripcion);*/
}

// Aqui es donde heredamos propiedades y metodos de lugar
//Lugar.prototype = Object.create(Evento.prototype);
Lugar.prototype.constructor = Lugar;

Lugar.prototype.toHTMLRow = function () {
    var sFila = "<td>" + this.descripcionLugar + "</td>";
    sFila += "<td>" + this.direccion + "</td>";
    sFila += "<td>" + this.capacidad + "</td>";
    /*
     sFila += "<td>" + this.latitud + "</td>";
     sFila += "<td>" + this.longitud + "</td>";
     sFila += "<td>" + this.foto + "</td>";
     sFila += "<td>" + this.descripcion + "</td>";*/
    return sFila;
}


// objeto Evento********************************************************************************************************
function Evento(dFecha, sDescripcion) {
    this.fecha = dFecha;
    this.descripcion = sDescripcion;
    this.asistente = [];
    /*
     this.animacion = [];*/
    this.transporte = [];
    this.lugares = [];
}
//**********************************************************************************************************************
//Prototipos************************************************************************************************************


function Gestion() {
    this.asistentes = [];
    this.transportes = [];
    this.lugares = [];
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

    if (bEnc == true) {
        sMensaje = "Lugar ya registrado";
    }
    else {
        this.lugares.push(oLugar);
        sMensaje = "Lugar dado de alta";
    }

    return sMensaje;
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

    if (bEnc == true) {
        sMensaje = "Transporte ya registrado";
    }
    else {
        this.lugares.push(oTransporte);
        sMensaje = "Transporte dado de alta";
    }

    return sMensaje;
}