function ocultarFormulario()
{
    document.getElementById("uml").style.display = "none";
    document.formuCliente.style.display= "none";
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
    {
        
    }
}























