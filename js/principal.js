function ocultarFormulario() {
    document.getElementById("uml").style.display = "none";
    document.formuCliente.style.display = "none";
    document.formuAsistente.style.display = "none";
    document.formuEvento.style.display = "none";
    document.formuTransporte.style.display = "none";
    document.formuLugar.style.display = "none";
}

function mostrarUML() {
    ocultarFormulario();
    document.getElementById("uml").style.display = "block";
}

function mostrarAltaCliente() {
    ocultarFormulario();
    document.formuCliente.style.display = "block";
}

function altaCliente() {
    var oForm = document.formuCliente;
    var bValido = true;
    var sMensaje = "";
    var dni = oForm.dni.value.trim();
    var nombre = oForm.nombre.value.trim();
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
    var oExpReg = /^[a-z][a-z]*/;

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

    var oExpReg = /^[a-z][a-z]*/;

    if (oExpReg.test(nombre) == false) {
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
        alert(sMensaje);
    }
    else {

    }
}


function mostrarAltaAsistente() {
    ocultarFormulario();
    document.formuAsistente.style.display = "block";
}


function altaAsistente() {
    var oForm = document.formuAsistente;
    var dni = oForm.dni.value.trim();
    var nombre = oForm.nombre.value.trim();
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

    if (oExpReg.test(nombre) == false) {
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
        sMensaje += "Formato de Email incorrecto \n";

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
        //tenemos que guardar los asistentes
    }

}




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


    //Validar descripcion
    var oExpReg = /^[a-z][a-z]*/;

    if (oExpReg.test(descripcion) == false) {
        if (bValido == true) {
            bValido = false;
            document.formuAsistente.descripcion.focus();
        }
        sMensaje += "La descripcion debe contener solo carácteres alfabéticos\n";

        //Marcamos el error
        document.formuEvento.nombre.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.formuEvento.nombre.className = "form-control input-md";
    }


    //Mostramos mensaje de error o introducimos los datos
    if (bValido == false) {
        alert(sMensaje);
    }
    else {
        //tenemos que guardar los asistentes
    }

}


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
    var oExpReg = /^[a-z][a-z]*/;
    if (oExpReg.test(id) == false) {
        if (bValido == true) {
            bValido = false;
            document.formuTransporte.id.focus();
        }
        sMensaje += "La idetificacion debe contener solo carácteres alfabéticos\n";

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
    var oExpReg = /^[a-z][a-z]*/;
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
        //tenemos que guardar los asistentes
    }

}


function mostrarAltaLugar() {
    ocultarFormulario();
    document.formuLugar.style.display = "block";
}

function altaLugar() {
    var oForm = document.formuLugar;
    var descripcion = oForm.id.value.trim();
    var direccion = oForm.tipo.value.trim();
    var capacidad = oForm.plazas.value.trim();
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
        document.formuLugar.nombre.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.formuLugar.nombre.className = "form-control input-md";
    }

    //Validar direccion
    var oExpReg = /^[a-z][a-z]*/;
    if (oExpReg.test(direccion) == false) {
        if (bValido == true) {
            bValido = false;
            document.formuLugar.direccion.focus();
        }
        sMensaje += "La direccion debe contener solo carácteres alfabéticos\n";

        //Marcamos el error
        document.formuLugar.nombre.className = "form-control input-md error";
    }
    else {
        //Aquí se desmarca el error
        document.formuLugar.nombre.className = "form-control input-md";
    }


    //Validar capacidad
    var oExpReg = /^[a-z][a-z]*/;
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
        //tenemos que guardar los asistentes
    }

}










