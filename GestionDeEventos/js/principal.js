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
        sMensaje+="Formato D.N.I incorrecto, debe contener 8 dígitos seguidos de una letra";

        //Marcamos el error
        document.formuCliente.dni.className = "form-control input-md error";
    }
    else{
        //Aquí se desmarca el error
        document.formuCliente.dni.className = "form-control input-md";
    }

    if(bValido==false){
        alert(sMensaje);
    }
    else
    {
        
    }
}























