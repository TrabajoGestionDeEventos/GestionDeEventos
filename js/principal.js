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

    var trabajadorEvento = [];
    var numTrabajadores = oEventos[j].getElementsByTagName("trabajadorEvento").length;
    for (var h = 0; h < numTrabajadores; h++) {
        //oCelda.textContent+=oLibros[j].getElementsByTagName("author")[h].textContent;
        trabajadorEvento.push(oEventos[j].getElementsByTagName("trabajadorEvento")[h].textContent);
    }

    var transporteEvento = oEventos[j].getElementsByTagName("transporteEvento")[0].textContent;
    var lugarEvento = oEventos[j].getElementsByTagName("lugarEvento")[0].textContent;
    var aforo = oEventos[j].getElementsByTagName("aforo")[0].textContent;

    var oEvento = new Evento(fecha, descripcion, trabajadorEvento, transporteEvento, lugarEvento, aforo);
    oGestion.altaEvento(oEvento);
}


var oAsistentes = oXML.getElementsByTagName("asistente");
for (var j = 0; j < oAsistentes.length; j++) {
    var dni = oAsistentes[j].getElementsByTagName("dni")[0].textContent;
    var nombre = oAsistentes[j].getElementsByTagName("nombre")[0].textContent;
    var apellidos = oAsistentes[j].getElementsByTagName("apellidos")[0].textContent;
    var telefono = oAsistentes[j].getElementsByTagName("telefono")[0].textContent;
    var email = oAsistentes[j].getElementsByTagName("email")[0].textContent;
    var eventoAsistente = oAsistentes[j].getElementsByTagName("eventoAsistente")[0].textContent;

    var oAsistente = new Asistente(dni, nombre, apellidos, telefono, email, eventoAsistente);
    oGestion.altaAsistente(oAsistente);
}

var oTrabajadores = oXML.getElementsByTagName("trabajador");
for(var n=0; n<oTrabajadores.length;n++){
    var dni = oTrabajadores[n].getElementsByTagName("dni")[0].textContent;
    var nombre = oTrabajadores[n].getElementsByTagName("nombre")[0].textContent;
    var apellidos = oTrabajadores[n].getElementsByTagName("apellidos")[0].textContent;
    var tipo = oTrabajadores[n].getElementsByTagName("tipo")[0].textContent;


    if(tipo == 'Artista'){
        var nInstrumentos = oTrabajadores[n].getElementsByTagName("instrumentos").length;
        var ins = [];
        for(var s = 0; s<nInstrumentos;s++){
            ins.push(oTrabajadores[n].getElementsByTagName("instrumentos")[s].textContent);
        }
        var genero = oTrabajadores[n].getElementsByTagName("genero")[0].textContent;

        var sInstrumentos = "";
        for(var i = 0; i<ins.length;i++){
            sInstrumentos+=ins[i]+", ";
        }

        sInstrumentos = sInstrumentos.substr(0, sInstrumentos.length - 2) + ".";

        var oCurrante = new Artista(dni,nombre,apellidos,sInstrumentos,genero);
        oGestion.altaTrabajador(oCurrante);
    }
    else{
        if(tipo=='Tecnico'){
            var especialidad = oTrabajadores[n].getElementsByTagName("especialidad")[0].textContent;
            var herramientas = oTrabajadores[n].getElementsByTagName("herramientas")[0].textContent;

            var oCurrante = new Tecnicos(dni,nombre,apellidos,especialidad,herramientas);
            oGestion.altaTrabajador(oCurrante);
        }
        else{
            if (tipo == 'Sanitario'){
                var especialidad = oTrabajadores[n].getElementsByTagName("especialidad")[0].textContent;
                var oCurrante = new Sanitarios(dni,nombre,apellidos,especialidad);
                oGestion.altaTrabajador(oCurrante);
            }
            else{
                var empresa = oTrabajadores[n].getElementsByTagName("compañia")[0].textContent;
                var oCurrante = new Limpieza(dni,nombre,apellidos,empresa);
                oGestion.altaTrabajador(oCurrante);
            }
        }
    }
}

var oContratos = oXML.getElementsByTagName("contrato");
for(var c=0; c<oContratos.length;c++){
    var idContrato = oContratos[c].getElementsByTagName("id")[0].textContent;
    var fechaInicio = oContratos[c].getElementsByTagName("fechaInicio")[0].textContent;
    var fechaFin = oContratos[c].getElementsByTagName("fechaFin")[0].textContent;
    var importe = oContratos[c].getElementsByTagName("importe")[0].textContent;
    var cliente = oContratos[c].getElementsByTagName("objcliente")[0].textContent;
    var evento = oContratos[c].getElementsByTagName("objevento")[0].textContent;

    var oContrato = new Contrato(idContrato,fechaInicio,fechaFin,importe,cliente,evento);
    oGestion.altaContrato(oContrato);
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
    document.formuCancelarEvento.reset();
    document.formuCancelarEvento.style.display = "none";
    document.formuTransporte.reset();
    document.formuTransporte.style.display = "none";
    document.formuLugar.reset();
    document.formuLugar.style.display = "none";
    document.querySelector("#idContratos").style.display = "none";
    document.frmListaTrabajador.style.display = "none";
    document.getElementById('listaTrabajadoresTipo').style.display = "none";
    document.getElementById('idTablaTrabajador').style.display = "none";
    ponerFechaActualInicio();
    ponerFechaActual();
    actualizarComboTrabajadores();
    actualizarComboTransportes();
    actualizarComboLugares();
    actualizarComboEventos();
    actualizarComboEventos2();


    desmarcarErrroresFormularios();

    ocultarFormulariosRadio();
    document.getElementById('idArtista').style.display = "block";

    //Ocultamos los listados
    document.querySelector("#idListaCli").style.display = "none";
    document.querySelector("#tablaAsistentes").style.display = "none";
    document.querySelector("#tablaEventos").style.display = "none";
    document.querySelector("#tablaTransportes").style.display = "none";
    document.querySelector("#tablaLugares").style.display = "none";
}

function desmarcarErrroresFormularios() {
    //desmarcamos los errores de todos los formularios
    var errores = document.querySelectorAll(".error");
    for (var i = 0; i < errores.length; i++)
        errores[i].className = "form-control input-md";
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
    document.frmTrabajador.reset();
    ocultarFormulariosRadio();
    document.getElementById('idArtista').style.display = "block";
    document.getElementById('radioArtista').checked = true;
}

function mostrarRadioTecnico() {
    document.frmTrabajador.reset();
    ocultarFormulariosRadio();
    document.getElementById('idTecnico').style.display = "block";
    document.getElementById('radioTecnico').checked = true;
}

function mostrarRadioSanitario() {
    document.frmTrabajador.reset();
    ocultarFormulariosRadio();
    document.getElementById('idSanitario').style.display = "block";
    document.getElementById('radioSanitario').checked = true;
}

function mostrarRadioLimpieza() {
    document.frmTrabajador.reset();
    ocultarFormulariosRadio();
    document.getElementById('idLimpieza').style.display = "block";
    document.getElementById('radioLimpieza').checked = true;
}


function mostrarContrato() {
    ocultarFormulario();
    rellenaComboClientes();
    document.frmGestionContrato.style.display = "block";
}

function mostrarListadoTrabajador(){
    ocultarFormulario();
    document.getElementById('listaTrabajadoresTipo').reset();
    document.getElementById('listaTrabajadoresTipo').style.display = "block";
}

function altaCliente() {
    var oForm = document.formuCliente;
    var bValido = true;
    var sMensaje = "";
    var dni = oForm.dni.value.trim();
    var nombre = oForm.nombre.value.trim();
    var apellidos = oForm.apellidos.value.trim();
    var telefono = document.formuCliente.telefono.value.trim();
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
        document.formuCliente.dni.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.formuCliente.dni.className = "form-control input-md";
    }

    //Validar nombre
    var oExpReg = /^[a-zA-Z]{3,40}/;

    if (oExpReg.test(nombre) == false) {
        if (bValido == true) {
            bValido = false;
            document.formuCliente.nombre.focus();
        }
        sMensaje = "El nombre debe contener solo carácteres alfabéticos\n";
        errores.push(sMensaje);

        //Marcamos el error
        document.formuCliente.nombre.className = "form-control input-md error";
    }

    else {
        //Aquí se desmarca el error
        document.formuCliente.nombre.className = "form-control input-md";
    }

    //Validar apellido

    var oExpReg = /^[a-zA-Z]{3,40}/;

    if (oExpReg.test(apellidos) == false) {
        if (bValido == true) {
            bValido = false;
            document.formuCliente.apellidos.focus();
        }
        sMensaje = "El apellido debe contener solo carácteres alfabéticos\n";
        errores.push(sMensaje);

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
        sMensaje = "El telefono debe empezar por 6,7 o 9 y tener un total de 9 dígitos\n";
        errores.push(sMensaje);

        //Marcamos el error
        document.formuCliente.telefono.className = "form-control input-md error";
    }

    else {
        //Aquí se desmarca el error
        document.formuCliente.telefono.className = "form-control input-md";
    }

    if (bValido == false) {
        mostrarMensajeDeError(errores);
    }
    else {//Damos de alta el cliente
        var oCliente = new Cliente(dni, nombre, apellidos, telefono);
        sMensaje = oGestion.altaCliente(oCliente);
        document.formuCliente.reset();

        if (sMensaje == true) {
            errores.push("Ese cliente ya fue dado de alta previamente");
            mostrarMensajeDeError(errores);
            document.formuCliente.dni.focus();
        }
        else {
            mostrarMensajeCorrecto("Cliente dado de alta");
            oForm.reset();
        }
    }
}

function bajaCliente() {
    var oForm = document.frmBajaCliente;
    var bValido = true;
    var sMensaje = "";
    var clienteBaja = oForm.clienteBaja.value;
    var clienteMod = clienteBaja.substr(0, 9);
    var errores = [];

    sMensaje = oGestion.darBajaCliente(clienteMod);
    rellenaComboBajaCliente();

    if (sMensaje == false) {
        errores.push("No hay clientes registrados")
        mostrarMensajeDeError(errores);
    }
    else{
        mostrarMensajeCorrecto("Cliente dado de baja");
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
    var errores = [];

    var oExpReg = /^\d{8}[a-zA-Z]$/;

    if (oExpReg.test(dni) == false) {
        if (bValido == true) {
            bValido = false;
            document.frmTrabajador.dni.focus();
        }
        sMensaje = "Formato D.N.I incorrecto, debe contener 8 dígitos seguidos de una letra";
        errores.push(sMensaje);

        //Marcamos el error
        document.frmTrabajador.dni.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.frmTrabajador.dni.className = "form-control input-md";
    }

    //Validar nombre
    var oExpReg = /^[a-zA-Z]{3,40}/;

    if (oExpReg.test(nombre) == false) {
        if (bValido == true) {
            bValido = false;
            document.frmTrabajador.nombre.focus();
        }
        sMensaje = "El nombre debe contener solo carácteres alfabéticos";
        errores.push(sMensaje);

        //Marcamos el error
        document.frmTrabajador.nombre.className = "form-control input-md error";
    }

    else {
        //Aquí se desmarca el error
        document.frmTrabajador.nombre.className = "form-control input-md";
    }

    //Validar apellido

    var oExpReg = /^[a-zA-Z]{3,40}/;

    if (oExpReg.test(apellidos) == false) {
        if (bValido == true) {
            bValido = false;
            document.frmTrabajador.apellidos.focus();
        }
        sMensaje = "El apellido debe contener solo carácteres alfabéticos";
        errores.push(sMensaje);

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
            sMensaje = "Debe seleccionar algún instrumento";
            errores.push(sMensaje);
        }
        var sGenero = oForm.selectGenero.value;

        var sInstrumentos = "";

        for (var i = 0; i < aInstrumentos.length; i++) {
            sInstrumentos += aInstrumentos[i] + ", ";
        }

        sInstrumentos = sInstrumentos.substr(0, sInstrumentos.length - 2) + ".";

        // console.log(sInstrumentos);
        if (bValido == false) {
            mostrarMensajeDeError(errores);
        }
        else {
            var oArtista = new Artista(dni, nombre, apellidos, sInstrumentos, sGenero);
            sMensaje = oGestion.altaTrabajador(oArtista);
            if (sMensaje == true) {
                errores.push("Ese trabajador ya fue dado de alta previamente");
                mostrarMensajeDeError(errores);
            }
            else {
                mostrarMensajeCorrecto("Artista dado de alta");
                mostrarRadioArtista()
            }
        }
    }
    else {
        if (valorTipoRadio == 'tecnico') {
            var especialidadTecnica = oForm.especialidadTec.value;
            var herramientasPropias = oForm.radiosHerramientas.value;
            if (bValido == false) {
                mostrarMensajeDeError(errores);
            }
            else {
                var oTecnico = new Tecnicos(dni, nombre, apellidos, especialidadTecnica, herramientasPropias);
                sMensaje = oGestion.altaTrabajador(oTecnico);

                if (sMensaje == true) {
                    errores.push("Ese trabajador ya fue dado de alta previamente")
                    mostrarMensajeDeError(errores);
                }
                else {
                    mostrarMensajeCorrecto("Técnico dado de alta");
                    mostrarRadioTecnico();
                }
            }
        }
        else {
            if (valorTipoRadio == 'sanitarios') {
                var especialidadSanitario = oForm.especialidadSani.value;
                if (bValido == false) {
                    mostrarMensajeDeError(errores);
                }
                else {
                    var oSanitario = new Sanitarios(dni, nombre, apellidos, especialidadSanitario);
                    sMensaje = oGestion.altaTrabajador(oSanitario);
                    if (sMensaje == true) {
                        errores.push("Ese trabajador ya fue dado de alta previamente")
                        mostrarMensajeDeError(errores);
                    }
                    else {
                        mostrarMensajeCorrecto("Sanitario dado de alta");
                        mostrarRadioSanitario();
                    }
                }
            }
            else {
                if (valorTipoRadio == 'limpieza') {
                    var compañiaLimpieza = oForm.limpieza.value;
                    if (compañiaLimpieza == "") {
                        compañiaLimpieza = "Trabaja en Negro";
                    }
                    if (bValido == false) {
                        mostrarMensajeDeError(errores);
                    }
                    else {
                        var oLimpieza = new Limpieza(dni, nombre, apellidos, compañiaLimpieza);
                        sMensaje = oGestion.altaTrabajador(oLimpieza);

                        if (sMensaje == true) {
                            errores.push("Ese trabajador ya fue dado de alta previamente")
                            mostrarMensajeDeError(errores);
                        }
                        else {
                            mostrarMensajeCorrecto("Limpiador dado de alta");
                            mostrarRadioLimpieza();
                        }
                    }
                }
            }
        }
    }
}

function altaContrato() {
    var oForm = document.frmGestionContrato;
    var sMensaje = "";
    var bValido = true;
    var idContrato = oForm.idcontrato.value.trim();
    var fechaInicio = oForm.fechaInicio.value.trim();
    var fechaFin = oForm.fechaFin.value.trim();
    var importe = parseFloat(oForm.importe.value.trim());
    var objetoCliente = oForm.selectObjetoCliente.value;
    var objetoEvento = oForm.selectObjetoEvento.value;
    var errores = [];

    var dFechaInicio = convertirFecha(fechaInicio);
    var dFechaFin = convertirFecha(fechaFin);
    console.log(dFechaFin,dFechaInicio);


    //Validar campo ID
    var oExpReg = /^\d{1,2}$/;

    if (oExpReg.test(idContrato) == false) {
        if (bValido == true) {
            bValido = false;
            document.frmGestionContrato.idcontrato.focus();
        }
        sMensaje = "El ID debe contener solo 2 dígitos\n";
        errores.push(sMensaje);
        document.frmGestionContrato.idcontrato.className = "form-control input-md error";

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
            sMensaje = "La fecha introducida no existe\n";
            errores.push(sMensaje);
            //Marcamos el error
            document.frmGestionContrato.fechaInicio.className = "form-control input-md error";
        }
    } else {
        if (bValido == true) {
            bValido = false;
            document.frmGestionContrato.fechaInicio.focus();
        }
        sMensaje = "La fecha no tiene un formato correcto\n";
        errores.push(sMensaje);
        //Marcamos el error
        document.frmGestionContrato.fechaInicio.className = "form-control input-md error";
    }

    //Validamos Fecha Final
    if (validarFormatoFecha(fechaFin)) {
        if (existeFecha(fechaFin) && dFechaFin >= dFechaInicio) {
            //Aquí se desmarca el error
            document.frmGestionContrato.fechaFin.className = "form-control input-md";
        } else {
            if (bValido == true) {
                bValido = false;
                document.frmGestionContrato.fechaFin.focus();
            }
            sMensaje = "La fecha introducida no existe o es mayor que la fecha de inicio\n";
            errores.push(sMensaje);
            //Marcamos el error
            document.frmGestionContrato.fechaFin.className = "form-control input-md error";
        }
    } else {
        if (bValido == true) {
            bValido = false;
            document.frmGestionContrato.fechaFin.focus();
        }
        sMensaje = "La fecha no tiene un formato correcto\n";
        errores.push(sMensaje);
        //Marcamos el error
        document.frmGestionContrato.fechaFin.className = "form-control input-md error";
    }

    //Validamos Importe
    var oExpReg = /^\d[0-9,]{1,10}/;
    if (oExpReg.test(importe) == false) {
        if (bValido == true) {
            bValido = false;
            document.frmGestionContrato.importe.focus();
        }
        sMensaje = "El importe es incorrecto debe estar comprendida entre 1-10 dígitos\n";
        errores.push(sMensaje);
        document.frmGestionContrato.importe.className = "form-control input-md error";
    }
    else {
        document.frmGestionContrato.importe.className = "form-control input-md";
    }


    if (bValido == false) {
        mostrarMensajeDeError(errores);
    }
    else {//Damos de alta el contrato
        ponerFechaActualInicio();
        oContrato = new Contrato(idContrato, fechaInicio, fechaFin, importe, objetoCliente, objetoEvento);
        sMensaje = oGestion.altaContrato(oContrato);

        if (sMensaje == true) {
            errores.push("Ese contrato ya fue dado de alta previamente");
            mostrarMensajeDeError(errores);
        }
        else {
            mostrarMensajeCorrecto("Contrato dado de alta");
            oForm.reset();
        }
    }

}

function convertirFecha(dFecha){
    var dia = dFecha.substr(0,2);
    var mes = dFecha.substr(3,2);
    var anyo = dFecha.substr(6,10);

    var fConvertida = new Date(anyo,mes-1,dia);

    return fConvertida;
}

function rellenaComboClientes() {
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

function ponerFechaActualInicio() {
    var f = new Date();
    if ((f.getDate() + 1) < 10)
        var dia = "0" + (f.getDate());
    if ((f.getMonth() + 1) < 10)
        var mes = "0" + (f.getMonth() + 1);
    var actual = (dia + "/" + mes + "/" + f.getFullYear());
    document.getElementById("fechaInicio").value = actual;
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
    var listaEventos = oForm.listaEventos;
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
    var oExpReg = /^[a-zA-Z]{3,40}/;
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
    var oExpReg = /^[a-zA-Z]{3,40}/;
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
    var oExpReg = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,3})$/;
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

    //Validar combo eventos
    for (var i = 0; i < listaEventos.options.length; ++i) {
        if (listaEventos.options[i].selected)
            var evento = listaEventos.options[i].text;
    }
    if (evento == null) {
        if (bValido == true) {
            bValido = false;
            document.formuAsistente.listaEventos.focus();
        }
        sMensaje = "Debe seleccionar un evento \n";
        errores.push(sMensaje);
        //Marcar error
        document.formuAsistente.listaEventos.className = "form-control input-md error";
    }
    else {
        if (evento == "No hay eventos disponibles") {
            if (bValido == true) {
                bValido = false;
                document.formuAsistente.listaEventos.focus();
            }
            errores.push("Lo sentimos no hay eventos disponibles \n");
            document.formuAsistente.listaEventos.className = "form-control input-md error";
        }
        else {

            var bHayAforo = oGestion.comprobarAforo(evento);
            if(bHayAforo==true){
                document.formuAsistente.listaEventos.className = "form-control input-md";
            }
            else{
                if (bValido == true) {
                    bValido = false;
                    document.formuAsistente.listaEventos.focus();
                }
                errores.push("Lo sentimos el aforo esta completado para este evento \n");
                document.formuAsistente.listaEventos.className = "form-control input-md error";
            }
        }
    }

    //Mostramos mensaje de error o introducimos los datos
    if (bValido == false) {
        mostrarMensajeDeError(errores);
    }
    else {
        //guardamos el asistente
        document.formuAsistente.reset();
        var oAsistente = new Asistente(dni, nombre, apellidos, telefono, email, evento);
        var bExiste = oGestion.altaAsistente(oAsistente);
        if (bExiste == true) {
            errores.push("Este asistente ya fue dado de alta para este evento");
            mostrarMensajeDeError(errores);
        }
        else {
            mostrarMensajeCorrecto("Asistente dado de alta");
        }
    }
}


//FORMULARIO EVENTOS****************************************************************************************************
function mostrarAltaEvento() {
    ocultarFormulario();
    document.formuEvento.style.display = "block";
}

function altaEvento() {
    var oForm = document.formuEvento;
    var fecha = oForm.fecha.value.trim();
    var descripcion = oForm.descripcion.value.trim();
    var listaTrabajadores = oForm.listaTrabajadores;
    var listaTransportes = oForm.listaTransportes;
    var listaLugares = oForm.listaLugares;
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
    var oExpReg = /^[a-zA-Z]{6,80}/;
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
    for (var i = 0; i < listaTrabajadores.options.length; ++i) {
        if(listaTrabajadores.options[i].selected)
            var trabajadores = listaTrabajadores.options[i].text;
    }
    if (trabajadores == "No hay trabajadores disponibles") {
        if (bValido == true) {
            bValido = false;
            document.formuEvento.listaTrabajadores.focus();
        }
        errores.push("Lo sentimos no hay trabajadores disponibles");
        document.formuEvento.listaTrabajadores.className = "form-control input-md error";
    }
    else {
        if (trabajadores == null) {
            if (bValido == true) {
                bValido = false;
                document.formuEvento.listaTrabajadores.focus();
            }
            errores.push("Debe seleccionar los trabajadores del evento \n");
            document.formuEvento.listaTrabajadores.className = "form-control input-md error";
        }
        else
            document.formuEvento.listaTrabajadores.className = "form-control input-md";
    }

    var j=0;
    var trabajadores=[];
    for (var i = 0; i < listaTrabajadores.options.length; ++i) {
        if (listaTrabajadores.options[i].selected){
            trabajadores[j] = listaTrabajadores.options[i].text;
            j++;
        }
    }


    //Validar combo transportes
    for (var i = 0; i < listaTransportes.options.length; ++i) {
        if (listaTransportes.options[i].selected)
            var transporte = listaTransportes.options[i].text;
    }
    if (transporte == null) {
        if (bValido == true) {
            bValido = false;
            document.formuEvento.listaTransportes.focus();
        }
        sMensaje = "Debe seleccionar un transporte \n";
        errores.push(sMensaje);
        //Marcar error
        document.formuEvento.listaTransportes.className = "form-control input-md error";
    }
    else {
        if (transporte == "No hay transportes disponibles") {
            if (bValido == true) {
                bValido = false;
                document.formuEvento.listaTransportes.focus();
            }
            errores.push("Lo sentimos no hay transportes disponibles \n");
            document.formuEvento.listaTransportes.className = "form-control input-md error";
        }
        else {
            document.formuEvento.listaTransportes.className = "form-control input-md";
        }
    }

    //Validar combo lugares
    for (var i = 0; i < listaLugares.options.length; ++i) {
        if (listaLugares.options[i].selected)
            var lugares = listaLugares.options[i].text;
    }
    if (lugares == null) {
        if (bValido == true) {
            bValido = false;
            document.formuEvento.listaLugares.focus();
        }
        sMensaje = "Debe seleccionar un lugar \n";
        errores.push(sMensaje);
        //Marcar error
        document.formuEvento.listaLugares.className = "form-control input-md error";
    }
    else {
        if (lugares == "No hay lugares disponibles") {
            if (bValido == true) {
                bValido = false;
                document.formuEvento.listaLugares.focus();
            }
            errores.push("Lo sentimos no hay lugares disponibles \n");
            document.formuEvento.listaLugares.className = "form-control input-md error";
        }
        else {
            document.formuEvento.listaLugares.className = "form-control input-md";
        }
    }

    //Mostramos mensaje de error o introducimos los datos
    if (bValido == false) {
        mostrarMensajeDeError(errores);
    }
    else {
        //guardamos el evento
        document.formuEvento.reset();
        ponerFechaActual();
        var aforo = oGestion.obtenerAforoDelLugar(lugares);
        var oEvento = new Evento(fecha, descripcion, trabajadores, transporte, lugares, aforo);
        var bExisteDescripcion = oGestion.comprobarEvento(oEvento);
        var bExiste = oGestion.altaEvento(oEvento);

        if(bExisteDescripcion== true){
            mostrarMensajeInformativo("Lo sentimos ya existe este evento para el dia(" +fecha+")");
        }
        else{
            if (bExiste == true) {
                errores.push("Lo sentimos ya hay un evento en "+lugares+ " para el dia (" +fecha+")");
                mostrarMensajeDeError(errores);
            }
            else {
                mostrarMensajeCorrecto("Evento dado de alta");
            }
        }
    }

}

function mostrarCancelarEvento() {
    ocultarFormulario();
    rellenaComboCancelarEvento();
    document.formuCancelarEvento.style.display = "block";
}


function cancelarEvento() {
    var oForm = document.formuCancelarEvento;
    var bValido = true;
    var sMensaje = "";
    var errores = [];
    var eventoACancelar = oForm.listaEventosACancelar.value;

    sMensaje = oGestion.darCancelacionEvento(eventoACancelar);
    rellenaComboCancelarEvento();

    if (sMensaje == false) {
        errores.push("Lo sentimos no hay eventos");
        mostrarMensajeDeError(errores);
    }
    else {
        mostrarMensajeCorrecto("Evento cancelado");
        oGestion.ponerCanceladoAEventos(eventoACancelar);//*************************************************************************************************************************************************************************************************
    }
}


function rellenaComboCancelarEvento() {
    var mod = document.formuCancelarEvento.listaEventosACancelar.children;
    for (var i = mod.length - 1; i >= 0; i--) {
        mod[i].parentNode.removeChild(mod[i]);
    }

    var comboEventos = oGestion.obtenerEventos();
    mod = document.formuCancelarEvento.listaEventosACancelar;
    for (i = 0; i < comboEventos.length; i++) {
        var item = document.createElement("option");
        item.setAttribute("value", comboEventos[i]);
        var texto = document.createTextNode(comboEventos[i]);
        item.appendChild(texto);
        mod.appendChild(item);
    }
}

//************************************************************************************************************************************************************************************************************
function ponerFechaActual() {
    var f = new Date();
    if ((f.getDate() + 1) < 10)
        var dia = "0" + (f.getDate());
    if ((f.getMonth() + 1) < 10)
        var mes = "0" + (f.getMonth() + 1);
    var actual = (dia + "/" + mes + "/" + f.getFullYear());
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
    var oExpReg = /^[a-zA-Z]{3,40}/;
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
    var oExpReg = /^\d[1-2]/;
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
    var oExpReg = /^[a-z/A-Z][a-zA-Z][0-9]*/;
    if (oExpReg.test(sDireccion) == false) {
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
    var oExpReg = /^\d[1-6]/;
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
        var bExiste = oGestion.altaLugar(oLugar);
        if (bExiste == true) {
            errores.push("Este lugar ya fue dado de alta previamente\n");
            mostrarMensajeDeError(errores);
        }
        else {
            mostrarMensajeCorrecto("Lugar dado de alta\n");
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

function mostrarMensajeInformativo(sMensaje) {
    toastr.info(sMensaje);
}

function actualizarComboTrabajadores() {
    var mod = document.formuEvento.listaTrabajadores.children;
    for (var i = mod.length - 1; i >= 0; i--) {
        mod[i].parentNode.removeChild(mod[i]);
    }

    var oForm = document.formuEvento;
    var lista = oForm.listaTrabajadores;
    // Busco por descripcion
    if (oGestion.trabajadores.length != 0) {
        for (var i = 0; i < oGestion.trabajadores.length; i++) {
            if (oGestion.trabajadores[i] instanceof Artista) {
                lista.options[i] = new Option(oGestion.trabajadores[i].nombre + " " + oGestion.trabajadores[i].apellidos+" (Artista)");
            }
            else{
                if (oGestion.trabajadores[i] instanceof Tecnicos) {
                    lista.options[i] = new Option(oGestion.trabajadores[i].nombre + " " + oGestion.trabajadores[i].apellidos+" (Tecnico)");
                }
                else{
                    if (oGestion.trabajadores[i] instanceof Sanitarios) {
                        lista.options[i] = new Option(oGestion.trabajadores[i].nombre + " " + oGestion.trabajadores[i].apellidos+" (Sanitario)");
                    }
                    else{
                        if (oGestion.trabajadores[i] instanceof Limpieza) {
                            lista.options[i] = new Option(oGestion.trabajadores[i].nombre + " " + oGestion.trabajadores[i].apellidos+" (Limpieza)");
                        }
                    }
                }
            }
        }
    }
    else {
        lista.options[0] = new Option("No hay trabajadores disponibles");
    }
}

function actualizarComboTransportes() {
    var mod = document.formuEvento.listaTransportes.children;
    for (var i = mod.length - 1; i >= 0; i--) {
        mod[i].parentNode.removeChild(mod[i]);
    }

    var oForm = document.formuEvento;
    var lista = oForm.listaTransportes;
    // Busco por id
    if (oGestion.transportes.length != 0) {
        for (var i = 0; i < oGestion.transportes.length; i++) {
            lista.options[i] = new Option(oGestion.transportes[i].id + " " + oGestion.transportes[i].tipo);
        }
    }
    else {
        lista.options[0] = new Option("No hay transportes disponibles");
    }

}

function actualizarComboLugares() {
    var mod = document.formuEvento.listaLugares.children;
    for (var i = mod.length - 1; i >= 0; i--) {
        mod[i].parentNode.removeChild(mod[i]);
    }

    var oForm = document.formuEvento;
    var lista = oForm.listaLugares;
    // Busco por descripcion
    if (oGestion.lugares.length != 0) {
        for (var i = 0; i < oGestion.lugares.length; i++) {
            lista.options[i] = new Option(oGestion.lugares[i].descripcion);
        }
    }
    else {
        lista.options[0] = new Option("No hay lugares disponibles");
    }
}

function actualizarComboEventos() {
    var mod = document.formuAsistente.listaEventos.children;
    for (var i = mod.length - 1; i >= 0; i--) {
        mod[i].parentNode.removeChild(mod[i]);
    }

    var oForm = document.formuAsistente;
    var lista = oForm.listaEventos;
    // Busco por descripcion
    if (oGestion.eventos.length != 0) {
        for (var i = 0; i < oGestion.eventos.length; i++) {
            lista.options[i] = new Option(oGestion.eventos[i].descripcion.trim() + " (" + oGestion.eventos[i].fecha.trim() + ")");
        }
    }
    else {
        lista.options[0] = new Option("No hay eventos disponibles");
    }
}


function actualizarComboEventos2() {
    var mod = document.frmGestionContrato.selectObjetoEvento.children;
    for (var i = mod.length - 1; i >= 0; i--) {
        mod[i].parentNode.removeChild(mod[i]);
    }

    var oForm = document.frmGestionContrato;
    var lista = oForm.selectObjetoEvento;
    // Busco por descripcion
    if (oGestion.eventos.length != 0) {
        for (var i = 0; i < oGestion.eventos.length; i++) {
            lista.options[i] = new Option(oGestion.eventos[i].descripcion.trim() + " (" + oGestion.eventos[i].fecha.trim() + ")");
        }
    }
    else {
        lista.options[0] = new Option("No hay eventos disponibles");
    }
}


//LISTADOS

function vaciarTablas(objetoPadre) {
    while (objetoPadre.children.length != 0) {
        objetoPadre.removeChild(objetoPadre.firstElementChild);
    }
}

function mostrarListaContratos(){
    ocultarFormulario();
    vaciarTablas(document.querySelector("#idContratos"));
    document.querySelector("#idContratos").style.display = "block";

    var lista = oGestion.cogerTodosLosContratos();
    var oTabla = document.createElement("table");


    oTabla.setAttribute("class", "table table-striped");

    var oThead = oTabla.createTHead();
    var oFila = oThead.insertRow(-1);

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("ID Contrato"));

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Fecha Inicio"));

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Fecha Fin"));


    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Importe"));

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Cliente"));

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Eventos"));

    document.querySelector("#idContratos").appendChild(oTabla);

    var oTBody = oTabla.createTBody();

    for (i = 0; i < lista.length; i++) {
        oFila = oTBody.insertRow(-1);
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].iIdContrato));
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].fechaInicio));
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].fechaFin));
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].sImporte));
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].objetoCliente));
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].objetoEvento));
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


function mostrarListaAsistentes() {
    ocultarFormulario();

    vaciarTablas(document.querySelector("#tablaAsistentes"));
    document.querySelector("#tablaAsistentes").style.display = "block";


    var lista = oGestion.cogerTodosLosAsistentes();
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

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Email"));

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Evento"));

    document.querySelector("#tablaAsistentes").appendChild(oTabla);

    var oTBody = oTabla.createTBody();

    for (i = 0; i < lista.length; i++) {
        oFila = oTBody.insertRow(-1);
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].dniAsistente));
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].nombre));
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].apellidos));
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].telefono));
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].email));
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].eventos));

    }
}

function mostrarListaEventos() {
    ocultarFormulario();
    vaciarTablas(document.querySelector("#tablaEventos"));
    document.querySelector("#tablaEventos").style.display = "block";

    var lista = oGestion.cogerTodosLosEventos();
    var oTabla = document.createElement("table");

    oTabla.setAttribute("class", "table table-striped");

    var oThead = oTabla.createTHead();
    var oFila = oThead.insertRow(-1);

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Fecha"));

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Descripcion"));

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Trabajadores"));

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Transporte"));

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Lugar"));


    document.querySelector("#tablaEventos").appendChild(oTabla);

    var oTBody = oTabla.createTBody();

    for (i = 0; i < lista.length; i++) {
        oFila = oTBody.insertRow(-1);
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].fecha));
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].descripcion));
        oCelda = oFila.insertCell(-1);

        for (var j = 0; j < lista[i].trabajadores.length; j++) {
            oCelda.appendChild(document.createTextNode(lista[i].trabajadores[j]));
            oCelda.appendChild(document.createElement("br"));
        }

        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].transporte));
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].lugar));
    }
}


function mostrarListaTransportes() {
    ocultarFormulario();
    vaciarTablas(document.querySelector("#tablaTransportes"));
    document.querySelector("#tablaTransportes").style.display = "block";

    var lista = oGestion.cogerTodosLosTransportes();
    var oTabla = document.createElement("table");

    oTabla.setAttribute("class", "table table-striped");

    var oThead = oTabla.createTHead();
    var oFila = oThead.insertRow(-1);

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("ID"));

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Tipo"));

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Plazas"));

    document.querySelector("#tablaTransportes").appendChild(oTabla);

    var oTBody = oTabla.createTBody();

    for (i = 0; i < lista.length; i++) {
        oFila = oTBody.insertRow(-1);
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].id));
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].tipo));
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].plazas));
    }
}

function mostrarListaLugares() {
    ocultarFormulario();
    vaciarTablas(document.querySelector("#tablaLugares"));
    document.querySelector("#tablaLugares").style.display = "block";

    var lista = oGestion.cogerTodosLosLugares();
    var oTabla = document.createElement("table");

    oTabla.setAttribute("class", "table table-striped");

    var oThead = oTabla.createTHead();
    var oFila = oThead.insertRow(-1);

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Descripción"));

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Dirección"));

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Capacidad"));

    document.querySelector("#tablaLugares").appendChild(oTabla);

    var oTBody = oTabla.createTBody();

    for (i = 0; i < lista.length; i++) {
        oFila = oTBody.insertRow(-1);
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].descripcion));
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].direccion));
        oCelda = oFila.insertCell(-1);
        oCelda.appendChild(document.createTextNode(lista[i].capacidad+" prs"));
    }
}

function mostrarListaTrabajadores()
{
    var tipo = document.frmListaTrabajador.radioTipoTrabajador.value;
    vaciarTablas(document.querySelector("#idTablaTrabajador"));
    document.getElementById('idTablaTrabajador').style.display = "block";


    var oTabla = document.createElement("table");

    oTabla.setAttribute("class", "table table-striped");

    var oThead = oTabla.createTHead();
    var oFila = oThead.insertRow(-1);

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("D.N.I."));

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Nombre"));

    oCelda = document.createElement("th");
    oFila.appendChild(oCelda);
    oCelda.appendChild(document.createTextNode("Apellidos"));

    if (tipo == 'Artista') {
        oCelda = document.createElement("th");
        oFila.appendChild(oCelda);
        oCelda.appendChild(document.createTextNode("Instrumentos"));

        oCelda = document.createElement("th");
        oFila.appendChild(oCelda);
        oCelda.appendChild(document.createTextNode("Género"));
    }
    else {
        if (tipo == 'Tecnico') {
            oCelda = document.createElement("th");
            oFila.appendChild(oCelda);
            oCelda.appendChild(document.createTextNode("Especialidad"));
            oCelda = document.createElement("th");
            oFila.appendChild(oCelda);
            oCelda.appendChild(document.createTextNode("Herramientas Propias"));
        }
        else {
            if (tipo == 'Sanitario') {
                oCelda = document.createElement("th");
                oFila.appendChild(oCelda);
                oCelda.appendChild(document.createTextNode("Especialidad"));
            }
            else {
                oCelda = document.createElement("th");
                oFila.appendChild(oCelda);
                oCelda.appendChild(document.createTextNode("Empresa"));
            }
        }
    }

    document.querySelector("#idTablaTrabajador").appendChild(oTabla);

    var oTBody = oTabla.createTBody();

    if (tipo == 'Artista') {
        for (i = 0; i < oGestion.trabajadores.length; i++) {
            if(oGestion.trabajadores[i] instanceof Artista){
                oFila = oTBody.insertRow(-1);
                oCelda = oFila.insertCell(-1);
                oCelda.appendChild(document.createTextNode(oGestion.trabajadores[i].dni));
                oCelda = oFila.insertCell(-1);
                oCelda.appendChild(document.createTextNode(oGestion.trabajadores[i].nombre));
                oCelda = oFila.insertCell(-1);
                oCelda.appendChild(document.createTextNode(oGestion.trabajadores[i].apellidos));
                oCelda = oFila.insertCell(-1);
                oCelda.appendChild(document.createTextNode(oGestion.trabajadores[i].especialidad));
                oCelda = oFila.insertCell(-1);
                oCelda.appendChild(document.createTextNode(oGestion.trabajadores[i].genero));
            }
        }
    }
    else {
        if(tipo=='Tecnico') {
            for (i = 0; i < oGestion.trabajadores.length; i++) {
                if (oGestion.trabajadores[i] instanceof Tecnicos) {
                    oFila = oTBody.insertRow(-1);
                    oCelda = oFila.insertCell(-1);
                    oCelda.appendChild(document.createTextNode(oGestion.trabajadores[i].dni));
                    oCelda = oFila.insertCell(-1);
                    oCelda.appendChild(document.createTextNode(oGestion.trabajadores[i].nombre));
                    oCelda = oFila.insertCell(-1);
                    oCelda.appendChild(document.createTextNode(oGestion.trabajadores[i].apellidos));
                    oCelda = oFila.insertCell(-1);
                    oCelda.appendChild(document.createTextNode(oGestion.trabajadores[i].especialidad));
                    oCelda = oFila.insertCell(-1);
                    oCelda.appendChild(document.createTextNode(oGestion.trabajadores[i].herramientas));
                }
            }
        }
        else{
            if(tipo=='Sanitario') {
                for (i = 0; i < oGestion.trabajadores.length; i++) {
                    if (oGestion.trabajadores[i] instanceof Sanitarios) {
                        oFila = oTBody.insertRow(-1);
                        oCelda = oFila.insertCell(-1);
                        oCelda.appendChild(document.createTextNode(oGestion.trabajadores[i].dni));
                        oCelda = oFila.insertCell(-1);
                        oCelda.appendChild(document.createTextNode(oGestion.trabajadores[i].nombre));
                        oCelda = oFila.insertCell(-1);
                        oCelda.appendChild(document.createTextNode(oGestion.trabajadores[i].apellidos));
                        oCelda = oFila.insertCell(-1);
                        oCelda.appendChild(document.createTextNode(oGestion.trabajadores[i].especialidad));
                    }
                }
            }
            else{
                if(tipo='Limpieza') {
                    for (i = 0; i < oGestion.trabajadores.length; i++) {
                        if (oGestion.trabajadores[i] instanceof Limpieza) {
                            oFila = oTBody.insertRow(-1);
                            oCelda = oFila.insertCell(-1);
                            oCelda.appendChild(document.createTextNode(oGestion.trabajadores[i].dni));
                            oCelda = oFila.insertCell(-1);
                            oCelda.appendChild(document.createTextNode(oGestion.trabajadores[i].nombre));
                            oCelda = oFila.insertCell(-1);
                            oCelda.appendChild(document.createTextNode(oGestion.trabajadores[i].apellidos));
                            oCelda = oFila.insertCell(-1);
                            oCelda.appendChild(document.createTextNode(oGestion.trabajadores[i].empresa));
                        }
                    }
                }
            }
        }
    }
}
















