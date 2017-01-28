function loadXMLDoc(filename) {
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", filename, false);
    xhttp.send();
    return xhttp.responseXML;
}

var oGestion = new Gestion();
var oXML = loadXMLDoc("datos.xml");

var oClientes = oXML.getElementsByTagName("cliente");
for (var j = 0; j < oClientes.length; j++) {
    var dni = oClientes[j].getElementsByTagName("dni")[0].textContent;
    var nombre = oClientes[j].getElementsByTagName("nombre")[0].textContent;
    var apellidos = oClientes[j].getElementsByTagName("apellidos")[0].textContent;
    var telefono = oClientes[j].getElementsByTagName("telefono")[0].textContent;

    var oCliente = new Cliente(dni, nombre, apellidos, telefono);
    oGestion.altaCliente(oCliente);
}

var oLugares = oXML.getElementsByTagName("lugar");
for (var j = 0; j < oLugares.length; j++) {
    var descripcion = oLugares[j].getElementsByTagName("descripcion")[0].textContent;
    var direccion = oLugares[j].getElementsByTagName("direccion")[0].textContent;
    var capacidad = oLugares[j].getElementsByTagName("capacidad")[0].textContent;

    var oLugar = new Lugar(descripcion, direccion, capacidad);
    oGestion.altaLugar(oLugar);
}


var oAsistentes = oXML.getElementsByTagName("asistente");
for (var j = 0; j < oAsistentes.length; j++) {
    var dni = oAsistentes[j].getElementsByTagName("dni")[0].textContent;
    var nombre = oAsistentes[j].getElementsByTagName("nombre")[0].textContent;
    var apellidos = oAsistentes[j].getElementsByTagName("apellidos")[0].textContent;
    var telefono = oAsistentes[j].getElementsByTagName("telefono")[0].textContent;
    var email = oAsistentes[j].getElementsByTagName("email")[0].textContent;
    var eventoAsistente = oAsistentes[j].getElementsByTagName("eventoAsistente")[0].textContent;

    var oAsistente = new Asistente(dni, nombre, apellidos, telefono, email);
    var sMensaje = oGestion.altaAsistente(oAsistente);
}

var oTransportes = oXML.getElementsByTagName("transporte");
for (var j = 0; j < oTransportes.length; j++) {
    var id = oTransportes[j].getElementsByTagName("id")[0].textContent;
    var tipo = oTransportes[j].getElementsByTagName("tipo")[0].textContent;
    var plazas = oTransportes[j].getElementsByTagName("plazas")[0].textContent;

    var oTransporte = new Transporte(id, tipo, plazas);
    oGestion.altaTransporte(oTransporte);
}

var oEventos = oXML.getElementsByTagName("evento");
for (var j = 0; j < oEventos.length; j++) {
    var fecha = oEventos[j].getElementsByTagName("fecha")[0].textContent;
    var descripcion = oEventos[j].getElementsByTagName("descripcion")[0].textContent;

    var oEvento = new Evento(fecha, descripcion);
    oGestion.altaEvento(oEvento);
}


function ocultarFormulario() {
    document.getElementById("uml").style.display = "none";
    document.formuCliente.reset();
    document.formuCliente.style.display = "none";
    document.frmBajaCliente.reset();
    document.frmBajaCliente.style.display = "none";
    document.frmTrabajador.reset();
    document.frmTrabajador.style.display = "none";
    document.frmGestionContrato.reset();
    document.frmGestionContrato.style.display = "none";
    document.formuAsistente.reset();
    document.formuAsistente.style.display = "none";
    document.formuEvento.reset();
    document.formuEvento.style.display = "none";
    document.formuTransporte.reset();
    document.formuTransporte.style.display = "none";
    document.formuLugar.reset();
    document.formuLugar.style.display = "none";
    ponerFechaActualInicio();
    ponerFechaActual();
    actualizarComboTrabajadores();
    actualizarComboTransportes();
    actualizarComboLugares();
    actualizarComboEventos();

    //desmarcamos los errores de todos los formularios
    var errores = document.querySelectorAll(".error");
    for (var i = 0; i < errores.length; i++)
        errores[i].className = "form-control input-md";

    //Ocultamos los listados
    document.querySelector("#idListaCli").style.display = "none";

}

function ocultarFormulariosRadio() {
    document.getElementById('idArtista').style.display = "none";
    document.getElementById('idTecnico').style.display = "none";
    document.getElementById('idSanitario').style.display = "none";
    document.getElementById('idLimpieza').style.display = "none";
}

function mostrarAltaCliente() {
    ocultarFormulario();
    document.formuCliente.style.display = "block";
}

function mostrarBajaCliente() {
    ocultarFormulario();
    rellenaComboBajaCliente();
    document.frmBajaCliente.style.display = "block";
}

function mostrarUML() {
    ocultarFormulario();
    document.getElementById("uml").style.display = "block";
}

function mostrarTrabajador() {
    ocultarFormulario();
    document.frmTrabajador.style.display = "block";
}

function mostrarRadioArtista() {
    ocultarFormulariosRadio();
    document.getElementById('idArtista').style.display = "block";
}

function mostrarRadioTecnico() {
    ocultarFormulariosRadio();
    document.getElementById('idTecnico').style.display = "block";
}

function mostrarRadioLimpieza() {
    ocultarFormulariosRadio();
    document.getElementById('idLimpieza').style.display = "block";
}

function mostrarRadioSanitario() {
    ocultarFormulariosRadio();
    document.getElementById('idSanitario').style.display = "block";
}
function mostrarEvento() {
    ocultarFormulario();
    document.frmGestionEventos.style.display = "block";
}

function mostrarContrato() {
    ocultarFormulario();
    document.frmGestionContrato.style.display = "block";
}

function altaCliente() {
    var oForm = document.formuCliente;
    var bValido = true;
    var sMensaje = "";
    var dni = oForm.dni.value.trim();
    var nombre = oForm.nombre.value.trim();
    var apellidos = oForm.apellidos.value.trim();
    var telefono = document.formuCliente.telefono.value.trim();

    //Validar dni
    var oExpReg = /^\d{8}[a-zA-Z]$/;

    if (oExpReg.test(dni) == false) {
        if (bValido == true) {
            bValido = false;
            document.formuCliente.dni.focus();
        }
        sMensaje += "Formato D.N.I incorrecto, debe contener 8 dígitos seguidos de una letra\n";

        //Marcamos el error
        document.formuCliente.dni.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.formuCliente.dni.className = "form-control input-md";
    }

    //Validar nombre
    var oExpReg = /^[a-zA-Z]*/;

    if (oExpReg.test(nombre) == false) {
        if (bValido == true) {
            bValido = false;
            document.formuCliente.nombre.focus();
        }
        sMensaje += "El nombre debe contener solo carácteres alfabéticos\n";

        //Marcamos el error
        document.formuCliente.nombre.className = "form-control input-md error";
    }

    else {
        //Aquí se desmarca el error
        document.formuCliente.nombre.className = "form-control input-md";
    }

    //Validar apellido

    var oExpReg = /^[a-zA-Z]*/;

    if (oExpReg.test(apellidos) == false) {
        if (bValido == true) {
            bValido = false;
            document.formuCliente.apellidos.focus();
        }
        sMensaje += "El apellido debe contener solo carácteres alfabéticos\n";

        //Marcamos el error
        document.formuCliente.apellidos.className = "form-control input-md error";
    }

    else {
        //Aquí se desmarca el error
        document.formuCliente.apellidos.className = "form-control input-md";
    }
    //Validar telefono

    var oExpReg = /^[679]\d{8}/;

    if (oExpReg.test(telefono) == false) {
        if (bValido == true) {
            bValido = false;
            document.formuCliente.telefono.focus();
        }
        sMensaje += "El telefono debe empezar por 6,7 o 9 y tener un total de 9 dígitos\n";

        //Marcamos el error
        document.formuCliente.telefono.className = "form-control input-md error";
    }

    else {
        //Aquí se desmarca el error
        document.formuCliente.telefono.className = "form-control input-md";
    }

    if (bValido == false) {
        toastr.error(sMensaje, "Error");
    }
    else {//Damos de alta el cliente
        var oCliente = new Cliente(dni, nombre, apellidos, telefono);
        sMensaje = oGestion.altaCliente(oCliente);
        document.formuCliente.reset();
        if (sMensaje == true) {
            toastr.error("Ese cliente ya fue dado de alta previamente", "Cliente ya existente");
        }
        else {
            toastr.success("Cliente dado de alta", "Conseguido");
        }
    }
}

function bajaCliente() {
    var oForm = document.frmBajaCliente;
    var bValido = true;
    var sMensaje = "";
    var clienteBaja = oForm.clienteBaja.value;
    var clienteMod = clienteBaja.substr(0, 9);

    sMensaje = oGestion.darBajaCliente(clienteMod);
    rellenaComboBajaCliente();

    if (sMensaje == false) {
        toastr.success("Cliente dado de alta", "Conseguido");
    }
}

function rellenaComboBajaCliente() {
    var mod = document.frmBajaCliente.clienteBaja.children;
    for (var i = mod.length - 1; i >= 0; i--) {
        mod[i].parentNode.removeChild(mod[i]);
    }

    var comboClientes = oGestion.obtenerClientes();
    mod = document.frmBajaCliente.clienteBaja;
    for (i = 0; i < comboClientes.length; i++) {
        var item = document.createElement("option");
        item.setAttribute("value", comboClientes[i]);
        var texto = document.createTextNode(comboClientes[i]);
        item.appendChild(texto);
        mod.appendChild(item);
    }
}

function altaTrabajador() {
    var oForm = document.frmTrabajador;
    var bValido = true;
    var sMensaje = "";
    var dni = oForm.dni.value.trim();
    var nombre = oForm.nombre.value.trim();
    var apellidos = oForm.apellidos.value.trim();

    var oExpReg = /^\d{8}[a-zA-Z]$/;

    if (oExpReg.test(dni) == false) {
        if (bValido == true) {
            bValido = false;
            document.frmTrabajador.dni.focus();
        }
        sMensaje += "Formato D.N.I incorrecto, debe contener 8 dígitos seguidos de una letra\n";

        //Marcamos el error
        document.frmTrabajador.dni.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.frmTrabajador.dni.className = "form-control input-md";
    }

    //Validar nombre
    var oExpReg = /^[a-zA-Z]*/;

    if (oExpReg.test(nombre) == false) {
        if (bValido == true) {
            bValido = false;
            document.frmTrabajador.nombre.focus();
        }
        sMensaje += "El nombre debe contener solo carácteres alfabéticos\n";

        //Marcamos el error
        document.frmTrabajador.nombre.className = "form-control input-md error";
    }

    else {
        //Aquí se desmarca el error
        document.frmTrabajador.nombre.className = "form-control input-md";
    }

    //Validar apellido

    var oExpReg = /^[a-zA-Z]*/;

    if (oExpReg.test(apellidos) == false) {
        if (bValido == true) {
            bValido = false;
            document.frmTrabajador.apellidos.focus();
        }
        sMensaje += "El apellido debe contener solo carácteres alfabéticos\n";

        //Marcamos el error
        document.frmTrabajador.apellidos.className = "form-control input-md error";
    }

    else {
        //Aquí se desmarca el error
        document.frmTrabajador.apellidos.className = "form-control input-md";
    }

    var valorTipoRadio = document.frmTrabajador.radios.value;

    if (valorTipoRadio == 'artista') {
        var aInstrumentos = [];
        for (var i = 0; i < oForm.selectInstrumentos.options.length; i++) {
            if (oForm.selectInstrumentos.options[i].selected == true) {
                aInstrumentos.push(oForm.selectInstrumentos.options[i].value);
            }
        }
        if (aInstrumentos.length == 0) {
            if (bValido == true) {
                bValido = false;
                aInstrumentos = 0;
            }
            sMensaje += "Debe seleccionar algún instrumento";
        }
        var sGenero = oForm.selectGenero.value;

        var sInstrumentos = "";

        for (var i = 0; i < aInstrumentos.length; i++) {
            sInstrumentos += aInstrumentos[i] + ", ";
        }
        console.log(sInstrumentos);

        var oArtista = new Artista(dni, nombre, apellidos, sInstrumentos, sGenero);
        sMensaje = oGestion.altaTrabajador(oArtista);
        if (sMensaje == true) {
            toastr.error("Ese trabajador ya fue dado de alta previamente", "Trabajador ya existente");
        }
        else {
            toastr.success("Artista dado de alta", "Conseguido");
        }
    }

    else {
        if (valorTipoRadio == 'tecnico') {

            var especialidadTecnica = oForm.especialidadTec.value;
            var herramientasPropias = oForm.radiosHerramientas.value;

            var oTecnico = new Tecnicos(dni, nombre, apellidos, especialidadTecnica, herramientasPropias);
            sMensaje = oGestion.altaTrabajador(oTecnico);

            if (sMensaje == true) {
                toastr.error("Ese trabajador ya fue dado de alta previamente", "Trabajador ya existente");
            }
            else {
                toastr.success("Técnico dado de alta", "Conseguido");
            }
        }

        else {
            if (valorTipoRadio == 'sanitarios') {
                var especialidadSanitario = oForm.especialidadSani.value;

                var oSanitario = new Sanitarios(dni, nombre, apellidos, especialidadSanitario);
                sMensaje = oGestion.altaTrabajador(oSanitario);
                if (sMensaje == true) {
                    toastr.error("Ese trabajador ya fue dado de alta previamente", "Trabajador ya existente");
                }
                else {
                    toastr.success("Sanitario dado de alta", "Conseguido");
                }
            }

            else {
                if (valorTipoRadio == 'limpieza') {
                    var compañiaLimpieza = oForm.limpieza.value;
                    if (compañiaLimpieza == "") {
                        compañiaLimpieza = "Trabaja en Negro";
                    }

                    var oLimpieza = new Limpieza(dni, nombre, apellidos, compañiaLimpieza);
                    sMensaje = oGestion.altaTrabajador(oLimpieza);

                    if (sMensaje == true) {
                        toastr.error("Ese trabajador ya fue dado de alta previamente", "Trabajador ya existente");
                    }
                    else {
                        toastr.success("Limpiador dado de alta", "Conseguido");
                    }
                }
            }
        }
    }
}

function altaContrato() {
    var oForm = document.frmGestionContrato;
    var sMensaje = "";
    var bValido = false;
    var idContrato = oForm.idcontrato.value.trim();
    var fechaInicio = oForm.fechaInicio.value.trim();
    var fechaFin = oForm.fechaFin.value.trim();
    var importe = parseFloat(oForm.importe.value.trim());
    var objetoCliente = oForm.selectObjetoCliente.value;
    var objetoEvento = oForm.selectObjetoEvento.value;


    //Validar campo ID
    var oExpReg = /^\d{2}$/;

    if (oExpReg.test(idContrato) == false) {
        if (bValido == true) {
            bValido = false;
            document.frmGestionContrato.idcontrato.focus();
        }
        sMensaje += "El ID debe contener solo 2 dígitos\n";

    }
    else {
        document.frmGestionContrato.idcontrato.className = "form-control input-md";
    }

    //Validamos Fecha Inicial

    if (validarFormatoFecha(fechaInicio)) {
        if (existeFecha(fechaInicio)) {
            //Aquí se desmarca el error
            document.frmGestionContrato.fechaInicio.className = "form-control input-md";
        } else {
            if (bValido == true) {
                bValido = false;
                document.frmGestionContrato.fechaInicio.focus();
            }
            sMensaje += "La fecha introducida no existe\n";
            //Marcamos el error
            document.frmGestionContrato.fechaInicio.className = "form-control input-md error";
        }
    } else {
        if (bValido == true) {
            bValido = false;
            document.frmGestionContrato.fechaInicio.focus();
        }
        sMensaje += "La fecha no tiene un formato correcto\n";
        //Marcamos el error
        document.frmGestionContrato.fechaInicio.className = "form-control input-md error";
    }

    //Validamos Fecha Final
    if (validarFormatoFecha(fechaFin)) {
        if (existeFecha(fechaFin)) {
            //Aquí se desmarca el error
            document.frmGestionContrato.fechaFin.className = "form-control input-md";
        } else {
            if (bValido == true) {
                bValido = false;
                document.frmGestionContrato.fechaFin.focus();
            }
            sMensaje += "La fecha introducida no existe\n";
            //Marcamos el error
            document.frmGestionContrato.fechaFin.className = "form-control input-md error";
        }
    } else {
        if (bValido == true) {
            bValido = false;
            document.frmGestionContrato.fechaFin.focus();
        }
        sMensaje += "La fecha no tiene un formato correcto\n";
        //Marcamos el error
        document.frmGestionContrato.fechaFin.className = "form-control input-md error";
    }


    if (bValido == false) {
        toastr.error(sMensaje, "Error");
    }
    else {//Damos de alta el contrato
        document.frmGestionContrato.reset();
        ponerFechaActualInicio();
    }

}

function ponerFechaActualInicio() {
    var f = new Date();
    if ((f.getMonth() + 1) < 10)
        var mes = "0" + (f.getMonth() + 1);
    var actual = (f.getDate() + "/" + mes + "/" + f.getFullYear());
    document.getElementById("fechaInicio").value = actual;
}

function rellenaComboCliente() {
    var mod = document.frmGestionContrato.selectObjetoCliente.children;
    for (var i = mod.length - 1; i >= 0; i--) {
        mod[i].parentNode.removeChild(mod[i]);
    }

    var comboClientes = oGestion.obtenerClientes();
    mod = document.frmGestionContrato.selectObjetoCliente;
    for (i = 0; i < comboClientes.length; i++) {
        var item = document.createElement("option");
        item.setAttribute("value", comboClientes[i]);
        var texto = document.createTextNode(comboClientes[i]);
        item.appendChild(texto);
        mod.appendChild(item);
    }
}

function rellenaComboEventos() {
    var mod = document.frmGestionContrato.selectObjetoCliente.children;
    for (var i = mod.length - 1; i >= 0; i--) {
        mod[i].parentNode.removeChild(mod[i]);
    }

    var comboClientes = oGestion.obtenerEventos();
    mod = document.frmGestionContrato.selectObjetoCliente;
    for (i = 0; i < comboClientes.length; i++) {
        var item = document.createElement("option");
        item.setAttribute("value", comboClientes[i]);
        var texto = document.createTextNode(comboClientes[i]);
        item.appendChild(texto);
        mod.appendChild(item);
    }
}

//FORMULARIO DE ASISTENTES**********************************************************************************************
function mostrarAltaAsistente() {
    ocultarFormulario();
    document.formuAsistente.style.display = "block";
}

function altaAsistente() {
    var oForm = document.formuAsistente;
    var dni = oForm.dni.value.trim();
    var nombre = oForm.nombre.value.trim();
    var apellidos = oForm.apellidos.value.trim();
    var telefono = oForm.telefono.value.trim();
    var email = oForm.email.value.trim();
    var bValido = true;
    var sMensaje = "";
    var errores = [];

    //Validar dni
    var oExpReg = /^\d{8}[a-zA-Z]$/;
    if (oExpReg.test(dni) == false) {
        if (bValido == true) {
            bValido = false;
            document.formuCliente.dni.focus();
        }
        sMensaje = "Formato D.N.I incorrecto, debe contener 8 dígitos seguidos de una letra\n";
        errores.push(sMensaje);

        //Marcamos el error
        document.formuAsistente.dni.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.formuAsistente.dni.className = "form-control input-md";
    }

    //Validar nombre
    var oExpReg = /^[a-z][a-z]*/;
    if (oExpReg.test(nombre) == false) {
        if (bValido == true) {
            bValido = false;
            document.formuAsistente.nombre.focus();
        }
        sMensaje = "El nombre debe contener solo carácteres alfabéticos\n";
        errores.push(sMensaje);

        //Marcamos el error
        document.formuAsistente.nombre.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.formuAsistente.nombre.className = "form-control input-md";
    }

    //Validar apellido
    var oExpReg = /^[a-z][a-z]*/;
    if (oExpReg.test(apellidos) == false) {
        if (bValido == true) {
            bValido = false;
            document.formuAsistente.apellidos.focus();
        }
        sMensaje = "El apellido debe contener solo carácteres alfabéticos\n";
        errores.push(sMensaje);

        //Marcamos el error
        document.formuAsistente.apellidos.className = "form-control input-md error";
    }

    else {
        //Aquí se desmarca el error
        document.formuAsistente.apellidos.className = "form-control input-md";
    }

    //Validar telefono
    var oExpReg = /^[679]\d{8}/;
    if (oExpReg.test(telefono) == false) {
        if (bValido == true) {
            bValido = false;
            document.formuAsistente.telefono.focus();
        }
        sMensaje = "El telefono debe empezar por 6,7 o 9 y tener un total de 9 dígitos\n";
        errores.push(sMensaje);

        //Marcamos el error
        document.formuAsistente.telefono.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.formuAsistente.telefono.className = "form-control input-md";
    }


    //Validar email
    var oExpReg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
    if (oExpReg.test(email) == false) {
        if (bValido == true) {
            bValido = false;
            //Este campo obtiene el foco
            document.formuAsistente.email.focus();
        }
        sMensaje = "Formato de Email incorrecto, Ej. ejemplo@gmail.es \n";
        errores.push(sMensaje);
        //Marcar error
        document.formuAsistente.email.className = "form-control input-md error";
    }
    else {
        //Desmarcar error
        document.formuAsistente.email.className = "form-control input-md";
    }

    //Mostramos mensaje de error o introducimos los datos
    if (bValido == false) {
        mostrarMensajeDeError(errores);
    }
    else {
        //guardamos el asistente
        document.formuAsistente.reset();
        var oAsistente = new Asistente(dni, nombre, apellidos, telefono, email/*, evento*/);
        var bExiste = oGestion.altaAsistente(oAsistente);

        if (bExiste == true) {
            errores.push("Este asistente ya fue dado de alta previamente");
            mostrarMensajeDeError(errores);
        }
        else {
            mostrarMensajeCorrecto("Asistente dado de alta");
        }
    }
}

//GESTION EVENTOS
function mostrarAltaEvento() {
    ocultarFormulario();
    document.formuEvento.style.display = "block";
}

function altaEvento() {
    var oForm = document.formuEvento;
    var fecha = oForm.fecha.value.trim();
    var descripcion = oForm.descripcion.value.trim();
    var trabajadores = oForm.listaTrabajadores.value.trim();
    var transportes = oForm.listaTransportes.value.trim();
    var bValido = true;
    var sMensaje = "";
    var errores = [];


    //Validar fecha
    if (validarFormatoFecha(fecha)) {
        if (existeFecha(fecha)) {
            //Aquí se desmarca el error
            document.formuEvento.fecha.className = "form-control input-md";
        } else {
            if (bValido == true) {
                bValido = false;
                document.formuEvento.fecha.focus();
            }
            sMensaje = "La fecha introducida no existe\n";
            errores.push(sMensaje);
            //Marcamos el error
            document.formuEvento.fecha.className = "form-control input-md error";
        }
    } else {
        if (bValido == true) {
            bValido = false;
            document.formuEvento.fecha.focus();
        }
        sMensaje = "La fecha no tiene un formato correcto\n";
        errores.push(sMensaje);
        //Marcamos el error
        document.formuEvento.fecha.className = "form-control input-md error";
    }


    //Validar descripcion
    var oExpReg = /^[a-zA-Z][a-zA-Z]*/;
    if (oExpReg.test(descripcion) == false) {
        if (bValido == true) {
            bValido = false;
            document.formuEvento.descripcion.focus();
        }
        sMensaje = "La descripcion debe contener solo carácteres alfabéticos\n";
        errores.push(sMensaje);

        //Marcamos el error
        document.formuEvento.descripcion.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.formuEvento.descripcion.className = "form-control input-md";
    }


    //Validar combo Trabajadores
    var indiceTrabajadores = oForm.listaTrabajadores.selectedIndex;
    if( indiceTrabajadores == null) {
        document.formuEvento.listaTrabajadores.className = "form-control input-md error";
        sMensaje = "Debes seleccionar un trabajador\n";
        errores.push(sMensaje);
    }
    else{
        document.formuEvento.listaTrabajadores.className = "form-control input-md";
    }

    //Validar combo Transportes
    var indiceTransportes = oForm.listaTransportes.selectedIndex;
    if( indiceTransportes == null) {
        document.formuEvento.listaTransportes.className = "form-control input-md error";
        sMensaje = "Debes seleccionar un transporte\n";
        errores.push(sMensaje);
    }
    else{
        document.formuEvento.listaTransportes.className = "form-control input-md";
    }



    //Mostramos mensaje de error o introducimos los datos
    if (bValido == false) {
        mostrarMensajeDeError(errores);
    }
    else {
        //guardamos el evento
        document.formuEvento.reset();
        ponerFechaActual();
        var oEvento = new Evento(fecha, descripcion, trabajadores, transportes);
        var bExiste = oGestion.altaEvento(oEvento);

        if (bExiste == true) {
            errores.push("Ese evento ya fue dado de alta previamente");
            mostrarMensajeDeError(errores);
        }
        else {
            mostrarMensajeCorrecto("Evento dado de alta");
        }
    }

}
//************************************************************************************************************************************************************************************************************
function ponerFechaActual() {
    var f = new Date();
    if ((f.getMonth() + 1) < 10)
        var mes = "0" + (f.getMonth() + 1);
    var actual = (f.getDate() + "/" + mes + "/" + f.getFullYear());
    document.getElementById("fechaEvento").value = actual;
}

function existeFecha(fecha) {
    var fechaf = fecha.split("/");
    var day = fechaf[0];
    var month = fechaf[1];
    var year = fechaf[2];
    var date = new Date(year, month, '0');
    if ((day - 0) > (date.getDate() - 0)) {
        return false;
    }
    return true;
}

function validarFormatoFecha(campo) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((campo.match(RegExPattern)) && (campo != '')) {
        return true;
    } else {
        return false;
    }
}

//FORMULARIO DE TRANSPORTES*********************************************************************************************
function mostrarAltaTransporte() {
    ocultarFormulario();
    document.formuTransporte.style.display = "block";
}

function altaTransporte() {
    var oForm = document.formuTransporte;
    var id = oForm.id.value.trim();
    var tipo = oForm.tipo.value.trim();
    var plazas = oForm.plazas.value.trim();
    var bValido = true;
    var sMensaje = "";
    var errores = [];

    //Validar id
    if (id == "") {
        if (bValido == true) {
            bValido = false;
            document.formuTransporte.id.focus();
        }
        sMensaje = "La idetificacion debe contener solo carácteres alfanumericos\n";
        errores.push(sMensaje);
        //Marcamos el error
        document.formuTransporte.id.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.formuTransporte.id.className = "form-control input-md";
    }

    //Validar tipo
    var oExpReg = /^[a-zA-Z][a-zA-Z]*/;
    if (oExpReg.test(tipo) == false) {
        if (bValido == true) {
            bValido = false;
            document.formuTransporte.tipo.focus();
        }
        sMensaje = "El tipo debe contener solo carácteres alfabéticos\n";
        errores.push(sMensaje);

        //Marcamos el error
        document.formuTransporte.tipo.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.formuTransporte.tipo.className = "form-control input-md";
    }

    //Validar plazas
    var oExpReg = /^\d[1-2]*/;
    if (oExpReg.test(plazas) == false) {
        if (bValido == true) {
            bValido = false;
            document.formuTransporte.plazas.focus();
        }
        sMensaje = "Las plazas debe ser de tipo numero\n";
        errores.push(sMensaje);

        //Marcamos el error
        document.formuTransporte.plazas.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.formuTransporte.plazas.className = "form-control input-md";
    }

    //Mostramos mensaje de error o introducimos los datos
    if (bValido == false) {
        mostrarMensajeDeError(errores);
    }
    else {
        //guardamos los transportes
        document.formuTransporte.reset();
        var oTransporte = new Transporte(id, tipo, plazas);
        var bExiste = oGestion.altaTransporte(oTransporte);

        if (bExiste == true) {
            errores.push("Ese transporte ya fue dado de alta previamente");
            mostrarMensajeDeError(errores);
        }
        else {
            mostrarMensajeCorrecto("Transporte dado de alta");
        }
    }
}

//FORMULARIO DE LUGARES*************************************************************************************************
function mostrarAltaLugar() {
    ocultarFormulario();
    document.formuLugar.style.display = "block";
}

function altaLugar() {
    var oForm = document.formuLugar;
    var sDescripcion = oForm.descripcion.value.trim();
    var sDireccion = oForm.direccion.value.trim();
    var iCapacidad = oForm.capacidad.value.trim();
    var bValido = true;
    var sMensaje = "";
    var errores = [];


    //Validar descripcion
    var oExpReg = /^[a-zA-Z][a-zA-Z]*/;
    if (oExpReg.test(sDescripcion) == false) {
        if (bValido == true) {
            bValido = false;
        }
        sMensaje = "La descripcion debe contener solo carácteres alfabéticos\n";
        errores.push(sMensaje);

        //Marcamos el error
        document.formuLugar.descripcion.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.formuLugar.descripcion.className = "form-control input-md";
    }

    //Validar direccion
    if (sDireccion == "") {
        if (bValido == true) {
            bValido = false;
        }
        sMensaje = "La direccion debe contener solo carácteres alfabéticos\n";
        errores.push(sMensaje);
        //Marcamos el error
        document.formuLugar.direccion.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.formuLugar.direccion.className = "form-control input-md";
    }

    //Validar capacidad
    var oExpReg = /^\d[1-6]*/;
    if (oExpReg.test(iCapacidad) == false) {
        if (bValido == true) {
            bValido = false;
        }
        sMensaje = "La capacidad debe ser solo numerica\n";
        errores.push(sMensaje);
        //Marcamos el error
        document.formuLugar.capacidad.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.formuLugar.capacidad.className = "form-control input-md";
    }

    //Mostramos mensaje de error o introducimos los datos
    if (bValido == false) {
        mostrarMensajeDeError(errores);
    }
    else {
        //guardamos los lugares
        document.formuLugar.reset();
        var oLugar = new Lugar(sDescripcion, sDireccion, iCapacidad);
        var sMensaje = oGestion.altaLugar(oLugar);

        if (sMensaje == true) {
            errores.push("Este lugar ya fue dado de alta previamente\n");
            mostrarMensajeDeError(errores);
        }
        else {
            sMensaje = "Lugar dado de alta\n";
            mostrarMensajeCorrecto(sMensaje);

            añadirTrabajadorAlCombo(oLugar)
        }
    }
}


function mostrarMensajeDeError(errores) {
    for (var i = errores.length - 1; i >= 0; i--)
        toastr.error(errores[i]);
}

function mostrarMensajeCorrecto(sMensaje) {
    toastr.success(sMensaje);
}


function actualizarComboTrabajadores() {
    var oForm = document.formuEvento;
    var lista = oForm.listaTrabajadores;
    // Busco por descripcion
    if (oGestion.trabajadores.length |= 0){
        for (var i = 0; i < oGestion.trabajadores.length; i++) {
            lista.options[i] = new Option(oGestion.trabajadores[i].nombre + " " + oGestion.trabajadores[i].apellidos);
        }
    }
    else{
        lista.options[i] = new Option("No hay trabajadores disponibles");
    }
}

function actualizarComboTransportes() {
    var oForm = document.formuEvento;
    var lista = oForm.listaTransportes;
    // Busco por id
    if (oGestion.transportes.length |= 0){
        for (var i = 0; i < oGestion.transportes.length; i++) {
            lista.options[i] = new Option(oGestion.transportes[i].id + " " + oGestion.transportes[i].tipo);
        }
    }
    else{
            lista.options[i] = new Option("No hay transportes disponibles");
    }

}

function actualizarComboLugares() {
    var oForm = document.formuEvento;
    var lista = oForm.listaLugares;
    // Busco por descripcion
    if (oGestion.lugares.length |= 0){
        for (var i = 0; i < oGestion.lugares.length; i++) {
            lista.options[i] = new Option(oGestion.lugares[i].descripcion);
        }
    }
    else{
        lista.options[i] = new Option("No hay lugares disponibles");
    }
}

function actualizarComboEventos() {
    var oForm = document.formuAsistente;
    var lista = oForm.listaEventos;
    // Busco por descripcion
    if (oGestion.eventos.length |= 0){
        for (var i = 0; i < oGestion.eventos.length; i++) {
            lista.options[i] = new Option(oGestion.eventos[i].descripcion + " (" + oGestion.eventos[i].fecha + ")");
        }
    }
    else{
        lista.options[i] = new Option("No hay eventos disponibles");
    }
}


//LISTADOS

function vaciarTablas(objetoPadre) {
    while (objetoPadre.children.length != 0) {
        objetoPadre.removeChild(objetoPadre.firstElementChild);
    }
}

function mostrarListaClientes() {
    ocultarFormulario();

    vaciarTablas(document.querySelector("#idListaCli"));
    document.querySelector("#idListaCli").style.display = "block";

    // vaciarTablas(document.querySelectorAll("ul.claseEjemploLista"));
    // document.querySelectorAll("ul.claseEjemploLista").style.display="block";

    var lista = oGestion.cogerTodosLosClientes();
    var oTabla = document.createElement("table");


    oTabla.setAttribute("class", "table table-striped");

    var oThead = oTabla.createTHead();
    var oFila = oThead.insertRow(-1);

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("D.N.I"));

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Nombre"));

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Apellidos"));


    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Telefono"));

    document.querySelector("#idListaCli").appendChild(oTabla);

    var oTBody = oTabla.createTBody();

    for (i = 0; i < lista.length; i++) {
        oFila = oTBody.insertRow(-1);
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].dniCliente));
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].nombre));
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].apellidos));
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].telefono));

    }
}




















