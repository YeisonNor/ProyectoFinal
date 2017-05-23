var cedula = "";
var nombre = "";
var apellido = "";
var tipo = "";

window.onload = function()
{
	getDatosUsuario(getParameterByName('cedula'));
	$("#verReservas").click(abrirFormConsulta);
	$("#reservar").click(abrirFormReservar);
	$("#registrarVehiculo").click(abrirFormRegistrarVehiculo);
	$("#modificarVehiculo").click(abrirFormModificarVehiculo);
}

function abrirFormConsulta()
{
	self.location = "consultarReservas.html?cedula=" + cedula + "&tipo=" + tipo;
}

function abrirFormReservar()
{
	self.location = "reservar.html?cedula=" + cedula;
}

function abrirFormRegistrarVehiculo()
{
	self.location = "registrarVehiculo.html?cedula=" + cedula;
}

function abrirFormModificarVehiculo()
{
	self.location = "modificarVehiculo.html?cedula=" + cedula;
}

function getDatosUsuario(cedula)
{
	$.ajax({ 
	  async:true, 
	  type: "POST", 
	  dataType: "html", contentType: "application/x-www-form-urlencoded", 
	  url:"https://proyecto-vehiculos.000webhostapp.com/ProyectoFinal/login.php", 
	  data:"tipo=Consulta&cedula="+cedula, beforeSend:inicioEnvio, success:llegadaDatos, 
	  timeout:4000, 
	  error:problemas }); 
}

function inicioEnvio(datos)
{
	
}

function llegadaDatos(datos)
{
	cedula = datos.split('¬')[0];
	nombre = datos.split('¬')[1];
	apellido = datos.split('¬')[2];
	tipo = datos.split('¬')[3];
	
	$("#nombre-usuario").text(nombre + " " + apellido);
	
	if(tipo === 'Admin')
	{
		$("#item-agregar-vehiculo").removeClass("nb-hidden");
		$("#item-modificar-vehiculo").removeClass("nb-hidden");
	}
	else
	{
		$("#item-reservar").removeClass("nb-hidden");
	}
}

function problemas()
{
	
}

function getParameterByName(name, url) 
{
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}