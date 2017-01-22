function ocultarFormulario()
{
    document.getElementById("uml").style.display = "none";
    document.formuCliente.reset();
    document.formuCliente.style.display= "none";
    document.frmTrabajador.reset();
    document.frmTrabajador.style.display="none";
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
}

function ocultarFormulariosRadio(){
    document.getElementById('idArtista').style.display="none";
    document.getElementById('idTecnico').style.display="none";
    document.getElementById('idSanitario').style.display="none";
    document.getElementById('idLimpieza').style.display="none";
}

function mostrarAltaCliente()
{
    ocultarFormulario();
    document.formuCliente.style.display= "block";
}

function mostrarUML()
{
    ocultarFormulario();
    document.getElementById("uml").style.display = "block";
}

function mostrarTrabajador(){
    ocultarFormulario();
    document.frmTrabajador.style.display="block";
}

function mostrarRadioArtista(){
    ocultarFormulariosRadio();
    document.getElementById('idArtista').style.display="block";
}

function mostrarRadioTecnico(){
    ocultarFormulariosRadio();
    document.getElementById('idTecnico').style.display="block";
}
function mostrarRadioLimpieza(){
    ocultarFormulariosRadio();
    document.getElementById('idLimpieza').style.display="block";
}
function mostrarRadioSanitario(){
    ocultarFormulariosRadio();
    document.getElementById('idSanitario').style.display="block";
}
function mostrarEvento(){
    ocultarFormulario();
    document.frmGestionEventos.style.display = "block";
}

function mostrarContrato(){
    ocultarFormulario();
    document.frmGestionContrato.style.display = "block";
}

function altaCliente()
{
    var oForm = document.formuCliente;
    var bValido = true;
    var sMensaje="";
    var dni = oForm.dni.value.trim();
    var nombre = oForm.nombre.value.trim();
    var telefono = document.formuCliente.telefono.value.trim();

    //Validar dni
    var oExpReg = /^\d{8}[a-zA-Z]$/;

    if(oExpReg.test(dni) == false)
    {
        if(bValido==true)
        {
            bValido=false;
            document.formuCliente.dni.focus();
        }
        sMensaje+="Formato D.N.I incorrecto, debe contener 8 dígitos seguidos de una letra\n";

        //Marcamos el error
        document.formuCliente.dni.className = "form-control input-md error";
    }
    else{
        //Aquí se desmarca el error
        document.formuCliente.dni.className = "form-control input-md";
    }

    //Validar nombre
    var oExpReg =  /^[a-z][a-z]*/;

    if(oExpReg.test(nombre) == false)
    {
        if(bValido==true)
        {
            bValido=false;
            document.formuCliente.nombre.focus();
        }
        sMensaje+="El nombre debe contener solo carácteres alfabéticos\n";

        //Marcamos el error
        document.formuCliente.nombre.className = "form-control input-md error";
    }

    else{
        //Aquí se desmarca el error
        document.formuCliente.nombre.className = "form-control input-md";
    }

    //Validar apellido

    var oExpReg =  /^[a-z][a-z]*/;

    if(oExpReg.test(nombre) == false)
    {
        if(bValido==true)
        {
            bValido=false;
            document.formuCliente.apellidos.focus();
        }
        sMensaje+="El apellido debe contener solo carácteres alfabéticos\n";

        //Marcamos el error
        document.formuCliente.apellidos.className = "form-control input-md error";
    }

    else{
        //Aquí se desmarca el error
        document.formuCliente.apellidos.className = "form-control input-md";
    }
    //Validar telefono

    var oExpReg = /^[679]\d{8}/;

    if(oExpReg.test(telefono) == false)
    {
        if(bValido==true)
        {
            bValido=false;
            document.formuCliente.telefono.focus();
        }
        sMensaje+="El telefono debe empezar por 6,7 o 9 y tener un total de 9 dígitos\n";

        //Marcamos el error
        document.formuCliente.telefono.className = "form-control input-md error";
    }

    else{
        //Aquí se desmarca el error
        document.formuCliente.telefono.className = "form-control input-md";
    }

    if(bValido==false){
        alert(sMensaje);
    }
    else
    {//Damos de alta el cliente
        document.formuCliente.reset();
    }
}

function altaTrabajador()
{
    var oForm = document.frmTrabajador;
    var bValido = true;
    var sMensaje = "";
    var dni = oForm.dni.value.trim();
    var nombre = oForm.nombre.value.trim();
    var apellido = oForm.apellido.value.trim();

    var oExpReg = /^\d{8}[a-zA-Z]$/;

    if(oExpReg.test(dni) == false)
    {
        if(bValido==true)
        {
            bValido=false;
            document.frmTrabajador.dni.focus();
        }
        sMensaje+="Formato D.N.I incorrecto, debe contener 8 dígitos seguidos de una letra\n";

        //Marcamos el error
        document.frmTrabajador.dni.className = "form-control input-md error";
    }
    else{
        //Aquí se desmarca el error
        document.frmTrabajador.dni.className = "form-control input-md";
    }

    //Validar nombre
    var oExpReg =  /^[a-zA-Z]*/;

    if(oExpReg.test(nombre) == false)
    {
        if(bValido==true)
        {
            bValido=false;
            document.frmTrabajador.nombre.focus();
        }
        sMensaje+="El nombre debe contener solo carácteres alfabéticos\n";

        //Marcamos el error
        document.frmTrabajador.nombre.className = "form-control input-md error";
    }

    else{
        //Aquí se desmarca el error
        document.frmTrabajador.nombre.className = "form-control input-md";
    }

    //Validar apellido

    var oExpReg =  /^[a-zA-Z]*/;

    if(oExpReg.test(nombre) == false)
    {
        if(bValido==true)
        {
            bValido=false;
            document.frmTrabajador.apellidos.focus();
        }
        sMensaje+="El apellido debe contener solo carácteres alfabéticos\n";

        //Marcamos el error
        document.frmTrabajador.apellidos.className = "form-control input-md error";
    }

    else{
        //Aquí se desmarca el error
        document.frmTrabajador.apellidos.className = "form-control input-md";
    }

     var valorTipoRadio = document.frmTrabajador.radios.value;

    if(valorTipoRadio == 'artista')
    {
           var aInstrumentos = [];
            for(var i=0; i<oForm.selectInstrumentos.options.length; i++){
                if(oForm.selectInstrumentos.options[i].selected==true){
                    aInstrumentos.push(oForm.selectInstrumentos.options[i].value);
                }
            }
           if(aInstrumentos.length==0)
           {
               if(bValido==true){
                   bValido=false;
                   aInstrumentos=0;
               }
               sMensaje+="Debe seleccionar algún instrumento";
           }
           var sGenero = oForm.selectGenero.value;

    }

    else {
        if (valorTipoRadio == 'tecnico') {

            var especialidadTecnica = oForm.especialidadTec.value;
            var herramientasPropias = oForm.radiosHerramientas.value;
        }

        else {
            if (valorTipoRadio == 'sanitario') {
                var especialidadSanitario = oForm.especialidadSani.value;
            }

            else {
                    var compañiaLimpieza = oForm.limpieza.value;
                    if(compañiaLimpieza==""){
                        compañiaLimpieza = "Trabaja en Negro";
                    }
            }
        }
    }

    if(bValido==false){
        alert(sMensaje);
    }
    else
    {//Damos de alta el trabajador
        document.frmTrabajador.reset();
    }
}

function altaContrato(){
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

    if(oExpReg.test(idContrato)==false){
        if(bValido==true)
        {
            bValido=false;
            document.frmGestionContrato.idcontrato.focus();
        }
        sMensaje+="El ID debe contener solo 2 dígitos\n";
        
    }
    else{
        document.frmGestionContrato.idcontrato.className = "form-control input-md";
    }

    //Validamos Fecha Inicial

    if(validarFormatoFecha(fechaInicio)){
        if(existeFecha(fechaInicio)){
            //Aquí se desmarca el error
            document.frmGestionContrato.fechaInicio.className = "form-control input-md";
        }else{
            if (bValido == true) {
                bValido = false;
                document.frmGestionContrato.fechaInicio.focus();
            }
            sMensaje += "La fecha introducida no existe\n";
            //Marcamos el error
            document.frmGestionContrato.fechaInicio.className = "form-control input-md error";
        }
    }else{
        if (bValido == true) {
            bValido = false;
            document.frmGestionContrato.fechaInicio.focus();
        }
        sMensaje += "La fecha no tiene un formato correcto\n";
        //Marcamos el error
        document.frmGestionContrato.fechaInicio.className = "form-control input-md error";
    }

    //Validamos Fecha Final
    if(validarFormatoFecha(fechaFin)){
        if(existeFecha(fechaFin)){
            //Aquí se desmarca el error
            document.frmGestionContrato.fechaFin.className = "form-control input-md";
        }else{
            if (bValido == true) {
                bValido = false;
                document.frmGestionContrato.fechaFin.focus();
            }
            sMensaje += "La fecha introducida no existe\n";
            //Marcamos el error
            document.frmGestionContrato.fechaFin.className = "form-control input-md error";
        }
    }else{
        if (bValido == true) {
            bValido = false;
            document.frmGestionContrato.fechaFin.focus();
        }
        sMensaje += "La fecha no tiene un formato correcto\n";
        //Marcamos el error
        document.frmGestionContrato.fechaFin.className = "form-control input-md error";
    }


    if(bValido==false){
        alert(sMensaje);
    }
    else
    {//Damos de alta el contrato
        document.frmGestionContrato.reset();
        ponerFechaActualInicio();
    }

}

function ponerFechaActualInicio() {
    var f = new Date();
    if((f.getMonth() + 1)<10)
        var mes = "0"+(f.getMonth() + 1);
    var actual = (f.getDate() + "/" + mes + "/" + f.getFullYear());
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
    var bValido = true;
    var sMensaje = "";

    //Validar dni
    var oExpReg = /^\d{8}[a-zA-Z]$/;
    if (oExpReg.test(dni) == false) {
        if (bValido == true) {
            bValido = false;
            document.formuCliente.dni.focus();
        }
        sMensaje += "Formato D.N.I incorrecto, debe contener 8 dígitos seguidos de una letra\n";

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
        sMensaje += "El nombre debe contener solo carácteres alfabéticos\n";

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
        sMensaje += "El apellido debe contener solo carácteres alfabéticos\n";

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
        sMensaje += "El telefono debe empezar por 6,7 o 9 y tener un total de 9 dígitos\n";

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
        sMensaje += "Formato de Email incorrecto, Ej. ejemplo@gmail.es \n";

        //Marcar error
        document.formuAsistente.email.className = "form-control input-md error";
    }
    else {
        //Desmarcar error
        document.formuAsistente.email.className = "form-control input-md";
    }

    //Mostramos mensaje de error o introducimos los datos
    if (bValido == false) {
        alert(sMensaje);
    }
    else {
        //guardamos el asistente
        document.formuAsistente.reset();
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


    //Validar fecha
    if(validarFormatoFecha(fecha)){
        if(existeFecha(fecha)){
            //Aquí se desmarca el error
            document.formuEvento.fecha.className = "form-control input-md";
        }else{
            if (bValido == true) {
                bValido = false;
                document.formuEvento.fecha.focus();
            }
            sMensaje += "La fecha introducida no existe\n";
            //Marcamos el error
            document.formuEvento.fecha.className = "form-control input-md error";
        }
    }else{
        if (bValido == true) {
            bValido = false;
            document.formuEvento.fecha.focus();
        }
        sMensaje += "La fecha no tiene un formato correcto\n";
        //Marcamos el error
        document.formuEvento.fecha.className = "form-control input-md error";
    }

    //Validar descripcion
    var oExpReg = /^[a-z][a-z]*/;

    if (oExpReg.test(descripcion) == false) {
        if (bValido == true) {
            bValido = false;
            document.formuEvento.descripcion.focus();
        }
        sMensaje += "La descripcion debe contener solo carácteres alfabéticos\n";

        //Marcamos el error
        document.formuEvento.descripcion.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.formuEvento.descripcion.className = "form-control input-md";
    }

    //Mostramos mensaje de error o introducimos los datos
    if (bValido == false) {
        alert(sMensaje);
    }
    else {
        //guardamos el evento
        document.formuEvento.reset();
        ponerFechaActual();
    }

}

function ponerFechaActual() {
    var f = new Date();
    if((f.getMonth() + 1)<10)
        var mes = "0"+(f.getMonth() + 1);
    var actual = (f.getDate() + "/" + mes + "/" + f.getFullYear());
    document.getElementById("fechaEvento").value = actual;
}

function existeFecha(fecha){
    var fechaf = fecha.split("/");
    var day = fechaf[0];
    var month = fechaf[1];
    var year = fechaf[2];
    var date = new Date(year,month,'0');
    if((day-0)>(date.getDate()-0)){
        return false;
    }
    return true;
}

function validarFormatoFecha(campo) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
    if ((campo.match(RegExPattern)) && (campo!='')) {
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

    //Validar id
    if (id == "") {
        if (bValido == true) {
            bValido = false;
            document.formuTransporte.id.focus();
        }
        sMensaje += "La idetificacion debe contener solo carácteres alfanumericos\n";

        //Marcamos el error
        document.formuTransporte.id.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.formuTransporte.id.className = "form-control input-md";
    }

    //Validar tipo
    var oExpReg = /^[a-z][a-z]*/;
    if (oExpReg.test(tipo) == false) {
        if (bValido == true) {
            bValido = false;
            document.formuTransporte.tipo.focus();
        }
        sMensaje += "El tipo debe contener solo carácteres alfabéticos\n";

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
        sMensaje += "Las plazas debe ser de tipo numero\n";

        //Marcamos el error
        document.formuTransporte.plazas.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.formuTransporte.plazas.className = "form-control input-md";
    }

    //Mostramos mensaje de error o introducimos los datos
    if (bValido == false) {
        alert(sMensaje);
    }
    else {
        //guardamos los transportes
        document.formuTransporte.reset();
    }

}

//FORMULARIO DE LUGARES*************************************************************************************************
function mostrarAltaLugar() {
    ocultarFormulario();
    document.formuLugar.style.display = "block";
}

function altaLugar() {
    var oForm = document.formuLugar;
    var descripcion = oForm.descripcion.value.trim();
    var direccion = oForm.direccion.value.trim();
    var capacidad = oForm.capacidad.value.trim();
    var bValido = true;
    var sMensaje = "";


    //Validar descripcion
    var oExpReg = /^[a-z][a-z]*/;
    if (oExpReg.test(descripcion) == false) {
        if (bValido == true) {
            bValido = false;
            document.formuLugar.descripcion.focus();
        }
        sMensaje += "La descripcion debe contener solo carácteres alfabéticos\n";

        //Marcamos el error
        document.formuLugar.descripcion.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.formuLugar.descripcion.className = "form-control input-md";
    }

    //Validar direccion
    if (direccion == "") {
        if (bValido == true) {
            bValido = false;
            document.formuLugar.direccion.focus();
        }
        sMensaje += "La direccion debe contener solo carácteres alfabéticos\n";

        //Marcamos el error
        document.formuLugar.direccion.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.formuLugar.direccion.className = "form-control input-md";
    }

    //Validar capacidad
    var oExpReg = /^\d[1-6]*/;
    if (oExpReg.test(capacidad) == false) {
        if (bValido == true) {
            bValido = false;
            document.formuLugar.capacidad.focus();
        }
        sMensaje += "La capacidad debe ser solo numerica\n";

        //Marcamos el error
        document.formuLugar.capacidad.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.formuLugar.capacidad.className = "form-control input-md";
    }

    //Mostramos mensaje de error o introducimos los datos
    if (bValido == false) {
        alert(sMensaje);
    }
    else {
        //guardamos los lugares
        document.formuLugar.reset();
    }

}


















